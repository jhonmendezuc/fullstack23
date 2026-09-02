import FileReader from "node:fs";

const tareas = [
  {
    id: 1,
    nombre: "Tarea 1",
    descripcion: "Descripción de la tarea 1",
    estado: false,
  },
];

//leer un archivo
const datos = FileReader.readFileSync("./tareas.json", "utf-8");
//convertir datos de tipo json en objeto de tipo javascript
const tareasJs = JSON.parse(datos);
console.log(tareasJs[0].title); //imprime el contenido del archivo
console.log(tareas[0].nombre); //imprime el contenido del archivo
