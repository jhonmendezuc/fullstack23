const tareas = [
  {
    id: 1,
    title: "Tarea 1",
    description: "Descripción de la tarea 1",
    estado: false,
  },
  {
    id: 2,
    title: "hacer aseo",
    description: "Descripción de la tarea 2",
    estado: true,
  },
];
//funcion que se llama desde el controla para obtener las tareas de la bd
const obtenerTareas = () => {
  //llamado a la bd
  return tareas; //retorno de los datos de la bd
};

const crearTarea = () => {
  return "tarea creada";
};

const actualizarTarea = () => {
  return "tarea actualizada";
};

const eliminarTarea = () => {
  return "tarea eliminada";
};

export default {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
