import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import notFoundImage from "../img/Error404.jpg";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <h1>404 - Página no encontrada</h1>
      <img
        src={notFoundImage}
        alt="Página no encontrada"
        className="not-found-image"
        style={{ maxWidth: "44%", height: "auto" }}
      />
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">
        <Button variant="dark">Regresar a la página principal</Button>
      </Link>
    </Container>
  );
};

export default NotFound;