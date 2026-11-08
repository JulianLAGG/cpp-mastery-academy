const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { spawn, execFile } = require('child_process');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_EXEC_TIME_MS = 4000; // 4 segundos máximo por ejecución (protección contra bucles infinitos)
const MAX_OUTPUT_LENGTH = 64 * 1024; // 64 KB máximo de salida
const BINARY_NAME = process.platform === 'win32' ? 'program.exe' : 'program';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

/**
 * Crea un directorio temporal aislado para compilar y ejecutar una petición
 */
function createTempSessionDir() {
  const id = crypto.randomBytes(8).toString('hex');
  const dir = path.join(os.tmpdir(), `cpp_academy_${id}`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Elimina de forma segura el directorio temporal
 */
function cleanupDir(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch (_) {
    // Ignorar errores de limpieza
  }
}

/**
 * Compila un archivo fuente C++ usando g++
 */
function compileCpp(sourcePath, binaryPath) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    execFile(
      'g++',
      ['-std=c++17', '-O0', '-Wall', '-Wextra', sourcePath, '-o', binaryPath],
      { timeout: 8000, maxBuffer: 1024 * 512 },
      (error, stdout, stderr) => {
        const compileTimeMs = Date.now() - startTime;
        // Limpiar rutas temporales del mensaje de error para que sea más legible
        const cleanStderr = (stderr || '').replaceAll(sourcePath, 'main.cpp');
        if (error) {
          resolve({
            compiled: false,
            compileTimeMs,
            compilerOutput: cleanStderr || error.message
          });
        } else {
          resolve({
            compiled: true,
            compileTimeMs,
            compilerOutput: cleanStderr
          });
        }
      }
    );
  });
}

/**
 * Ejecuta un binario compilado pasándole stdin y capturando stdout/stderr con límite de tiempo
 */
function runBinary(binaryPath, stdinData = '', workingDir) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    let outputExceeded = false;

    const child = spawn(binaryPath, [], {
      cwd: workingDir,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, MAX_EXEC_TIME_MS);

    child.stdout.on('data', (chunk) => {
      if (stdout.length < MAX_OUTPUT_LENGTH) {
        stdout += chunk.toString('utf8');
        if (stdout.length >= MAX_OUTPUT_LENGTH) {
          outputExceeded = true;
          child.kill('SIGKILL');
        }
      }
    });

    child.stderr.on('data', (chunk) => {
      if (stderr.length < MAX_OUTPUT_LENGTH) {
        stderr += chunk.toString('utf8');
      }
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({
        exitCode: -1,
        stdout,
        stderr: stderr + '\nError al ejecutar el binario: ' + err.message,
        timedOut: false,
        runTimeMs: Date.now() - startTime
      });
    });

    child.on('close', (code, signal) => {
      clearTimeout(timer);
      const runTimeMs = Date.now() - startTime;
      let extraMsg = '';
      if (timedOut) {
        extraMsg = `\n[Tiempo límite excedido (${MAX_EXEC_TIME_MS / 1000}s). ¿Tienes un bucle infinito o esperas más datos por std::cin?]`;
      } else if (outputExceeded) {
        extraMsg = '\n[Salida truncada: El programa generó demasiados datos en consola.]';
      } else if (signal === 'SIGSEGV') {
        extraMsg = '\n[Segmentation Fault (SIGSEGV): Acceso inválido a memoria, puntero nulo o fuera de rango.]';
      } else if (signal === 'SIGFPE') {
        extraMsg = '\n[Floating Point Exception (SIGFPE): Posible división por cero.]';
      } else if (signal === 'SIGABRT') {
        extraMsg = '\n[Programa abortado (SIGABRT): Posible excepción no capturada o fallo de aserción.]';
      }

      resolve({
        exitCode: code ?? (timedOut ? 124 : -1),
        stdout: stdout + (outputExceeded ? extraMsg : ''),
        stderr: stderr + (!outputExceeded ? extraMsg : ''),
        timedOut,
        runTimeMs
      });
    });

    if (stdinData !== undefined && stdinData !== null) {
      try {
        child.stdin.write(String(stdinData));
        if (!String(stdinData).endsWith('\n')) {
          child.stdin.write('\n');
        }
      } catch (_) {}
    }
    try {
      child.stdin.end();
    } catch (_) {}
  });
}

