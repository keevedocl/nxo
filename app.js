const STORAGE_KEY = "nexo-data-v1";

const defaultData = {
  profile: { name: "Tú" },
  courses: [],
  classes: [],
  tasks: [],
  events: [],
  budget: { total: 0 },
  expenses: [],
  workouts: [],
  shopping: []
};

let data = loadData();
let currentTaskFilter = "all";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...structuredClone(defaultData), ...JSON.parse(raw) } : structuredClone(defaultData);
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  renderAll();
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function money(n) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(Number(n || 0));
}

function dateOnly(d) {
  return new Date(d + "T12:00:00");
}

function formatDate(d) {
  return new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short" }).format(new Date(d));
}

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const target = dateOnly(dateStr);
  return Math.ceil((target - today) / 86400000);
}

function todayISO() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}

function nowTime() {
  return new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
}

function dayNameIndex() {
  return new Date().getDay();
}

function escapeHtml(str="") {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function openModal(html) {
  document.getElementById("modal").innerHTML = html;
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.add("hidden");
  document.getElementById("modal").innerHTML = "";
}

document.getElementById("modalBackdrop").addEventListener("click", e => {
  if (e.target.id === "modalBackdrop") closeModal();
});

function navTo(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screen + "Screen").classList.add("active");
  document.querySelectorAll(".nav-item[data-screen]").forEach(b => b.classList.toggle("active", b.dataset.screen === screen));
  const titles = { home: "NEXO", university: "Universidad", tasks: "Tareas", plan: "Plan", life: "Vida" };
  document.getElementById("screenTitle").textContent = titles[screen] || "NEXO";
}

document.querySelectorAll(".nav-item[data-screen]").forEach(btn => btn.addEventListener("click", () => navTo(btn.dataset.screen)));
document.addEventListener("click", e => {
  const target = e.target.closest("[data-nav]");
  if (target) navTo(target.dataset.nav);
});

function renderClock() {
  document.getElementById("heroTime").textContent = nowTime();
  const now = new Date();
  const hour = now.getHours();
  let msg = "Organiza lo importante y deja el resto para después.";
  if (hour < 10) msg = "Buen momento para ordenar el día antes de empezar.";
  else if (hour < 14) msg = "Concéntrate en lo más importante de esta mañana.";
  else if (hour < 19) msg = "Todavía queda tiempo para avanzar bastante hoy.";
  else msg = "Cierra pendientes importantes y prepara mañana.";
  document.getElementById("heroMessage").textContent = msg;
  document.getElementById("todayLabel").textContent = new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long" }).format(now);
}

function renderHome() {
  const pending = data.tasks.filter(t => !t.done);
  document.getElementById("pendingCount").textContent = `${pending.length} ${pending.length === 1 ? "tarea" : "tareas"}`;

  const remaining = data.budget.total - data.expenses.reduce((s,e) => s + Number(e.amount || 0), 0);
  document.getElementById("moneyAvailable").textContent = money(remaining);

  const todayDay = dayNameIndex();
  const todayClasses = data.classes.filter(c => Number(c.day) === todayDay).sort((a,b) => a.start.localeCompare(b.start));
  const currentHHMM = new Date().toTimeString().slice(0,5);
  const nextClass = todayClasses.find(c => c.start >= currentHHMM) || todayClasses[0];
  document.getElementById("nextClass").textContent = nextClass ? `${nextClass.name} · ${nextClass.start}` : "Sin clases próximas";

  const exams = data.courses.flatMap(c => (c.assessments || []).map(a => ({...a, course: c.name})))
    .filter(a => a.date && daysUntil(a.date) >= 0)
    .sort((a,b) => dateOnly(a.date) - dateOnly(b.date));
  const exam = exams[0];
  document.getElementById("nextExam").textContent = exam ? `${exam.course} · ${formatDate(exam.date)}` : "Sin evaluaciones";

  const priorities = [...pending].sort((a,b) => {
    const pa = a.priority === "Alta" ? 0 : a.priority === "Media" ? 1 : 2;
    const pb = b.priority === "Alta" ? 0 : b.priority === "Media" ? 1 : 2;
    return pa - pb || dateOnly(a.date || "2999-01-01") - dateOnly(b.date || "2999-01-01");
  }).slice(0,4);

  document.getElementById("priorityList").innerHTML = priorities.length ? priorities.map(taskCard).join("") : `<div class="empty">No tienes tareas pendientes.</div>`;

  const overdue = pending.filter(t => t.date && daysUntil(t.date) < 0).length;
  const todayTasks = pending.filter(t => t.date === todayISO()).length;
  const classesToday = todayClasses.length;
  document.getElementById("dailySummary").innerHTML = `
    <div class="item-sub">Hoy tienes <strong>${classesToday}</strong> clases, <strong>${todayTasks}</strong> tareas con fecha de hoy y <strong>${overdue}</strong> atrasadas.</div>
  `;
}

