const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const DB_KEY = "nxo_state_v1";

/* =========================================================
   NXO — TEMAS
========================================================= */

const themes = {

  midnight: {
    name: "NXO Midnight",
    level: 1,
    vars: {
      "--bg": "#08111f",
      "--bg2": "#0b1628",
      "--surface": "#101c2e",
      "--surface2": "#142238",
      "--text": "#f4f7fc",
      "--muted": "#93a4bc",
      "--accent": "#3977f6",
      "--accent2": "#6aa0ff",
      "--glass": "rgba(16,28,46,.82)"
    }
  },

  light: {
    name: "NXO Light",
    level: 1,
    vars: {
      "--bg": "#eef3fb",
      "--bg2": "#f7f9fc",
      "--surface": "#ffffff",
      "--surface2": "#edf2f8",
      "--text": "#122033",
      "--muted": "#6b7b90",
      "--accent": "#346ee8",
      "--accent2": "#5f91f7",
      "--glass": "rgba(255,255,255,.82)",
      "--line": "rgba(18,32,51,.08)"
    }
  },

  ocean: {
    name: "Ocean",
    level: 3,
    vars: {
      "--bg": "#071a24",
      "--bg2": "#0a2633",
      "--surface": "#0f3240",
      "--surface2": "#154150",
      "--text": "#edfaff",
      "--muted": "#8db7c5",
      "--accent": "#2ba9d8",
      "--accent2": "#65d5f7",
      "--glass": "rgba(15,50,64,.82)"
    }
  },

  forest: {
    name: "Forest",
    level: 5,
    vars: {
      "--bg": "#0a1712",
      "--bg2": "#0d2119",
      "--surface": "#133126",
      "--surface2": "#194031",
      "--text": "#f0fff7",
      "--muted": "#8db19e",
      "--accent": "#39b77a",
      "--accent2": "#76d7a8",
      "--glass": "rgba(19,49,38,.84)"
    }
  },

  oled: {
    name: "OLED Black",
    level: 7,
    vars: {
      "--bg": "#000000",
      "--bg2": "#050505",
      "--surface": "#0c0c0c",
      "--surface2": "#151515",
      "--text": "#ffffff",
      "--muted": "#9d9d9d",
      "--accent": "#4c83ff",
      "--accent2": "#7ca4ff",
      "--glass": "rgba(10,10,10,.88)"
    }
  },

  lavender: {
    name: "Lavender",
    level: 9,
    vars: {
      "--bg": "#171426",
      "--bg2": "#211a34",
      "--surface": "#2c2442",
      "--surface2": "#3a3055",
      "--text": "#faf6ff",
      "--muted": "#b3a7c6",
      "--accent": "#9975ff",
      "--accent2": "#c0a9ff",
      "--glass": "rgba(44,36,66,.84)"
    }
  },

  sunset: {
    name: "Sunset",
    level: 12,
    vars: {
      "--bg": "#211117",
      "--bg2": "#2a1720",
      "--surface": "#3b2028",
      "--surface2": "#4b2933",
      "--text": "#fff7f2",
      "--muted": "#c7a5a3",
      "--accent": "#ef7b68",
      "--accent2": "#ffad85",
      "--glass": "rgba(59,32,40,.84)"
    }
  },

  arctic: {
    name: "Arctic",
    level: 15,
    vars: {
      "--bg": "#0b1821",
      "--bg2": "#10232e",
      "--surface": "#163542",
      "--surface2": "#1d4553",
      "--text": "#f1fbff",
      "--muted": "#9bc0cc",
      "--accent": "#55c7da",
      "--accent2": "#98e8ef",
      "--glass": "rgba(22,53,66,.84)"
    }
  },

  gold: {
    name: "NXO Gold",
    level: 20,
    vars: {
      "--bg": "#17140c",
      "--bg2": "#201b0e",
      "--surface": "#302814",
      "--surface2": "#3d331a",
      "--text": "#fffaf0",
      "--muted": "#c2b28b",
      "--accent": "#d9ad42",
      "--accent2": "#f5d071",
      "--glass": "rgba(48,40,20,.84)"
    }
  },

  obsidian: {
    name: "Obsidian",
    level: 30,
    vars: {
      "--bg": "#09090f",
      "--bg2": "#101018",
      "--surface": "#171722",
      "--surface2": "#20202c",
      "--text": "#f7f7ff",
      "--muted": "#9b9bab",
      "--accent": "#7370ff",
      "--accent2": "#aaa8ff",
      "--glass": "rgba(23,23,34,.88)"
    }
  }

};


/* =========================================================
   FUNCIONES BÁSICAS
========================================================= */

function uid() {

  return (
    crypto.randomUUID?.() ||
    Math.random().toString(36).slice(2) + Date.now()
  );

}


function todayISO() {

  return new Date()
    .toISOString()
    .slice(0, 10);

}


/* =========================================================
   BASE DE DATOS INICIAL
========================================================= */

const fresh = () => ({

  version: 1,

  profile: {

    name: "Usuario",

    avatar: "🧑‍🚀",

    xp: 120,

    level: 1,

    coins: 25,

    theme: "midnight"

  },


  settings: {

    notifications: false,

    sounds: true,

    animations: true,

    compact: false,

    dailyGoal: 5,

    waterGoal: 2500

  },


  widgets: {

    next: true,

    tasks: true,

    habits: true,

    water: true,

    focus: true,

    money: true,

    fitness: true,

    goals: true,

    university: true,

    score: true

  },


  tasks: [

    {

      id: uid(),

      title: "Organizar prioridades de la semana",

      due: todayISO(),

      done: false,

      priority: "Alta",

      xp: 20

    },

    {

      id: uid(),

      title: "Estudiar 60 minutos",

      due: todayISO(),

      done: false,

      priority: "Media",

      xp: 30

    }

  ],


  courses: [

    {

      id: uid(),

      name: "Álgebra",

      color: "#3977f6",

      grades: [

        {

          name: "Prueba 1",

          grade: 5.2,

          weight: 30

        },

        {

          name: "Control",

          grade: 6.0,

          weight: 20

        }

      ],

      target: 4.0

    },


    {

      id: uid(),

      name: "Física",

      color: "#45d483",

      grades: [],

      target: 4.0

    }

  ],


  habits: [

    {

      id: uid(),

      name: "Tomar agua",

      icon: "💧",

      done: false,

      streak: 0

    },

    {

      id: uid(),

      name: "Moverme / entrenar",

      icon: "💪",

      done: false,

      streak: 0

    },

    {

      id: uid(),

      name: "Orden rápido",

      icon: "🧹",

      done: false,

      streak: 0

    }

  ],


  water: {

    date: todayISO(),

    ml: 0

  },


  focus: {

    seconds: 0,

    running: false,

    lastStart: null,

    totalToday: 0

  },


  fitness: {

    workouts: [],

    weight: 70

  },


  finance: {

    entries: [],

    monthlyBudget: 200000

  },


  goals: [

    {

      id: uid(),

      name: "Construir una rutina constante",

      progress: 25,

      target: 100

    }

  ],


  inbox: [],

  mood: [],

  notifications: [],


  history: {

    completedTasks: 0,

    studyMinutes: 0,

    workouts: 0,

    habitsCompleted: 0

  }

});


/* =========================================================
   GUARDADO LOCAL
========================================================= */

function load() {

  try {

    return Object.assign(

      fresh(),

      JSON.parse(
        localStorage.getItem(DB_KEY) || "null"
      ) || {}

    );

  }

  catch {

    return fresh();

  }

}


let state = load();

let route = "home";

let planTab = "tasks";


function save() {

  localStorage.setItem(
    DB_KEY,
    JSON.stringify(state)
  );

  applyTheme();

  renderHeader();

}


/* =========================================================
   TOAST
========================================================= */

