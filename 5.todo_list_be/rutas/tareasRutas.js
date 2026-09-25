import { Router } from "express";
import tareasControlador from "../controladores/tareasControlador.js";
import verificacion from "../midleware/verificacion.js";
const ruta = Router();

ruta.use(verificacion.verificacion);
ruta
  .get("/", tareasControlador.obtenerTareas)
  .post("/", tareasControlador.crearTarea)
  .put("/:id", tareasControlador.actualizarTarea)
  .delete("/:id", tareasControlador.eliminarTarea);

export default ruta;
