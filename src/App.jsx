import "./App.css";
import { useContext } from "react";
import Navbar from "./componentes/Navbar";
import Home from "./views/Home";
import Footer from "./componentes/Footer";
import Cart from "./views/Cart";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import Pizzas from "./componentes/Pizzas";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./views/Profile";
import NotFound from "./views/NotFound";
import CartProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import Logout from "./views/Logout";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/RegisterPage" element={<RegisterPage />}></Route>
            <Route path="/LoginPage" element={<LoginPage />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route
              path="/Profile"
              element={token ? <Profile /> : <Navigate to="/LoginPage" />}
            ></Route>
            <Route path="/Pizza/:pizza_id" element={<Pizzas />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/Logout" element={<Logout />}></Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </CartProvider>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
}

export default App;
