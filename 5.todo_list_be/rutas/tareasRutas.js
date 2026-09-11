import { Router } from "express";
import tareasControlador from "../controladores/tareasControlador.js";
const ruta = Router();
ruta
  .get("/", tareasControlador.obtenerTareas)
  .post("/", tareasControlador.crearTarea)
  .put("/:id", tareasControlador.actualizarTarea)
  .delete("/:id", tareasControlador.eliminarTarea);

export default ruta;
