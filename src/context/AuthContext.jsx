import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const logout = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
  };

  const userLogin = async (email, password) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      const resp = await fetch("http://localhost:5000/api/auth/login", options);
      if (resp.status != 200) {
        Swal.fire({
          title: "Error!",
          text: "El usuario no existe",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        throw new Error("error al hacer el login");
        return;
      }
      const data = await resp.json();
      setToken(data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userEmail", email);
      await getUser(data.token);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (email, password, confirmPassword) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword
        }),
      };

      const resp = await fetch("http://localhost:5000/api/auth/register", options);
      if (resp.status != 200) {
        Swal.fire({
          title: "Error!",
          text: "Error al crear usuario",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        throw new Error("error al hacer el login");
        return;
      }
      const data = await resp.json();
      console.log("register -->", data);
      
      setToken(data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userEmail", email);
      await getUser(data.token);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async (newToken) => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      };
      const getUser = await fetch("http://localhost:5000/api/auth/me", options);
      if (getUser.status != 200) {
        throw new Error("error al obtener los datos del usuario");
        return;
      }
      const currentUser = await getUser.json();
      setUser(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
        userLogin,
        user,
        setUser,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
