import React, { useEffect, useState } from "react";
import "../SignUp/style.css";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url, globa_base_url } from "../../constant";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataset = {
      ...loginData,
    };

    console.log(loginData);
    await axios
      .post(`${globa_base_url}user/admin_login`, dataset)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          toast.success("Has iniciado sesión correctamente");
          localStorage.setItem("pits-token", res.data.result?.access_token);
          localStorage.setItem("petsDashUser", JSON.stringify(res.data.result));
          navigate("/");
          window.location.reload();
        } else {
          toast.error("Error al iniciar sesión");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="sign_login_forget_container">
      <div className="slf_container">
        <div className="top_titles">
          <h3 className="title_1">¡Bienvenido a RUMP!</h3>
        </div>

        <form onSubmit={handleSubmit} action="" className="signup_form">
          <div className="slf_input">
            <input
              required
              type="text"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              placeholder="Ingrese Email o usuario..."
            />
          </div>
          <div className="slf_input">
            <input
              required
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              placeholder="Password"
            />
          </div>
          <button className="slf_button">Ingresar</button>
        </form>
        <div
          className="allready_signed"
          onClick={() => navigate("/forgetPassword")}
        >
          Olvidó Password?
        </div>
        {/* <div className='allready_signed' onClick={() => navigate("/signup")}>
          Crear una Cuenta!
        </div> */}

        <div></div>
      </div>
    </div>
  );
};

export default Login;
