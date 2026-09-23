import express from "express";
import tareasRutas from "./rutas/tareasRutas.js";
import usuariosRutas from "./rutas/usuariosRutas.js";
const app = express();

//middleware para serializar el body de las solicitudes
app.use(express.json());
app.use("/tareas", tareasRutas);
app.use("/usuarios", usuariosRutas);

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
