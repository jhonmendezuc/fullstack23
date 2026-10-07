import axios from "axios"
import config from "../config.js"


const login = async(email,password) => {

try{
  const body = {        
        "correo": email,
        "contra": password
       }
  const data = await axios.post(`${config.apiUrl}/usuarios/inicio`,body)
  return data.data
}catch(error){
   return error.response.data
}
}

export default {
  login
}

