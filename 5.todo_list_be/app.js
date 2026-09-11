import express from "express";
import tareasRutas from "./rutas/tareasRutas.js";
const app = express();

//middleware para serializar el body de las solicitudes
app.use(express.json());
app.use("/tareas", tareasRutas);

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
