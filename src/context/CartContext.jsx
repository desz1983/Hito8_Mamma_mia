import { createContext, useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const { token } = useContext(AuthContext)
  
	useEffect(() => { // agrego un useEffect para calcular el precio cada vez que se modifique el carrito
    calculateAmount();
  }, [cart]);

	const addToCart = (pizza) => {
    if(!token){
      Swal.fire({
        title: "Error!",
        text: "Para agregar al carro debes iniciar sesion o registrate",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return
    }
		const findPizzaIndex = cart.findIndex(p => p.pizzaId === pizza.pizzaId); // busco el indice del elemento en el carrito
	
		if (findPizzaIndex >= 0) { // si encuentra el producto entramos aca
			const updatedCart = [...cart]; // hago una copia del carrito por que no se puede modificar el original si no react no va a detectar el cambio
			updatedCart[findPizzaIndex].quantity += 1; // busco el elemento con el indice encontrado y aumento la cantidad
			setCart(updatedCart); // guardo el nuevo estado del carro
		} else { // si no existe la pizza en el carro entramos aca
			const addNewElement = [...cart, pizza]; // copiamos el carro actual y agregamos el nuevo elemento
			setCart(addNewElement); // guardo el nuevo estado del carro
		}
    toast.success("Pizza agregada al carrito", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
	};
	
  const calculateAmount = () => {
    const newAmount = cart.reduce(
      (acc, product) => acc + product.pizzaPrice * product.quantity,
      0
    );
    setAmount(newAmount);
  };

  const increaseQuantity = (id) => {
    const data = [...cart]; // estamos creando una copia de cart
    const index = data.findIndex((p) => p.pizzaId == id); // cuando index recorra la copia de cart y sean iguales los id
    const newQuantity = Number(data[index].quantity) + 1; // index de la copia  + 1 ,
    data[index].quantity = newQuantity; //será la nueva cantidad (newQuantity)
    setCart(data); // ahora el setCart está con la nueva data
    return;
  };

  const decreaseQuantity = (id) => {
    const data = [...cart]; // Creamos una copia del carrito
    const index = data.findIndex((p) => p.pizzaId == id); // Encontramos el índice del producto con el id dado
    const newQuantity = Number(data[index].quantity) - 1; // Reducimos la cantidad en 1
    if (newQuantity === 0) {
      data.splice(index, 1); // Si la cantidad es 0, eliminamos el producto del carrito
    } else {
      data[index].quantity = newQuantity; // Si la cantidad es mayor que 0, la actualizamos
    }
    setCart(data); // Actualizamos el carrito con la nueva data
  };
	
	const deleteElementCart = (id) => { // recibo el id
		const data = [...cart]; // copio el array original para modificarlo
		const index = data.findIndex((p) => p.pizzaId == id); // busco el indice en el array
		data.splice(index, 1); // elimino el elemento
		setCart(data); // guardo el nuevo estado 
    toast.error('Pizza eliminada del carrito', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
		return
	}

  return (
    <CartContext.Provider
      value={{
        amount,
				increaseQuantity,
				decreaseQuantity,
				addToCart,
				cart,
				deleteElementCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
