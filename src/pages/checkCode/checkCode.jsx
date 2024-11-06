import React, {useEffect, useState} from "react";
import "../SignUp/style.css";
import {Form} from "react-bootstrap";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {base_url, globa_base_url} from "../../constant";
import toast from "react-hot-toast";

const CheckCode = () => {
  const location = useLocation();
  const email= location?.state?.email

  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [codeData, setCodeData] = useState({
      email: "",
      code:""
  });


  if(!email){
    return (<Navigate to={"/forgetPassword"} replace={true}/>)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataset = {
      ...codeData,
        email
    };

    await axios
      .post(`${globa_base_url}user/check_code`, dataset)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          toast.success("El código ingresado fue exitoso");
          navigate("/reset_password", {state: {email , checked:true}});
        } else {
          toast.error("El código ingresado")
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
          <p className='title_1'>Introduzca el código enviado</p>
        </div>

        <form onSubmit={handleSubmit} action='' className='signup_form'>
          <div className='slf_input'>
            <input
              required
              type='text'
              value={email}
              disabled
              readOnly
            />
          </div>
          <div className='slf_input'>
            <input
              required
              value={codeData.code}
              onChange={(e) =>
                setCodeData({...codeData, code: e.target.value})
              }
              placeholder='Introducir código'
            />
          </div>
          
          <button className='slf_button'>Restablecer contraseña</button>
        </form>

        <div className='allready_signed' onClick={() => navigate("/login")}>
        volver al inicio de sesión
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default CheckCode;
