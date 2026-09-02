//callbacks: funcion que se ejecuta cuando termina otra funcion

console.log("tarea1");
console.log("tarea2");
console.log("tarea3");

function obtenerDatos(callback) {
  const usuario = {
    nombre: "John",
    apellido: "Doe",
    edad: 30,
  };

  setTimeout(() => {
    console.log("datos obtenidos: ", usuario);
    callback(usuario);
  }, 5000);
}
/*
function procesarDatos(usuario, nombre) {
  console.log("procesando datos: ", usuario);
  setTimeout(() => {
    console.log("datos procesados: ", usuario);
    guardarDatos(usuario);
  }, 3000);
} */

function guardarDatos(usuario) {
  console.log("guardando datos: ", usuario);
}

obtenerDatos((usuario) => {
  console.log("procesando datos: ", usuario);
  setTimeout(() => {
    console.log("datos procesados: ", usuario);
    guardarDatos(usuario);
  }, 10000);
}, "jhon");