function toast(message) {

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  document.body.appendChild(toast);


  setTimeout(() => {

    toast.remove();

  }, 1800);

}


/* =========================================================
   SISTEMA DE NIVELES
========================================================= */

function levelFromXP(xp) {

  return Math.max(

    1,

    Math.floor(
      Math.sqrt(xp / 120)
    ) + 1

  );

}


function levelStartXP(level) {

  return 120 *
    Math.pow(
      Math.max(0, level - 1),
      2
    );

}


function nextLevelXP(level) {

  return 120 *
    Math.pow(
      level,
      2
    );

}


function syncLevel() {

  const oldLevel =
    state.profile.level;


  state.profile.level =
    levelFromXP(
      state.profile.xp
    );


  if (
    state.profile.level >
    oldLevel
  ) {

    const difference =
      state.profile.level -
      oldLevel;


    state.profile.coins +=
      50 * difference;


    toast(
      `⬆️ Nivel ${state.profile.level} desbloqueado`
    );

  }

}


function addXP(
  amount,
  reason = ""
) {

  state.profile.xp += amount;

  syncLevel();

  save();


  if (reason) {

    toast(
      `+${amount} XP · ${reason}`
    );

  }

}


/* =========================================================
   TEMAS
========================================================= */

function applyTheme() {

  const theme =
    themes[
      state.profile.theme
    ] ||
    themes.midnight;


  Object.entries(
    theme.vars
  ).forEach(
    ([key, value]) => {

      document
        .documentElement
        .style
        .setProperty(
          key,
          value
        );

    }
  );


  document
    .querySelector(
      'meta[name="theme-color"]'
    )
    ?.setAttribute(
      "content",
      theme.vars["--bg"] ||
      "#08111f"
    );

}


/* =========================================================
   HEADER
========================================================= */

function renderHeader() {

  const hour =
    new Date().getHours();


  const part =
    hour < 12
      ? "Buenos días"
      : hour < 20
        ? "Buenas tardes"
        : "Buenas noches";


  $("#greeting").textContent =
    `${part}, ${state.profile.name}`;


  $("#todayLabel").textContent =
    new Intl.DateTimeFormat(
      "es-CL",
      {

        weekday: "long",

        day: "numeric",

        month: "long"

      }
    )
      .format(
        new Date()
      )
      .toUpperCase();

}


/* =========================================================
   UTILIDADES
========================================================= */

function percent(
  number,
  total
) {

  return total
    ? Math.round(
        number /
        total *
        100
      )
    : 0;

}


function todayTasks() {

  return state.tasks.filter(

    task =>
      task.due ===
      todayISO()

  );

}


/* =========================================================
   NXO SCORE
========================================================= */

function nxoScore() {

  const tasks =
    todayTasks();


  const taskScore =
    tasks.length
      ? percent(
          tasks.filter(
            task => task.done
          ).length,
          tasks.length
        )
      : 70;


  const habitScore =
    state.habits.length
      ? percent(
          state.habits.filter(
            habit => habit.done
          ).length,
          state.habits.length
        )
      : 70;


  const waterScore =
    Math.min(
      100,
      percent(
        state.water.ml,
        state.settings.waterGoal
      )
    );


  const focusScore =
    Math.min(
      100,
      Math.round(
        state.focus.totalToday /
        60
      )
    );


  return Math.round(

    taskScore * 0.35 +

    habitScore * 0.25 +

    waterScore * 0.15 +

    focusScore * 0.25

  );

}


/* =========================================================
   NAVEGACIÓN
========================================================= */

function render() {

  $$(".nav-item").forEach(
    button => {

      button.classList.toggle(

        "active",

        button.dataset.route ===
        route

      );

    }
  );


  if (route === "home")
    renderHome();


  if (route === "plan")
    renderPlan();


  if (route === "progress")
    renderProgress();


  if (route === "life")
    renderLife();


  if (route === "profile")
    renderProfile();


  save();

}


function go(newRoute) {

  route =
    newRoute;

  render();

}


/* =========================================================
   TÍTULOS DE SECCIÓN
========================================================= */

function sectionTitle(
  title,
  action = "",
  onclick = ""
) {

  return `

    <div class="section-title">

      <h3>
        ${title}
      </h3>

      ${
        action

        ?

        `
        <button
          onclick="${onclick}"
        >
          ${action}
        </button>
        `

        :

        ""
      }

    </div>

  `;

}


/* =========================================================
   HOME
========================================================= */

function renderHome() {

  const level =
    state.profile.level;


  const start =
    levelStartXP(level);


  const end =
    nextLevelXP(level);


  const progress =
    Math.max(
      0,
      Math.min(
        100,
        percent(
          state.profile.xp -
          start,

          end -
          start
        )
      )
    );


  const tasks =
    todayTasks();


  const completed =
    tasks.filter(
      task => task.done
    ).length;


  const enabled =
    state.widgets;


  $("#view").innerHTML = `

    <section class="hero">

      <div class="hero-row">

        <div style="flex:1">

          <div class="level">

            NIVEL ${level}
            ·
            ${state.profile.coins} NXC

          </div>


          <h2>

            ${state.profile.avatar}

            ${state.profile.name}

          </h2>


          <div class="muted">

            ${
              state.profile.xp -
              start
            }

            /

            ${
              end -
              start
            }

            XP para el siguiente nivel

          </div>


          <div
            class="progress"
            style="margin-top:10px"
          >

            <span
              style="width:${progress}%"
            ></span>

          </div>

        </div>


        <div class="score-orb">

          <div class="center">

            <strong>

              ${nxoScore()}

            </strong>

            <div
              class="muted"
              style="font-size:10px"
            >

              NXO SCORE

            </div>

          </div>

        </div>

      </div>

    </section>


    ${sectionTitle(
      "Tu día",
      "Editar",
      "openWidgetEditor()"
    )}


    <div class="grid">


      ${
        enabled.tasks

        ?

        `

        <article class="card">

          <div class="label">
            ✅ TAREAS
          </div>

          <div class="metric">

            ${completed}
            /
            ${tasks.length}

          </div>

          <div class="muted">

            ${
              tasks.length

              ?

              Math.max(
                0,
                tasks.length -
                completed
              ) +
              " pendientes"

              :

              "Día libre"
            }

          </div>

        </article>

        `

        :

        ""
      }


      ${
        enabled.water

        ?

        `

        <article
          class="card"
          onclick="addWater(250)"
        >

          <div class="label">
            💧 AGUA
          </div>

          <div class="metric">

            ${
              (
                state.water.ml /
                1000
              ).toFixed(1)
            }L

          </div>

          <div class="muted">

            Meta

            ${
              (
                state.settings
                  .waterGoal /
                1000
              ).toFixed(1)
            }L

            · toca +250ml

          </div>

        </article>

        `

        :

        ""
      }


      ${
        enabled.focus

        ?

        `

        <article
          class="card"
          onclick="openFocus()"
        >

          <div class="label">
            ⏱️ FOCUS
          </div>

          <div class="metric">

            ${
              Math.floor(
                state.focus
                  .totalToday /
                60
              )
            }h

            ${
              state.focus
                .totalToday %
              60
            }m

          </div>

          <div class="muted">
            Estudio hoy
          </div>

        </article>

        `

        :

        ""
      }


      ${
        enabled.money

        ?

        `

        <article class="card">

          <div class="label">
            💰 MES
          </div>

          <div class="metric">

            $${monthSpent()
              .toLocaleString(
                "es-CL"
              )}

          </div>

          <div class="muted">

            de

            $${state.finance
              .monthlyBudget
              .toLocaleString(
                "es-CL"
              )}

          </div>

        </article>

        `

        :

        ""
      }


      ${
        enabled.habits

        ?

        `

        <article
          class="card full"
        >

          <div class="label">
            🔥 HÁBITOS
          </div>

          <div class="metric">

            ${
              state.habits.filter(
                habit =>
                  habit.done
              ).length
            }

            /

            ${state.habits.length}

          </div>


          <div class="progress">

            <span
              style="
              width:
              ${
                percent(

                  state.habits
                    .filter(
                      habit =>
                        habit.done
                    )
                    .length,

                  state.habits
                    .length

                )
              }%
              "
            ></span>

          </div>

        </article>

        `

        :

        ""
      }


      ${
        enabled.goals &&
        state.goals[0]

        ?

        `

        <article
          class="card full"
        >

          <div class="label">

            🎯 OBJETIVO PRINCIPAL

          </div>


          <div
            style="
            font-weight:800;
            margin:6px 0
            "
          >

            ${
              esc(
                state.goals[0]
                  .name
              )
            }

          </div>


          <div class="progress">

            <span
              style="
              width:
              ${
                Math.min(

                  100,

                  state.goals[0]
                    .progress /

                  state.goals[0]
                    .target *

                  100

                )
              }%
              "
            ></span>

          </div>

        </article>

        `

        :

        ""
      }

    </div>


    ${sectionTitle(
      "Misiones de hoy",
      "Ver plan",
      "go('plan')"
    )}


    <div class="list">

      ${
        tasks.length

        ?

        tasks
          .slice(0, 5)
          .map(taskItem)
          .join("")

        :

        `

        <div class="card muted">

          No tienes tareas para hoy.

          Pulsa ＋ para añadir una.

        </div>

        `
      }

    </div>


    ${sectionTitle(
      "NXO Coach"
    )}


    <div class="card">

      ${coachMessage()}

    </div>

  `;

}


