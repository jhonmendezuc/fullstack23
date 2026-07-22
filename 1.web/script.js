let tareas = [];
//dónde quiero renderizar?
let todolist = document.getElementById("todo-list");

let agregarTareaBtn = document.getElementById("add-btn");
let tareaTxt = document.getElementById("todo-input");
let eliminarTareaBtn = document.getElementById("eliminarTarea");
const inputTxt = document.getElementById("todo-input");
let filtroActual = "all";
let filtroAll = document.getElementById("filter-all");
let filtroActive = document.getElementById("filter-active");
let filtroCompleted = document.getElementById("filter-completed");
let filtroClear = document.getElementById("clear-completed");
/*
let titulo = document.getElementsByTagName("h1")[0];

titulo.addEventListener("click", () => {
  console.log("click aqui");
}) */
tareas.push({
  nombre: "Hacer aseo",
  estado: false,
});
tareas.push({
  nombre: "Programar",
  estado: true,
});

//agregar el listener

agregarTareaBtn.addEventListener("click", () => {
  agregarTarea({
    nombre: tareaTxt.value,
    estado: false,
  });
  renderizarTareas();
});

inputTxt.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    tareas.push({
      nombre: event.target.value,
      estado: false,
    });
    event.target.value = "";
    renderizarTareas();
  }
});

todolist.addEventListener("click", (e) => {
  if (e.target.tagName == "INPUT" || e.target.tagName == "SPAN") {
    const index = e.target.dataset.index;
    tareas[index].estado = !tareas[index].estado;
  }
});

filtroAll.addEventListener("click", () => {
  filtroActual = "all";
  renderizarTareas();
});

filtroActive.addEventListener("click", () => {
  filtroActual = "active";
  renderizarTareas();
});

filtroCompleted.addEventListener("click", () => {
  filtroActual = "completed";
  renderizarTareas();
});

filtroCompleted.addEventListener("click", () => {
  filtroActual = "completed";
  renderizarTareas();
});

filtroClear.addEventListener("click", () => {
  tareas = tareas.filter((t) => !t.estado);
  renderizarTareas();
});

function agregarTarea(tarea) {
  tareas.push(tarea);
}

function eliminarTarea() {
  tareas.pop();
}

function renderizarTareas() {
  //qué quiero renderizar?
  todolist.innerHTML = "";
  let tareasFiltro = tareas.filter((t) => {
    if (filtroActual === "active") return !t.estado;
    if (filtroActual === "completed") return t.estado;
    return true;
  });

  tareasFiltro.forEach((tarea, index) => {
    console.log(tarea, index);
    todolist.innerHTML += `
    <li>
       <div class="todo-item">
         <input type="checkbox" ${tarea.estado ? "checked" : ""} 
         data-index="${index}"
         />
         <span>${tarea.nombre}</span>
       </div>
      <button id="eliminarTarea">✖</button>
    </li>
    `;
  });
}

renderizarTareas();
