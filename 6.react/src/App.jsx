import Busqueda from "../src/Busqueda.jsx";

function App() {
  let idioma = "en";

  function cambiarIdioma() {
    idioma = "es";
  }

  return (
    <div>
      <button onClick={() => cambiarIdioma}>Cambiar idioma</button>
      <Busqueda
        nombreTitulo="Search the site"
        nombreBoton="Go somewhere"
        idioma={idioma}
      />
      <Busqueda
        nombreTitulo="Busqueda en el sitio"
        nombreBoton="Buscar algo"
        idioma={idioma}
      />
    </div>
  );
}

export default App;