/* =========================================================
   NXO COACH
========================================================= */

function coachMessage() {

  const tasks =
    todayTasks();


  const pending =
    tasks.filter(
      task => !task.done
    ).length;


  if (pending >= 5) {

    return `

      Tienes

      <b>${pending} tareas pendientes</b>.

      Prioriza solo las 3 más importantes

      y mueve el resto si es necesario.

    `;

  }


  if (
    state.focus.totalToday < 30 &&
    pending
  ) {

    return `

      Aún llevas poco tiempo de enfoque hoy.

      Una sesión de

      <b>30 minutos</b>

      puede darte impulso sin saturar el día.

    `;

  }


  if (
    state.water.ml <
    state.settings.waterGoal *
    0.4
  ) {

    return `

      Tu registro de agua está bajo.

      Puedes tocar la tarjeta de agua

      para sumar

      <b>250 ml</b>.

    `;

  }


  return `

    Vas bien.

    Tu NXO Score actual es

    <b>${nxoScore()}/100</b>.

    Mantén el día simple y consistente.

  `;

}


/* =========================================================
   TAREAS
========================================================= */

function taskItem(task) {

  return `

    <div class="item">

      <button
        class="
          check
          ${task.done ? "done" : ""}
        "
        onclick="
          toggleTask('${task.id}')
        "
      >

        ${task.done ? "✓" : ""}

      </button>


      <div class="item-main">

        <div class="item-title">

          ${esc(task.title)}

        </div>

        <div class="item-sub">

          ${task.due}
          ·
          ${task.priority}

        </div>

      </div>


      <span class="badge">

        +${task.xp || 20} XP

      </span>

    </div>

  `;

}


function toggleTask(id) {

  const task =
    state.tasks.find(
      task => task.id === id
    );


  if (!task)
    return;


  task.done =
    !task.done;


  if (task.done) {

    state.history
      .completedTasks++;


    addXP(
      task.xp || 20,
      "Tarea completada"
    );

  }

  else {

    state.profile.xp =
      Math.max(
        0,
        state.profile.xp -
        (task.xp || 20)
      );

  }


  save();

  render();

}


/* =========================================================
   AGUA
========================================================= */

function addWater(ml) {

  if (
    state.water.date !==
    todayISO()
  ) {

    state.water = {

      date: todayISO(),

      ml: 0

    };

  }


  state.water.ml += ml;


  save();


  toast(
    `💧 +${ml} ml`
  );


  render();

}


/* =========================================================
   PLAN
========================================================= */

function renderPlan() {

  $("#view").innerHTML = `

    <div class="tabs">

      ${
        [
          "tasks",
          "university",
          "goals",
          "inbox"
        ]
        .map(tab => `

          <button
            class="
              tab
              ${
                planTab === tab
                ? "active"
                : ""
              }
            "
            onclick="
              setPlanTab('${tab}')
            "
          >

            ${
              {

                tasks: "Tareas",

                university:
                  "Universidad",

                goals:
                  "Objetivos",

                inbox:
                  "Inbox"

              }[tab]
            }

          </button>

        `)
        .join("")
      }

    </div>


    <div id="planBody"></div>

  `;


  renderPlanBody();

}


function setPlanTab(tab) {

  planTab = tab;

  renderPlan();

}


/* =========================================================
   CONTENIDO PLAN
========================================================= */

function renderPlanBody() {

  const element =
    $("#planBody");


  if (
    planTab ===
    "tasks"
  ) {

    element.innerHTML =

      sectionTitle(
        "Todas las tareas"
      )

      +

      `

      <div class="list">

        ${
          state.tasks
            .map(taskItem)
            .join("")

          ||

          `

          <div class="card muted">

            Sin tareas.

          </div>

          `
        }

      </div>

      `;

  }


  if (
    planTab ===
    "university"
  ) {

    element.innerHTML =

      sectionTitle(
        "Universidad",
        "Añadir ramo",
        "openAddCourse()"
      )

      +

      `

      <div class="list">

        ${
          state.courses
            .map(courseCard)
            .join("")
        }

      </div>

      `;

  }


  if (
    planTab ===
    "goals"
  ) {

    element.innerHTML =

      sectionTitle(
        "Objetivos",
        "Añadir",
        "openAddGoal()"
      )

      +

      `

      <div class="list">

        ${
          state.goals
            .map(goal => `

              <div class="card">

                <b>

                  ${esc(goal.name)}

                </b>


                <div
                  class="muted"
                  style="margin:6px 0"
                >

                  ${goal.progress}

                  /

                  ${goal.target}

                </div>


                <div class="progress">

                  <span
                    style="
                    width:
                    ${
                      Math.min(
                        100,
                        goal.progress /
                        goal.target *
                        100
                      )
                    }%
                    "
                  ></span>

                </div>


                <div
                  class="btn-row"
                  style="margin-top:10px"
                >

                  <button
                    class="btn secondary"
                    onclick="
                      bumpGoal(
                        '${goal.id}',
                        5
                      )
                    "
                  >

                    +5

                  </button>


                  <button
                    class="btn secondary"
                    onclick="
                      bumpGoal(
                        '${goal.id}',
                        10
                      )
                    "
                  >

                    +10

                  </button>

                </div>

              </div>

            `)
            .join("")
        }

      </div>

      `;

  }


  if (
    planTab ===
    "inbox"
  ) {

    element.innerHTML =

      sectionTitle(
        "Brain dump"
      )

      +

      `

      <div class="field">

        <textarea
          id="inboxText"
          placeholder="
          Escribe cualquier idea,
          pendiente o cosa que
          no quieras olvidar...
          "
        ></textarea>

      </div>


      <button
        class="btn"
        onclick="addInbox()"
      >

        Guardar en Inbox

      </button>


      <div
        class="list"
        style="margin-top:12px"
      >

        ${
          state.inbox
            .map(item => `

              <div class="item">

                <div class="item-main">

                  ${esc(item.text)}

                  <div class="item-sub">

                    ${item.date}

                  </div>

                </div>


                <button
                  class="btn secondary"
                  onclick="
                    inboxToTask(
                      '${item.id}'
                    )
                  "
                >

                  → Tarea

                </button>

              </div>

            `)
            .join("")
        }

      </div>

      `;

  }

}