function normalizeOutput(str) {
  return String(str || '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString('utf8');
      if (body.length > 256 * 1024) {
        reject(new Error('Payload demasiado grande'));
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Endpoint: Estado del compilador g++
  if (req.method === 'GET' && pathname === '/api/status') {
    execFile('g++', ['--version'], (err, stdout) => {
      const firstLine = stdout ? stdout.split('\n')[0] : 'g++ no detectado';
      sendJson(res, 200, {
        ok: !err,
        compiler: firstLine,
        standard: 'C++17'
      });
    });
    return;
  }

  // Endpoint: Compilar y ejecutar código C++
  if (req.method === 'POST' && pathname === '/api/compile') {
    let sessionDir;
    try {
      const { code, stdin = '' } = await readJsonBody(req);
      if (!code || typeof code !== 'string' || !code.trim()) {
        return sendJson(res, 400, { success: false, error: 'El código C++ está vacío.' });
      }

      sessionDir = createTempSessionDir();
      const sourcePath = path.join(sessionDir, 'main.cpp');
      const binaryPath = path.join(sessionDir, BINARY_NAME);

      fs.writeFileSync(sourcePath, code, 'utf8');

      const compileResult = await compileCpp(sourcePath, binaryPath);
      if (!compileResult.compiled) {
        cleanupDir(sessionDir);
        return sendJson(res, 200, {
          success: false,
          stage: 'compile',
          compileTimeMs: compileResult.compileTimeMs,
          compilerOutput: compileResult.compilerOutput,
          stdout: '',
          stderr: compileResult.compilerOutput
        });
      }

      const runResult = await runBinary(binaryPath, stdin, sessionDir);
      cleanupDir(sessionDir);

      return sendJson(res, 200, {
        success: runResult.exitCode === 0 && !runResult.timedOut,
        stage: 'run',
        compileTimeMs: compileResult.compileTimeMs,
        compilerOutput: compileResult.compilerOutput,
        runTimeMs: runResult.runTimeMs,
        exitCode: runResult.exitCode,
        timedOut: runResult.timedOut,
        stdout: runResult.stdout,
        stderr: runResult.stderr
      });
    } catch (err) {
      if (sessionDir) cleanupDir(sessionDir);
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // Endpoint: Verificar reto práctico con casos de prueba
  if (req.method === 'POST' && pathname === '/api/verify') {
    let sessionDir;
    try {
      const { code, testCases = [], requiredSnippets = [] } = await readJsonBody(req);
      if (!code || typeof code !== 'string' || !code.trim()) {
        return sendJson(res, 400, { passed: false, error: 'El código está vacío.' });
      }

      // Verificar si el reto exige usar alguna construcción de C++ (p. ej. bucle, puntero, clase, etc.)
      const missingSnippets = [];
      for (const reqItem of requiredSnippets) {
        const pattern = new RegExp(reqItem.regex);
        if (!pattern.test(code)) {
          missingSnippets.push(reqItem.message);
        }
      }

      sessionDir = createTempSessionDir();
      const sourcePath = path.join(sessionDir, 'main.cpp');
      const binaryPath = path.join(sessionDir, BINARY_NAME);

      fs.writeFileSync(sourcePath, code, 'utf8');

      const compileResult = await compileCpp(sourcePath, binaryPath);
      if (!compileResult.compiled) {
        cleanupDir(sessionDir);
        return sendJson(res, 200, {
          passed: false,
          stage: 'compile',
          compilerOutput: compileResult.compilerOutput,
          results: []
        });
      }

      const results = [];
      let allTestsPassed = true;

      for (const tc of testCases) {
        const runResult = await runBinary(binaryPath, tc.input || '', sessionDir);
        const actual = normalizeOutput(runResult.stdout);
        const expected = normalizeOutput(tc.expectedOutput);
        const passed = runResult.exitCode === 0 && !runResult.timedOut && actual === expected;
        if (!passed) allTestsPassed = false;

        results.push({
          description: tc.description || 'Caso de prueba',
          input: tc.input || '',
          expectedOutput: expected,
          actualOutput: actual,
          stderr: runResult.stderr,
          passed,
          runTimeMs: runResult.runTimeMs
        });
      }

      cleanupDir(sessionDir);

      if (missingSnippets.length > 0) {
        allTestsPassed = false;
      }

      return sendJson(res, 200, {
        passed: allTestsPassed,
        stage: 'verify',
        compilerOutput: compileResult.compilerOutput,
        missingRequirements: missingSnippets,
        results
      });
    } catch (err) {
      if (sessionDir) cleanupDir(sessionDir);
      return sendJson(res, 500, { passed: false, error: err.message });
    }
  }

  // Servir archivos estáticos
  let safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Acceso denegado');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Archivo no encontrado');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n🚀 C++ Mastery Academy corriendo en: http://localhost:${PORT}`);
  });
}

module.exports = server;
