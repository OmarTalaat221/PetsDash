

import React, { useState } from "react";
import "../SignUp/style.css";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { globa_base_url } from "../../constant";
import toast from "react-hot-toast";

const ForgetPassword = () => {

  const navigate = useNavigate();

  
  const [email , setEmail] = useState();
  const [loading , setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();


    const dataset = {
        email
    }
    await axios
      .post(`${globa_base_url}user/send_code`, dataset)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          toast.success("Recibe el Código de Documento Sexual, revisa tu correo electrónico!");
          navigate("/chekc_code", {state: {email}});
        } else {
          toast.error("Ingresa tu correo electrónico");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  return (
    <div className='sign_login_forget_container'>
      <div className='slf_container'>
        <div className="top_titles">
          <h3 className='title_1'>¡Bienvenido a RUMP!</h3>
        </div>

        <form 
          onSubmit={handleSubmit}
        
        action="" className="signup_form">
          
          <div className="slf_input">
            <input type="text"  value={email} onChange={(e)=> setEmail(e.target.value)}  placeholder="Ingrese Email..."/>
          </div>
          
          

          <button className="slf_button">
          Reestablecer Contraseña
          </button>
        </form>
        <div className="allready_signed" onClick={() => navigate("/login") }>
        Volver al Inicio de Sesión
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ForgetPassword;
