import "./Error.css";
import "animate.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const [petsDashUser, setPetsDashUser] = useState(() => {
    const storedPetsDashUser = localStorage.getItem("petsDashUser");
    return storedPetsDashUser ? JSON.parse(storedPetsDashUser) : null;
  });
  const nav = useNavigate();
  return (
    <div className="error-container">
      <h1 className="animate__animated animate__bounce">oops!</h1>
      <h2>404 Página no encontrada</h2>
      <p>Esta página no está disponible o puede haber sido eliminada</p>
      <button
        onClick={() => {
          petsDashUser?.type == "admin" && nav("/search");
          petsDashUser?.type == "user" && nav("/raza");
          petsDashUser?.type == "seller" && nav("/animal");
        }}
      >
        De vuelta a casa
      </button>
    </div>
  );
}
export default Error;
