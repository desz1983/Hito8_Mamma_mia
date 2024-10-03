import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { formatCurrency } from "../helpers/format";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
const Cart = () => {
  const {
    amount,
    increaseQuantity,
    decreaseQuantity,
    cart,
    deleteElementCart,
  } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  
  const checkoutCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviamos el token para autenticación
        },
        body: JSON.stringify({ cart, totalAmount: amount }), // Enviamos el carrito y el monto total
      });

      if (!response.ok) {
        throw new Error("Error al procesar el pago. Intenta nuevamente.");
      }

      const result = await response.json();

      Swal.fire({
        title: "Pago exitoso",
        text: `Gracias por tu compra!`,
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const validateAuth = () => {
    if (!token) {
      Swal.fire({
        title: "Error!",
        text: "Debes iniciar sesión para poder realizar el pago",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    checkoutCart();
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Card border="danger" style={{ width: "40rem" }}>
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title className="text-center pb-3 pt-3">
              <strong>Carrito de compras</strong>
            </Card.Title>
            {cart.map((c) => (
              <Card className="mb-3" style={{ width: "540px" }} key={c.pizzaId}>
                <div className="row g-0 border border-warning rounded">
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <Card.Img className="pt-4" src={c.pizzaImg} />
                  </div>
                  <div className="col-md-8 pt-3">
                    <Card.Body>
                      <Card.Text className="text-center">
                        {c.pizzaName}
                      </Card.Text>
                      <Card.Text className="text-center">
                        {formatCurrency(c.pizzaPrice)}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                          <motion.button
                            className="border"
                            variant="light"
                            onClick={() => decreaseQuantity(c.pizzaId)}
                            whileTap={{ scale: 2.2 }}
                          >
                            -
                          </motion.button>
                          <motion.span
                            whileHover={{ scale: 2.2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {c.quantity}
                          </motion.span>
                          <motion.button
                            className="border"
                            variant="light"
                            onClick={() => increaseQuantity(c.pizzaId)}
                            whileTap={{ scale: 2.2 }}
                          >
                            +
                          </motion.button>
                        </div>
                        <strong>
                          Total:$ {formatCurrency(c.pizzaPrice * c.quantity)}
                        </strong>

                        <motion.button
                          className="btn btn-danger"
                          onClick={() => deleteElementCart(c.pizzaId)}
                          whileHover={{ scale: 1.1 }}
                        >
                          🗑️
                        </motion.button>
                      </div>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            ))}
            <div className="pt-3 text-center">
              <h3>Total carrito: ${formatCurrency(amount)}</h3>
              <Button
                variant="warning"
                className="mt-2"
                disabled={!token}
                onClick={() => validateAuth()}
              >
                Pagar
              </Button>
            </div>
            <div className="pt-3 text-center">
              <Button as={Link} to="/" variant="dark">
                Seguir comprando
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default Cart;