function taskCard(t) {
  const due = t.date ? daysUntil(t.date) : null;
  const dueBadge = t.date ? `<span class="badge ${due < 0 ? "urgent" : due === 0 ? "warn" : ""}">${due < 0 ? "Atrasada" : due === 0 ? "Hoy" : formatDate(t.date)}</span>` : "";
  return `<div class="item">
    <div class="item-row">
      <button class="check ${t.done ? "done" : ""}" onclick="toggleTask('${t.id}')"></button>
      <div class="item-main">
        <div class="item-title ${t.done ? "done-text" : ""}">${escapeHtml(t.title)}</div>
        <div class="item-sub">${escapeHtml(t.course || "Personal")}</div>
        <div class="badges">
          ${dueBadge}
          <span class="badge">${escapeHtml(t.priority || "Media")}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="mini-btn" onclick="editTask('${t.id}')">✎</button>
        <button class="mini-btn" onclick="deleteTask('${t.id}')">×</button>
      </div>
    </div>
  </div>`;
}

function renderTasks() {
  let tasks = [...data.tasks];
  if (currentTaskFilter === "today") tasks = tasks.filter(t => t.date === todayISO());
  if (currentTaskFilter === "pending") tasks = tasks.filter(t => !t.done);
  if (currentTaskFilter === "done") tasks = tasks.filter(t => t.done);
  tasks.sort((a,b) => Number(a.done)-Number(b.done) || dateOnly(a.date || "2999-01-01") - dateOnly(b.date || "2999-01-01"));
  document.getElementById("taskList").innerHTML = tasks.length ? tasks.map(taskCard).join("") : `<div class="empty">No hay tareas en esta vista.</div>`;
}

function renderCourses() {
  const html = data.courses.length ? data.courses.map(c => {
    const as = c.assessments || [];
    const weighted = as.filter(a => a.grade !== "" && a.grade != null);
    const totalWeight = weighted.reduce((s,a) => s + Number(a.weight || 0), 0);
    const avg = totalWeight > 0 ? weighted.reduce((s,a) => s + Number(a.grade || 0) * Number(a.weight || 0), 0) / totalWeight : null;
    return `<div class="item">
      <div class="item-row">
        <div class="item-main">
          <div class="item-title">${escapeHtml(c.name)}</div>
          <div class="item-sub">${escapeHtml(c.teacher || "Sin profesor")} ${c.room ? "· " + escapeHtml(c.room) : ""}</div>
          <div class="grade-box">
            <div class="grade-pill">Promedio: <strong>${avg ? avg.toFixed(2) : "--"}</strong></div>
            <div class="grade-pill">${as.length} evaluaciones</div>
          </div>
        </div>
        <div class="item-actions">
          <button class="mini-btn" onclick="courseDetails('${c.id}')">›</button>
          <button class="mini-btn" onclick="deleteCourse('${c.id}')">×</button>
        </div>
      </div>
    </div>`;
  }).join("") : `<div class="empty">Aún no has agregado ramos.</div>`;
  document.getElementById("courseList").innerHTML = html;
}

