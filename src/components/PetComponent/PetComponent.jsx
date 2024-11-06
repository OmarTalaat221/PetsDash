import React, { forwardRef } from "react";
import "./style.css";
import topCard from "../../assets/images/petCardTop.png";
import petImage from "../../assets/images/with_pet_2.jpg";
import backgroundCard from "../../assets/images/background_card.jpg";
import cx from "classnames";

import { formatDate } from "../../CustomHooks/dateFormats";
const PetComponent = ({ data, cols, petComponentRef }) => {
  const updatedDateDni = new Date(data?.created_at);
  updatedDateDni.setFullYear(updatedDateDni.getFullYear() + 5);
  const updatedDateId = new Date(data?.useranimal?.animal?.created_at);
  updatedDateId.setFullYear(updatedDateId.getFullYear() + 5);

  return (
    <div
      ref={petComponentRef}
      className="d-flex align-items-center justify-content-center"
    >
      <div className={cx("pet_card_container row gy-4 ", { container: !cols })}>
        <h2 className="header">DNI RUMP Virtual</h2>
        <div className={cx("left-section col-12 col-lg-6", { "col-12": cols })}>
          <div
            className="rump-card"
            style={{
              background: `linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(255, 255, 255, 0.5)
              ), url(${backgroundCard})`,
            }}
          >
            <div className="rc_image">
              <img src={topCard} alt="Dog" />
            </div>

            <div className=" row px-3">
              <div className="col-2 d-flex flex-column justify-content-between">
                <div className="text-danger ">
                  {data?.dni || data?.useranimal?.animal?.dni || "DNI"}
                </div>
              </div>
              <div className="col-6">
                <div
                  className="text-primary"
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Apellidos
                </div>
                <div className="text-dark fw-bolder">
                  {data?.l_name ||
                    data?.useranimal?.animal?.l_name ||
                    "Apellidos"}
                </div>
                <div
                  className="text-primary"
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Nombers
                </div>
                <div className="text-dark fw-bolder">
                  {data?.f_name ||
                    data?.useranimal?.animal?.f_name ||
                    "Nombers"}
                </div>
                <div
                  className="text-primary"
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Sexo
                </div>
                <div className="text-dark fw-bolder">
                  {data?.sex || data?.useranimal?.animal?.sex || "Sexo"}
                </div>
                <div className="d-flex  gap-3">
                  <div>
                    <div
                      className="text-primary"
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Fecha de nacimiento
                    </div>

                    <div className="text-dark fw-bolder">
                      {data?.dob == null
                        ? formatDate(data?.useranimal?.animal?.dob)
                        : formatDate(data?.dob)}
                    </div>
                    <div
                      className="text-primary"
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Fecha de Inscripción
                    </div>

                    <div className="text-dark fw-bolder">
                      {data?.created_at == null
                        ? formatDate(data?.useranimal?.animal?.created_at)
                        : formatDate(data?.created_at)}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-primary"
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Fecha de finalización
                    </div>

                    <div className="text-dark fw-bolder">
                      {updatedDateDni == "Invalid Date"
                        ? formatDate(updatedDateId)
                        : formatDate(updatedDateDni)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="pet_image_card">
                  <img
                    src={
                      data?.pet_image ||
                      data?.useranimal?.animal?.pet_image ||
                      petImage
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cx("right-section  col-12 col-lg-6", { "col-12": cols })}
        >
          <div className="card-details">
            <div className="d-flex gap-3 flex-wrap justify-content-between">
              <div>
                <strong>Departamento</strong>{" "}
                <div>{data?.departmento?.title_es}</div>
              </div>
              <div>
                <strong>Provincia</strong>{" "}
                <div>{data?.provincia?.title_es}</div>
              </div>
              <div>
                <strong>Distrito</strong>{" "}
                <div>
                  {data?.districto?.title_es || data?.distrito?.title_es}
                </div>
              </div>
            </div>

            <div>
              <strong>Dirección</strong>{" "}
              <div>{data?.address || data?.useranimal?.animal?.address}</div>
            </div>
            {data?.responses?.map((item, index) => {
              return (
                <div>
                  <strong>Responsable {index + 1}</strong>{" "}
                  <div>{item?.name}</div>
                </div>
              );
            })}
            <div>
              <strong>Raza</strong>{" "}
              <div>
                {data?.raza?.title_es ||
                  data?.useranimal?.animal?.raza?.title_es}
              </div>
            </div>
            <div>
              <strong>Color</strong>{" "}
              <div>
                {data?.coat_color || data?.useranimal?.animal?.coat_color}
              </div>
            </div>
            <div>
              <strong>Clasificación</strong>{" "}
              <div>
                {data?.qualified || data?.useranimal?.animal?.qualified}
              </div>
            </div>
            <div>
              <strong>Microchip</strong>{" "}
              <div>
                {data?.microchip ||
                  data?.useranimal?.animal?.microchip ||
                  "microchip"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetComponent;
