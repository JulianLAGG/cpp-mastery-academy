window.CPP_CURRICULUM = [
  {
    moduleId: "mod-1",
    moduleTitle: "Módulo 1: Primeros Pasos (Nivel 0)",
    levelBadge: "Nivel 0",
    lessons: [
      {
        id: "les-1-1",
        title: "1.1 Hola Mundo y Estructura de un Programa",
        level: "Nivel 0",
        xp: 100,
        summary: "Comprende cómo funciona el compilador g++, la librería <iostream> y la función principal main().",
        theory: `
          <p><strong>C++</strong> es uno de los lenguajes más rápidos, potentes y versátiles del mundo. Se utiliza en motores de videojuegos (Unreal Engine), sistemas operativos, navegadores web, inteligencia artificial y sistemas financieros.</p>
          <h4>¿Cómo funciona un programa en C++?</h4>
          <p>A diferencia de lenguajes interpretados, C++ es un <strong>lenguaje compilado</strong>: tu código fuente (<code>.cpp</code>) pasa por el compilador (como <code>g++</code>) y se transforma directamente en código máquina ejecutable.</p>
          <div class="callout callout-info">
            <strong>Piezas clave de todo programa en C++:</strong>
            <ul>
              <li><code>#include &lt;iostream&gt;</code>: Importa la librería estándar de entrada y salida de datos (Input/Output Stream).</li>
              <li><code>int main() { ... }</code>: Es el punto de entrada obligatorio. Todo programa en C++ comienza ejecutándose dentro de <code>main()</code>.</li>
              <li><code>std::cout &lt;&lt; "Texto";</code>: Envía texto o valores hacia la pantalla (Character Output).</li>
              <li><code>return 0;</code>: Indica al sistema operativo que el programa terminó sin errores.</li>
            </ul>
          </div>
        `,
        examples: [
          {
            title: "Mi primer programa en C++",
            description: "Observa cómo usamos std::cout y el salto de línea '\\n' o std::endl.",
            stdin: "",
            code: `#include <iostream>

int main() {
    std::cout << "¡Hola, futuro programador de C++!" << std::endl;
    std::cout << "C++ es rápido y poderoso.\\n";
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Cuál es la función obligatoria donde comienza la ejecución de todo programa en C++?",
            options: ["start()", "int main()", "void init()", "system()"],
            correctIndex: 1,
            explanation: "En C++, el estándar exige la función 'int main()' como punto de entrada principal del programa."
          },
          {
            question: "¿Qué librería debemos incluir para poder usar std::cout y std::cin?",
            options: ["<stdio>", "<string>", "<iostream>", "<ostream.h>"],
            correctIndex: 2,
            explanation: "<iostream> (Input/Output Stream) provee los objetos std::cout, std::cin y std::endl."
          }
        ],
        challenge: {
          title: "Reto: Tu Saludo Oficial en C++",
          description: "Escribe un programa que imprima exactamente dos líneas en consola:\nEn la primera línea: <code>Bienvenido a C++</code>\nEn la segunda línea: <code>Nivel 0 superado</code>",
          hint: "Usa std::cout << \"Bienvenido a C++\\n\"; seguido de la segunda línea con std::cout.",
          defaultStdin: "",
          starterCode: `#include <iostream>

int main() {
    // Escribe aquí tus dos líneas con std::cout
    
    return 0;
}`,
          solutionCode: `#include <iostream>

int main() {
    std::cout << "Bienvenido a C++\\n";
    std::cout << "Nivel 0 superado\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "cout", message: "Debes utilizar std::cout para mostrar el mensaje en pantalla." }
          ],
          testCases: [
            {
              description: "Imprime las dos líneas exactas solicitadas",
              input: "",
              expectedOutput: "Bienvenido a C++\nNivel 0 superado"
            }
          ]
        }
      },
      {
        id: "les-1-2",
        title: "1.2 Variables, Tipos de Datos y Constantes",
        level: "Nivel 0",
        xp: 120,
        summary: "Aprende el tipado estático de C++: int, double, char, bool, std::string y const.",
        theory: `
          <p>C++ es un lenguaje de <strong>tipado estático</strong>: cuando creas una variable, debes indicar qué tipo de dato almacenará en memoria.</p>
          <h4>Tipos de datos fundamentales</h4>
          <table class="concept-table">
            <thead>
              <tr><th>Tipo</th><th>Uso</th><th>Ejemplo</th></tr>
            </thead>
            <tbody>
              <tr><td><code>int</code></td><td>Números enteros (positivos o negativos)</td><td><code>int edad = 21;</code></td></tr>
              <tr><td><code>double</code></td><td>Números con decimales de doble precisión</td><td><code>double precio = 19.99;</code></td></tr>
              <tr><td><code>char</code></td><td>Un único carácter (con comillas simples)</td><td><code>char letra = 'A';</code></td></tr>
              <tr><td><code>bool</code></td><td>Valor lógico: <code>true</code> (1) o <code>false</code> (0)</td><td><code>bool activo = true;</code></td></tr>
              <tr><td><code>std::string</code></td><td>Cadena de texto (requiere <code>#include &lt;string&gt;</code>)</td><td><code>std::string nombre = "Ana";</code></td></tr>
            </tbody>
          </table>
          <div class="callout callout-tip">
            <strong>Constantes (<code>const</code>):</strong> Si un valor no debe cambiar nunca durante el programa, antepón <code>const</code>, por ejemplo: <code>const double PI = 3.14159;</code>.
          </div>
        `,
        examples: [
          {
            title: "Declaración e impresión de variables",
            description: "Combina variables y texto encadenando el operador << en std::cout.",
            stdin: "",
            code: `#include <iostream>
#include <string>

int main() {
    std::string lenguaje = "C++17";
    int anioCreacion = 1985;
    double version = 17.0;
    char rango = 'S';

    std::cout << "Lenguaje: " << lenguaje << "\\n";
    std::cout << "Año original: " << anioCreacion << "\\n";
    std::cout << "Estándar actual: " << version << " | Rango: " << rango << "\\n";
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué diferencia hay entre comillas simples ('A') y comillas dobles (\"A\") en C++?",
            options: [
              "Son idénticas en C++",
              "'A' es un carácter individual (char) y \"A\" es una cadena de texto",
              "'A' es para números y \"A\" es para letras",
              "Las comillas simples no existen en C++"
            ],
            correctIndex: 1,
            explanation: "En C++, 'A' representa un único byte de tipo char, mientras que \"A\" es un literal de cadena de caracteres."
          },
          {
            question: "¿Qué palabra clave impide que una variable sea modificada después de inicializarse?",
            options: ["fixed", "static", "const", "immutable"],
            correctIndex: 2,
            explanation: "La palabra clave 'const' declara que el valor es constante y el compilador dará error si intentas reasignarlo."
          }
        ],
        challenge: {
          title: "Reto: Ficha de Personaje",
          description: "Declara tres variables: un <code>std::string nombre = \"Arthas\";</code>, un <code>int nivel = 10;</code> y un <code>int vida = 250;</code>.\nImprime en una sola línea el formato exacto:\n<code>Heroe: Arthas | Nivel: 10 | Vida: 250</code>",
          hint: "Encadena con <<: std::cout << \"Heroe: \" << nombre << \" | Nivel: \" << nivel << \" | Vida: \" << vida << \"\\n\";",
          defaultStdin: "",
          starterCode: `#include <iostream>
#include <string>

int main() {
    // Declara las variables nombre, nivel y vida e imprime el formato pedido
    
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>

int main() {
    std::string nombre = "Arthas";
    int nivel = 10;
    int vida = 250;
    std::cout << "Heroe: " << nombre << " | Nivel: " << nivel << " | Vida: " << vida << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "\\bint\\b", message: "Debes declarar variables de tipo int." },
            { regex: "string", message: "Debes utilizar std::string para el nombre." }
          ],
          testCases: [
            {
              description: "Formato exacto de la ficha de personaje",
              input: "",
              expectedOutput: "Heroe: Arthas | Nivel: 10 | Vida: 250"
            }
          ]
        }
      },
      {
        id: "les-1-3",
        title: "1.3 Entrada con std::cin y Operadores",
        level: "Nivel 0",
        xp: 130,
        summary: "Lee datos ingresados por el usuario con std::cin y realiza operaciones aritméticas.",
        theory: `
          <p>Para que un programa sea interactivo necesitamos leer datos de la entrada estándar usando <code>std::cin &gt;&gt; variable;</code> (observa que las flechas <code>&gt;&gt;</code> apuntan hacia la variable donde se guardará el dato).</p>
          <h4>Operadores Aritméticos</h4>
          <ul>
            <li><code>+</code> (Suma), <code>-</code> (Resta), <code>*</code> (Multiplicación)</li>
            <li><code>/</code> (División): <strong>¡Cuidado!</strong> Si divides dos enteros (<code>7 / 2</code>), el resultado será entero (<code>3</code>). Si quieres decimales, al menos uno debe ser <code>double</code> (<code>7.0 / 2</code> = <code>3.5</code>).</li>
            <li><code>%</code> (Módulo): Devuelve el <strong>resto</strong> de una división entera (ej. <code>10 % 3</code> es <code>1</code>). Muy útil para saber si un número es par (<code>n % 2 == 0</code>).</li>
          </ul>
        `,
        examples: [
          {
            title: "Lectura de dos números y cálculo",
            description: "Prueba cambiar los valores de la caja 'Entrada (stdin)' abajo a la derecha antes de ejecutar.",
            stdin: "12 5",
            code: `#include <iostream>

int main() {
    int a = 0, b = 0;
    std::cin >> a >> b;

    std::cout << "Suma: " << (a + b) << "\\n";
    std::cout << "Producto: " << (a * b) << "\\n";
    std::cout << "Resto (a % b): " << (a % b) << "\\n";
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Cuál es el resultado en C++ de la expresión entera: 9 / 2 ?",
            options: ["4.5", "4", "5", "Error de compilación"],
            correctIndex: 1,
            explanation: "Al ser ambos operandos de tipo int, C++ realiza división entera y trunca la parte decimal, dando 4."
          },
          {
            question: "¿Qué operador se usa con std::cin para extraer datos hacia una variable?",
            options: ["<<", ">>", "->", "::"],
            correctIndex: 1,
            explanation: "std::cin usa el operador de extracción >> (las flechas apuntan hacia la variable destino)."
          }
        ],
        challenge: {
          title: "Reto: Calculadora de Área y Perímetro",
          description: "Lee dos números enteros <code>base</code> y <code>altura</code> desde <code>std::cin</code>.\nImprime en la primera línea: <code>Area: X</code> (donde X es base * altura)\nY en la segunda línea: <code>Perimetro: Y</code> (donde Y es 2 * (base + altura)).",
          hint: "Usa std::cin >> base >> altura; y luego imprime ambas fórmulas sin textos adicionales antes de leer.",
          defaultStdin: "10 4",
          starterCode: `#include <iostream>

int main() {
    int base = 0, altura = 0;
    // Lee base y altura con std::cin y muestra Area y Perimetro
    
    return 0;
}`,
          solutionCode: `#include <iostream>

int main() {
    int base = 0, altura = 0;
    std::cin >> base >> altura;
    std::cout << "Area: " << (base * altura) << "\\n";
    std::cout << "Perimetro: " << 2 * (base + altura) << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "cin\\s*>>", message: "Debes leer los datos usando std::cin >>." }
          ],
          testCases: [
            {
              description: "Rectángulo de 10 x 4",
              input: "10 4",
              expectedOutput: "Area: 40\nPerimetro: 28"
            },
            {
              description: "Cuadrado de 7 x 7",
              input: "7 7",
              expectedOutput: "Area: 49\nPerimetro: 28"
            }
          ]
        }
      }
    ]
  },
  {
    moduleId: "mod-2",
    moduleTitle: "Módulo 2: Control de Flujo y Bucles",
    levelBadge: "Nivel Básico",
    lessons: [
      {
        id: "les-2-1",
        title: "2.1 Condicionales: if, else if, else",
        level: "Nivel Básico",
        xp: 140,
        summary: "Toma decisiones en tu programa usando operadores relacionales y lógicos.",
        theory: `
          <p>Las estructuras condicionales permiten que tu programa tome distintos caminos según se cumpla o no una condición booleana.</p>
          <h4>Operadores Relacionales y Lógicos</h4>
          <ul>
            <li>Comparación: <code>==</code> (igual a), <code>!=</code> (distinto de), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</li>
            <li>Lógicos:
              <ul>
                <li><code>&amp;&amp;</code> (AND / Y lógico): Verdadero solo si <strong>ambas</strong> condiciones son ciertas.</li>
                <li><code>||</code> (OR / O lógico): Verdadero si <strong>al menos una</strong> condición es cierta.</li>
                <li><code>!</code> (NOT / Negación): Invierte el valor booleano.</li>
              </ul>
            </li>
          </ul>
          <div class="callout callout-warning">
            <strong>Error clásico:</strong> No confundas <code>=</code> (asignar un valor) con <code>==</code> (comparar igualdad) dentro de un <code>if (...)</code>.
          </div>
        `,
        examples: [
          {
            title: "Clasificador de calificaciones",
            description: "Evalúa rangos usando if, else if y else junto al operador &&.",
            stdin: "88",
            code: `#include <iostream>

int main() {
    int nota = 0;
    std::cin >> nota;

    if (nota >= 90 && nota <= 100) {
        std::cout << "Calificación: Excelente (A)\\n";
    } else if (nota >= 70) {
        std::cout << "Calificación: Aprobado (B)\\n";
    } else {
        std::cout << "Calificación: Requiere repaso\\n";
    }
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué operador comprueba si dos valores son iguales en C++?",
            options: ["=", "==", "===", "equals"],
            correctIndex: 1,
            explanation: "El doble igual (==) compara igualdad, mientras que un solo igual (=) asigna un valor."
          },
          {
            question: "Si x = 5, ¿cuál es el resultado de: (x > 3 && x < 10)?",
            options: ["true", "false", "5", "Error de sintaxis"],
            correctIndex: 0,
            explanation: "Ambas subcondiciones (5 > 3 y 5 < 10) son verdaderas, por lo que el operador && devuelve true."
          }
        ],
        challenge: {
          title: "Reto: Detector de Números",
          description: "Lee un número entero <code>n</code> desde <code>std::cin</code>.\n- Si es mayor que 0, imprime <code>Positivo</code>\n- Si es menor que 0, imprime <code>Negativo</code>\n- Si es exactamente 0, imprime <code>Cero</code>",
          hint: "Usa if (n > 0), else if (n < 0) y else.",
          defaultStdin: "-15",
          starterCode: `#include <iostream>

int main() {
    int n = 0;
    std::cin >> n;
    // Escribe tu estructura if / else if / else aquí
    
    return 0;
}`,
          solutionCode: `#include <iostream>

int main() {
    int n = 0;
    std::cin >> n;
    if (n > 0) {
        std::cout << "Positivo\\n";
    } else if (n < 0) {
        std::cout << "Negativo\\n";
    } else {
        std::cout << "Cero\\n";
    }
    return 0;
}`,
          requiredSnippets: [
            { regex: "\\bif\\b", message: "Debes usar una estructura condicional 'if'." }
          ],
          testCases: [
            { description: "Número positivo", input: "42", expectedOutput: "Positivo" },
            { description: "Número negativo", input: "-15", expectedOutput: "Negativo" },
            { description: "Número cero", input: "0", expectedOutput: "Cero" }
          ]
        }
      },
      {
        id: "les-2-2",
        title: "2.2 Bucles: for, while y do-while",
        level: "Nivel Básico",
        xp: 150,
        summary: "Domina la repetición de código con bucles for y while sin caer en bucles infinitos.",
        theory: `
          <p>Los bucles permiten repetir un bloque de instrucciones de manera controlada:</p>
          <ul>
            <li><strong>Bucle <code>for</code>:</strong> Ideal cuando conoces de antemano cuántas veces quieres iterar.<br>
              <code>for (int i = 1; i &lt;= 5; i++) { ... }</code></li>
            <li><strong>Bucle <code>while</code>:</strong> Repite mientras la condición sea verdadera. Útil cuando el número de repeticiones depende de una condición dinámica.</li>
            <li><strong>Control interno:</strong> <code>break</code> termina el bucle inmediatamente; <code>continue</code> salta a la siguiente iteración.</li>
          </ul>
        `,
        examples: [
          {
            title: "Tabla de multiplicar con bucle for",
            description: "Genera la tabla del número ingresado en stdin.",
            stdin: "7",
            code: `#include <iostream>

int main() {
    int n = 0;
    std::cin >> n;

    for (int i = 1; i <= 5; i++) {
        std::cout << n << " x " << i << " = " << (n * i) << "\\n";
    }
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué hace la instrucción 'i++' al final de un bucle for?",
            options: [
              "Multiplica i por 2",
              "Incrementa el valor de la variable i en 1 unidad",
              "Reinicia i a 0",
              "Termina el bucle"
            ],
            correctIndex: 1,
            explanation: "El operador ++ incrementa en 1 el valor actual de la variable."
          }
        ],
        challenge: {
          title: "Reto: Suma Acumulada de 1 a N",
          description: "Lee un entero positivo <code>N</code> desde <code>std::cin</code>. Utilizando un bucle (<code>for</code> o <code>while</code>), calcula la suma de todos los números desde <code>1</code> hasta <code>N</code> (inclusive) e imprime únicamente el resultado numérico.",
          hint: "Crea una variable 'int suma = 0;' antes del bucle, y dentro del bucle haz 'suma += i;'.",
          defaultStdin: "5",
          starterCode: `#include <iostream>

int main() {
    int n = 0;
    std::cin >> n;
    
    // Calcula la suma de 1 hasta n usando un bucle
    
    return 0;
}`,
          solutionCode: `#include <iostream>

int main() {
    int n = 0;
    std::cin >> n;
    int suma = 0;
    for (int i = 1; i <= n; i++) {
        suma += i;
    }
    std::cout << suma << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "\\b(for|while)\\b", message: "Debes usar un bucle 'for' o 'while' para resolver el reto." }
          ],
          testCases: [
            { description: "Suma del 1 al 5 (1+2+3+4+5 = 15)", input: "5", expectedOutput: "15" },
            { description: "Suma del 1 al 10 (= 55)", input: "10", expectedOutput: "55" },
            { description: "Suma del 1 al 100 (= 5050)", input: "100", expectedOutput: "5050" }
          ]
        }
      }
    ]
  },
  {
    moduleId: "mod-3",
    moduleTitle: "Módulo 3: Funciones y Referencias",
    levelBadge: "Nivel Básico+",
    lessons: [
      {
        id: "les-3-1",
        title: "3.1 Funciones, Parámetros y Retorno",
        level: "Nivel Básico",
        xp: 160,
        summary: "Divide tu código en funciones modulares y reutilizables.",
        theory: `
          <p>Las funciones permiten dividir un problema grande en bloques pequeños, legibles y reutilizables.</p>
          <h4>Anatomía de una función</h4>
          <pre><code>tipo_retorno nombreFuncion(tipo1 param1, tipo2 param2) {
    // Cuerpo de la función
    return resultado;
}</code></pre>
          <p>Si una función realiza una acción pero <strong>no devuelve ningún valor</strong>, su tipo de retorno es <code>void</code>.</p>
          <div class="callout callout-info">
            <strong>Sobrecarga de funciones (Overloading):</strong> En C++ puedes tener dos funciones con el <strong>mismo nombre</strong> siempre que tengan diferentes tipos o cantidad de parámetros.
          </div>
        `,
        examples: [
          {
            title: "Funciones y sobrecarga en acción",
            description: "Observa cómo 'calcularArea' funciona tanto para cuadrados como para rectángulos.",
            stdin: "",
            code: `#include <iostream>

int calcularArea(int lado) {
    return lado * lado;
}

int calcularArea(int base, int altura) {
    return base * altura;
}

int main() {
    std::cout << "Cuadrado (lado 5): " << calcularArea(5) << "\\n";
    std::cout << "Rectángulo (4x6): " << calcularArea(4, 6) << "\\n";
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué tipo de retorno debe tener una función que NO devuelve ningún valor?",
            options: ["null", "empty", "void", "int"],
            correctIndex: 2,
            explanation: "'void' indica en C++ que la función no retorna ningún dato."
          }
        ],
        challenge: {
          title: "Reto: Función esPar y Mayor",
          description: "Crea una función llamada <code>int maximo(int a, int b)</code> que reciba dos enteros y devuelva el mayor de los dos.\nEn <code>main()</code>, lee dos enteros desde <code>std::cin</code>, llama a <code>maximo(a, b)</code> e imprime el resultado.",
          hint: "Dentro de maximo(int a, int b), puedes usar: return (a > b) ? a : b;",
          defaultStdin: "18 42",
          starterCode: `#include <iostream>

// Define aquí tu función int maximo(int a, int b)


int main() {
    int x = 0, y = 0;
    std::cin >> x >> y;
    std::cout << maximo(x, y) << "\\n";
    return 0;
}`,
          solutionCode: `#include <iostream>

int maximo(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int x = 0, y = 0;
    std::cin >> x >> y;
    std::cout << maximo(x, y) << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "int\\s+maximo\\s*\\(", message: "Debes definir la función 'int maximo(int a, int b)'." }
          ],
          testCases: [
            { description: "18 y 42 -> 42", input: "18 42", expectedOutput: "42" },
            { description: "99 y -5 -> 99", input: "99 -5", expectedOutput: "99" }
          ]
        }
      },
      {
        id: "les-3-2",
        title: "3.2 Paso por Valor vs. Paso por Referencia (&)",
        level: "Transición a Medio",
        xp: 180,
        summary: "Uno de los conceptos más importantes de C++: evita copias innecesarias y modifica variables originales con &.",
        theory: `
          <p>En C++, por defecto los argumentos se pasan <strong>por valor</strong> (se crea una copia temporal). Cualquier cambio dentro de la función no afecta a la variable original en <code>main()</code>.</p>
          <h4>Paso por Referencia (<code>&amp;</code>)</h4>
          <p>Al añadir un ampersand <code>&amp;</code> al tipo del parámetro (ej. <code>void duplicar(int &amp;n)</code>), la función recibe una <strong>referencia directa</strong> a la variable original:</p>
          <ul>
            <li>Permite modificar la variable original desde la función.</li>
            <li>Evita copiar objetos pesados en memoria (como grandes vectores o textos largos) usando <code>const std::string &amp;texto</code>.</li>
          </ul>
        `,
        examples: [
          {
            title: "Intercambio (Swap) usando referencias",
            description: "Sin el símbolo & en los parámetros, los valores en main() no se intercambiarían.",
            stdin: "",
            code: `#include <iostream>

void intercambiar(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 99;
    intercambiar(x, y);
    std::cout << "x = " << x << ", y = " << y << "\\n";
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Para qué se usa 'const std::string &nombre' como parámetro de una función?",
            options: [
              "Para borrar el string al terminar la función",
              "Para evitar copiar el string en memoria sin permitir que la función lo modifique",
              "Para convertir un entero en texto",
              "No es válido usar const y & juntos"
            ],
            correctIndex: 1,
            explanation: "Pasar por referencia constante (const T&) es una práctica estándar en C++: combina velocidad (cero copias) con seguridad (inmutabilidad)."
          }
        ],
        challenge: {
          title: "Reto: Triplicar por Referencia",
          description: "Implementa la función <code>void triplicar(int &amp;numero)</code> que multiplique por 3 la variable recibida por referencia.\nEn <code>main()</code> ya se lee <code>n</code>, se llama a <code>triplicar(n)</code> y se imprime el nuevo valor.",
          hint: "Dentro de void triplicar(int &numero) simplemente haz: numero = numero * 3;",
          defaultStdin: "9",
          starterCode: `#include <iostream>

// Implementa void triplicar(int &numero) aquí


int main() {
    int n = 0;
    std::cin >> n;
    triplicar(n);
    std::cout << n << "\\n";
    return 0;
}`,
          solutionCode: `#include <iostream>

void triplicar(int &numero) {
    numero *= 3;
}

int main() {
    int n = 0;
    std::cin >> n;
    triplicar(n);
    std::cout << n << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "void\\s+triplicar\\s*\\(\\s*int\\s*&", message: "La función debe recibir el parámetro por referencia: void triplicar(int &numero)." }
          ],
          testCases: [
            { description: "Triplicar 9 -> 27", input: "9", expectedOutput: "27" },
            { description: "Triplicar -4 -> -12", input: "-4", expectedOutput: "-12" }
          ]
        }
      }
    ]
  },
  {
    moduleId: "mod-4",
    moduleTitle: "Módulo 4: Arreglos y std::vector",
    levelBadge: "Transición a Medio",
    lessons: [
      {
        id: "les-4-1",
        title: "4.1 std::vector: Arreglos Dinámicos Modernos",
        level: "Transición a Medio",
        xp: 180,
        summary: "Aprende a manejar colecciones dinámicas con std::vector y el bucle for basado en rangos.",
        theory: `
          <p>En el C++ moderno, en lugar de usar arreglos estáticos antiguos de C (<code>int arr[10]</code>), la herramienta recomendada es <code>std::vector</code> (de la librería <code>#include &lt;vector&gt;</code>).</p>
          <h4>Operaciones esenciales de <code>std::vector&lt;T&gt;</code></h4>
          <ul>
            <li><code>std::vector&lt;int&gt; datos = {10, 20, 30};</code>: Crea un vector de enteros.</li>
            <li><code>datos.push_back(40);</code>: Añade un elemento al final creciendo automáticamente.</li>
            <li><code>datos.size()</code>: Devuelve la cantidad de elementos.</li>
            <li><code>datos[i]</code> o <code>datos.at(i)</code>: Accede al elemento en la posición <code>i</code> (empezando en índice <code>0</code>).</li>
          </ul>
          <div class="callout callout-tip">
            <strong>For basado en rangos (C++11+):</strong> Puedes recorrer cualquier vector de forma limpia con:<br>
            <code>for (int valor : datos) { std::cout &lt;&lt; valor &lt;&lt; " "; }</code>
          </div>
        `,
        examples: [
          {
            title: "Uso de std::vector y bucle por rango",
            description: "Almacena elementos dinámicamente y calcula su promedio.",
            stdin: "",
            code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> puntos = {15, 25, 30};
    puntos.push_back(50);

    int total = 0;
    for (int p : puntos) {
        total += p;
    }

    std::cout << "Cantidad de elementos: " << puntos.size() << "\\n";
    std::cout << "Suma total: " << total << "\\n";
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué método añade un nuevo elemento al final de un std::vector?",
            options: ["add()", "append()", "push_back()", "insert_end()"],
            correctIndex: 2,
            explanation: "push_back() inserta un elemento al final del vector, redimensionándolo automáticamente si es necesario."
          },
          {
            question: "Si un vector tiene 4 elementos, ¿cuál es el índice del primer y del último elemento?",
            options: ["1 y 4", "0 y 3", "0 y 4", "1 y 3"],
            correctIndex: 1,
            explanation: "En C++ la indexación comienza en 0, por lo que 4 elementos ocupan los índices 0, 1, 2 y 3."
          }
        ],
        challenge: {
          title: "Reto: Filtrar Números Pares con std::vector",
          description: "El programa recibe un entero <code>N</code> seguido de <code>N</code> números enteros. Guárdalos en un <code>std::vector&lt;int&gt;</code> y luego imprime en una sola línea (separados por un espacio) únicamente los números que sean <strong>pares</strong> (<code>num % 2 == 0</code>).",
          hint: "Lee N, haz un bucle para leer cada número y meterlo al vector con push_back(), y luego recórrelo imprimiendo si (x % 2 == 0).",
          defaultStdin: "6\n3 8 11 14 2 9",
          starterCode: `#include <iostream>
#include <vector>

int main() {
    int n = 0;
    std::cin >> n;
    std::vector<int> numeros;

    // 1. Lee los n números y agrégalos al vector con push_back
    
    // 2. Recorre el vector e imprime solo los pares separados por espacio
    
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>

int main() {
    int n = 0;
    std::cin >> n;
    std::vector<int> numeros;

    for (int i = 0; i < n; i++) {
        int valor = 0;
        std::cin >> valor;
        numeros.push_back(valor);
    }

    bool primero = true;
    for (int x : numeros) {
        if (x % 2 == 0) {
            if (!primero) std::cout << " ";
            std::cout << x;
            primero = false;
        }
    }
    std::cout << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "vector\\s*<\\s*int\\s*>", message: "Debes usar std::vector<int>." },
            { regex: "push_back", message: "Usa el método .push_back() para agregar los elementos." }
          ],
          testCases: [
            { description: "Lista mixta de 6 números", input: "6\n3 8 11 14 2 9", expectedOutput: "8 14 2" },
            { description: "Números negativos y cero", input: "4\n-4 5 0 7", expectedOutput: "-4 0" }
          ]
        }
      },
      {
        id: "les-4-2",
        title: "4.2 Manipulación Avanzada de std::string",
        level: "Transición a Medio",
        xp: 170,
        summary: "Domina métodos de cadenas: length(), substr(), find(), getline() y recorrido de caracteres.",
        theory: `
          <p>En C++, <code>std::string</code> se comporta de forma muy parecida a un <code>std::vector&lt;char&gt;</code> con superpoderes para texto.</p>
          <h4>Operaciones clave con <code>std::string</code></h4>
          <ul>
            <li><code>std::getline(std::cin, texto);</code>: Lee una línea completa incluyendo espacios (a diferencia de <code>std::cin &gt;&gt; texto</code> que se detiene en el primer espacio).</li>
            <li><code>texto.length()</code> o <code>texto.size()</code>: Cantidad de caracteres.</li>
            <li><code>texto.substr(inicio, longitud)</code>: Extrae una subcadena.</li>
            <li><code>texto.find("palabra")</code>: Busca una subcadena (devuelve <code>std::string::npos</code> si no existe).</li>
          </ul>
        `,
        examples: [
          {
            title: "Análisis de una frase con getline",
            description: "Lee una línea con espacios y cuenta cuántas vocales tiene.",
            stdin: "Programar en C++ es genial",
            code: `#include <iostream>
#include <string>
#include <cctype>

int main() {
    std::string frase;
    std::getline(std::cin, frase);

    int vocales = 0;
    for (char c : frase) {
        char min = std::tolower(c);
        if (min == 'a' || min == 'e' || min == 'i' || min == 'o' || min == 'u') {
            vocales++;
        }
    }

    std::cout << "Longitud: " << frase.length() << "\\n";
    std::cout << "Vocales: " << vocales << "\\n";
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Por qué usamos std::getline(std::cin, texto) en lugar de std::cin >> texto cuando queremos leer una frase?",
            options: [
              "Porque std::cin >> no funciona con std::string",
              "Porque std::cin >> detiene la lectura al encontrar el primer espacio en blanco",
              "Porque getline convierte todo a mayúsculas",
              "Porque getline es más rápido para números"
            ],
            correctIndex: 1,
            explanation: "El operador >> separa por espacios en blanco, mientras que std::getline lee toda la línea hasta el salto de línea."
          }
        ],
        challenge: {
          title: "Reto: Invertir una Palabra",
          description: "Lee una palabra sin espacios desde <code>std::cin</code> e imprímela completamente al revés (invertida).",
          hint: "Puedes recorrer el string desde el último índice (palabra.length() - 1) hasta 0 usando un bucle for.",
          defaultStdin: "Algoritmo",
          starterCode: `#include <iostream>
#include <string>

int main() {
    std::string palabra;
    std::cin >> palabra;
    
    // Imprime la palabra al revés
    
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>

int main() {
    std::string palabra;
    std::cin >> palabra;
    for (int i = static_cast<int>(palabra.length()) - 1; i >= 0; i--) {
        std::cout << palabra[i];
    }
    std::cout << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "string", message: "Debes usar std::string." }
          ],
          testCases: [
            { description: "Algoritmo -> omithoglA", input: "Algoritmo", expectedOutput: "omtiroglA" },
            { description: "radar -> radar", input: "radar", expectedOutput: "radar" }
          ]
        }
      }
    ]
  },
  {
    moduleId: "mod-5",
    moduleTitle: "Módulo 5: Punteros y Memoria (Nivel Medio)",
    levelBadge: "Nivel Medio",
    lessons: [
      {
        id: "les-5-1",
        title: "5.1 Punteros (*), Direcciones (&) y nullptr",
        level: "Nivel Medio",
        xp: 200,
        summary: "Entiende qué es la memoria RAM, cómo obtener direcciones con & y cómo desreferenciar punteros con *.",
        theory: `
          <p>¡Bienvenido al <strong>Nivel Medio</strong>! Los punteros son una de las herramientas que dan a C++ su control directo sobre el hardware.</p>
          <h4>¿Qué es un puntero?</h4>
          <p>Un <strong>puntero</strong> es una variable que almacena la <strong>dirección de memoria</strong> de otra variable.</p>
          <ul>
            <li><strong>Operador Dirección (<code>&amp;</code>):</strong> <code>&amp;x</code> devuelve la dirección de memoria donde vive <code>x</code>.</li>
            <li><strong>Declaración de puntero (<code>*</code>):</strong> <code>int *ptr = &amp;x;</code> declara un puntero a entero que apunta a <code>x</code>.</li>
            <li><strong>Operador Desreferencia (<code>*</code>):</strong> <code>*ptr</code> accede o modifica el valor guardado en esa dirección de memoria.</li>
            <li><strong><code>nullptr</code>:</strong> Representa un puntero que no apunta a ninguna dirección válida (nunca desreferencies un <code>nullptr</code>).</li>
          </ul>
        `,
        examples: [
          {
            title: "Punteros y desreferenciación",
            description: "Observa cómo modificar *ptr cambia automáticamente el valor de la variable original.",
            stdin: "",
            code: `#include <iostream>

int main() {
    int energia = 100;
    int *ptr = &energia; // ptr guarda la dirección de 'energia'

    std::cout << "Valor original: " << energia << "\\n";
    std::cout << "Dirección en memoria: " << ptr << "\\n";

    // Modificamos el valor a través del puntero
    *ptr = 250;

    std::cout << "Nuevo valor de energia: " << energia << "\\n";
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "Si tenemos 'int x = 10; int *p = &x;', ¿qué expresión nos da el valor 10 usando el puntero?",
            options: ["p", "&p", "*p", "x->p"],
            correctIndex: 2,
            explanation: "El operador de desreferencia (*p) accede al valor almacenado en la dirección a la que apunta p."
          },
          {
            question: "¿Qué palabra clave de C++ moderno se usa para inicializar un puntero que aún no apunta a nada?",
            options: ["NULL_PTR", "nullptr", "void", "none"],
            correctIndex: 1,
            explanation: "Introducido en C++11, 'nullptr' es el literal de puntero nulo con seguridad de tipos."
          }
        ],
        challenge: {
          title: "Reto: Sumar a través de Punteros",
          description: "Implementa la función <code>void agregarBonus(int *puntos, int bonus)</code> que recibe un puntero a entero y le suma el valor de <code>bonus</code> a la variable apuntada (si el puntero no es <code>nullptr</code>).",
          hint: "Comprueba 'if (puntos != nullptr)' y luego haz '*puntos += bonus;'.",
          defaultStdin: "100 35",
          starterCode: `#include <iostream>

void agregarBonus(int *puntos, int bonus) {
    // Suma 'bonus' al valor apuntado por 'puntos'
    
}

int main() {
    int score = 0, extra = 0;
    std::cin >> score >> extra;
    agregarBonus(&score, extra);
    std::cout << score << "\\n";
    return 0;
}`,
          solutionCode: `#include <iostream>

void agregarBonus(int *puntos, int bonus) {
    if (puntos != nullptr) {
        *puntos += bonus;
    }
}

int main() {
    int score = 0, extra = 0;
    std::cin >> score >> extra;
    agregarBonus(&score, extra);
    std::cout << score << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "\\*\\s*puntos", message: "Debes desreferenciar el puntero usando *puntos." }
          ],
          testCases: [
            { description: "100 + bonus de 35 = 135", input: "100 35", expectedOutput: "135" },
            { description: "50 + bonus de -10 = 40", input: "50 -10", expectedOutput: "40" }
          ]
        }
      },
      {
        id: "les-5-2",
        title: "5.2 Memoria Dinámica y Smart Pointers",
        level: "Nivel Medio",
        xp: 220,
        summary: "Comprende el Stack vs. Heap y gestiona memoria de forma segura con std::unique_ptr.",
        theory: `
          <p>En C++ existen dos zonas principales de memoria:</p>
          <ul>
            <li><strong>Stack (Pila):</strong> Memoria automática y ultrarrápida donde viven las variables locales. Se libera sola al salir de la función (<code>{}</code>).</li>
            <li><strong>Heap (Montículo):</strong> Memoria dinámica para objetos cuyo tamaño o tiempo de vida se decide en tiempo de ejecución.</li>
          </ul>
          <h4>De <code>new</code> / <code>delete</code> a Punteros Inteligentes (<code>&lt;memory&gt;</code>)</h4>
          <p>Antiguamente se usaba <code>new</code> y <code>delete</code> manualmente, lo cual causaba fugas de memoria (<em>memory leaks</em>) si olvidabas hacer <code>delete</code>. En C++ moderno (C++14/17/20) usamos <strong>Smart Pointers</strong>:</p>
          <ul>
            <li><code>std::unique_ptr&lt;T&gt;</code>: Propietario único del recurso. Libera la memoria automáticamente cuando sale de alcance (RAII). Se crea con <code>std::make_unique&lt;T&gt;(...)</code>.</li>
            <li><code>std::shared_ptr&lt;T&gt;</code>: Permite propiedad compartida mediante conteo de referencias.</li>
          </ul>
        `,
        examples: [
          {
            title: "Puntero inteligente std::unique_ptr",
            description: "Crea un objeto en el Heap sin preocuparte por fugas de memoria.",
            stdin: "",
            code: `#include <iostream>
#include <memory>

struct Sensor {
    int id;
    double lectura;
    Sensor(int i, double l) : id(i), lectura(l) {
        std::cout << "[Sensor " << id << " creado en Heap]\\n";
    }
    ~Sensor() {
        std::cout << "[Sensor " << id << " liberado automáticamente]\\n";
    }
};

int main() {
    auto s = std::make_unique<Sensor>(1, 36.5);
    std::cout << "Lectura actual: " << s->lectura << " °C\\n";
    return 0; // Aquí el destructor ~Sensor() se ejecuta solo
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué ventaja principal tiene std::unique_ptr frente a usar un puntero crudo con 'new'?",
            options: [
              "Hace que el procesador corra al doble de GHz",
              "Libera automáticamente la memoria dinámica cuando el puntero sale de su ámbito (evitando memory leaks)",
              "Permite usar variables sin declararlas",
              "No requiere incluir ninguna cabecera"
            ],
            correctIndex: 1,
            explanation: "std::unique_ptr aplica el principio RAII: cuando la variable sale de alcance, su destructor libera automáticamente la memoria del Heap."
          }
        ],
        challenge: {
          title: "Reto: Gestión Segura con std::make_unique",
          description: "Usa <code>std::make_unique&lt;int&gt;(valor)</code> (de la cabecera <code>&lt;memory&gt;</code>) para alojar un entero en el Heap con el número leído desde <code>std::cin</code>, multiplícalo por 2 desreferenciándolo (<code>*ptr *= 2</code>) e imprime el resultado.",
          hint: "auto ptr = std::make_unique<int>(n); *ptr *= 2; std::cout << *ptr;",
          defaultStdin: "24",
          starterCode: `#include <iostream>
#include <memory>

int main() {
    int n = 0;
    std::cin >> n;
    
    // Crea un std::unique_ptr<int> usando std::make_unique<int>(n), duplica su valor e imprímelo
    
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <memory>

int main() {
    int n = 0;
    std::cin >> n;
    auto ptr = std::make_unique<int>(n);
    *ptr *= 2;
    std::cout << *ptr << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "make_unique", message: "Debes usar std::make_unique<int> para crear el puntero inteligente." }
          ],
          testCases: [
            { description: "24 duplicado en Heap -> 48", input: "24", expectedOutput: "48" },
            { description: "150 duplicado en Heap -> 300", input: "150", expectedOutput: "300" }
          ]
        }
      }
    ]
  },
  {
    moduleId: "mod-6",
    moduleTitle: "Módulo 6: Programación Orientada a Objetos (POO)",
    levelBadge: "Nivel Medio",
    lessons: [
      {
        id: "les-6-1",
        title: "6.1 Clases, Atributos, Métodos y Constructores",
        level: "Nivel Medio",
        xp: 220,
        summary: "Modela entidades del mundo real mediante class, constructores y encapsulamiento (private/public).",
        theory: `
          <p>La <strong>Programación Orientada a Objetos (POO)</strong> organiza el software en torno a <strong>Clases</strong> (moldes) y <strong>Objetos</strong> (instancias).</p>
          <h4>Componentes de una Clase en C++</h4>
          <ul>
            <li><code>private:</code> Miembros accesibles únicamente desde dentro de la propia clase (protege el estado interno).</li>
            <li><code>public:</code> Interfaz pública accesible desde fuera de la clase.</li>
            <li><strong>Constructor:</strong> Método especial con el mismo nombre de la clase que inicializa el objeto al crearse.</li>
          </ul>
          <pre><code>class CuentaBancaria {
private:
    double saldo;
public:
    CuentaBancaria(double inicial) : saldo(inicial) {}
    void depositar(double monto) { saldo += monto; }
    double obtenerSaldo() const { return saldo; }
};</code></pre>
        `,
        examples: [
          {
            title: "Clase CuentaBancaria con encapsulamiento",
            description: "Observa la lista de inicialización del constructor y el método const.",
            stdin: "",
            code: `#include <iostream>
#include <string>

class CuentaBancaria {
private:
    std::string titular;
    double saldo;

public:
    CuentaBancaria(std::string t, double s) : titular(t), saldo(s) {}

    void depositar(double monto) {
        if (monto > 0) saldo += monto;
    }

    void mostrar() const {
        std::cout << "Titular: " << titular << " | Saldo: $" << saldo << "\\n";
    }
};

int main() {
    CuentaBancaria cuenta("Lucia", 500.0);
    cuenta.depositar(250.0);
    cuenta.mostrar();
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "En una 'class' de C++, si no especificas 'public:' ni 'private:', ¿cuál es la visibilidad por defecto?",
            options: ["public", "private", "protected", "global"],
            correctIndex: 1,
            explanation: "En una 'class' los miembros son privados (private) por defecto; en un 'struct' son públicos (public) por defecto."
          },
          {
            question: "¿Qué significa la palabra 'const' al final de un método como 'int getEdad() const'?",
            options: [
              "Que el método solo puede llamarse una vez",
              "Que el método promete no modificar ningún atributo del objeto",
              "Que el método es privado",
              "Que el objeto se destruye al terminar"
            ],
            correctIndex: 1,
            explanation: "Un método calificado con 'const' garantiza al compilador que no alterará el estado interno del objeto."
          }
        ],
        challenge: {
          title: "Reto: Clase Rectangulo",
          description: "Completa la clase <code>Rectangulo</code> con atributos privados <code>int ancho</code> e <code>int alto</code>, un constructor <code>Rectangulo(int a, int h)</code> y un método público <code>int area() const</code> que devuelva <code>ancho * alto</code>.",
          hint: "En public: añade Rectangulo(int a, int h) : ancho(a), alto(h) {} y luego int area() const { return ancho * alto; }",
          defaultStdin: "8 6",
          starterCode: `#include <iostream>

class Rectangulo {
private:
    int ancho;
    int alto;

public:
    // Define aquí el constructor Rectangulo(int a, int h) y el método area()
    
};

int main() {
    int a = 0, h = 0;
    std::cin >> a >> h;
    Rectangulo r(a, h);
    std::cout << r.area() << "\\n";
    return 0;
}`,
          solutionCode: `#include <iostream>

class Rectangulo {
private:
    int ancho;
    int alto;

public:
    Rectangulo(int a, int h) : ancho(a), alto(h) {}

    int area() const {
        return ancho * alto;
    }
};

int main() {
    int a = 0, h = 0;
    std::cin >> a >> h;
    Rectangulo r(a, h);
    std::cout << r.area() << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "class\\s+Rectangulo", message: "Debes mantener la definición de class Rectangulo." },
            { regex: "area\\s*\\(", message: "Debes definir el método area()." }
          ],
          testCases: [
            { description: "Rectángulo de 8x6 -> 48", input: "8 6", expectedOutput: "48" },
            { description: "Rectángulo de 12x10 -> 120", input: "12 10", expectedOutput: "120" }
          ]
        }
      },
      {
        id: "les-6-2",
        title: "6.2 Herencia y Polimorfismo (virtual / override)",
        level: "Nivel Medio",
        xp: 250,
        summary: "Crea jerarquías de clases reutilizables y aplica polimorfismo dinámico con métodos virtuales.",
        theory: `
          <p>La <strong>Herencia</strong> permite que una clase hija (derivada) herede atributos y métodos de una clase base:</p>
          <pre><code>class Animal {
public:
    virtual void hablar() const {
        std::cout &lt;&lt; "Sonido genérico\\n";
    }
    virtual ~Animal() = default;
};

class Perro : public Animal {
public:
    void hablar() const override {
        std::cout &lt;&lt; "Guau!\\n";
    }
};</code></pre>
          <ul>
            <li><code>protected:</code> Accesible desde la clase base y sus clases hijas, pero no desde fuera.</li>
            <li><code>virtual</code>: Indica que el método puede ser redefinido por clases hijas (polimorfismo).</li>
            <li><code>override</code>: Verifica en tiempo de compilación que realmente estás sobrescribiendo un método virtual de la clase base.</li>
          </ul>
        `,
        examples: [
          {
            title: "Polimorfismo con clases derivadas",
            description: "Un vector de punteros a la clase base ejecuta el método específico de cada subclase.",
            stdin: "",
            code: `#include <iostream>
#include <vector>
#include <memory>

class Personaje {
public:
    virtual void atacar() const {
        std::cout << "Ataque básico\\n";
    }
    virtual ~Personaje() = default;
};

class Mago : public Personaje {
public:
    void atacar() const override {
        std::cout << "Lanza bola de fuego!\\n";
    }
};

class Arquero : public Personaje {
public:
    void atacar() const override {
        std::cout << "Dispara flecha precisa!\\n";
    }
};

int main() {
    std::vector<std::unique_ptr<Personaje>> equipo;
    equipo.push_back(std::make_unique<Mago>());
    equipo.push_back(std::make_unique<Arquero>());

    for (const auto &miembro : equipo) {
        miembro->atacar();
    }
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué palabra clave en la clase derivada confirma que estamos sobrescribiendo un método virtual de la clase base?",
            options: ["virtual", "extends", "override", "super"],
            correctIndex: 2,
            explanation: "'override' (C++11) asegura que el método coincide con la firma de un método virtual de la clase base."
          }
        ],
        challenge: {
          title: "Reto: Jerarquía de Empleados",
          description: "Tienes una clase base <code>Empleado</code> con un método virtual <code>int calcularSueldo() const</code> que devuelve <code>1000</code>.\nCrea una clase derivada <code>Gerente : public Empleado</code> que sobrescriba (<code>override</code>) <code>calcularSueldo() const</code> para devolver <code>2500</code>.",
          hint: "class Gerente : public Empleado { public: int calcularSueldo() const override { return 2500; } };",
          defaultStdin: "",
          starterCode: `#include <iostream>

class Empleado {
public:
    virtual int calcularSueldo() const {
        return 1000;
    }
    virtual ~Empleado() = default;
};

// Crea aquí la clase Gerente que hereda públicamente de Empleado


int main() {
    Empleado emp;
    Gerente ger;
    Empleado &refPolimorfica = ger;
    std::cout << emp.calcularSueldo() << " " << refPolimorfica.calcularSueldo() << "\\n";
    return 0;
}`,
          solutionCode: `#include <iostream>

class Empleado {
public:
    virtual int calcularSueldo() const {
        return 1000;
    }
    virtual ~Empleado() = default;
};

class Gerente : public Empleado {
public:
    int calcularSueldo() const override {
        return 2500;
    }
};

int main() {
    Empleado emp;
    Gerente ger;
    Empleado &refPolimorfica = ger;
    std::cout << emp.calcularSueldo() << " " << refPolimorfica.calcularSueldo() << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "class\\s+Gerente\\s*:\\s*public\\s+Empleado", message: "Gerente debe heredar públicamente de Empleado (class Gerente : public Empleado)." },
            { regex: "override", message: "Utiliza la palabra clave override en calcularSueldo()." }
          ],
          testCases: [
            { description: "Sueldo Empleado (1000) y Gerente polimórfico (2500)", input: "", expectedOutput: "1000 2500" }
          ]
        }
      }
    ]
  },
  {
    moduleId: "mod-7",
    moduleTitle: "Módulo 7: Plantillas (Templates) y STL",
    levelBadge: "Nivel Medio",
    lessons: [
      {
        id: "les-7-1",
        title: "7.1 Plantillas (Templates) Genéricas",
        level: "Nivel Medio",
        xp: 230,
        summary: "Escribe funciones y clases capaces de trabajar con cualquier tipo de dato usando template <typename T>.",
        theory: `
          <p>Las <strong>Plantillas (Templates)</strong> permiten programar de forma genérica sin duplicar código para <code>int</code>, <code>double</code> o <code>std::string</code>.</p>
          <pre><code>template &lt;typename T&gt;
T obtenerMayor(T a, T b) {
    return (a &gt; b) ? a : b;
}</code></pre>
          <p>El compilador genera automáticamente la versión exacta de la función según el tipo de argumento con el que la llames.</p>
        `,
        examples: [
          {
            title: "Función genérica con template <typename T>",
            description: "Una sola función sirve para enteros, decimales y strings.",
            stdin: "",
            code: `#include <iostream>
#include <string>

template <typename T>
void mostrarPar(const T &primero, const T &segundo) {
    std::cout << "[" << primero << " , " << segundo << "]\\n";
}

int main() {
    mostrarPar(10, 20);
    mostrarPar(3.14, 2.71);
    mostrarPar(std::string("Hola"), std::string("Mundo"));
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué sintaxis se coloca antes de una función para convertirla en una plantilla genérica?",
            options: [
              "generic <T>",
              "template <typename T>",
              "any <type T>",
              "#define T"
            ],
            correctIndex: 1,
            explanation: "'template <typename T>' (o 'template <class T>') declara un parámetro de tipo genérico en C++."
          }
        ],
        challenge: {
          title: "Reto: Plantilla sumarValores<T>",
          description: "Crea una función plantilla <code>template &lt;typename T&gt; T sumar(T a, T b)</code> que retorne <code>a + b</code>.\nEl programa principal la probará tanto con enteros como con números decimales (<code>double</code>).",
          hint: "Escribe template <typename T> T sumar(T a, T b) { return a + b; }",
          defaultStdin: "",
          starterCode: `#include <iostream>

// Escribe aquí tu función template <typename T> T sumar(T a, T b)


int main() {
    std::cout << sumar(15, 27) << "\\n";
    std::cout << sumar(2.5, 4.25) << "\\n";
    return 0;
}`,
          solutionCode: `#include <iostream>

template <typename T>
T sumar(T a, T b) {
    return a + b;
}

int main() {
    std::cout << sumar(15, 27) << "\\n";
    std::cout << sumar(2.5, 4.25) << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "template\\s*<\\s*(typename|class)\\s+\\w+\\s*>", message: "Debes usar 'template <typename T>'." }
          ],
          testCases: [
            { description: "Suma entera (42) y decimal (6.75)", input: "", expectedOutput: "42\n6.75" }
          ]
        }
      },
      {
        id: "les-7-2",
        title: "7.2 Contenedores STL (std::map) y Algoritmos (std::sort)",
        level: "Nivel Medio",
        xp: 260,
        summary: "Domina los diccionarios clave-valor (std::map), algoritmos de ordenamiento y funciones Lambda.",
        theory: `
          <p>La <strong>STL (Standard Template Library)</strong> es la joya de C++. Se divide en Contenedores, Iteradores y Algoritmos:</p>
          <ul>
            <li><strong><code>std::map&lt;Clave, Valor&gt;</code> (<code>&lt;map&gt;</code>):</strong> Diccionario ordenado que asocia claves únicas con valores (ej. <code>edades["Ana"] = 25;</code>).</li>
            <li><strong><code>std::set&lt;T&gt;</code> (<code>&lt;set&gt;</code>):</strong> Conjunto de elementos únicos y ordenados automáticamente.</li>
            <li><strong><code>std::sort(v.begin(), v.end())</code> (<code>&lt;algorithm&gt;</code>):</strong> Ordena un vector en tiempo $O(N \\log N)$.</li>
            <li><strong>Expresiones Lambda:</strong> Funciones anónimas en línea: <code>[](int a, int b) { return a &gt; b; }</code>.</li>
          </ul>
        `,
        examples: [
          {
            title: "std::map y std::sort con Lambda",
            description: "Ordena un vector de mayor a menor usando una función lambda y consulta un mapa.",
            stdin: "",
            code: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>

int main() {
    std::vector<int> niveles = {42, 10, 99, 25, 60};

    // Ordenar de mayor a menor con una expresión lambda
    std::sort(niveles.begin(), niveles.end(), [](int a, int b) {
        return a > b;
    });

    std::cout << "Ranking: ";
    for (int n : niveles) std::cout << n << " ";
    std::cout << "\\n";

    std::map<std::string, int> inventario;
    inventario["Pocion"] = 5;
    inventario["Espada"] = 1;

    for (const auto &par : inventario) {
        std::cout << par.first << ": " << par.second << "\\n";
    }
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué complejidad tiene std::sort() en la librería estándar <algorithm>?",
            options: ["O(N^2)", "O(N log N)", "O(1)", "O(2^N)"],
            correctIndex: 1,
            explanation: "std::sort utiliza Introsort (híbrido de Quicksort, Heapsort e Insertion Sort) garantizando O(N log N) en el peor caso."
          }
        ],
        challenge: {
          title: "Reto: Ordenar Puntuaciones con std::sort",
          description: "Lee un entero <code>N</code> seguido de <code>N</code> números enteros. Guárdalos en un <code>std::vector&lt;int&gt;</code>, ordénalos de <strong>menor a mayor</strong> usando <code>std::sort(v.begin(), v.end())</code> e imprímelos separados por un espacio.",
          hint: "Incluye <algorithm>, llama a std::sort(v.begin(), v.end()); y luego imprime los elementos.",
          defaultStdin: "5\n50 10 40 20 30",
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    int n = 0;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) {
        std::cin >> v[i];
    }

    // Ordena el vector con std::sort e imprímelo separado por espacios
    
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    int n = 0;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) {
        std::cin >> v[i];
    }

    std::sort(v.begin(), v.end());

    for (int i = 0; i < n; i++) {
        if (i > 0) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "sort\\s*\\(", message: "Debes usar std::sort() para ordenar el vector." }
          ],
          testCases: [
            { description: "Ordena 5 números", input: "5\n50 10 40 20 30", expectedOutput: "10 20 30 40 50" },
            { description: "Ordena con negativos", input: "4\n9 -3 0 2", expectedOutput: "-3 0 2 9" }
          ]
        }
      }
    ]
  },
  {
    moduleId: "mod-8",
    moduleTitle: "Módulo 8: Excepciones, Archivos y Proyecto Final",
    levelBadge: "Graduación Nivel Medio",
    lessons: [
      {
        id: "les-8-1",
        title: "8.1 Manejo de Excepciones (try, catch, throw) y Archivos",
        level: "Nivel Medio",
        xp: 260,
        summary: "Maneja errores en tiempo de ejecución de forma elegante y lee/escribe archivos con <fstream>.",
        theory: `
          <p>En aplicaciones reales de nivel medio y avanzado, los errores inesperados (como dividir por cero o abrir un archivo inexistente) se gestionan con <strong>Excepciones</strong>:</p>
          <ul>
            <li><code>throw std::runtime_error("Mensaje");</code>: Lanza una excepción cuando ocurre un error.</li>
            <li><code>try { ... }</code>: Envuelve el código que podría fallar.</li>
            <li><code>catch (const std::exception &amp;e) { ... }</code>: Captura el error sin que el programa colapse y muestra <code>e.what()</code>.</li>
          </ul>
          <h4>Archivos con <code>&lt;fstream&gt;</code></h4>
          <p>Para guardar datos en disco usamos <code>std::ofstream</code> (escritura) y <code>std::ifstream</code> (lectura), que funcionan exactamente igual que <code>std::cout</code> y <code>std::cin</code>.</p>
        `,
        examples: [
          {
            title: "Excepciones y persistencia en archivo",
            description: "Escribe y lee un archivo temporal y captura errores con try/catch.",
            stdin: "",
            code: `#include <iostream>
#include <fstream>
#include <stdexcept>

double dividirSeguro(double a, double b) {
    if (b == 0.0) {
        throw std::runtime_error("Error: No se puede dividir por cero");
    }
    return a / b;
}

int main() {
    // 1. Prueba de escritura y lectura de archivo
    {
        std::ofstream salida("registro.txt");
        salida << "Progreso guardado exitosamente en disco\\n";
    }
    std::ifstream entrada("registro.txt");
    std::string linea;
    std::getline(entrada, linea);
    std::cout << "Archivo leído: " << linea << "\\n";

    // 2. Prueba de manejo de excepciones
    try {
        std::cout << "10 / 2 = " << dividirSeguro(10, 2) << "\\n";
        std::cout << dividirSeguro(10, 0) << "\\n";
    } catch (const std::exception &e) {
        std::cout << "Excepción capturada -> " << e.what() << "\\n";
    }
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "¿Qué bloque se encarga de interceptar y manejar una excepción lanzada con 'throw'?",
            options: ["finally", "catch", "handle", "except"],
            correctIndex: 1,
            explanation: "En C++, el bloque 'catch (const std::exception &e)' intercepta las excepciones lanzadas dentro del bloque 'try'."
          }
        ],
        challenge: {
          title: "Reto: División Segura con try / catch",
          description: "Lee dos enteros <code>a</code> y <code>b</code>.\nDentro de un bloque <code>try</code>, si <code>b == 0</code> lanza <code>throw std::runtime_error(\"Division por cero\");</code>; de lo contrario imprime <code>a / b</code>.\nEn el bloque <code>catch (const std::exception &amp;e)</code>, imprime <code>e.what()</code>.",
          hint: "Usa try { if (b == 0) throw std::runtime_error(\"Division por cero\"); std::cout << (a / b) << \"\\n\"; } catch (const std::exception &e) { std::cout << e.what() << \"\\n\"; }",
          defaultStdin: "20 0",
          starterCode: `#include <iostream>
#include <stdexcept>

int main() {
    int a = 0, b = 0;
    std::cin >> a >> b;

    // Implementa el bloque try / catch aquí
    
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <stdexcept>

int main() {
    int a = 0, b = 0;
    std::cin >> a >> b;

    try {
        if (b == 0) {
            throw std::runtime_error("Division por cero");
        }
        std::cout << (a / b) << "\\n";
    } catch (const std::exception &e) {
        std::cout << e.what() << "\\n";
    }
    return 0;
}`,
          requiredSnippets: [
            { regex: "\\btry\\b", message: "Debes utilizar un bloque try." },
            { regex: "\\bcatch\\b", message: "Debes utilizar un bloque catch." },
            { regex: "\\bthrow\\b", message: "Debes lanzar la excepción con throw." }
          ],
          testCases: [
            { description: "Caso con b = 0 (captura excepción)", input: "20 0", expectedOutput: "Division por cero" },
            { description: "Caso válido 20 / 4 = 5", input: "20 4", expectedOutput: "5" }
          ]
        }
      },
      {
        id: "les-8-2",
        title: "8.2 Proyecto Final Nivel Medio: Gestor de Inventario POO + STL",
        level: "Nivel Medio",
        xp: 400,
        summary: "Integra Clases, std::vector, referencias constantes y algoritmos para graduarte del Nivel Medio.",
        theory: `
          <p>¡Has llegado al desafío integrador de <strong>Nivel Medio</strong>! En este proyecto combinarás:</p>
          <ol>
            <li><strong>POO:</strong> Diseño de una clase <code>Producto</code> con atributos encapsulados y métodos constantes.</li>
            <li><strong>Contenedores STL:</strong> Almacenamiento dinámico en un <code>std::vector&lt;Producto&gt;</code>.</li>
            <li><strong>Paso por referencia constante:</strong> Uso de <code>const auto &amp;</code> para recorrer objetos sin copiarlos.</li>
            <li><strong>Algoritmos y cálculo agregado:</strong> Obtención del valor total del inventario y búsqueda del producto más caro.</li>
          </ol>
        `,
        examples: [
          {
            title: "Arquitectura de un Gestor con POO y STL",
            description: "Ejemplo completo de una clase Gestor que administra objetos complejos.",
            stdin: "",
            code: `#include <iostream>
#include <vector>
#include <string>

class Tarea {
private:
    std::string titulo;
    int prioridad;
public:
    Tarea(std::string t, int p) : titulo(t), prioridad(p) {}
    std::string getTitulo() const { return titulo; }
    int getPrioridad() const { return prioridad; }
};

int main() {
    std::vector<Tarea> lista = {
        Tarea("Aprender Sintaxis", 1),
        Tarea("Dominar Punteros", 2),
        Tarea("Aplicar POO y STL", 3)
    };

    for (const auto &t : lista) {
        std::cout << "[Prioridad " << t.getPrioridad() << "] " << t.getTitulo() << "\\n";
    }
    return 0;
}`
          }
        ],
        quiz: [
          {
            question: "Al recorrer un std::vector<Producto> solo para leer datos, ¿cuál es la firma de bucle más eficiente en C++?",
            options: [
              "for (Producto p : productos)",
              "for (const Producto &p : productos)",
              "for (Producto *p : productos)",
              "while (productos)"
            ],
            correctIndex: 1,
            explanation: "'const Producto &p' evita copiar cada objeto Producto en cada iteración y garantiza que no se modifique accidentalmente."
          }
        ],
        challenge: {
          title: "Reto de Graduación: Sistema de Inventario",
          description: "El programa lee un entero <code>N</code> seguido de <code>N</code> productos, cada uno con: <code>nombre</code> (string sin espacios), <code>precio</code> (int) y <code>cantidad</code> (int).\n1. Completa la clase <code>Producto</code> con el método <code>int valorTotal() const</code> que devuelva <code>precio * cantidad</code>.\n2. Almacena los productos en un <code>std::vector&lt;Producto&gt;</code>.\n3. Imprime en la primera línea: <code>Total inventario: X</code> (suma de <code>valorTotal()</code> de todos los productos).\n4. Imprime en la segunda línea: <code>Producto estrella: NOMBRE</code> (el nombre del producto con mayor <code>valorTotal()</code>).",
          hint: "Recorre el vector con 'for (const auto &p : inventario)', suma p.valorTotal() al total general y compara si p.valorTotal() supera al máximo visto hasta el momento.",
          defaultStdin: "3\nTeclado 50 4\nMonitor 300 2\nMouse 25 6",
          starterCode: `#include <iostream>
#include <vector>
#include <string>

class Producto {
private:
    std::string nombre;
    int precio;
    int cantidad;

public:
    Producto(std::string n, int p, int c) : nombre(n), precio(p), cantidad(c) {}

    std::string getNombre() const { return nombre; }

    // Implementa aquí int valorTotal() const
    
};

int main() {
    int n = 0;
    std::cin >> n;
    std::vector<Producto> inventario;

    for (int i = 0; i < n; i++) {
        std::string nom;
        int pre = 0, cant = 0;
        std::cin >> nom >> pre >> cant;
        inventario.push_back(Producto(nom, pre, cant));
    }

    // Calcula el total del inventario y el nombre del producto con mayor valorTotal()
    
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <string>

class Producto {
private:
    std::string nombre;
    int precio;
    int cantidad;

public:
    Producto(std::string n, int p, int c) : nombre(n), precio(p), cantidad(c) {}

    std::string getNombre() const { return nombre; }

    int valorTotal() const {
        return precio * cantidad;
    }
};

int main() {
    int n = 0;
    std::cin >> n;
    std::vector<Producto> inventario;

    for (int i = 0; i < n; i++) {
        std::string nom;
        int pre = 0, cant = 0;
        std::cin >> nom >> pre >> cant;
        inventario.push_back(Producto(nom, pre, cant));
    }

    int sumaTotal = 0;
    int mejorValor = -1;
    std::string mejorNombre = "";

    for (const auto &p : inventario) {
        int val = p.valorTotal();
        sumaTotal += val;
        if (val > mejorValor) {
            mejorValor = val;
            mejorNombre = p.getNombre();
        }
    }

    std::cout << "Total inventario: " << sumaTotal << "\\n";
    std::cout << "Producto estrella: " << mejorNombre << "\\n";
    return 0;
}`,
          requiredSnippets: [
            { regex: "class\\s+Producto", message: "Debes usar la clase Producto." },
            { regex: "valorTotal\\s*\\(", message: "Debes implementar y usar el método valorTotal()." }
          ],
          testCases: [
            {
              description: "Inventario de 3 productos tecnológicos",
              input: "3\nTeclado 50 4\nMonitor 300 2\nMouse 25 6",
              expectedOutput: "Total inventario: 950\nProducto estrella: Monitor"
            },
            {
              description: "Inventario de 2 productos",
              input: "2\nLibro 30 10\nCuaderno 10 5",
              expectedOutput: "Total inventario: 350\nProducto estrella: Libro"
            }
          ]
        }
      }
    ]
  }
];

window.CPP_PLAYGROUND_TEMPLATES = {
  hola: {
    name: "Hola Mundo (Básico)",
    stdin: "",
    code: `#include <iostream>

int main() {
    std::cout << "¡Bienvenido al Laboratorio Libre de C++!" << std::endl;
    return 0;
}`
  },
  interactivo: {
    name: "Entrada con std::cin",
    stdin: "Ada Lovelace\n28",
    code: `#include <iostream>
#include <string>

int main() {
    std::string nombre;
    int edad = 0;
    std::getline(std::cin, nombre);
    std::cin >> edad;

    std::cout << "Hola " << nombre << ", en 5 años tendrás " << (edad + 5) << " años.\\n";
    return 0;
}`
  },
  poo: {
    name: "POO: Clases y Herencia",
    stdin: "",
    code: `#include <iostream>
#include <string>
#include <vector>
#include <memory>

class Vehiculo {
protected:
    std::string marca;
public:
    Vehiculo(std::string m) : marca(m) {}
    virtual void acelerar() const = 0; // Método virtual puro (Clase abstracta)
    virtual ~Vehiculo() = default;
};

class Deportivo : public Vehiculo {
public:
    Deportivo(std::string m) : Vehiculo(m) {}
    void acelerar() const override {
        std::cout << marca << " acelera de 0 a 100 km/h en 3.2s!\\n";
    }
};

int main() {
    auto auto1 = std::make_unique<Deportivo>("Porsche 911");
    auto1->acelerar();
    return 0;
}`
  },
  stl: {
    name: "STL: Vector, Map y Lambda",
    stdin: "",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> datos = {12, 5, 88, 3, 45, 19};

    std::sort(datos.begin(), datos.end());

    std::cout << "Ordenados: ";
    for (int x : datos) std::cout << x << " ";
    std::cout << "\\n";

    int suma = std::accumulate(datos.begin(), datos.end(), 0);
    std::cout << "Suma total: " << suma << "\\n";
    return 0;
}`
  }
};

window.CPP_CHEATSHEET = [
  {
    category: "Estructura Básica y E/S",
    items: [
      { syntax: "#include <iostream>", desc: "Librería estándar para entrada y salida en consola." },
      { syntax: "std::cout << valor << \"\\n\";", desc: "Imprime datos en la salida estándar." },
      { syntax: "std::cin >> variable;", desc: "Lee un valor separado por espacio o salto de línea." },
      { syntax: "std::getline(std::cin, str);", desc: "Lee una línea completa incluyendo espacios." }
    ]
  },
  {
    category: "Tipos y Referencias",
    items: [
      { syntax: "int, double, char, bool", desc: "Tipos primitivos: entero, decimal, carácter y booleano." },
      { syntax: "const int MAX = 100;", desc: "Declara una constante inmutable." },
      { syntax: "int &ref = original;", desc: "Crea un alias (referencia) a una variable existente." },
      { syntax: "int *ptr = &original;", desc: "Puntero que almacena la dirección de memoria de 'original'." }
    ]
  },
  {
    category: "Contenedores STL",
    items: [
      { syntax: "std::vector<int> v = {1, 2};", desc: "Arreglo dinámico. Usa v.push_back(x) y v.size()." },
      { syntax: "std::map<string, int> m;", desc: "Diccionario ordenado de pares clave -> valor." },
      { syntax: "std::set<int> s;", desc: "Conjunto de valores únicos ordenados automáticamente." },
      { syntax: "std::sort(v.begin(), v.end());", desc: "Ordena un contenedor en complejidad O(N log N)." }
    ]
  },
  {
    category: "POO y Memoria Moderna",
    items: [
      { syntax: "class MiClase { private: ... public: ... };", desc: "Define una clase con encapsulamiento." },
      { syntax: "virtual void metodo() override", desc: "Polimorfismo dinámico en herencia de clases." },
      { syntax: "auto p = std::make_unique<T>(args);", desc: "Crea un puntero inteligente sin fugas de memoria." },
      { syntax: "template <typename T>", desc: "Define una función o clase genérica." }
    ]
  }
];