/* =========================================================
   UNIVERSIDAD
========================================================= */

function courseCard(course) {

  const average =
    courseAverage(course);


  return `

    <div class="card">

      <div
        style="
        display:flex;
        justify-content:space-between
        "
      >

        <b>

          ${esc(course.name)}

        </b>


        <span class="badge">

          ${course.grades.length}
          notas

        </span>

      </div>


      <div class="metric">

        ${
          average
            ? average.toFixed(2)
            : "—"
        }

      </div>


      <div class="muted">

        Promedio ponderado registrado

      </div>


      <div
        class="btn-row"
        style="margin-top:10px"
      >

        <button
          class="btn secondary"
          onclick="
            openCourse(
              '${course.id}'
            )
          "
        >

          Ver ramo

        </button>

      </div>

    </div>

  `;

}


function courseAverage(course) {

  const totalWeight =
    course.grades.reduce(

      (total, grade) =>
        total +
        Number(
          grade.weight || 0
        ),

      0

    );


  if (!totalWeight)
    return 0;


  return (

    course.grades.reduce(

      (total, grade) =>

        total +

        Number(grade.grade) *

        Number(
          grade.weight || 0
        ),

      0

    )

    /

    totalWeight

  );

}


function requiredGrade(
  course,
  remainingWeight
) {

  const obtained =
    course.grades.reduce(

      (total, grade) =>

        total +

        Number(grade.grade) *

        Number(
          grade.weight || 0
        ) /
        100,

      0

    );


  return (

    course.target -
    obtained

  )

  /

  (
    remainingWeight /
    100
  );

}


/* =========================================================
   PROGRESO
========================================================= */

function renderProgress() {

  $("#view").innerHTML = `

    ${sectionTitle(
      "Tu progreso"
    )}


    <div class="grid">


      <article class="card">

        <div class="label">
          ⚡ XP TOTAL
        </div>

        <div class="metric">

          ${state.profile.xp}

        </div>

      </article>


      <article class="card">

        <div class="label">
          ⬆️ NIVEL
        </div>

        <div class="metric">

          ${state.profile.level}

        </div>

      </article>


      <article class="card">

        <div class="label">
          ✅ TAREAS
        </div>

        <div class="metric">

          ${
            state.history
              .completedTasks
          }

        </div>

      </article>


      <article class="card">

        <div class="label">
          📚 ESTUDIO
        </div>

        <div class="metric">

          ${
            Math.round(
              state.history
                .studyMinutes /
              60
            )
          }h

        </div>

      </article>


      <article class="card">

        <div class="label">
          💪 GYM
        </div>

        <div class="metric">

          ${
            state.history
              .workouts
          }

        </div>

      </article>


      <article class="card">

        <div class="label">
          🔥 HÁBITOS
        </div>

        <div class="metric">

          ${
            state.history
              .habitsCompleted
          }

        </div>

      </article>


      <article
        class="card full"
      >

        <div class="label">

          NXO SCORE

        </div>


        <div class="metric">

          ${nxoScore()}/100

        </div>


        <div class="progress">

          <span
            style="
            width:
            ${nxoScore()}%
            "
          ></span>

        </div>

      </article>

    </div>


    ${sectionTitle(
      "Reportes"
    )}


    <div class="card">

      <p class="muted">

        Genera un PDF con tus
        estadísticas actuales,
        universidad, hábitos,
        finanzas y progreso.

      </p>


      <div class="btn-row">

        <button
          class="btn"
          onclick="generatePDF()"
        >

          Generar PDF

        </button>


        <button
          class="btn secondary"
          onclick="window.print()"
        >

          Imprimir / Guardar PDF

        </button>

      </div>

    </div>

  `;

}


/* =========================================================
   VIDA
========================================================= */

function renderLife() {

  $("#view").innerHTML = `

    ${sectionTitle(
      "Hábitos",
      "Añadir",
      "openAddHabit()"
    )}


    <div class="list">

      ${
        state.habits
          .map(habit => `

            <div class="item">

              <button
                class="
                  check
                  ${
                    habit.done
                      ? "done"
                      : ""
                  }
                "
                onclick="
                  toggleHabit(
                    '${habit.id}'
                  )
                "
              >

                ${
                  habit.done
                    ? "✓"
                    : ""
                }

              </button>


              <div class="item-main">

                <div class="item-title">

                  ${habit.icon}

                  ${esc(habit.name)}

                </div>


                <div class="item-sub">

                  Racha

                  ${habit.streak || 0}

                  días

                </div>

              </div>

            </div>

          `)
          .join("")
      }

    </div>


    ${sectionTitle(
      "Focus"
    )}


    <div class="card center">

      <div class="focus-clock">

        ${
          formatTime(
            getFocusSeconds()
          )
        }

      </div>


      <button
        class="btn"
        onclick="openFocus()"
      >

        Abrir Focus

      </button>

    </div>


    ${sectionTitle(
      "Fitness",
      "Registrar",
      "openWorkout()"
    )}


    <div class="grid">


      <article class="card">

        <div class="label">
          PESO
        </div>

        <div class="metric">

          ${state.fitness.weight}
          kg

        </div>

      </article>


      <article class="card">

        <div class="label">
          SESIONES
        </div>

        <div class="metric">

          ${
            state.fitness
              .workouts
              .length
          }

        </div>

      </article>

    </div>


    ${sectionTitle(
      "Dinero",
      "Añadir gasto",
      "openExpense()"
    )}


    <div class="card">

      <div class="label">

        GASTADO ESTE MES

      </div>


      <div class="metric">

        $${monthSpent()
          .toLocaleString(
            "es-CL"
          )}

      </div>


      <div class="progress">

        <span
          style="
          width:
          ${
            Math.min(

              100,

              monthSpent() /

              state.finance
                .monthlyBudget *

              100

            )
          }%
          "
        ></span>

      </div>


      <div
        class="muted"
        style="margin-top:7px"
      >

        Presupuesto:

        $${state.finance
          .monthlyBudget
          .toLocaleString(
            "es-CL"
          )}

      </div>

    </div>


    ${sectionTitle(
      "Check-in"
    )}


    <div class="card">

      <div class="quick-grid">

        ${
          [
            "😫",
            "😕",
            "😐",
            "🙂",
            "😄"
          ]
          .map(
            (emoji, index) => `

              <button
                class="quick"
                onclick="
                  logMood(
                    ${index + 1},
                    '${emoji}'
                  )
                "
              >

                <span>

                  ${emoji}

                </span>

                <small>

                  ${index + 1}/5

                </small>

              </button>

            `
          )
          .join("")
        }

      </div>

    </div>

  `;

}


/* =========================================================
   HÁBITOS
========================================================= */

function toggleHabit(id) {

  const habit =
    state.habits.find(
      habit =>
        habit.id === id
    );


  if (!habit)
    return;


  habit.done =
    !habit.done;


  if (habit.done) {

    habit.streak =
      (habit.streak || 0) +
      1;


    state.history
      .habitsCompleted++;


    addXP(
      10,
      "Hábito"
    );

  }

  else {

    habit.streak =
      Math.max(

        0,

        (habit.streak || 0) -
        1

      );

  }


  save();

  render();

}


/* =========================================================
   ESTADO DE ÁNIMO
========================================================= */

function logMood(
  value,
  emoji
) {

  state.mood.push({

    date:
      new Date()
        .toISOString(),

    value

  });


  save();


  toast(
    `${emoji} Check-in guardado`
  );

}


/* =========================================================
   PERFIL
========================================================= */

