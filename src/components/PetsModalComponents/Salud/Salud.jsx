import { useState } from "react";
import "./style.css";
import CustomInput from "../../CustomInput/CustomInput";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Select from "react-select";
import { motion } from "framer-motion";

export default function Salud({
  newPit,
  setNewPet,
  setNewsetValue,
  setSelectedTab,
}) {
  const [veterinarian, setVeterinarian] = useState("no");
  const [vacunación, setVacunación] = useState("no");
  const [tripleVacunación, setTripleVacunación] = useState("no");
  const [alergia, setAlergia] = useState("no");
  const [alguna, setAlguna] = useState("no");

  const yesNoOptions = [
    {
      label: "Si",
      value: 1,
    },
    {
      label: "No",
      value: 0,
    },
  ];

  const getToDayDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate()); // Add 1 day

    // Format the date to YYYY-MM-DD
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
    >
      <div className="dom_third_grid">
        <div className="input_group">
          <label>
            ¿La mascota está castrada? <span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit.esta_cast}
            onChange={(e) => {
              setNewPet({ ...newPit, esta_cast: e });
            }}
            defaultValue="Amazonas"
            options={yesNoOptions}
          />
        </div>
        <div className="input_group">
          <label>
            ¿Visita periodicamente al veterinario? <span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit.visit_per}
            onChange={(e) => {
              setNewPet({ ...newPit, visit_per: e });
            }}
            defaultValue="Amazonas"
            options={yesNoOptions}
          />
        </div>
        <div className="input_group">
          <label>
            ¿Cuenta con vacunación séxtuple? <span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit?.cuenta_con_vac_sext}
            onChange={(e) => {
              setNewPet({ ...newPit, cuenta_con_vac_sext: e });
            }}
            options={yesNoOptions}
          />
        </div>
        <div className="input_group">
          <label>
            ¿Cuenta con vacunación triple felina?<span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit?.cuenta_con_vac_trip_fel}
            onChange={(e) => {
              setNewPet({ ...newPit, cuenta_con_vac_trip_fel: e });
            }}
            options={yesNoOptions}
          />
        </div>
        <div className="input_group">
          <label>
            ¿Cuenta con limpieza dental?<span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit?.cuenta_con}
            onChange={(e) => {
              setNewPet({ ...newPit, cuenta_con: e });
            }}
            options={yesNoOptions}
          />
        </div>
        <div className="input_group">
          <CustomInput
            label="Fecha de última desparacitación"
            required
            max={getToDayDate()}
            value={newPit.fecha_de_date}
            type={"date"}
            placeholder="Fecha de última desparacitación"
            onChange={(e) =>
              setNewPet({ ...newPit, fecha_de_date: e.target.value })
            }
          />
        </div>

        <div className="input_group">
          <label>
            ¿Posee alguna alergia?<span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit?.posee_alg_alerg}
            onChange={(e) => {
              setNewPet({ ...newPit, posee_alg_alerg: e });
            }}
            options={yesNoOptions}
          />
        </div>

        <div className="input_group">
          <label>
            ¿Posee alguna enfermedad?<span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit?.posee_alg_enf}
            onChange={(e) => {
              setNewPet({ ...newPit, posee_alg_enf: e });
            }}
            options={yesNoOptions}
          />
        </div>

        <div className="input_group">
          <label>
            ¿El animal es estéril?<span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit?.is_sterillized}
            onChange={(e) => {
              setNewPet({ ...newPit, is_sterillized: e });
            }}
            options={yesNoOptions}
          />
        </div>
      </div>
      <div className="input_group">
        <label>No mostrar en tabla de mascotas</label>
        <Select
          placeholder={"Seleccionar..."}
          // value={yesNoOptions.find((e) => e.value === newPit.hide_as_stri)}
          value={
            yesNoOptions
              ?.filter((e) => e.value === newPit.hide_as_stri)
              ?.map((e) => ({
                label: e.label,
                value: e.value,
              }))[0] || null
          }
          onChange={(e) => {
            setNewPet({ ...newPit, hide_as_stri: e.value });
          }}
          options={yesNoOptions}
        />
      </div>

      <div className="btns">
        <button
          className="btn"
          onClick={() => {
            setSelectedTab("2");
          }}
        >
          <FaAnglesLeft />
          <span>Atras</span>
        </button>
        <button
          className="btn"
          onClick={() => {
            setSelectedTab("4");
          }}
        >
          <FaAnglesRight />
          <span>Siguiente</span>
        </button>
      </div>
    </motion.div>
  );
}
