import Button from "react-bootstrap/Button";
import styled from "styled-components";

const VinetaEn = () => <> 🇺🇸 </>;
const VinetaEs = () => <> 🇪🇸 </>;

function Busqueda(props) {
  const { idioma } = props;

  console.log(props);
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: #bf4f74;
  `;

  return (
    <>
      <Title>
        {idioma.idioma == "en" ? <VinetaEn /> : <VinetaEs />}

        {idioma.nombreTitulo}
      </Title>
      <input type="text" />
      <Button variant="primary">{idioma.nombreBoton}</Button>
    </>
  );
}

export default Busqueda;