function renderProfile() {

  $("#view").innerHTML = `

    <section
      class="hero center"
    >

      <div
        style="font-size:54px"
      >

        ${state.profile.avatar}

      </div>


      <h2>

        ${esc(
          state.profile.name
        )}

      </h2>


      <div class="badge">

        Nivel
        ${state.profile.level}

        ·

        ${state.profile.xp}
        XP

        ·

        ${state.profile.coins}
        NXC

      </div>

    </section>


    ${sectionTitle(
      "Personalización"
    )}


    <div class="card">

      <button
        class="btn"
        onclick="openThemes()"
      >

        Cambiar tema

      </button>


      <button
        class="btn secondary"
        onclick="
          openProfileEdit()
        "
      >

        Editar perfil

      </button>

    </div>


    ${sectionTitle(
      "Datos y privacidad"
    )}


    <div class="card">

      <div class="btn-row">

        <button
          class="btn secondary"
          onclick="
            exportBackup()
          "
        >

          Exportar backup

        </button>


        <button
          class="btn secondary"
          onclick="
            $('#importFile').click()
          "
        >

          Importar backup

        </button>


        <button
          class="btn secondary"
          onclick="
            generatePDF()
          "
        >

          PDF de progreso

        </button>

      </div>

    </div>


    ${sectionTitle(
      "Notificaciones"
    )}


    <div class="card">

      <p class="muted">

        Activa permisos y prueba
        una notificación.

        Los avisos programados
        cuando NXO está totalmente
        cerrada requieren un
        servidor Web Push.

      </p>


      <div class="btn-row">

        <button
          class="btn"
          onclick="
            enableNotifications()
          "
        >

          Activar notificaciones

        </button>


        <button
          class="btn secondary"
          onclick="
            testNotification()
          "
        >

          Probar

        </button>

      </div>

    </div>


    ${sectionTitle(
      "Sistema"
    )}


    <div class="card">

      <div class="btn-row">

        <button
          class="btn secondary"
          onclick="
            openSettings()
          "
        >

          Configuración

        </button>


        <button
          class="btn danger"
          onclick="
            resetNXO()
          "
        >

          Restablecer NXO

        </button>

      </div>

    </div>

  `;

}


/* =========================================================
   SHEET
========================================================= */

function openSheet(html) {

  $("#sheetContent")
    .innerHTML =
    html;


  $("#sheet")
    .showModal();

}


function closeSheet() {

  try {

    $("#sheet").close();

  }

  catch {}

}


/* =========================================================
   MENÚ RÁPIDO
========================================================= */

function openQuickAdd() {

  openSheet(`

    <h2>
      Añadir a NXO
    </h2>


    <div class="quick-grid">


      <button
        type="button"
        class="quick"
        onclick="
          openAddTask()
        "
      >

        <span>✅</span>

        <small>
          Tarea
        </small>

      </button>


      <button
        type="button"
        class="quick"
        onclick="
          openAddHabit()
        "
      >

        <span>🔥</span>

        <small>
          Hábito
        </small>

      </button>


      <button
        type="button"
        class="quick"
        onclick="
          openAddCourse()
        "
      >

        <span>🎓</span>

        <small>
          Ramo
        </small>

      </button>


      <button
        type="button"
        class="quick"
        onclick="
          openAddGoal()
        "
      >

        <span>🎯</span>

        <small>
          Objetivo
        </small>

      </button>


      <button
        type="button"
        class="quick"
        onclick="
          openExpense()
        "
      >

        <span>💰</span>

        <small>
          Gasto
        </small>

      </button>


      <button
        type="button"
        class="quick"
        onclick="
          openWorkout()
        "
      >

        <span>💪</span>

        <small>
          Gym
        </small>

      </button>


      <button
        type="button"
        class="quick"
        onclick="
          openFocus()
        "
      >

        <span>⏱️</span>

        <small>
          Focus
        </small>

      </button>


      <button
        type="button"
        class="quick"
        onclick="
          goInbox()
        "
      >

        <span>🧠</span>

        <small>
          Inbox
        </small>

      </button>


      <button
        type="button"
        class="quick"
        onclick="
          addWater(250);
          closeSheet()
        "
      >

        <span>💧</span>

        <small>
          +250 ml
        </small>

      </button>

    </div>

  `);

}


/* =========================================================
   AÑADIR TAREA
========================================================= */

function openAddTask() {

  openSheet(`

    <h2>
      Nueva tarea
    </h2>


    <div class="field">

      <label>
        Título
      </label>

      <input
        id="taskTitle"
        placeholder="
          ¿Qué tienes que hacer?
        "
      >

    </div>


    <div class="field">

      <label>
        Fecha
      </label>

      <input
        id="taskDue"
        type="date"
        value="${todayISO()}"
      >

    </div>


    <div class="field">

      <label>
        Prioridad
      </label>


      <select
        id="taskPriority"
      >

        <option>
          Alta
        </option>

        <option selected>
          Media
        </option>

        <option>
          Baja
        </option>

      </select>

    </div>


    <button
      type="button"
      class="btn"
      onclick="addTask()"
    >

      Guardar tarea

    </button>

  `);

}


function addTask() {

  const title =
    $("#taskTitle")
      .value
      .trim();


  if (!title)
    return;


  state.tasks.unshift({

    id: uid(),

    title,

    due:
      $("#taskDue").value ||
      todayISO(),

    priority:
      $("#taskPriority")
        .value,

    done: false,

    xp: 20

  });


  save();

  closeSheet();

  render();

  toast(
    "Tarea añadida"
  );

}


/* =========================================================
   AÑADIR HÁBITO
========================================================= */

function openAddHabit() {

  openSheet(`

    <h2>
      Nuevo hábito
    </h2>


    <div class="field">

      <label>
        Nombre
      </label>

      <input
        id="habitName"
        placeholder="
          Ej. Leer 20 minutos
        "
      >

    </div>


    <div class="field">

      <label>
        Emoji
      </label>

      <input
        id="habitIcon"
        value="🔥"
      >

    </div>


    <button
      type="button"
      class="btn"
      onclick="addHabit()"
    >

      Guardar hábito

    </button>

  `);

}


function addHabit() {

  const name =
    $("#habitName")
      .value
      .trim();


  if (!name)
    return;


  state.habits.push({

    id: uid(),

    name,

    icon:
      $("#habitIcon").value ||
      "🔥",

    done: false,

    streak: 0

  });


  save();

  closeSheet();

  render();

}


/* =========================================================
   AÑADIR RAMO
========================================================= */

function openAddCourse() {

  openSheet(`

    <h2>
      Nuevo ramo
    </h2>


    <div class="field">

      <label>
        Nombre
      </label>

      <input
        id="courseName"
        placeholder="
          Ej. Cálculo II
        "
      >

    </div>


    <div class="field">

      <label>
        Nota objetivo
      </label>

      <input
        id="courseTarget"
        type="number"
        min="1"
        max="7"
        step=".1"
        value="4.0"
      >

    </div>


    <button
      type="button"
      class="btn"
      onclick="addCourse()"
    >

      Guardar ramo

    </button>

  `);

}


function addCourse() {

  const name =
    $("#courseName")
      .value
      .trim();


  if (!name)
    return;


  state.courses.push({

    id: uid(),

    name,

    color: "#3977f6",

    grades: [],

    target:
      Number(
        $("#courseTarget")
          .value ||
        4
      )

  });


  save();

  closeSheet();

  render();

}


/* =========================================================
   ABRIR RAMO
========================================================= */