function renderSchedule() {
  const days = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  const list = [...data.classes].sort((a,b) => Number(a.day)-Number(b.day) || a.start.localeCompare(b.start));
  document.getElementById("scheduleList").innerHTML = list.length ? list.map(c => `
    <div class="item">
      <div class="item-row">
        <div class="item-main">
          <div class="item-title">${days[c.day]} · ${escapeHtml(c.name)}</div>
          <div class="item-sub">${c.start}–${c.end} ${c.room ? "· " + escapeHtml(c.room) : ""}</div>
        </div>
        <button class="mini-btn" onclick="deleteClass('${c.id}')">×</button>
      </div>
    </div>`).join("") : `<div class="empty">Agrega tus clases para ver tu horario.</div>`;
}

function renderPlan() {
  const items = [];
  data.tasks.filter(t => t.date).forEach(t => items.push({date:t.date, title:t.title, sub:`Tarea · ${t.course || "Personal"}`, kind:"task"}));
  data.events.forEach(e => items.push({date:e.date, title:e.title, sub:`Evento${e.time ? " · " + e.time : ""}`, kind:"event", id:e.id}));
  data.courses.forEach(c => (c.assessments || []).forEach(a => a.date && items.push({date:a.date, title:a.name, sub:`Evaluación · ${c.name}`, kind:"exam"})));
  items.sort((a,b) => dateOnly(a.date)-dateOnly(b.date));
  document.getElementById("timelineList").innerHTML = items.length ? items.slice(0,30).map(i => `
    <div class="item">
      <div class="item-row">
        <div class="item-main">
          <div class="item-title">${escapeHtml(i.title)}</div>
          <div class="item-sub">${formatDate(i.date)} · ${escapeHtml(i.sub)}</div>
        </div>
        ${i.kind === "event" ? `<button class="mini-btn" onclick="deleteEvent('${i.id}')">×</button>` : ""}
      </div>
    </div>`).join("") : `<div class="empty">No tienes eventos próximos.</div>`;
}

function renderMoney() {
  const spent = data.expenses.reduce((s,e)=>s+Number(e.amount||0),0);
  const remaining = Number(data.budget.total||0)-spent;
  document.getElementById("budgetBalance").textContent = money(remaining);
  document.getElementById("budgetHint").textContent = data.budget.total ? `Presupuesto ${money(data.budget.total)} · Gastado ${money(spent)}` : "Configura cuánto dinero tienes disponible.";
  document.getElementById("expenseList").innerHTML = data.expenses.length ? [...data.expenses].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(e => `
    <div class="item">
      <div class="item-row">
        <div class="item-main">
          <div class="item-title">${escapeHtml(e.title)}</div>
          <div class="item-sub">${formatDate(e.date)} · ${escapeHtml(e.category || "Otros")}</div>
        </div>
        <strong>${money(e.amount)}</strong>
        <button class="mini-btn" onclick="deleteExpense('${e.id}')">×</button>
      </div>
    </div>`).join("") : `<div class="empty">No hay gastos registrados.</div>`;
}

function renderGym() {
  document.getElementById("workoutList").innerHTML = data.workouts.length ? [...data.workouts].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(w => `
    <div class="item">
      <div class="item-row">
        <div class="item-main">
          <div class="item-title">${escapeHtml(w.name)}</div>
          <div class="item-sub">${formatDate(w.date)} · ${escapeHtml(w.details || "Sin detalles")}</div>
        </div>
        <button class="mini-btn" onclick="deleteWorkout('${w.id}')">×</button>
      </div>
    </div>`).join("") : `<div class="empty">Todavía no hay entrenamientos.</div>`;
}

function renderShopping() {
  document.getElementById("shoppingList").innerHTML = data.shopping.length ? data.shopping.map(s => `
    <div class="item">
      <div class="item-row">
        <button class="check ${s.done ? "done" : ""}" onclick="toggleShopping('${s.id}')"></button>
        <div class="item-main">
          <div class="item-title ${s.done ? "done-text" : ""}">${escapeHtml(s.title)}</div>
          <div class="item-sub">${s.price ? money(s.price) : "Sin precio"} ${s.place ? "· " + escapeHtml(s.place) : ""}</div>
        </div>
        <button class="mini-btn" onclick="deleteShopping('${s.id}')">×</button>
      </div>
    </div>`).join("") : `<div class="empty">Lista vacía.</div>`;
}

