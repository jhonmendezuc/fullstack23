import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const clientePrisma = new PrismaClient();
//funcion que se llama desde el controla para obtener las usuarios de la bd
const obtenerUsuarios = async () => {
  //llamado a la bd
  const respuesta = await clientePrisma.usuario.findMany();
  return respuesta; //retorno de los datos de la bd
};

const crearUsuario = async (body) => {
  let contraEncriptada = await encriptarContra(body.contra);
  const respuesta = await clientePrisma.usuario.create({
    data: {
      nombre: body.nombre,
      correo: body.correo,
      contra: contraEncriptada,
    },
  });
  return respuesta;
};

const actualizarUsuario = async (body, id) => {
  let contraEncriptada = await encriptarContra(body.contra);
  const respuesta = await clientePrisma.usuario.update({
    where: {
      id: id,
    },
    data: {
      nombre: body.nombre,
      correo: body.correo,
      contra: contraEncriptada,
    },
  });
  return respuesta;
};

const eliminarUsuario = async (id) => {
  const respuesta = await clientePrisma.usuario.delete({
    where: {
      id: id,
    },
  });
  return respuesta;
};

const inicioUsuario = async (body) => {
  let { correo, contra } = body;
  let respuesta = {};
  let usuario = await clientePrisma.usuario.findUnique({
    where: {
      correo: correo,
    },
  });

  if (usuario) {
    if (await compararContra(usuario.contra, contra)) {
      usuario.contra = "";
      const token = jwt.sign(usuario, process.env.SECRETO);
      respuesta = { respuesta: "Inicio exitoso", datos: token };
    } else {
      respuesta = { respuesta: "Contraseña incorrecta" };
    }
  } else {
    respuesta = { respuesta: "usuario no existe" };
  }

  return respuesta; //retorno de los datos de la bd
};
async function encriptarContra(contra) {
  const salt = 10;
  return await bcrypt.hash(contra, salt);
}
async function compararContra(contraBD, contraBody) {
  return await bcrypt.compare(contraBody, contraBD);
}

export default {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  inicioUsuario,
};