function openCourse(id) {

  const course =
    state.courses.find(
      course =>
        course.id === id
    );


  if (!course)
    return;


  const used =
    course.grades.reduce(

      (total, grade) =>
        total +
        Number(
          grade.weight
        ),

      0

    );


  const remaining =
    Math.max(
      0,
      100 - used
    );


  const required =
    remaining
      ? requiredGrade(
          course,
          remaining
        )
      : null;


  openSheet(`

    <h2>

      ${esc(course.name)}

    </h2>


    <div class="kpi-row">


      <div class="kpi">

        <strong>

          ${
            courseAverage(course)

            ?

            courseAverage(course)
              .toFixed(2)

            :

            "—"
          }

        </strong>

        <small>
          promedio
        </small>

      </div>


      <div class="kpi">

        <strong>

          ${used}%

        </strong>

        <small>
          registrado
        </small>

      </div>


      <div class="kpi">

        <strong>

          ${
            required
              ? required.toFixed(2)
              : "—"
          }

        </strong>

        <small>
          requiere
        </small>

      </div>

    </div>


    ${
      course.grades
        .map(grade => `

          <div class="item">

            <div class="item-main">

              <b>

                ${esc(grade.name)}

              </b>

              <div class="item-sub">

                ${grade.weight}%

              </div>

            </div>


            <b>

              ${grade.grade}

            </b>

          </div>

        `)
        .join("")
    }


    <div class="field">

      <label>
        Evaluación
      </label>

      <input
        id="gradeName"
        placeholder="Prueba 2"
      >

    </div>


    <div class="grid">


      <div class="field">

        <label>
          Nota
        </label>

        <input
          id="gradeValue"
          type="number"
          min="1"
          max="7"
          step=".1"
        >

      </div>


      <div class="field">

        <label>
          Peso %
        </label>

        <input
          id="gradeWeight"
          type="number"
          min="1"
          max="100"
        >

      </div>

    </div>


    <button
      type="button"
      class="btn"
      onclick="
        addGrade('${course.id}')
      "
    >

      Añadir nota

    </button>

  `);

}


/* =========================================================
   AÑADIR NOTA
========================================================= */

function addGrade(id) {

  const course =
    state.courses.find(
      course =>
        course.id === id
    );


  const name =
    $("#gradeName")
      .value
      .trim();


  const grade =
    Number(
      $("#gradeValue")
        .value
    );


  const weight =
    Number(
      $("#gradeWeight")
        .value
    );


  if (
    !course ||
    !name ||
    !grade ||
    !weight
  )
    return;


  course.grades.push({

    name,

    grade,

    weight

  });


  save();

  openCourse(id);

}


/* =========================================================
   OBJETIVOS
========================================================= */

function openAddGoal() {

  openSheet(`

    <h2>
      Nuevo objetivo
    </h2>


    <div class="field">

      <label>
        Objetivo
      </label>

      <input
        id="goalName"
        placeholder="
          Ej. Ahorrar $500.000
        "
      >

    </div>


    <div class="field">

      <label>
        Meta numérica
      </label>

      <input
        id="goalTarget"
        type="number"
        value="100"
      >

    </div>


    <button
      type="button"
      class="btn"
      onclick="addGoal()"
    >

      Guardar

    </button>

  `);

}


function addGoal() {

  const name =
    $("#goalName")
      .value
      .trim();


  if (!name)
    return;


  state.goals.push({

    id: uid(),

    name,

    progress: 0,

    target:
      Number(
        $("#goalTarget")
          .value ||
        100
      )

  });


  save();

  closeSheet();

  render();

}


function bumpGoal(
  id,
  amount
) {

  const goal =
    state.goals.find(
      goal =>
        goal.id === id
    );


  if (!goal)
    return;


  goal.progress =
    Math.min(

      goal.target,

      goal.progress +
      amount

    );


  save();

  render();


  if (
    goal.progress >=
    goal.target
  ) {

    addXP(
      250,
      "Objetivo completado"
    );

  }

}


/* =========================================================
   INBOX
========================================================= */

function addInbox() {

  const text =
    $("#inboxText")
      .value
      .trim();


  if (!text)
    return;


  state.inbox.unshift({

    id: uid(),

    text,

    date:
      new Date()
        .toLocaleString(
          "es-CL"
        )

  });


  save();

  renderPlan();

}


function inboxToTask(id) {

  const item =
    state.inbox.find(
      item =>
        item.id === id
    );


  if (!item)
    return;


  state.tasks.unshift({

    id: uid(),

    title:
      item.text,

    due:
      todayISO(),

    done:
      false,

    priority:
      "Media",

    xp:
      20

  });


  state.inbox =
    state.inbox.filter(
      item =>
        item.id !== id
    );


  save();

  renderPlan();


  toast(
    "Convertido en tarea"
  );

}


function goInbox() {

  closeSheet();

  route = "plan";

  planTab = "inbox";

  render();

}


/* =========================================================
   FOCUS MODE
========================================================= */

let focusInterval =
  null;


function getFocusSeconds() {

  if (
    state.focus.running &&
    state.focus.lastStart
  ) {

    return (

      state.focus.seconds +

      Math.floor(

        (
          Date.now() -
          state.focus.lastStart
        )

        /

        1000

      )

    );

  }


  return state.focus.seconds;

}


function formatTime(seconds) {

  const hours =
    Math.floor(
      seconds / 3600
    );


  const minutes =
    Math.floor(
      (
        seconds % 3600
      ) /
      60
    );


  const secs =
    seconds % 60;


  if (hours) {

    return `

      ${String(hours).padStart(2, "0")}:

      ${String(minutes).padStart(2, "0")}:

      ${String(secs).padStart(2, "0")}

    `.replace(/\s/g, "");

  }


  return `

    ${String(minutes).padStart(2, "0")}:

    ${String(secs).padStart(2, "0")}

  `.replace(/\s/g, "");

}


function openFocus() {

  openSheet(`

    <h2>
      Focus Mode
    </h2>


    <div
      class="focus-clock"
      id="focusClock"
    >

      ${
        formatTime(
          getFocusSeconds()
        )
      }

    </div>


    <div class="center">

      <div
        class="btn-row"
        style="
          justify-content:center
        "
      >

        <button
          type="button"
          class="btn"
          onclick="
            toggleFocus()
          "
        >

          ${
            state.focus.running
              ? "Pausar"
              : "Iniciar"
          }

        </button>


        <button
          type="button"
          class="btn secondary"
          onclick="
            finishFocus()
          "
        >

          Finalizar sesión

        </button>

      </div>

    </div>

  `);


  clearInterval(
    focusInterval
  );


  focusInterval =
    setInterval(
      () => {

        const clock =
          $("#focusClock");


        if (clock) {

          clock.textContent =
            formatTime(
              getFocusSeconds()
            );

        }

      },

      1000

    );

}


function toggleFocus() {

  if (
    state.focus.running
  ) {

    state.focus.seconds =
      getFocusSeconds();


    state.focus.lastStart =
      null;


    state.focus.running =
      false;

  }

  else {

    state.focus.lastStart =
      Date.now();


    state.focus.running =
      true;

  }


  save();

  openFocus();

}


function finishFocus() {

  const seconds =
    getFocusSeconds();


  const minutes =
    Math.max(

      1,

      Math.round(
        seconds /
        60
      )

    );


  state.focus = {

    seconds: 0,

    running: false,

    lastStart: null,

    totalToday:

      state.focus.totalToday +
      minutes

  };


  state.history
    .studyMinutes +=
    minutes;


  addXP(

    Math.min(
      120,
      minutes
    ),

    `${minutes} min de Focus`

  );


  save();


  clearInterval(
    focusInterval
  );


  closeSheet();

  render();

}


/* =========================================================
   FITNESS
========================================================= */

