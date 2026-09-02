import { suma, resta } from "./operaciones.mjs";
import Tarea from "./Tarea.mjs";
console.log(suma(12, 2));
console.log(resta(12, 2));

const tarea1 = new Tarea("tarea1", "descripcion1", "pendiente");
const tarea2 = new Tarea("tarea2", "descripcion2 ", "pendiente");

console.log(tarea1);
