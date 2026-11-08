(function () {
  const STORAGE_KEY = "cpp_academy_progress_v1";
  const curriculum = window.CPP_CURRICULUM || [];
  const templates = window.CPP_PLAYGROUND_TEMPLATES || {};
  const cheatsheet = window.CPP_CHEATSHEET || [];

  // Aplanar lista de lecciones para facilitar navegación Anterior/Siguiente
  const allLessons = [];
  curriculum.forEach((mod, modIdx) => {
    mod.lessons.forEach((les) => {
      allLessons.push({
        ...les,
        moduleId: mod.moduleId,
        moduleTitle: mod.moduleTitle,
        moduleIndex: modIdx + 1
      });
    });
  });

  // Estado de la aplicación
  let state = {
    currentLessonId: allLessons[0]?.id || "les-1-1",
    completedLessons: {},
    savedCode: {},
    activeView: "course", // 'course' | 'playground' | 'cheatsheet'
    sidebarFilter: "all", // 'all' | 'pending' | 'completed'
    collapsedModules: {},
    sidebarCollapsed: false,
    editorFontSize: 14
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state.completedLessons = parsed.completedLessons || {};
        state.savedCode = parsed.savedCode || {};
        state.editorFontSize = parsed.editorFontSize || 14;
        if (parsed.currentLessonId && allLessons.some((l) => l.id === parsed.currentLessonId)) {
          state.currentLessonId = parsed.currentLessonId;
        }
      }
    } catch (_) {}
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentLessonId: state.currentLessonId,
          completedLessons: state.completedLessons,
          savedCode: state.savedCode,
          editorFontSize: state.editorFontSize
        })
      );
    } catch (_) {}
  }

  // Referencias al DOM
  const els = {
    courseWorkspace: document.getElementById("courseWorkspace"),
    sidebar: document.getElementById("sidebar"),
    toggleSidebarBtn: document.getElementById("toggleSidebarBtn"),
    sidebarFilters: document.getElementById("sidebarFilters"),
    cheatsheetView: document.getElementById("cheatsheetView"),
    curriculumList: document.getElementById("curriculumList"),
    lessonSearchInput: document.getElementById("lessonSearchInput"),
    lessonBreadcrumb: document.getElementById("lessonBreadcrumb"),
    lessonLevelBadge: document.getElementById("lessonLevelBadge"),
    lessonXpBadge: document.getElementById("lessonXpBadge"),
    lessonStatusBadge: document.getElementById("lessonStatusBadge"),
    lessonTitle: document.getElementById("lessonTitle"),
    lessonSummary: document.getElementById("lessonSummary"),
    lessonBody: document.getElementById("lessonBody"),
    lessonPositionIndicator: document.getElementById("lessonPositionIndicator"),
    quizCountLabel: document.getElementById("quizCountLabel"),
    quizScorePill: document.getElementById("quizScorePill"),
    theoryContainer: document.getElementById("theoryContainer"),
    examplesContainer: document.getElementById("examplesContainer"),
    quizContainer: document.getElementById("quizContainer"),
    challengeContainer: document.getElementById("challengeContainer"),
    prevLessonBtn: document.getElementById("prevLessonBtn"),
    nextLessonBtn: document.getElementById("nextLessonBtn"),
    goToQuizBtn: document.getElementById("goToQuizBtn"),
    goToChallengeBtn: document.getElementById("goToChallengeBtn"),
    codeEditor: document.getElementById("codeEditor"),
    codeHighlight: document.getElementById("codeHighlight"),
    codeHighlightContent: document.getElementById("codeHighlightContent"),
    lineNumbers: document.getElementById("lineNumbers"),
    stdinInput: document.getElementById("stdinInput"),
    stdinActiveBadge: document.getElementById("stdinActiveBadge"),
    clearStdinBtn: document.getElementById("clearStdinBtn"),
    terminalSplit: document.getElementById("terminalSplit"),
    terminalOutput: document.getElementById("terminalOutput"),
    clearTerminalBtn: document.getElementById("clearTerminalBtn"),
    toggleTerminalSizeBtn: document.getElementById("toggleTerminalSizeBtn"),
    execMetrics: document.getElementById("execMetrics"),
    runCodeBtn: document.getElementById("runCodeBtn"),
    verifyChallengeBtn: document.getElementById("verifyChallengeBtn"),
    resetCodeBtn: document.getElementById("resetCodeBtn"),
    copyEditorCodeBtn: document.getElementById("copyEditorCodeBtn"),
    fontDecreaseBtn: document.getElementById("fontDecreaseBtn"),
    fontIncreaseBtn: document.getElementById("fontIncreaseBtn"),
    templateSelect: document.getElementById("templateSelect"),
    ideModeTag: document.getElementById("ideModeTag"),
    userRankBadge: document.getElementById("userRankBadge"),
    userXpCount: document.getElementById("userXpCount"),
    progressPercentText: document.getElementById("progressPercentText"),
    progressBarFill: document.getElementById("progressBarFill"),
    resetProgressBtn: document.getElementById("resetProgressBtn"),
    compilerStatusText: document.getElementById("compilerStatusText"),
    compilerStatusPill: document.getElementById("compilerStatusPill"),
    cheatsheetGrid: document.getElementById("cheatsheetGrid"),
    cheatsheetSearchInput: document.getElementById("cheatsheetSearchInput"),
    cursorPosIndicator: document.getElementById("cursorPosIndicator"),
    statusLessonInfo: document.getElementById("statusLessonInfo"),
    shortcutsHelpBtn: document.getElementById("shortcutsHelpBtn"),
    shortcutsModal: document.getElementById("shortcutsModal"),
    closeShortcutsModalBtn: document.getElementById("closeShortcutsModalBtn"),
    toastContainer: document.getElementById("toastContainer")
  };

  function getCurrentLesson() {
    return allLessons.find((l) => l.id === state.currentLessonId) || allLessons[0];
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Notificaciones Toast estilo Gruvbox
  function showToast(message, type = "info") {
    if (!els.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type === "success" ? "success" : ""}`;
    toast.textContent = message;
    els.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.2s ease";
      setTimeout(() => toast.remove(), 220);
    }, 2400);
  }

  // Resaltador de Sintaxis C++ con paleta Gruvbox Dark
  const CPP_KEYWORDS = new Set([
    "alignas", "alignof", "and", "bitor", "break", "case", "catch", "class",
    "const", "constexpr", "continue", "default", "delete", "do", "else",
    "enum", "explicit", "export", "extern", "false", "final", "for", "friend",
    "goto", "if", "inline", "mutable", "namespace", "new", "noexcept", "nullptr",
    "operator", "override", "private", "protected", "public", "register",
    "return", "sizeof", "static", "static_assert", "static_cast", "dynamic_cast",
    "reinterpret_cast", "const_cast", "struct", "switch", "template", "this",
    "throw", "true", "try", "typedef", "typeid", "typename", "union", "using",
    "virtual", "volatile", "while"
  ]);

  const CPP_TYPES = new Set([
    "int", "long", "short", "char", "void", "bool", "float", "double",
    "unsigned", "signed", "auto", "size_t", "string", "vector", "map",
    "unordered_map", "set", "pair", "array", "deque", "list", "stack",
    "queue", "unique_ptr", "shared_ptr", "weak_ptr", "ostream", "istream",
    "ifstream", "ofstream", "stringstream"
  ]);

  const CPP_STD_IDENTIFIERS = new Set([
    "std", "cout", "cin", "cerr", "endl", "getline", "sort", "find",
    "make_unique", "make_shared", "move", "swap", "max", "min", "abs", "pow", "sqrt"
  ]);

  function highlightCpp(code) {
    const src = String(code || "");
    const tokenRegex =
      /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(^\s*#[a-zA-Z_]+.*$)|\b(\d+(?:\.\d+)?(?:f|u|l|ull|ll)?)\b|\b([a-zA-Z_]\w*)\b/gm;

    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(src)) !== null) {
      if (match.index > lastIndex) {
        result += escapeHtml(src.slice(lastIndex, match.index));
      }

      const [full, comment, strLit, preproc, number, ident] = match;
      if (comment !== undefined) {
        result += `<span class="tok-com">${escapeHtml(full)}</span>`;
      } else if (strLit !== undefined) {
        result += `<span class="tok-str">${escapeHtml(full)}</span>`;
      } else if (preproc !== undefined) {
        result += `<span class="tok-prep">${escapeHtml(full)}</span>`;
      } else if (number !== undefined) {
        result += `<span class="tok-num">${escapeHtml(full)}</span>`;
      } else if (ident !== undefined) {
        if (CPP_KEYWORDS.has(ident)) {
          result += `<span class="tok-kw">${escapeHtml(full)}</span>`;
        } else if (CPP_TYPES.has(ident)) {
          result += `<span class="tok-type">${escapeHtml(full)}</span>`;
        } else if (CPP_STD_IDENTIFIERS.has(ident)) {
          result += `<span class="tok-ns">${escapeHtml(full)}</span>`;
        } else {
          const nextChar = src[tokenRegex.lastIndex];
          if (nextChar === "(") {
            result += `<span class="tok-fn">${escapeHtml(full)}</span>`;
          } else {
            result += escapeHtml(full);
          }
        }
      }
      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < src.length) {
      result += escapeHtml(src.slice(lastIndex));
    }

    // Añadir salto final si termina en \n para mantener sincronía exacta con textarea
    if (src.endsWith("\n")) {
      result += " ";
    }
    return result;
  }

  // Actualizar barra de números de línea y resaltado en el editor
  function updateEditorView() {
    const code = els.codeEditor.value || "";
    const lines = code.split("\n").length;
    let nums = "";
    for (let i = 1; i <= lines; i++) {
      nums += i + "\n";
    }
    els.lineNumbers.textContent = nums;
    if (els.codeHighlightContent) {
      els.codeHighlightContent.innerHTML = highlightCpp(code);
    }
    updateCursorIndicator();
  }

  function updateCursorIndicator() {
    if (!els.cursorPosIndicator) return;
    const pos = els.codeEditor.selectionStart || 0;
    const textUpToCursor = (els.codeEditor.value || "").slice(0, pos);
    const lines = textUpToCursor.split("\n");
    const ln = lines.length;
    const col = lines[lines.length - 1].length + 1;
    els.cursorPosIndicator.textContent = `Ln ${ln}, Col ${col}`;
  }

  function applyEditorFontSize() {
    document.documentElement.style.setProperty("--editor-font-size", `${state.editorFontSize}px`);
  }

  function updateStdinBadge() {
    if (!els.stdinActiveBadge) return;
    const hasInput = Boolean(els.stdinInput.value && els.stdinInput.value.trim());
    els.stdinActiveBadge.classList.toggle("hidden", !hasInput);
  }

  // Calcular XP y progreso
  function updateStatsUI() {
    let totalXp = 0;
    let completedCount = 0;

    allLessons.forEach((les) => {
      if (state.completedLessons[les.id]) {
        totalXp += les.xp;
        completedCount++;
      }
    });

    const percent = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

    let rank = "Nivel 0: Novato";
    if (totalXp >= 2200) rank = "Graduado Nivel Medio 🏆";
    else if (totalXp >= 1400) rank = "Arquitecto POO & STL";
    else if (totalXp >= 800) rank = "Domador de Punteros";
    else if (totalXp >= 350) rank = "Aprendiz C++";

    els.userRankBadge.textContent = rank;
    els.userXpCount.textContent = `${totalXp} XP`;
    els.progressPercentText.textContent = `${percent}% (${completedCount}/${allLessons.length})`;
    els.progressBarFill.style.width = `${percent}%`;
  }

  // Renderizar barra lateral de módulos y lecciones con filtros y acordeón
  function renderSidebar(filterText = "") {
    const query = filterText.trim().toLowerCase();
    els.curriculumList.innerHTML = "";

    curriculum.forEach((mod) => {
      const completedInMod = mod.lessons.filter((l) => state.completedLessons[l.id]).length;
      const totalInMod = mod.lessons.length;

      const filteredLessons = mod.lessons.filter((l) => {
        const isDone = Boolean(state.completedLessons[l.id]);
        if (state.sidebarFilter === "pending" && isDone) return false;
        if (state.sidebarFilter === "completed" && !isDone) return false;

        if (!query) return true;
        return (
          l.title.toLowerCase().includes(query) ||
          l.summary.toLowerCase().includes(query) ||
          mod.moduleTitle.toLowerCase().includes(query)
        );
      });

      if (filteredLessons.length === 0) return;

      const isCollapsed = Boolean(state.collapsedModules[mod.moduleId]) && !query;
      const groupDiv = document.createElement("div");
      groupDiv.className = `module-group ${isCollapsed ? "collapsed" : ""}`;

      const headerBtn = document.createElement("button");
      headerBtn.type = "button";
      headerBtn.className = "module-header";
      const allModDone = completedInMod === totalInMod && totalInMod > 0;
      headerBtn.innerHTML = `
        <span class="module-header-left">
          <span class="module-chevron">▼</span>
          <span>${escapeHtml(mod.moduleTitle)}</span>
        </span>
        <span class="module-badge ${allModDone ? "all-done" : ""}" title="${escapeHtml(mod.levelBadge)}">
          ${completedInMod}/${totalInMod}
        </span>
      `;
      headerBtn.addEventListener("click", () => {
        state.collapsedModules[mod.moduleId] = !state.collapsedModules[mod.moduleId];
        groupDiv.classList.toggle("collapsed", state.collapsedModules[mod.moduleId]);
      });
      groupDiv.appendChild(headerBtn);

      const lessonsWrap = document.createElement("div");
      lessonsWrap.className = "module-lessons";

      filteredLessons.forEach((les) => {
        const isDone = Boolean(state.completedLessons[les.id]);
        const isActive = les.id === state.currentLessonId;

        const btn = document.createElement("button");
        btn.className = `lesson-item ${isActive ? "active" : ""} ${isDone ? "completed" : ""}`;
        btn.innerHTML = `
          <span class="lesson-check">${isDone ? "✓" : ""}</span>
          <span class="lesson-item-title">${escapeHtml(les.title)}</span>
        `;
        btn.addEventListener("click", () => {
          selectLesson(les.id);
        });
        lessonsWrap.appendChild(btn);
      });

      groupDiv.appendChild(lessonsWrap);
      els.curriculumList.appendChild(groupDiv);
    });
  }

  // Cambiar pestaña interna de la lección (Teoría / Quiz / Reto)
  function switchLessonTab(tabName) {
    document.querySelectorAll(".lesson-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    document.querySelectorAll(".tab-content").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `tab-${tabName}`);
    });
    if (els.lessonBody) {
      els.lessonBody.scrollTop = 0;
    }
  }

  // Enriquecer bloques <pre><code> de la teoría con resaltado Gruvbox y botón Copiar
  function enhanceTheoryCodeBlocks() {
    els.theoryContainer.querySelectorAll("pre").forEach((pre) => {
      const codeEl = pre.querySelector("code") || pre;
      const rawText = codeEl.textContent || "";
      codeEl.innerHTML = highlightCpp(rawText);

      if (!pre.parentElement.classList.contains("theory-pre-wrapper")) {
        const wrapper = document.createElement("div");
        wrapper.className = "theory-pre-wrapper";
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "copy-snippet-btn";
        copyBtn.textContent = "Copiar";
        copyBtn.addEventListener("click", () => {
          navigator.clipboard?.writeText(rawText);
          copyBtn.textContent = "✓ Copiado";
          showToast("Fragmento copiado al portapapeles");
          setTimeout(() => {
            copyBtn.textContent = "Copiar";
          }, 1500);
        });
        wrapper.appendChild(copyBtn);
      }
    });
  }

  // Seleccionar y renderizar una lección
  function selectLesson(lessonId) {
    if (state.activeView === "course" && state.currentLessonId) {
      state.savedCode[state.currentLessonId] = els.codeEditor.value;
    }

    state.currentLessonId = lessonId;
    saveState();

    const lesson = getCurrentLesson();
    const isCompleted = Boolean(state.completedLessons[lesson.id]);
    const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);

    // Breadcrumb y barra de estado
    if (els.lessonBreadcrumb) {
      els.lessonBreadcrumb.innerHTML = `
        <span>${escapeHtml(lesson.moduleTitle)}</span>
        <span class="crumb-sep">›</span>
        <span>${escapeHtml(lesson.title)}</span>
      `;
    }
    if (els.statusLessonInfo) {
      els.statusLessonInfo.textContent = `${lesson.moduleTitle} · ${lesson.id}`;
    }
    if (els.lessonPositionIndicator) {
      els.lessonPositionIndicator.textContent = `Lección ${currentIndex + 1} de ${allLessons.length}`;
    }

    // Cabecera
    els.lessonLevelBadge.textContent = lesson.level;
    els.lessonXpBadge.textContent = `+${lesson.xp} XP`;
    els.lessonStatusBadge.textContent = isCompleted ? "✓ Completada" : "En curso";
    els.lessonStatusBadge.classList.toggle("done", isCompleted);
    els.lessonTitle.textContent = lesson.title;
    els.lessonSummary.textContent = lesson.summary;
    els.quizCountLabel.textContent = (lesson.quiz || []).length;

    // 1. Teoría
    els.theoryContainer.innerHTML = lesson.theory;
    enhanceTheoryCodeBlocks();

    // Ejemplos interactivos
    els.examplesContainer.innerHTML = "";
    (lesson.examples || []).forEach((ex) => {
      const box = document.createElement("div");
      box.className = "example-box";
      box.innerHTML = `
        <div class="example-header">
          <span class="example-title">💡 Ejemplo: ${escapeHtml(ex.title)}</span>
          <button class="btn btn-sm btn-secondary load-example-btn">Cargar y Ejecutar ▶</button>
        </div>
        <p class="example-desc">${escapeHtml(ex.description)}</p>
        <pre class="example-code"><code>${highlightCpp(ex.code)}</code></pre>
      `;
      box.querySelector(".load-example-btn").addEventListener("click", () => {
        els.codeEditor.value = ex.code;
        els.stdinInput.value = ex.stdin || "";
        updateStdinBadge();
        updateEditorView();
        showToast(`Ejemplo "${ex.title}" cargado en el editor`);
        runCurrentCode();
      });
      els.examplesContainer.appendChild(box);
    });

    // 2. Cuestionario (Quiz)
    els.quizContainer.innerHTML = "";
    const quizList = lesson.quiz || [];
    const answeredCorrect = new Set();

    function updateQuizScoreUI() {
      if (els.quizScorePill) {
        els.quizScorePill.textContent = `${answeredCorrect.size} / ${quizList.length} correctas`;
      }
    }
    updateQuizScoreUI();

    quizList.forEach((q, qIdx) => {
      const card = document.createElement("div");
      card.className = "quiz-card";
      card.innerHTML = `
        <div class="quiz-question">${qIdx + 1}. ${escapeHtml(q.question)}</div>
        <div class="quiz-options"></div>
        <div class="quiz-feedback"></div>
      `;
      const optionsWrap = card.querySelector(".quiz-options");
      const feedbackEl = card.querySelector(".quiz-feedback");

      q.options.forEach((optText, optIdx) => {
        const optBtn = document.createElement("button");
        optBtn.className = "quiz-option";
        optBtn.textContent = optText;
        optBtn.addEventListener("click", () => {
          optionsWrap.querySelectorAll(".quiz-option").forEach((b) => {
            b.classList.remove("correct", "wrong");
          });
          const isCorrect = optIdx === q.correctIndex;
          optBtn.classList.add(isCorrect ? "correct" : "wrong");
          if (isCorrect) {
            answeredCorrect.add(qIdx);
          } else {
            answeredCorrect.delete(qIdx);
          }
          updateQuizScoreUI();
          feedbackEl.classList.add("visible");
          feedbackEl.innerHTML = isCorrect
            ? `<strong style="color:var(--gb-green)">✓ ¡Correcto!</strong> ${escapeHtml(q.explanation)}`
            : `<strong style="color:var(--gb-red)">✗ Inténtalo de nuevo:</strong> ${escapeHtml(q.explanation)}`;
        });
        optionsWrap.appendChild(optBtn);
      });

      els.quizContainer.appendChild(card);
    });

    // 3. Reto Práctico
    const ch = lesson.challenge;
    let testCasesPreviewHtml = "";
    if (ch.testCases && ch.testCases.length > 0) {
      const rows = ch.testCases
        .map(
          (tc, idx) => `
          <div class="testcase-preview-row">
            <span>#${idx + 1} ${escapeHtml(tc.description || "Caso de prueba")}</span>
            <span>${tc.input ? `stdin: "${escapeHtml(tc.input)}" → ` : ""}espera: "${escapeHtml(tc.expectedOutput)}"</span>
          </div>
        `
        )
        .join("");
      testCasesPreviewHtml = `
        <div class="challenge-testcases-preview">
          <div class="challenge-testcases-title">Casos de Prueba Automáticos (${ch.testCases.length})</div>
          ${rows}
        </div>
      `;
    }

    els.challengeContainer.innerHTML = `
      <h3>🎯 ${escapeHtml(ch.title)}</h3>
      <div class="challenge-desc">${ch.description}</div>
      ${testCasesPreviewHtml}
      <div class="challenge-actions">
        <button class="btn btn-sm btn-secondary" id="loadStarterBtn">↺ Cargar Plantilla del Reto</button>
        <button class="btn btn-sm btn-verify" id="verifyFromCardBtn">✓ Verificar Reto con g++</button>
        <button class="btn btn-sm btn-outline" id="toggleHintBtn">💡 Ver Pista</button>
        <button class="btn btn-sm btn-outline" id="loadSolutionBtn">🔓 Ver Solución</button>
      </div>
      <div class="hint-box" id="challengeHintBox">
        <strong>💡 Pista:</strong> ${escapeHtml(ch.hint)}
      </div>
    `;

    document.getElementById("loadStarterBtn").addEventListener("click", () => {
      els.codeEditor.value = ch.starterCode;
      els.stdinInput.value = ch.defaultStdin || "";
      state.savedCode[lesson.id] = ch.starterCode;
      saveState();
      updateStdinBadge();
      updateEditorView();
      showToast("Plantilla inicial del reto restaurada");
    });

    document.getElementById("verifyFromCardBtn").addEventListener("click", () => {
      verifyChallenge();
    });

    document.getElementById("toggleHintBtn").addEventListener("click", () => {
      document.getElementById("challengeHintBox").classList.toggle("visible");
    });

    document.getElementById("loadSolutionBtn").addEventListener("click", () => {
      els.codeEditor.value = ch.solutionCode;
      els.stdinInput.value = ch.defaultStdin || "";
      updateStdinBadge();
      updateEditorView();
      showToast("Solución de referencia cargada en el editor");
    });

    // Cargar código guardado o starterCode del reto en el editor
    els.codeEditor.value = state.savedCode[lesson.id] || ch.starterCode;
    els.stdinInput.value = ch.defaultStdin || "";
    updateStdinBadge();
    updateEditorView();

    // Botones Anterior / Siguiente
    els.prevLessonBtn.disabled = currentIndex <= 0;
    els.nextLessonBtn.disabled = currentIndex >= allLessons.length - 1;

    switchLessonTab("theory");
    renderSidebar(els.lessonSearchInput.value);
    updateStatsUI();
  }

  // Compilar y ejecutar código en vivo con g++
  async function runCurrentCode() {
    const code = els.codeEditor.value;
    const stdin = els.stdinInput.value;

    if (state.activeView === "course") {
      state.savedCode[state.currentLessonId] = code;
      saveState();
    }

    els.runCodeBtn.disabled = true;
    els.runCodeBtn.textContent = "⏳ Compilando...";
    els.execMetrics.textContent = "g++ -std=c++17...";
    els.terminalOutput.innerHTML = `<span class="terminal-muted">Compilando y ejecutando con g++...</span>`;

    try {
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, stdin })
      });
      const data = await res.json();

      if (data.stage === "compile" && !data.success) {
        els.execMetrics.textContent = `Error de compilación (${data.compileTimeMs} ms)`;
        els.terminalOutput.innerHTML =
          `<div class="terminal-error"><strong>❌ Error de compilación (g++):</strong>\n${escapeHtml(data.compilerOutput)}</div>`;
        return;
      }

      els.execMetrics.textContent = `Compilado: ${data.compileTimeMs}ms · Ejecución: ${data.runTimeMs}ms`;

      let html = "";
      if (data.compilerOutput && data.compilerOutput.trim()) {
        html += `<div class="terminal-warning"><strong>⚠️ Advertencias del compilador:</strong>\n${escapeHtml(data.compilerOutput)}</div>\n`;
      }

      if (data.stdout) {
        html += `<div class="terminal-success">${escapeHtml(data.stdout)}</div>`;
      } else if (!data.stderr) {
        html += `<span class="terminal-muted">[El programa finalizó sin imprimir nada en consola (exit code ${data.exitCode})]</span>`;
      }

      if (data.stderr) {
        html += `\n<div class="terminal-error">${escapeHtml(data.stderr)}</div>`;
      }

      els.terminalOutput.innerHTML = html;
    } catch (err) {
      els.terminalOutput.innerHTML = `<div class="terminal-error">Error de red al conectar con el compilador local: ${escapeHtml(err.message)}</div>`;
    } finally {
      els.runCodeBtn.disabled = false;
      els.runCodeBtn.innerHTML = `▶ Ejecutar <kbd class="btn-kbd">⌃↵</kbd>`;
    }
  }

  // Verificar reto práctico contra los casos de prueba
  async function verifyChallenge() {
    const lesson = getCurrentLesson();
    const ch = lesson.challenge;
    const code = els.codeEditor.value;

    state.savedCode[lesson.id] = code;
    saveState();

    els.verifyChallengeBtn.disabled = true;
    els.verifyChallengeBtn.textContent = "⏳ Evaluando...";
    els.execMetrics.textContent = "Ejecutando pruebas automáticas...";
    els.terminalOutput.innerHTML = `<span class="terminal-muted">Compilando solución y verificando casos de prueba...</span>`;

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          testCases: ch.testCases,
          requiredSnippets: ch.requiredSnippets || []
        })
      });
      const data = await res.json();

      if (data.stage === "compile") {
        els.execMetrics.textContent = "Fallo de compilación";
        els.terminalOutput.innerHTML =
          `<div class="terminal-error"><strong>❌ Tu código no compila aún:</strong>\n${escapeHtml(data.compilerOutput)}</div>`;
        return;
      }

      let html = "";

      if (data.missingRequirements && data.missingRequirements.length > 0) {
        html += `<div class="test-result-item fail"><strong>⚠️ Requisito del reto pendiente:</strong>\n`;
        data.missingRequirements.forEach((msg) => {
          html += `• ${escapeHtml(msg)}\n`;
        });
        html += `</div>`;
      }

      (data.results || []).forEach((r, idx) => {
        if (r.passed) {
          html += `
            <div class="test-result-item pass">
              <strong style="color:var(--gb-green)">✓ Test ${idx + 1}: ${escapeHtml(r.description)}</strong> (${r.runTimeMs} ms)
              <div style="font-size:0.78rem;color:var(--gb-fg4);margin-top:3px;">Salida: <code>${escapeHtml(r.actualOutput)}</code></div>
            </div>
          `;
        } else {
          html += `
            <div class="test-result-item fail">
              <strong style="color:var(--gb-red)">✗ Test ${idx + 1}: ${escapeHtml(r.description)}</strong>
              <div style="font-size:0.78rem;margin-top:4px;">
                <div>Entrada: <code>${escapeHtml(r.input || "(vacía)")}</code></div>
                <div>Esperado: <code>${escapeHtml(r.expectedOutput)}</code></div>
                <div>Obtenido: <code>${escapeHtml(r.actualOutput || "(sin salida)")}</code></div>
                ${r.stderr ? `<div class="terminal-error">${escapeHtml(r.stderr)}</div>` : ""}
              </div>
            </div>
          `;
        }
      });

      if (data.passed) {
        const wasAlreadyDone = Boolean(state.completedLessons[lesson.id]);
        state.completedLessons[lesson.id] = true;
        saveState();
        updateStatsUI();
        renderSidebar(els.lessonSearchInput.value);
        els.lessonStatusBadge.textContent = "✓ Completada";
        els.lessonStatusBadge.classList.add("done");

        if (!wasAlreadyDone) {
          showToast(`🎉 ¡Reto superado! +${lesson.xp} XP ganados`, "success");
        } else {
          showToast("✓ Todos los casos de prueba aprobados", "success");
        }

        html =
          `<div class="test-result-item pass" style="border-width:2px;">
            <strong style="color:var(--gb-green);font-size:0.95rem;">🎉 ¡Reto Superado! ${
              !wasAlreadyDone ? `Has ganado +${lesson.xp} XP.` : "Lección completada."
            }</strong>
          </div>` + html;
        els.execMetrics.textContent = "Todos los tests aprobados ✓";
      } else {
        els.execMetrics.textContent = "Algunos tests no pasaron";
      }

      els.terminalOutput.innerHTML = html;
    } catch (err) {
      els.terminalOutput.innerHTML = `<div class="terminal-error">Error al verificar el reto: ${escapeHtml(err.message)}</div>`;
    } finally {
      els.verifyChallengeBtn.disabled = false;
      els.verifyChallengeBtn.textContent = "✓ Verificar Reto";
    }
  }

  // Cambiar vista principal (Curso / Laboratorio Libre / Hoja de Referencia)
  function switchMainView(view) {
    state.activeView = view;
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === view);
    });

    if (view === "cheatsheet") {
      els.courseWorkspace.classList.add("hidden");
      els.cheatsheetView.classList.remove("hidden");
    } else if (view === "playground") {
      els.cheatsheetView.classList.add("hidden");
      els.courseWorkspace.classList.remove("hidden");
      els.courseWorkspace.classList.add("playground-mode");
      els.ideModeTag.textContent = "Modo Laboratorio Libre";
      els.verifyChallengeBtn.classList.add("hidden");
      els.resetCodeBtn.classList.add("hidden");
      updateEditorView();
    } else {
      els.cheatsheetView.classList.add("hidden");
      els.courseWorkspace.classList.remove("hidden");
      els.courseWorkspace.classList.remove("playground-mode");
      els.ideModeTag.textContent = "Modo Lección";
      els.verifyChallengeBtn.classList.remove("hidden");
      els.resetCodeBtn.classList.remove("hidden");
      selectLesson(state.currentLessonId);
    }
  }

  // Renderizar Cheatsheet con filtro de búsqueda y botón de copia rápida
  function renderCheatsheet(filterQuery = "") {
    const q = filterQuery.trim().toLowerCase();
    els.cheatsheetGrid.innerHTML = "";

    cheatsheet.forEach((sec) => {
      const matchingItems = sec.items.filter(
        (it) =>
          !q ||
          sec.category.toLowerCase().includes(q) ||
          it.syntax.toLowerCase().includes(q) ||
          it.desc.toLowerCase().includes(q)
      );

      if (matchingItems.length === 0) return;

      const card = document.createElement("div");
      card.className = "cheat-card";
      card.innerHTML = `<h3>${escapeHtml(sec.category)}</h3>`;

      matchingItems.forEach((it) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cheat-item";
        itemDiv.innerHTML = `
          <div class="cheat-syntax-bar">
            <code class="cheat-syntax">${highlightCpp(it.syntax)}</code>
            <button type="button" class="cheat-copy-btn" title="Copiar sintaxis">Copiar</button>
          </div>
          <div class="cheat-desc">${escapeHtml(it.desc)}</div>
        `;
        itemDiv.querySelector(".cheat-copy-btn").addEventListener("click", () => {
          navigator.clipboard?.writeText(it.syntax);
          showToast("Sintaxis copiada al portapapeles");
        });
        card.appendChild(itemDiv);
      });

      els.cheatsheetGrid.appendChild(card);
    });
  }

  // Verificar estado del compilador g++
  async function checkCompilerStatus() {
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      if (data.ok) {
        els.compilerStatusText.textContent = "g++ (C++17 Activo)";
        els.compilerStatusPill.title = data.compiler;
      } else {
        els.compilerStatusText.textContent = "g++ no disponible";
      }
    } catch (_) {
      els.compilerStatusText.textContent = "Servidor desconectado";
    }
  }

  // Alternar visibilidad de la barra lateral
  function toggleSidebar() {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    els.courseWorkspace.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
  }

  // Eventos del Editor (Resaltado, Scroll sincronizado, Auto-cierre de pares, Tab y Atajos)
  els.codeEditor.addEventListener("input", updateEditorView);
  els.codeEditor.addEventListener("click", updateCursorIndicator);
  els.codeEditor.addEventListener("keyup", updateCursorIndicator);

  els.codeEditor.addEventListener("scroll", () => {
    els.lineNumbers.scrollTop = els.codeEditor.scrollTop;
    if (els.codeHighlight) {
      els.codeHighlight.scrollTop = els.codeEditor.scrollTop;
      els.codeHighlight.scrollLeft = els.codeEditor.scrollLeft;
    }
  });

  const PAIR_MAP = {
    "{": "}",
    "(": ")",
    "[": "]",
    '"': '"',
    "'": "'"
  };

  els.codeEditor.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      if (state.activeView === "course") verifyChallenge();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCurrentCode();
      return;
    }

    const start = els.codeEditor.selectionStart;
    const end = els.codeEditor.selectionEnd;
    const val = els.codeEditor.value;

    // Tab y Shift+Tab
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        const lineStart = val.lastIndexOf("\n", start - 1) + 1;
        if (val.slice(lineStart, lineStart + 4) === "    ") {
          els.codeEditor.value = val.slice(0, lineStart) + val.slice(lineStart + 4);
          els.codeEditor.selectionStart = els.codeEditor.selectionEnd = Math.max(lineStart, start - 4);
          updateEditorView();
        }
      } else {
        els.codeEditor.value = val.substring(0, start) + "    " + val.substring(end);
        els.codeEditor.selectionStart = els.codeEditor.selectionEnd = start + 4;
        updateEditorView();
      }
      return;
    }

    // Enter con auto-indentación inteligente
    if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const lineStart = val.lastIndexOf("\n", start - 1) + 1;
      const currentLine = val.slice(lineStart, start);
      const indentMatch = currentLine.match(/^\s*/);
      const currentIndent = indentMatch ? indentMatch[0] : "";
      const prevChar = val[start - 1];
      const nextChar = val[end];

      if (prevChar === "{" && nextChar === "}") {
        const innerIndent = currentIndent + "    ";
        const insertStr = "\n" + innerIndent + "\n" + currentIndent;
        els.codeEditor.value = val.slice(0, start) + insertStr + val.slice(end);
        els.codeEditor.selectionStart = els.codeEditor.selectionEnd = start + 1 + innerIndent.length;
      } else {
        const extraIndent = prevChar === "{" ? "    " : "";
        const insertStr = "\n" + currentIndent + extraIndent;
        els.codeEditor.value = val.slice(0, start) + insertStr + val.slice(end);
        els.codeEditor.selectionStart = els.codeEditor.selectionEnd = start + insertStr.length;
      }
      updateEditorView();
      return;
    }

    // Auto-cerrado de llaves, paréntesis y comillas
    if (PAIR_MAP[e.key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const closing = PAIR_MAP[e.key];
      if (start === end) {
        // Si ya está el carácter de cierre justo delante, saltar sobre él
        if ((e.key === '"' || e.key === "'") && val[start] === e.key) {
          e.preventDefault();
          els.codeEditor.selectionStart = els.codeEditor.selectionEnd = start + 1;
          updateCursorIndicator();
          return;
        }
        e.preventDefault();
        els.codeEditor.value = val.slice(0, start) + e.key + closing + val.slice(end);
        els.codeEditor.selectionStart = els.codeEditor.selectionEnd = start + 1;
        updateEditorView();
      }
    }
  });

  // Atajos globales de teclado
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      toggleSidebar();
    } else if (e.altKey && e.key === "ArrowLeft") {
      e.preventDefault();
      els.prevLessonBtn.click();
    } else if (e.altKey && e.key === "ArrowRight") {
      e.preventDefault();
      els.nextLessonBtn.click();
    } else if (e.key === "Escape" && els.shortcutsModal && !els.shortcutsModal.classList.contains("hidden")) {
      els.shortcutsModal.classList.add("hidden");
    }
  });

  // Eventos de Botones y Navegación
  els.runCodeBtn.addEventListener("click", runCurrentCode);
  els.verifyChallengeBtn.addEventListener("click", verifyChallenge);

  if (els.toggleSidebarBtn) {
    els.toggleSidebarBtn.addEventListener("click", toggleSidebar);
  }

  if (els.sidebarFilters) {
    els.sidebarFilters.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.sidebarFilter = chip.dataset.filter;
        els.sidebarFilters.querySelectorAll(".filter-chip").forEach((c) => {
          c.classList.toggle("active", c === chip);
        });
        renderSidebar(els.lessonSearchInput.value);
      });
    });
  }

  if (els.copyEditorCodeBtn) {
    els.copyEditorCodeBtn.addEventListener("click", () => {
      navigator.clipboard?.writeText(els.codeEditor.value);
      showToast("Código de main.cpp copiado al portapapeles");
    });
  }

  if (els.fontDecreaseBtn) {
    els.fontDecreaseBtn.addEventListener("click", () => {
      state.editorFontSize = Math.max(11, state.editorFontSize - 1);
      applyEditorFontSize();
      saveState();
    });
  }

  if (els.fontIncreaseBtn) {
    els.fontIncreaseBtn.addEventListener("click", () => {
      state.editorFontSize = Math.min(20, state.editorFontSize + 1);
      applyEditorFontSize();
      saveState();
    });
  }

  if (els.stdinInput) {
    els.stdinInput.addEventListener("input", updateStdinBadge);
  }

  if (els.clearStdinBtn) {
    els.clearStdinBtn.addEventListener("click", () => {
      els.stdinInput.value = "";
      updateStdinBadge();
    });
  }

  if (els.clearTerminalBtn) {
    els.clearTerminalBtn.addEventListener("click", () => {
      els.terminalOutput.innerHTML = `<span class="terminal-muted">Consola limpia. Pulsa "▶ Ejecutar" o Ctrl + Enter.</span>`;
      els.execMetrics.textContent = "Listo para compilar";
    });
  }

  if (els.toggleTerminalSizeBtn) {
    els.toggleTerminalSizeBtn.addEventListener("click", () => {
      els.terminalSplit.classList.toggle("expanded");
    });
  }

  els.resetCodeBtn.addEventListener("click", () => {
    const lesson = getCurrentLesson();
    els.codeEditor.value = lesson.challenge.starterCode;
    els.stdinInput.value = lesson.challenge.defaultStdin || "";
    state.savedCode[lesson.id] = lesson.challenge.starterCode;
    saveState();
    updateStdinBadge();
    updateEditorView();
    showToast("Código restaurado a la plantilla inicial");
  });

  els.templateSelect.addEventListener("change", (e) => {
    const key = e.target.value;
    if (key && templates[key]) {
      els.codeEditor.value = templates[key].code;
      els.stdinInput.value = templates[key].stdin || "";
      updateStdinBadge();
      updateEditorView();
      showToast("Plantilla cargada en el editor");
    }
    e.target.value = "";
  });

  document.querySelectorAll(".lesson-tab").forEach((btn) => {
    btn.addEventListener("click", () => switchLessonTab(btn.dataset.tab));
  });

  els.goToQuizBtn.addEventListener("click", () => switchLessonTab("quiz"));
  els.goToChallengeBtn.addEventListener("click", () => switchLessonTab("challenge"));

  els.prevLessonBtn.addEventListener("click", () => {
    const idx = allLessons.findIndex((l) => l.id === state.currentLessonId);
    if (idx > 0) selectLesson(allLessons[idx - 1].id);
  });

  els.nextLessonBtn.addEventListener("click", () => {
    const idx = allLessons.findIndex((l) => l.id === state.currentLessonId);
    if (idx < allLessons.length - 1) selectLesson(allLessons[idx + 1].id);
  });

  els.lessonSearchInput.addEventListener("input", (e) => {
    renderSidebar(e.target.value);
  });

  if (els.cheatsheetSearchInput) {
    els.cheatsheetSearchInput.addEventListener("input", (e) => {
      renderCheatsheet(e.target.value);
    });
  }

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchMainView(btn.dataset.view));
  });

  if (els.shortcutsHelpBtn && els.shortcutsModal) {
    els.shortcutsHelpBtn.addEventListener("click", () => {
      els.shortcutsModal.classList.remove("hidden");
    });
    els.closeShortcutsModalBtn.addEventListener("click", () => {
      els.shortcutsModal.classList.add("hidden");
    });
    els.shortcutsModal.addEventListener("click", (e) => {
      if (e.target === els.shortcutsModal) {
        els.shortcutsModal.classList.add("hidden");
      }
    });
  }

  els.resetProgressBtn.addEventListener("click", () => {
    if (confirm("¿Deseas reiniciar todo tu progreso y puntos XP del curso?")) {
      localStorage.removeItem(STORAGE_KEY);
      state.completedLessons = {};
      state.savedCode = {};
      selectLesson(allLessons[0].id);
      showToast("Progreso del curso reiniciado");
    }
  });

  // Inicialización
  loadState();
  applyEditorFontSize();
  renderCheatsheet();
  selectLesson(state.currentLessonId);
  checkCompilerStatus();
})();
