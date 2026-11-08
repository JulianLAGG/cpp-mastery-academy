const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const server = require('./server');

function requestJson(port, method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: urlPath,
        method,
        headers: payload
          ? {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(payload)
            }
          : {}
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, json: JSON.parse(data) });
          } catch (e) {
            reject(new Error(`Respuesta no JSON (${res.statusCode}): ${data}`));
          }
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  const listener = server.listen(0);
  const port = listener.address().port;

  try {
    // 1. Verificar /api/status
    const statusRes = await requestJson(port, 'GET', '/api/status');
    if (!statusRes.json.ok) {
      throw new Error('g++ no detectado en /api/status');
    }
    console.log('✓ /api/status OK:', statusRes.json.compiler);

    // 2. Cargar curriculum.js y verificar que todas las soluciones oficiales pasen /api/verify
    const sandbox = { window: {} };
    const curriculumCode = fs.readFileSync(path.join(__dirname, 'public', 'curriculum.js'), 'utf8');
    vm.runInNewContext(curriculumCode, sandbox);
    const modules = sandbox.window.CPP_CURRICULUM;

    let totalLessons = 0;
    for (const mod of modules) {
      for (const les of mod.lessons) {
        totalLessons++;
        const ch = les.challenge;
        const verifyRes = await requestJson(port, 'POST', '/api/verify', {
          code: ch.solutionCode,
          testCases: ch.testCases,
          requiredSnippets: ch.requiredSnippets || []
        });

        if (!verifyRes.json.passed) {
          console.error(`✗ Falló verificación en lección ${les.id}:`, verifyRes.json);
          throw new Error(`El reto de la lección ${les.id} no pasó su propia solución oficial.`);
        }
        console.log(`✓ Lección ${les.id} (${les.title}) verificada con g++`);
      }
    }

    console.log(`\n🎉 Todas las ${totalLessons} lecciones y sus retos compilaron y pasaron sus tests en g++!`);
  } finally {
    listener.close();
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