function renderAll() {
  renderClock();
  renderHome();
  renderTasks();
  renderCourses();
  renderSchedule();
  renderPlan();
  renderMoney();
  renderGym();
  renderShopping();
}

function showQuickAdd() {
  openModal(`
    <h2>Agregar</h2>
    <div class="stack">
      <button class="secondary-btn" onclick="closeModal(); showTaskForm()">✅ Nueva tarea</button>
      <button class="secondary-btn" onclick="closeModal(); showEventForm()">📅 Nuevo evento</button>
      <button class="secondary-btn" onclick="closeModal(); showExpenseForm()">💰 Registrar gasto</button>
      <button class="secondary-btn" onclick="closeModal(); showWorkoutForm()">🏋️ Entrenamiento</button>
      <button class="secondary-btn" onclick="closeModal(); showShoppingForm()">🛒 Compra pendiente</button>
    </div>
  `);
}

function showTaskForm(existing=null) {
  const courseOptions = [`<option value="">Personal</option>`, ...data.courses.map(c => `<option value="${escapeHtml(c.name)}" ${existing?.course===c.name?"selected":""}>${escapeHtml(c.name)}</option>`)].join("");
  openModal(`
    <h2>${existing ? "Editar tarea" : "Nueva tarea"}</h2>
    <form class="form" id="taskForm">
      <label>Título<input required name="title" value="${escapeHtml(existing?.title||"")}" placeholder="Ej: terminar guía de Física"></label>
      <label>Área<select name="course">${courseOptions}</select></label>
      <label>Fecha<input type="date" name="date" value="${existing?.date||todayISO()}"></label>
      <label>Prioridad<select name="priority">
        ${["Alta","Media","Baja"].map(p=>`<option ${existing?.priority===p?"selected":""}>${p}</option>`).join("")}
      </select></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("taskForm").onsubmit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    if (existing) Object.assign(existing, { title:f.get("title"), course:f.get("course"), date:f.get("date"), priority:f.get("priority") });
    else data.tasks.push({ id:uid(), title:f.get("title"), course:f.get("course"), date:f.get("date"), priority:f.get("priority"), done:false });
    saveData(); closeModal();
  };
}

function showCourseForm() {
  openModal(`
    <h2>Nuevo ramo</h2>
    <form class="form" id="courseForm">
      <label>Nombre<input required name="name" placeholder="Ej: Física I"></label>
      <label>Profesor<input name="teacher" placeholder="Opcional"></label>
      <label>Sala habitual<input name="room" placeholder="Opcional"></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("courseForm").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    data.courses.push({ id:uid(), name:f.get("name"), teacher:f.get("teacher"), room:f.get("room"), assessments:[] });
    saveData(); closeModal();
  };
}

function courseDetails(id) {
  const c = data.courses.find(x=>x.id===id); if(!c) return;
  const assessments = (c.assessments||[]).map(a => `
    <div class="item">
      <div class="item-row">
        <div class="item-main">
          <div class="item-title">${escapeHtml(a.name)}</div>
          <div class="item-sub">${a.date ? formatDate(a.date) : "Sin fecha"} · ${a.weight}% · Nota ${a.grade || "--"}</div>
        </div>
        <button class="mini-btn" onclick="deleteAssessment('${c.id}','${a.id}')">×</button>
      </div>
    </div>`).join("") || `<div class="empty">Sin evaluaciones.</div>`;
  openModal(`
    <h2>${escapeHtml(c.name)}</h2>
    <div class="stack">${assessments}</div>
    <div style="height:12px"></div>
    <button class="primary-btn" style="width:100%" onclick="showAssessmentForm('${c.id}')">+ Agregar evaluación</button>
    <div style="height:10px"></div>
    <button class="secondary-btn" style="width:100%" onclick="closeModal()">Cerrar</button>
  `);
}

