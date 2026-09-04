import express from "express";

const app = express();

const tareas = [
  {
    id: 1,
    titulo: "Tarea 1",
    descripcion: "Descripción de la tarea 1",
    estado: false,
  },
  {
    id: 2,
    titulo: "Tarea 2",
    descripcion: "Descripción de la tarea 2",
    estado: true,
  },
];

app.get("/tareas", (req, res) => {
  let tareasConsulta = leerTareas();
  res.send(tareasConsulta);
});

//crear el servidor
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

function leerTareas() {
  return tareas;
}

function crearTarea() {}

function actualizarTarea() {}

function eliminarTarea() {}
