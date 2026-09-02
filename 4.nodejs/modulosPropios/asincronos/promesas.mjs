//promesa: es un objeto esperando en cumplimiento de la captura de datos(atemporales). los datos pueden estar diposnibles
// ahora, en el futuro, o nunca.
/*
  pending: estado inicial, ni cumplida ni rechazada.
  fulfilled: significa que la operación se completó con éxito.
  rejected: significa que la operación falló.
*/

function obtenerDatos(id) {
  return new Promise((resolve, reject) => {
    const usuario = {
      id: 1,
      nombre: "John",
      apellido: "Doe",
      edad: 30,
    };
    if (id === 1) {
      resolve(usuario);
    } else {
      reject("usuario no encontrado");
    }
  });
}
function procesarDatos(usuario) {
  return new Promise((resolve, reject) => {
    resolve(usuario);
  });
}
function guardarDatos(usuario) {
  return new Promise((resolve, reject) => {
    resolve(usuario);
  });
}

//sintaxis con async/await
async function mensajeConfirmacion() {
  return new Promise((resolve, reject) => {
    resolve("Operación completada");
  });
}

obtenerDatos(1)
  .then((usuario) => {
    console.log("usuario econtrado: ", usuario, procesarDatos(usuario));
  })
  .then((usuario) => {
    console.log("datos procesados: ", usuario, guardarDatos(usuario));
  })
  .then((usuario) => {
    console.log("datos guardados: ", usuario);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Operación completada");
  });

async function mostrarDatos(usuario) {
  try {
    await obtenerDatos(usuario);
    await procesarDatos(usuario);
    await guardarDatos(usuario);
    const mensaje = await mensajeConfirmacion();
    console.log(mensaje);
  } catch (error) {
  } finally {
    console.log("Operación completada");
  }
}
mostrarDatos(1);

//funcion atutoinvocable
async () => {
  try {
    await obtenerDatos(usuario);
    await procesarDatos(usuario);
    await guardarDatos(usuario);
    const mensaje = await mensajeConfirmacion();
    console.log(mensaje);
  } catch (error) {
  } finally {
    console.log("Operación completada");
  }
};
