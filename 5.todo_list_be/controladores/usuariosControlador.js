import usuariosServicio from "../servicios/usuariosServicio.js";

const obtenerUsuarios = async (req, res) => {
  const datos = await usuariosServicio.obtenerUsuarios();
  res.status(200).json(datos);
};

const crearUsuario = async (req, res) => {
  const datos = await usuariosServicio.crearUsuario(req.body);
  res.status(201).json(datos);
};

const actualizarUsuario = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const datos = await usuariosServicio.actualizarUsuario(body, id);
  res.status(200).json(datos);
};

const eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  const datos = await usuariosServicio.eliminarUsuario(id);
  res.status(200).json(datos);
};

const inicioUsuario = async (req, res) => {
  const datos = await usuariosServicio.inicioUsuario(req.body);
  res.status(200).json(datos);
};

export default {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  inicioUsuario,
};
