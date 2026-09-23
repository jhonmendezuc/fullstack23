import { Router } from "express";
import usuariosControlador from "../controladores/usuariosControlador.js";
const ruta = Router();
ruta
  .get("/", usuariosControlador.obtenerUsuarios)
  .post("/", usuariosControlador.crearUsuario)
  .post("/inicio", usuariosControlador.inicioUsuario)
  .put("/:id", usuariosControlador.actualizarUsuario)
  .delete("/:id", usuariosControlador.eliminarUsuario);

export default ruta;
