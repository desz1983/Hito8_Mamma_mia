import React, { useContext } from "react";
import { Container, Card, Button, CardBody } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <Card border="warning" style={{ width: "40rem", height: "34rem" }}>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title className="text-center pb-3 pt-3">
            <strong>{user.email}</strong>
          </Card.Title>
          <Button
            className="border btn btn-dark"
            variant="outline-light"
            type="submit"
            onClick={logout}
          >
            Cerrar sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