function openWorkout() {

  openSheet(`

    <h2>
      Registrar entrenamiento
    </h2>


    <div class="field">

      <label>
        Tipo
      </label>

      <input
        id="workoutType"
        placeholder="
          Push / Pull / Pierna / Full body
        "
      >

    </div>


    <div class="field">

      <label>
        Duración (min)
      </label>

      <input
        id="workoutMin"
        type="number"
        value="60"
      >

    </div>


    <div class="field">

      <label>
        Notas
      </label>

      <textarea
        id="workoutNotes"
        placeholder="
          Ejercicios,
          pesos,
          sensaciones...
        "
      ></textarea>

    </div>


    <button
      type="button"
      class="btn"
      onclick="
        saveWorkout()
      "
    >

      Guardar entrenamiento

    </button>

  `);

}


function saveWorkout() {

  const type =
    $("#workoutType")
      .value
      .trim()

    ||

    "Entrenamiento";


  const minutes =
    Number(
      $("#workoutMin")
        .value ||
      60
    );


  state.fitness
    .workouts
    .unshift({

      id: uid(),

      date:
        new Date()
          .toISOString(),

      type,

      mins:
        minutes,

      notes:
        $("#workoutNotes")
          .value

    });


  state.history
    .workouts++;


  addXP(
    80,
    "Entrenamiento"
  );


  save();

  closeSheet();

  render();

}


/* =========================================================
   FINANZAS
========================================================= */

function openExpense() {

  openSheet(`

    <h2>
      Registrar gasto
    </h2>


    <div class="field">

      <label>
        Monto
      </label>

      <input
        id="expenseAmount"
        type="number"
        inputmode="numeric"
        placeholder="5000"
      >

    </div>


    <div class="field">

      <label>
        Categoría
      </label>


      <select
        id="expenseCat"
      >

        <option>
          Comida
        </option>

        <option>
          Transporte
        </option>

        <option>
          Universidad
        </option>

        <option>
          Gym
        </option>

        <option>
          Ocio
        </option>

        <option>
          Compras
        </option>

        <option>
          Otro
        </option>

      </select>

    </div>


    <div class="field">

      <label>
        Descripción
      </label>

      <input
        id="expenseDesc"
        placeholder="Opcional"
      >

    </div>


    <button
      type="button"
      class="btn"
      onclick="
        saveExpense()
      "
    >

      Guardar gasto

    </button>

  `);

}


function saveExpense() {

  const amount =
    Number(
      $("#expenseAmount")
        .value
    );


  if (!amount)
    return;


  state.finance
    .entries
    .unshift({

      id: uid(),

      amount,

      category:
        $("#expenseCat")
          .value,

      description:
        $("#expenseDesc")
          .value,

      date:
        new Date()
          .toISOString()

    });


  save();

  closeSheet();

  render();


  toast(
    "Gasto guardado"
  );

}


function monthSpent() {

  const now =
    new Date();


  const year =
    now.getFullYear();


  const month =
    now.getMonth();


  return state.finance
    .entries
    .filter(
      entry => {

        const date =
          new Date(
            entry.date
          );


        return (

          date.getFullYear() ===
          year

          &&

          date.getMonth() ===
          month

        );

      }
    )
    .reduce(

      (total, entry) =>
        total +
        Number(
          entry.amount
        ),

      0

    );

}


/* =========================================================
   WIDGETS
========================================================= */

function openWidgetEditor() {

  openSheet(`

    <h2>
      Personalizar Inicio
    </h2>


    <p class="muted">

      Activa u oculta
      tarjetas del dashboard.

    </p>


    ${
      Object.entries(
        state.widgets
      )
      .map(
        ([key, enabled]) => `

          <div class="widget-config">

            <span>

              ${widgetName(key)}

            </span>


            <button
              type="button"
              class="
                toggle
                ${
                  enabled
                    ? "on"
                    : ""
                }
              "
              onclick="
                toggleWidget(
                  '${key}'
                )
              "
            ></button>

          </div>

        `
      )
      .join("")
    }

  `);

}


function widgetName(key) {

  return (

    {

      next:
        "Próximo evento",

      tasks:
        "Tareas",

      habits:
        "Hábitos",

      water:
        "Agua",

      focus:
        "Focus",

      money:
        "Dinero",

      fitness:
        "Fitness",

      goals:
        "Objetivos",

      university:
        "Universidad",

      score:
        "NXO Score"

    }[key]

    ||

    key

  );

}


function toggleWidget(key) {

  state.widgets[key] =
    !state.widgets[key];


  save();

  openWidgetEditor();

  renderHome();

}


/* =========================================================
   TEMAS / PERSONALIZACIÓN
========================================================= */

function openThemes() {

  openSheet(`

    <h2>
      Temas NXO
    </h2>


    <div class="theme-grid">

      ${
        Object.entries(
          themes
        )
        .map(
          ([id, theme]) => {

            const unlocked =
              state.profile.level >=
              theme.level;


            const accent =
              theme.vars[
                "--accent"
              ];


            const background =
              theme.vars[
                "--bg"
              ];


            return `

              <button
                type="button"
                class="theme-card"
                onclick="
                  ${
                    unlocked

                    ?

                    `setTheme('${id}')`

                    :

                    `toast(
                      'Se desbloquea en nivel ${theme.level}'
                    )`
                  }
                "
              >

                <div
                  class="theme-preview"
                  style="
                    background:
                    linear-gradient(
                      135deg,
                      ${background},
                      ${accent}
                    )
                  "
                ></div>


                <b>

                  ${theme.name}

                </b>


                <div class="item-sub">

                  ${
                    unlocked

                    ?

                    "Disponible"

                    :

                    `🔒 Nivel ${theme.level}`
                  }

                </div>

              </button>

            `;

          }
        )
        .join("")
      }

    </div>

  `);

}


function setTheme(id) {

  state.profile.theme =
    id;


  save();

  applyTheme();

  openThemes();

  render();

}


/* =========================================================
   EDITAR PERFIL
========================================================= */

function openProfileEdit() {

  openSheet(`

    <h2>
      Editar perfil
    </h2>


    <div class="field">

      <label>
        Nombre
      </label>

      <input
        id="profileName"
        value="
          ${escAttr(
            state.profile.name
          )}
        "
      >

    </div>


    <div class="field">

      <label>
        Avatar / emoji
      </label>

      <input
        id="profileAvatar"
        value="
          ${escAttr(
            state.profile.avatar
          )}
        "
      >

    </div>


    <button
      type="button"
      class="btn"
      onclick="
        saveProfile()
      "
    >

      Guardar

    </button>

  `);

}


function saveProfile() {

  state.profile.name =

    $("#profileName")
      .value
      .trim()

    ||

    "Usuario";


  state.profile.avatar =

    $("#profileAvatar")
      .value

    ||

    "🧑‍🚀";


  save();

  closeSheet();

  render();

}


/* =========================================================
   CONFIGURACIÓN
========================================================= */

function openSettings() {

  openSheet(`

    <h2>
      Configuración
    </h2>


    <div class="field">

      <label>
        Meta diaria de agua (ml)
      </label>

      <input
        id="setWater"
        type="number"
        value="
          ${
            state.settings
              .waterGoal
          }
        "
      >

    </div>


    <div class="field">

      <label>
        Presupuesto mensual ($)
      </label>

      <input
        id="setBudget"
        type="number"
        value="
          ${
            state.finance
              .monthlyBudget
          }
        "
      >

    </div>


    <div class="widget-config">

      <span>
        Animaciones
      </span>


      <button
        type="button"
        class="
          toggle
          ${
            state.settings
              .animations
              ? "on"
              : ""
          }
        "
        onclick="
          state.settings.animations =
          !state.settings.animations;

          save();

          openSettings();
        "
      ></button>

    </div>


    <div class="widget-config">

      <span>
        Sonidos
      </span>


      <button
        type="button"
        class="
          toggle
          ${
            state.settings
              .sounds
              ? "on"
              : ""
          }
        "
        onclick="
          state.settings.sounds =
          !state.settings.sounds;

          save();

          openSettings();
        "
      ></button>

    </div>


    <button
      type="button"
      class="btn"
      style="margin-top:14px"
      onclick="
        saveSettings()
      "
    >

      Guardar configuración

    </button>


    <p
      class="muted"
      style="margin-top:18px"
    >

      NXO v1.0
      ·
      PWA local-first

    </p>

  `);

}


