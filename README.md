# C++ Mastery Academy (Gruvbox Dark Edition)

Plataforma educativa interactiva local para aprender **C++17** desde cero absoluto hasta nivel intermedio sólido. Integra el compilador real **`g++`** de tu sistema para compilar, ejecutar y verificar retos prácticos en vivo desde una interfaz inspirada en **Zed IDE (Gruvbox Dark)**.

---

## Características Principales

- **Curso Guiado Progresivo (8 Módulos · 17 Lecciones)**:
  1. **Módulo 1:** Primeros pasos (`main`, `iostream`, `std::cout`, variables, constantes y `std::cin`).
  2. **Módulo 2:** Control de flujo (`if`/`else`, operadores lógicos y bucles `for`, `while`, `do-while`).
  3. **Módulo 3:** Funciones, parámetros y paso por **Valor vs. Referencia (`&`)**.
  4. **Módulo 4:** Arreglos dinámicos modernos (`std::vector`) y manipulación de `std::string`.
  5. **Módulo 5:** Punteros (`*`), direcciones de memoria (`&`), `nullptr` y **Smart Pointers** (`std::unique_ptr`).
  6. **Módulo 6:** Programación Orientada a Objetos (`class`, constructores, herencia y polimorfismo con `virtual` / `override`).
  7. **Módulo 7:** Plantillas genéricas (`template <typename T>`) y librería estándar **STL** (`std::map`, `std::sort`, lambdas).
  8. **Módulo 8:** Manejo de excepciones (`try`/`catch`/`throw`), archivos (`<fstream>`) y **Proyecto Final Integrador**.
- **Editor de Código estilo Zed (Gruvbox Dark)**:
  - Resaltado de sintaxis C++ en vivo, auto-cierre de llaves/paréntesis/comillas y auto-indentación inteligente.
  - Consola de entrada estándar (`std::cin`) y salida de terminal integrada con métricas de compilación y ejecución.
  - Protección automática contra bucles infinitos (límite de 4 segundos por ejecución).
- **Autocorrección y Gamificación**:
  - Cuestionarios interactivos, retos prácticos evaluados automáticamente contra casos de prueba reales en `g++`, puntos **XP** y rangos guardados en el navegador (`localStorage`).
- **Cero dependencias externas de NPM**:
  - Construido íntegramente con módulos nativos de Node.js (`http`, `fs`, `child_process`), por lo que no requiere `npm install` ni descarga paquetes pesados.

---

## Requisitos Previos

Para ejecutar la plataforma en tu computadora solo necesitas tener instalados dos programas:

1. **Node.js** (versión 16 o superior)
2. **Compilador `g++`** (GCC con soporte para C++17)

---

## Guía de Instalación y Uso en Linux

### 1. Instalar Node.js y `g++`

Abre tu terminal y ejecuta el comando correspondiente a tu distribución:

- **Ubuntu / Debian / Linux Mint / Pop!_OS:**
  ```bash
  sudo apt update
  sudo apt install -y nodejs npm build-essential g++ git
  ```
- **Arch Linux / Manjaro / EndeavourOS:**
  ```bash
  sudo pacman -S --needed nodejs npm gcc git
  ```
- **Fedora:**
  ```bash
  sudo dnf install -y nodejs npm gcc-c++ git
  ```

Verifica que ambos estén instalados correctamente:
```bash
node -v
g++ --version
```

### 2. Clonar y ejecutar el proyecto

```bash
git clone https://github.com/JulianLAGG/cpp-mastery-academy.git
cd cpp-mastery-academy
npm start
```

