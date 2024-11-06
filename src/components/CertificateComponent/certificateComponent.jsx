import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import certificate from "../../assets/images/certificate.jpg";

import { formatDate } from "../../CustomHooks/dateFormats";

function CertificateComponent({ data, certificateRef }) {
  useEffect(() => {
    console.log();
  }, [data]);
  return (
    <div className="cert_image" ref={certificateRef}>
      <div className="img-div">
        <img src={certificate} alt="Certificate" />
      </div>

      <div className="pet_data">
        <div>{data?.user_animal_id || "ID"}</div>
        <div style={{ textTransform: "uppercase" }}>
          {`${data?.f_name} ${data?.l_name}` || "Nobmre"}
        </div>
        <div style={{ textTransform: "uppercase" }}>
          {data?.useranimal?.responses.map((item) => item.name) || "Responses"}
        </div>
        <div>{data?.districto?.title_es || "title_es"}</div>
        <div>{formatDate(data?.created_at) || "Created_at"}</div>
        <div style={{ textTransform: "uppercase" }}>
          {`${data?.f_name} ${data?.l_name}` || "Name"}
        </div>
      </div>
    </div>
  );
}

export default CertificateComponent;
