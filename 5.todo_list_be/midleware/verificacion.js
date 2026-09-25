import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verificacion = async (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).send({ respuesta: "no se envío token" });
  }
  const token = header.split(" ")[1];

  try {
    const usuario = await jwt.verify(token, process.env.SECRETO);
    req.datos = usuario;
    next();
  } catch (error) {
    return res.status(401).send({ respuesta: "token inválido", error: error });
  }
};

export default {
  verificacion,
};