function showAssessmentForm(courseId) {
  const c = data.courses.find(x=>x.id===courseId); if(!c) return;
  openModal(`
    <h2>Nueva evaluación</h2>
    <form class="form" id="assessmentForm">
      <label>Nombre<input required name="name" placeholder="Ej: Prueba 1"></label>
      <label>Fecha<input type="date" name="date"></label>
      <label>Ponderación (%)<input required type="number" min="0" max="100" step="0.1" name="weight" value="30"></label>
      <label>Nota (opcional)<input type="number" min="1" max="7" step="0.1" name="grade" placeholder="Ej: 4.5"></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="courseDetails('${courseId}')">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("assessmentForm").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    c.assessments.push({ id:uid(), name:f.get("name"), date:f.get("date"), weight:Number(f.get("weight")), grade:f.get("grade") });
    saveData(); courseDetails(courseId);
  };
}

function showClassForm() {
  openModal(`
    <h2>Nueva clase</h2>
    <form class="form" id="classForm">
      <label>Nombre<input required name="name" placeholder="Ej: Física"></label>
      <label>Día<select name="day">
        <option value="1">Lunes</option><option value="2">Martes</option><option value="3">Miércoles</option><option value="4">Jueves</option><option value="5">Viernes</option><option value="6">Sábado</option><option value="0">Domingo</option>
      </select></label>
      <label>Inicio<input required type="time" name="start"></label>
      <label>Fin<input required type="time" name="end"></label>
      <label>Sala<input name="room" placeholder="Opcional"></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("classForm").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    data.classes.push({ id:uid(), name:f.get("name"), day:Number(f.get("day")), start:f.get("start"), end:f.get("end"), room:f.get("room") });
    saveData(); closeModal();
  };
}

function showEventForm() {
  openModal(`
    <h2>Nuevo evento</h2>
    <form class="form" id="eventForm">
      <label>Título<input required name="title" placeholder="Ej: Médico"></label>
      <label>Fecha<input required type="date" name="date" value="${todayISO()}"></label>
      <label>Hora<input type="time" name="time"></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("eventForm").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    data.events.push({ id:uid(), title:f.get("title"), date:f.get("date"), time:f.get("time") });
    saveData(); closeModal();
  };
}

function showBudgetForm() {
  openModal(`
    <h2>Presupuesto</h2>
    <form class="form" id="budgetForm">
      <label>Dinero disponible<input required type="number" min="0" step="1" name="total" value="${data.budget.total||0}"></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("budgetForm").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target); data.budget.total=Number(f.get("total")); saveData(); closeModal();
  };
}

function showExpenseForm() {
  openModal(`
    <h2>Registrar gasto</h2>
    <form class="form" id="expenseForm">
      <label>Descripción<input required name="title" placeholder="Ej: Almuerzo"></label>
      <label>Monto<input required type="number" min="0" name="amount"></label>
      <label>Categoría<select name="category"><option>Comida</option><option>Transporte</option><option>Universidad</option><option>Gym</option><option>Compras</option><option>Otros</option></select></label>
      <label>Fecha<input required type="date" name="date" value="${todayISO()}"></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("expenseForm").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    data.expenses.push({id:uid(), title:f.get("title"), amount:Number(f.get("amount")), category:f.get("category"), date:f.get("date")});
    saveData(); closeModal();
  };
}

function showWorkoutForm() {
  openModal(`
    <h2>Entrenamiento</h2>
    <form class="form" id="workoutForm">
      <label>Nombre<input required name="name" placeholder="Ej: Pecho + tríceps"></label>
      <label>Fecha<input required type="date" name="date" value="${todayISO()}"></label>
      <label>Detalles<textarea name="details" placeholder="Press banca 60kg x 8..."></textarea></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("workoutForm").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    data.workouts.push({id:uid(), name:f.get("name"), date:f.get("date"), details:f.get("details")});
    saveData(); closeModal();
  };
}

function showShoppingForm() {
  openModal(`
    <h2>Agregar compra</h2>
    <form class="form" id="shoppingForm">
      <label>Producto<input required name="title" placeholder="Ej: Creatina"></label>
      <label>Precio estimado<input type="number" min="0" name="price"></label>
      <label>Lugar<input name="place" placeholder="Ej: Supermercado"></label>
      <div class="modal-actions"><button type="button" class="secondary-btn" onclick="closeModal()">Cancelar</button><button class="primary-btn">Guardar</button></div>
    </form>
  `);
  document.getElementById("shoppingForm").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    data.shopping.push({id:uid(), title:f.get("title"), price:Number(f.get("price")||0), place:f.get("place"), done:false});
    saveData(); closeModal();
  };
}

