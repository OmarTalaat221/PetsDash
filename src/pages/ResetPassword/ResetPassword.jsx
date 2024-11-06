import React, {useEffect, useState} from "react";
import "../SignUp/style.css";
import {Form} from "react-bootstrap";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {base_url, globa_base_url} from "../../constant";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();
  const email= location?.state?.email
  const checked= location?.state?.checked

  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [resetData, setResetData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });


  if(!email || !checked){
    return (<Navigate to={"/forgetPassword"} replace={true}/>)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataset = {
      ...resetData,
      email
    };


    if(dataset.password != dataset.confirmPassword){
      toast.error("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    delete dataset.confirmPassword
    console.log(resetData);
    await axios
      .post(`${globa_base_url}user/reset_password`, dataset)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          toast.success("Has iniciado sesión correctamente");
          navigate("/login");

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
    <div className='sign_login_forget_container'>
      <div className='slf_container'>
        <div className='top_titles'>
          <h3 className='title_1'>¡Bienvenido a RUMP!</h3>
          <p className='title_1'>Restablecer contraseña</p>
        </div>

        <form onSubmit={handleSubmit} action='' className='signup_form'>
          <div className='slf_input'>
            <input
              required
              type='text'
              value={email}

              disabled
              readOnly
              placeholder='Ingrese Email o usuario...'
            />
          </div>
          <div className='slf_input'>
            <input
              required
              type='password'
              value={resetData.password}
              onChange={(e) =>
                setResetData({...resetData, password: e.target.value})
              }
              placeholder='Password'
            />
          </div>
          <div className='slf_input'>
            <input
              required
              type='password'
              value={resetData.confirmPassword}
              onChange={(e) =>
                setResetData({...resetData, confirmPassword: e.target.value})
              }
              placeholder='Confirmar Contraseña'
            />
          </div>
          <button className='slf_button'>REINICIAR</button>
        </form>

        <div className='allready_signed' onClick={() => navigate("/login")}>
        volver al inicio de sesión
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ResetPassword;