Abre tu navegador en **[http://localhost:3000](http://localhost:3000)**.

---

## Guía de Instalación y Uso en Windows (10 / 11)

En Windows necesitas instalar **Node.js** y el compilador **MinGW-w64 (`g++`)**, y asegurarte de que `g++` esté disponible en la variable de entorno `PATH`.

### Paso 1: Instalar Node.js y Git

Puedes instalarlos descargando los instaladores oficiales o directamente desde **PowerShell** usando `winget`:

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
```
*(O descárgalos desde [nodejs.org](https://nodejs.org/) y [git-scm.com](https://git-scm.com/)).*

### Paso 2: Instalar el compilador `g++` (MinGW-w64)

La forma más limpia y recomendada en Windows es mediante **MSYS2** o **WinLibs**:

#### Opción A (Rápida por terminal con `winget` - WinLibs MinGW-w64):
Abre **PowerShell** y ejecuta:
```powershell
winget install BrechtSanders.WinLibs.POSIX.UCRT
```
*(Al finalizar, cierra y vuelve a abrir PowerShell para que reconozca el comando `g++`).*

#### Opción B (Mediante MSYS2):
1. Descarga e instala **MSYS2** desde [https://www.msys2.org/](https://www.msys2.org/).
2. En la terminal de MSYS2 UCRT64 que se abre, ejecuta:
   ```bash
   pacman -S --needed mingw-w64-ucrt-x86_64-gcc
   ```
3. Agrega la ruta `C:\msys64\ucrt64\bin` a las **Variables de entorno del sistema (`PATH`)** de Windows:
   - Presiona la tecla `Windows`, escribe **"Editar las variables de entorno del sistema"** y abre la ventana.
   - Haz clic en **Variables de entorno...** → en **Variables del sistema** selecciona `Path` → **Editar** → **Nuevo** → pega `C:\msys64\ucrt64\bin` → **Aceptar**.

### Paso 3: Verificar la instalación en Windows

Abre una nueva ventana de **PowerShell** o **CMD** y comprueba que ambos comandos respondan:

```powershell
node -v
g++ --version
```

### Paso 4: Clonar e iniciar la aplicación

En **PowerShell** o **CMD**:

```powershell
git clone https://github.com/JulianLAGG/cpp-mastery-academy.git
cd cpp-mastery-academy
npm start
```

Abre tu navegador web en:
**[http://localhost:3000](http://localhost:3000)**

> **Nota sobre el puerto:** Si el puerto `3000` está ocupado en tu equipo, puedes usar otro puerto:
> - **En Linux / macOS:** `PORT=4000 npm start`
> - **En Windows (PowerShell):** `$env:PORT=4000; npm start`
> - **En Windows (CMD):** `set PORT=4000 && npm start`

---

## Atajos de Teclado en la Plataforma

| Acción | Atajo |
| :--- | :--- |
| Compilar y ejecutar código en `g++` | `Ctrl + Enter` |
| Verificar casos de prueba del reto práctico | `Ctrl + Shift + Enter` |
| Mostrar / Ocultar barra lateral de lecciones | `Ctrl + B` |
| Indentar / Des-indentar código en el editor | `Tab` / `Shift + Tab` |
| Ir a la lección anterior / siguiente | `Alt + ←` / `Alt + →` |

---

## Pruebas Automáticas del Curso

Para verificar desde la terminal que el compilador `g++` funciona y que las soluciones oficiales de las **17 lecciones** pasan todos los casos de prueba:

```bash
npm test
```

---

## Estructura del Proyecto

```text
cpp-mastery-academy/
├── package.json          # Scripts de inicio (npm start) y pruebas (npm test)
├── server.js             # Servidor HTTP Node.js + compilación y ejecución aislada con g++
├── test-server.js        # Suite de pruebas que valida las 17 lecciones con g++
├── INSTRUCCIONES.txt     # Guía detallada en texto plano (Windows y Linux)
├── README.md             # Documentación principal del repositorio
└── public/
    ├── index.html        # Interfaz principal de la aplicación
    ├── styles.css        # Tema visual Gruvbox Dark (estilo Zed IDE)
    ├── curriculum.js     # Contenido teórico, ejemplos, quizzes y retos de los 8 módulos
    └── app.js            # Lógica del frontend, resaltador C++ y editor interactivo
```
