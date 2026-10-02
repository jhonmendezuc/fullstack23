import Busqueda from "../src/Busqueda.jsx";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [idioma, setIdioma] = useState({
    idioma: "en",
    nombreTitulo: "Search the site",
    nombreBoton: "Go somewhere",
  });

  useEffect(() => {
    console.log("Idioma cambiado:", idioma);
  }, [idioma]);

  function cambiarIngles() {
    setIdioma({
      idioma: "en",
      nombreTitulo: "Search the site",
      nombreBoton: "Go somewhere",
    });
  }
  function cambiarEspañol() {
    setIdioma({
      idioma: "es",
      nombreTitulo: "Buscar en el sitio",
      nombreBoton: "Ir a algún lugar",
    });
    console.log(idioma);
  }

  return (
    <div>
      <button onClick={cambiarIngles}>Cambiar idioma a Ingles</button>
      <button onClick={cambiarEspañol}>Cambiar idioma a Español</button>
      <Busqueda idioma={idioma} />
    </div>
  );
}

export default App;