function showSettings() {
  openModal(`
    <h2>Ajustes</h2>
    <div class="stack">
      <button class="secondary-btn" onclick="exportBackup()">Exportar copia de seguridad</button>
      <label class="secondary-btn" style="text-align:center">Importar copia<input id="importFile" type="file" accept="application/json" hidden></label>
      <button class="danger-btn" onclick="resetAll()">Borrar todos los datos</button>
      <button class="secondary-btn" onclick="closeModal()">Cerrar</button>
    </div>
  `);
  document.getElementById("importFile").addEventListener("change", importBackup);
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download=`nexo-backup-${todayISO()}.json`; a.click();
  URL.revokeObjectURL(url);
}

function importBackup(e) {
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      data = { ...structuredClone(defaultData), ...parsed };
      saveData(); closeModal(); alert("Copia importada correctamente.");
    } catch { alert("Ese archivo no parece ser una copia válida de NEXO."); }
  };
  reader.readAsText(file);
}

function resetAll() {
  if (!confirm("¿Seguro que quieres borrar todos los datos?")) return;
  data = structuredClone(defaultData);
  saveData(); closeModal();
}

window.toggleTask = id => { const t=data.tasks.find(x=>x.id===id); if(t){t.done=!t.done; saveData();} };
window.editTask = id => { const t=data.tasks.find(x=>x.id===id); if(t) showTaskForm(t); };
window.deleteTask = id => { data.tasks=data.tasks.filter(x=>x.id!==id); saveData(); };
window.deleteCourse = id => { data.courses=data.courses.filter(x=>x.id!==id); saveData(); };
window.courseDetails = courseDetails;
window.showAssessmentForm = showAssessmentForm;
window.deleteAssessment = (cid,aid) => { const c=data.courses.find(x=>x.id===cid); if(c){c.assessments=c.assessments.filter(x=>x.id!==aid); saveData(); courseDetails(cid);} };
window.deleteClass = id => { data.classes=data.classes.filter(x=>x.id!==id); saveData(); };
window.deleteEvent = id => { data.events=data.events.filter(x=>x.id!==id); saveData(); };
window.deleteExpense = id => { data.expenses=data.expenses.filter(x=>x.id!==id); saveData(); };
window.deleteWorkout = id => { data.workouts=data.workouts.filter(x=>x.id!==id); saveData(); };
window.toggleShopping = id => { const s=data.shopping.find(x=>x.id===id); if(s){s.done=!s.done; saveData();} };
window.deleteShopping = id => { data.shopping=data.shopping.filter(x=>x.id!==id); saveData(); };
window.closeModal = closeModal;
window.showTaskForm = showTaskForm;
window.showEventForm = showEventForm;
window.showExpenseForm = showExpenseForm;
window.showWorkoutForm = showWorkoutForm;
window.showShoppingForm = showShoppingForm;
window.exportBackup = exportBackup;
window.resetAll = resetAll;

document.getElementById("quickAddBtn").onclick = showQuickAdd;
document.getElementById("navPlus").onclick = showQuickAdd;
document.getElementById("addTaskBtn").onclick = () => showTaskForm();
document.getElementById("addCourseBtn").onclick = showCourseForm;
document.getElementById("addClassBtn").onclick = showClassForm;
document.getElementById("addEventBtn").onclick = showEventForm;
document.getElementById("setBudgetBtn").onclick = showBudgetForm;
document.getElementById("addExpenseBtn").onclick = showExpenseForm;
document.getElementById("addWorkoutBtn").onclick = showWorkoutForm;
document.getElementById("addShoppingBtn").onclick = showShoppingForm;
document.getElementById("settingsBtn").onclick = showSettings;

document.querySelectorAll(".chip").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); currentTaskFilter=btn.dataset.filter; renderTasks();
}));

document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".life-panel").forEach(p=>p.classList.remove("active"));
  document.getElementById("life"+btn.dataset.life.charAt(0).toUpperCase()+btn.dataset.life.slice(1)).classList.add("active");
}));

setInterval(renderClock, 30000);
renderAll();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}
