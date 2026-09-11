import tareasServicio from "../servicios/tareasServicio.js";

const obtenerTareas = (req, res) => {
  const datos = tareasServicio.obtenerTareas();
  res.status(200).json(datos);
};

const crearTarea = (req, res) => {
  const datos = tareasServicio.crearTarea(req.body);
  res.status(201).json(datos);
};

const actualizarTarea = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const datos = tareasServicio.actualizarTarea(body, id);
  res.status(200).json(datos);
};

const eliminarTarea = (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  const datos = tareasServicio.eliminarTarea(id);
  res.status(200).json(datos);
};

export default {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
