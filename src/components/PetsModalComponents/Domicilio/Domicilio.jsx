import Select from "react-select";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import CustomInput from "../../CustomInput/CustomInput";
import "./style.css";
import { useEffect } from "react";
import useGetDepartments from "../../../CustomHooks/useGetAllDepartments";
import useGetDepProvencia from "../../../CustomHooks/useGetDepProvencia";
import useGetProvDis from "../../../CustomHooks/useGetProvDis";
import { motion } from "framer-motion";

const Departamento = [
  { value: "Amazonas", label: "Amazonas" },
  { value: "Áncash", label: "Áncash" },
  { value: "Apurímac", label: "Apurímac" },
  { value: "Arequipa", label: "Arequipa" },
  { value: "Ayacucho", label: "Ayacucho" },
  { value: "Cajamarca", label: "Cajamarca" },
  { value: "Callao", label: "Callao" },
  { value: "Cusco", label: "Cusco" },
  { value: "Huancavelica", label: "Huancavelica" },
  { value: "Huánuco", label: "Huánuco" },
  { value: "Ica", label: "Ica" },
  { value: "Junín", label: "Junín" },
  { value: "La Libertad", label: "La Libertad" },
];

const Provincia = [
  { value: "Acobamba", label: "Acobamba" },
  { value: "Angaraes", label: "Angaraes" },
  { value: "Castrovirreyna", label: "Castrovirreyna" },
  { value: "Churcampa", label: "Churcampa" },
  { value: "Huancavelica", label: "Huancavelica" },
  { value: "Huaytará", label: "Huaytará" },
  { value: "Tayacaja", label: "Tayacaja" },
];

export default function Domicilio({
  setValue,
  setSelectedTab,
  newPit,
  setNewPet,
}) {
  const {
    handleGetDepartments,
    departments,
    setDepartments,
    originalDepartments,
    setOriginalDepartments,
    loading,
    setLoading,
  } = useGetDepartments();
  const {
    handleGetDepProvs,
    depProv,
    setDepProv,
    originalDepProv,
    setOriginalDepProv,
    loading: provLoading,
    setLoading: setPrevLoading,
  } = useGetDepProvencia();
  const {
    handleGetProvDis,
    provDis,
    setProvDis,
    originalProvDis,
    setOriginalProvDis,
  } = useGetProvDis();

  useEffect(() => {
    handleGetDepartments();
  }, []);

  const hadnleSelectDep = (e) => {
    handleGetDepProvs(e?.value);
    setNewPet({
      ...newPit,
      departmento_id: e,
      provincia_id: "",
      districto_id: "",
    });
  };

  const handleSelectProv = (e) => {
    handleGetProvDis(e?.value);
    setNewPet({ ...newPit, provincia_id: e, districto_id: "" });
  };

  const handleSelectDis = (e) => {
    handleGetProvDis(e?.value);
    setNewPet({ ...newPit, districto_id: e });
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
            Departamento <span> (*)</span>
          </label>
          <Select
            value={newPit?.departmento_id}
            onChange={(e) => {
              console.log(e);
              hadnleSelectDep(e);
            }}
            options={departments?.map((item) => ({
              label: item.title_es,
              value: item?.id,
            }))}
            placeholder={"Seleccionar..."}
          />
        </div>

        <div className="input_group">
          <label>
            Provincia <span> (*)</span>
          </label>
          <Select
            value={newPit.provincia_id}
            onChange={(e) => {
              handleSelectProv(e);
            }}
            options={depProv.map((item) => ({
              label: item?.title_es,
              value: item?.id,
            }))}
            defaultValue="Acobamba"
            placeholder={"Seleccionar..."}
          />
        </div>
        <div className="input_group">
          <label>
            Distrito <span> (*)</span>
          </label>
          <Select
            placeholder={"Seleccionar..."}
            value={newPit.districto_id}
            onChange={(e) => handleSelectDis(e)}
            options={provDis.map((item) => ({
              label: item?.title_es,
              value: item?.id,
            }))}
          />
        </div>
      </div>

      <div className="dom_input_group">
        <CustomInput
          label="Dirección"
          required
          placeholder="Dirección/Departamento/Interior"
          onChange={(e) => setNewPet({ ...newPit, address: e.target.value })}
          value={newPit.address}
        />
        <CustomInput
          onChange={(e) => setNewPet({ ...newPit, piso: e.target.value })}
          value={newPit.piso}
          label="Piso"
          placeholder="Escriba el piso..."
        />
      </div>

      <div className="dom_textarea">
        <label>Referencia (avenidas o calles principales)</label>
        <textarea
          value={newPit.referencia}
          onChange={(e) => setNewPet({ ...newPit, referencia: e.target.value })}
          placeholder="Avenidas o calles principales..."
        ></textarea>
      </div>

      <div className="btns">
        <button
          className="btn"
          onClick={() => {
            console.log("select tab");
            setSelectedTab("1");
          }}
        >
          <FaAnglesLeft />
          <span>Atras</span>
        </button>

        <button
          className="btn"
          onClick={() => {
            setSelectedTab("3");
          }}
        >
          <FaAnglesRight />
          <span>Siguiente</span>
        </button>
      </div>
    </motion.div>
  );
}
