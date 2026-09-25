import { Router } from "express";
import usuariosControlador from "../controladores/usuariosControlador.js";
import verificacion from "../midleware/verificacion.js";
const ruta = Router();
ruta
  .get("/", verificacion.verificacion, usuariosControlador.obtenerUsuarios)
  .post("/", usuariosControlador.crearUsuario)
  .post("/inicio", usuariosControlador.inicioUsuario)
  .post("/recordarcontra", usuariosControlador.recordarContrasena)
  .put("/:id", verificacion.verificacion, usuariosControlador.actualizarUsuario)
  .delete(
    "/:id",
    verificacion.verificacion,
    usuariosControlador.eliminarUsuario,
  );

export default ruta;
