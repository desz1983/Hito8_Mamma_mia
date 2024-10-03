import { useEffect, useState } from "react";
import CardPizza from "./CardPizza";
import { useParams } from "react-router-dom";

function Pizzas() {
  const  { pizza_id } = useParams()
  const [pizza, setPizza] = useState({});
  
  useEffect(() => {
    getPizza();
  }, []);

  const getPizza = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/pizzas/${pizza_id}`);
      if( res.status != 200 ){
        throw new Error('error al obtener la pizza')
      }
      const pizzaData = await res.json();
      setPizza(pizzaData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        {Object.keys(pizza).length > 0 && (
          <CardPizza
            desc={pizza.desc}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
            isHome={false}
          />
        )}
      </div>
    </>
  );
}

export default Pizzas;
