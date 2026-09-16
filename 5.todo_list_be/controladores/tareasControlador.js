import tareasServicio from "../servicios/tareasServicio.js";

const obtenerTareas = async (req, res) => {
  const datos = await tareasServicio.obtenerTareas();
  res.status(200).json(datos);
};

const crearTarea = async (req, res) => {
  const datos = await tareasServicio.crearTarea(req.body);
  res.status(201).json(datos);
};

const actualizarTarea = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const datos = await tareasServicio.actualizarTarea(body, id);
  res.status(200).json(datos);
};

const eliminarTarea = async (req, res) => {
  const id = req.params.id;
  const datos = await tareasServicio.eliminarTarea(id);
  res.status(200).json(datos);
};

export default {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