function saveSettings() {

  state.settings.waterGoal =
    Number(
      $("#setWater")
        .value ||
      2500
    );


  state.finance.monthlyBudget =
    Number(
      $("#setBudget")
        .value ||
      200000
    );


  save();

  closeSheet();

  render();


  toast(
    "Configuración guardada"
  );

}


/* =========================================================
   NOTIFICACIONES
========================================================= */

async function enableNotifications() {

  if (
    !(
      "Notification"
      in window
    )
  ) {

    toast(
      "Este navegador no admite notificaciones web"
    );

    return;

  }


  const permission =
    await Notification
      .requestPermission();


  state.settings
    .notifications =
    permission ===
    "granted";


  save();


  toast(

    permission ===
    "granted"

      ?

      "Notificaciones activadas"

      :

      "Permiso no concedido"

  );

}


async function testNotification() {

  if (
    Notification.permission !==
    "granted"
  ) {

    await enableNotifications();


    if (
      Notification.permission !==
      "granted"
    )
      return;

  }


  if (
    "serviceWorker"
    in navigator
  ) {

    const registration =
      await navigator
        .serviceWorker
        .ready;


    registration
      .showNotification(

        "NXO",

        {

          body:
            "Todo listo. Las notificaciones de NXO funcionan.",

          icon:
            "icons/icon-192.png",

          badge:
            "icons/icon-192.png",

          tag:
            "nxo-test"

        }

      );

  }

  else {

    new Notification(

      "NXO",

      {

        body:
          "Notificación de prueba"

      }

    );

  }

}


/* =========================================================
   BACKUPS
========================================================= */

function exportBackup() {

  const blob =
    new Blob(

      [
        JSON.stringify(
          state,
          null,
          2
        )
      ],

      {
        type:
          "application/json"
      }

    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    URL.createObjectURL(
      blob
    );


  link.download =
    `NXO-backup-${todayISO()}.json`;


  link.click();


  URL.revokeObjectURL(
    link.href
  );


  toast(
    "Backup exportado"
  );

}


/* =========================================================
   IMPORTAR BACKUP
========================================================= */

$("#importFile")
  ?.addEventListener(

    "change",

    async event => {

      const file =
        event.target.files[0];


      if (!file)
        return;


      try {

        const data =
          JSON.parse(
            await file.text()
          );


        state =
          data;


        save();

        render();


        toast(
          "Backup restaurado"
        );

      }

      catch {

        toast(
          "Archivo no válido"
        );

      }

    }

  );


/* =========================================================
   RESTABLECER NXO
========================================================= */

function resetNXO() {

  const confirmed =
    confirm(

      "¿Seguro? Se borrarán todos los datos locales de NXO."

    );


  if (!confirmed)
    return;


  localStorage
    .removeItem(
      DB_KEY
    );


  state =
    fresh();


  save();

  render();


  toast(
    "NXO restablecido"
  );

}


/* =========================================================
   PDF
========================================================= */

async function generatePDF() {

  if (
    !window.jspdf?.jsPDF
  ) {

    toast(

      "No se pudo cargar el generador PDF. Usa Imprimir / Guardar PDF."

    );

    return;

  }


  const {
    jsPDF
  } =
    window.jspdf;


  const documentPDF =
    new jsPDF();


  let y =
    18;


  const line = (

    text,

    size = 11,

    bold = false

  ) => {

    documentPDF
      .setFontSize(
        size
      );


    documentPDF
      .setFont(

        "helvetica",

        bold
          ? "bold"
          : "normal"

      );


    documentPDF
      .text(

        String(text),

        15,

        y

      );


    y +=
      size * 0.55 +
      3;


    if (
      y > 280
    ) {

      documentPDF
        .addPage();


      y =
        18;

    }

  };


  line(

    "NXO · Informe de progreso",

    20,

    true

  );


  line(

    new Intl.DateTimeFormat(

      "es-CL",

      {
        dateStyle:
          "long"
      }

    )
      .format(
        new Date()
      ),

    10

  );


  y += 3;


  line(

    `Usuario: ${state.profile.name}`,

    12,

    true

  );


  line(

    `Nivel ${state.profile.level} · ${state.profile.xp} XP · NXO Score ${nxoScore()}/100`

  );


  y += 4;


  line(
    "Resumen",
    15,
    true
  );


  line(

    `Tareas completadas: ${state.history.completedTasks}`

  );


  line(

    `Horas de estudio: ${(state.history.studyMinutes / 60).toFixed(1)}`

  );


  line(

    `Entrenamientos: ${state.history.workouts}`

  );


  line(

    `Hábitos completados: ${state.history.habitsCompleted}`

  );


  line(

    `Agua hoy: ${state.water.ml} ml / ${state.settings.waterGoal} ml`

  );


  line(

    `Gasto del mes: $${monthSpent().toLocaleString("es-CL")}`

  );


  y += 4;


  line(
    "Universidad",
    15,
    true
  );


  state.courses
    .forEach(
      course => {

        line(

          `${course.name}: ${
            courseAverage(course)

            ?

            courseAverage(course)
              .toFixed(2)

            :

            "sin promedio"
          } (${course.grades.length} evaluaciones)`

        );

      }
    );


  y += 4;


  line(
    "Objetivos",
    15,
    true
  );


  state.goals
    .forEach(
      goal => {

        line(

          `${goal.name}: ${goal.progress}/${goal.target}`

        );

      }
    );


  y += 4;


  line(
    "Hábitos",
    15,
    true
  );


  state.habits
    .forEach(
      habit => {

        line(

          `${habit.icon} ${habit.name}: racha ${habit.streak || 0} días`

        );

      }
    );


  y += 5;


  line(
    "Generado por NXO",
    9
  );


  documentPDF
    .save(

      `NXO-Progreso-${todayISO()}.pdf`

    );

}


/* =========================================================
   SEGURIDAD HTML
========================================================= */

function esc(
  string = ""
) {

  return String(
    string
  )
  .replace(

    /[&<>"']/g,

    character => (

      {

        "&":
          "&amp;",

        "<":
          "&lt;",

        ">":
          "&gt;",

        '"':
          "&quot;",

        "'":
          "&#039;"

      }[character]

    )

  );

}


function escAttr(
  string = ""
) {

  return esc(
    string
  );

}


/* =========================================================
   EVENTOS PRINCIPALES
========================================================= */

$$(".nav-item")
  .forEach(
    button => {

      button.onclick =
        () => {

          go(
            button.dataset.route
          );

        };

    }
  );


$("#fab").onclick =
  () => {

    openQuickAdd();

  };


$("#openSettingsBtn").onclick =
  () => {

    openSettings();

  };


/* =========================================================
   INICIO DE NXO
========================================================= */

window.addEventListener(

  "load",

  () => {


    /* SERVICE WORKER */

    if (
      "serviceWorker"
      in navigator
    ) {

      navigator
        .serviceWorker
        .register(
          "sw.js"
        )
        .catch(
          () => {}
        );

    }


    /* TEMA */

    applyTheme();


    /* HEADER */

    renderHeader();


    /* NIVEL */

    syncLevel();


    /* APP */

    render();

  }

);


/* =========================================================
   CUANDO NXO VUELVE A ESTAR ACTIVA
========================================================= */

document.addEventListener(

  "visibilitychange",

  () => {

    if (
      document.visibilityState ===
      "visible"
    ) {

      renderHeader();

    }

  }

);
