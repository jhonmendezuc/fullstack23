let tareas = [];
//dónde quiero renderizar?
let todolist = document.getElementById("todo-list");

let agregarTareaBtn = document.getElementById("add-btn");
let tareaTxt = document.getElementById("todo-input");
let eliminarTareaBtn = document.getElementById("eliminarTarea");
const inputTxt = document.getElementById("todo-input");

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

function agregarTarea(tarea) {
  tareas.push(tarea);
}

function eliminarTarea() {
  tareas.pop();
}

function renderizarTareas() {
  //qué quiero renderizar?
  todolist.innerHTML = "";
  tareas.forEach((tarea) => {
    todolist.innerHTML += `
    <li>
       <div class="todo-item">
         <input type="checkbox" ${tarea.estado ? "checked" : ""} />
         <span>${tarea.nombre}</span>
       </div>
      <button id="eliminarTarea">✖</button>
    </li>
    `;
  });
}

renderizarTareas();
