import React from "react";
import "./style.css";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {


const navigate = useNavigate();

  return (
    <div className='sign_login_forget_container'>
      <div className='slf_container'>
        <div className="top_titles">
          <h3 className='title_1'>¡Bienvenido a RUMP!</h3>
          <h4 className='title_2'>Crea tu cuenta</h4>
        </div>

        <form action="" className="signup_form">
          
          <div className="slf_input">
            <input type="text"  placeholder="Ingrese Email..."/>
          </div>
          <div className="slf_input">
            <input type="text"  placeholder="Ingrese contraseña..."/>
          </div>
          <div className="policy_check">
              <Form>
              <Form.Check // prettier-ignore
              type="checkbox"
              id={`default`}
              label={<>
                He leído y acepto las <span className="policies_link">políticas de privacidad</span>
              </>}
            />
          </Form>

          </div>

          <button className="slf_button">
          Registrarse
          </button>
        </form>
        <div className="allready_signed" onClick={()=> navigate("/login")}>
        Volver al Inicio de Sesión
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default SignUp;
