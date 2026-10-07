import axios from "axios";
import config from "../config.js";

/**
 * Helper para obtener encabezados de autenticación con Bearer Token.
 * Obtiene el token de localStorage ('token') o permite enviar uno personalizado.
 */
export const getAuthHeaders = (customToken = null) => {
  const token = customToken || localStorage.getItem("token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };
};

/**
 * Instancia de Axios configurada para el endpoint de tareas
 */
const taskApi = axios.create({
  baseURL: `${config.apiUrl}/tareas`,
});

// Interceptor para inyectar automáticamente el Bearer token en cada petición
taskApi.interceptors.request.use(
  (reqConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      reqConfig.headers.Authorization = `Bearer ${token}`;
    }
    return reqConfig;
  },
  (error) => Promise.reject(error)
);

/**
 * Obtener la lista de todas las tareas
 * @param {string|null} token - Token opcional para sobrescribir el de localStorage
 * @returns {Promise<Array>} Lista de tareas
 */
export const obtenerTareas = async (token = null) => {
  const headers = getAuthHeaders(token);
  const response = await taskApi.get("/", { headers });
  return response.data;
};

/**
 * Crear una nueva tarea
 * @param {Object} tareaData - Objeto con datos de la tarea { nombre, descripcion, estado, usuarioId }
 * @param {string|null} token - Token opcional
 * @returns {Promise<Object>} Tarea creada
 */
export const crearTarea = async (tareaData, token = null) => {
  const headers = getAuthHeaders(token);
  const payload = {
    nombre: tareaData.nombre,
    descripcion: tareaData.descripcion || "",
    estado: Boolean(tareaData.estado),
    ...(tareaData.usuarioId ? { usuarioId: tareaData.usuarioId } : {}),
  };
  const response = await taskApi.post("/", payload, { headers });
  return response.data;
};

/**
 * Actualizar una tarea existente
 * @param {string} id - ID de la tarea
 * @param {Object} tareaData - Campos a actualizar { nombre, descripcion, estado, usuarioId }
 * @param {string|null} token - Token opcional
 * @returns {Promise<Object>} Tarea actualizada
 */
export const actualizarTarea = async (id, tareaData, token = null) => {
  const headers = getAuthHeaders(token);
  const payload = {
    nombre: tareaData.nombre,
    descripcion: tareaData.descripcion || "",
    estado: Boolean(tareaData.estado),
    ...(tareaData.usuarioId ? { usuarioId: tareaData.usuarioId } : {}),
  };
  const response = await taskApi.put(`/${id}`, payload, { headers });
  return response.data;
};

/**
 * Eliminar una tarea por ID
 * @param {string} id - ID de la tarea a eliminar
 * @param {string|null} token - Token opcional
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const eliminarTarea = async (id, token = null) => {
  const headers = getAuthHeaders(token);
  const response = await taskApi.delete(`/${id}`, { headers });
  return response.data;
};

/**
 * Alternar el estado completado/pendiente de una tarea
 * @param {Object} tarea - Tarea actual
 * @param {string|null} token - Token opcional
 * @returns {Promise<Object>} Tarea con estado actualizado
 */
export const alternarEstadoTarea = async (tarea, token = null) => {
  return await actualizarTarea(
    tarea.id,
    {
      ...tarea,
      estado: !tarea.estado,
    },
    token
  );
};

const TaskService = {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  alternarEstadoTarea,
  getAuthHeaders,
  // Aliases en inglés para flexibilidad
  getTasks: obtenerTareas,
  createTask: crearTarea,
  updateTask: actualizarTarea,
  deleteTask: eliminarTarea,
};

export default TaskService;
