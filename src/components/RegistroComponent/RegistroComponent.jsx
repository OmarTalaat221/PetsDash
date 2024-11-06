import React, { useEffect } from "react";
import "./style.css";
import registro from "../../assets/images/Registro.jpg";

import { formatDate } from "../../CustomHooks/dateFormats";
import TableLayout from "../TableLayout";

function RegistroComponent({ data, registroRef }) {
  useEffect(() => {
    console.log();
  }, [data]);
  return (
    <div className="registro_image" ref={registroRef}>
      <div className="registro_img-div">
        <img src={registro} alt="Certificate" />
      </div>

      <div className="pet_data_registro">
        <div>{data?.user_animal_id || "ID"}</div>
        <div style={{ textTransform: "uppercase" }}>
          {`${data?.f_name} ${data?.l_name}` || "ID"}
        </div>
        <div style={{ textTransform: "uppercase" }}>
          {data?.useranimal?.responses.map((item) => item.name) || "Responses"}
        </div>
        <div style={{ textTransform: "uppercase" }}>
          {formatDate(data?.created_at) || "created_at"}
        </div>
        <div>
          {data?.provincia?.title_es || "Provicia"} -{" "}
          {data?.departmento?.title_es || "Departmento"}
        </div>
        <div style={{ textTransform: "uppercase" }}>
          {data?.districto?.title_es || "Distrito"}
        </div>
        <div style={{ textTransform: "uppercase" }}>
          {data?.raza?.title_es || "Raza"}
        </div>
        <div style={{ textTransform: "uppercase" }}>
          {data?.coat_color || "Color"}
        </div>
      </div>
    </div>
  );
}

export default RegistroComponent;
