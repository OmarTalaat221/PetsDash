import { useEffect, useState } from "react";
import CustomInput from "../../CustomInput/CustomInput";
import "./style.css";
import { FaAnglesRight } from "react-icons/fa6";
import Select from "react-select";
import CustomSelect from "./../../CustomSelect/CustomSelect";
import useGetAnimalsTypes from "../../../CustomHooks/useGetAnimalsTypes";
import useGetAllRaza from "../../../CustomHooks/useGetAllRaza";
import useGetAllQualifications from "../../../CustomHooks/useGetAllQualification";
import CustomButton from "./../../CustomButton/CustomButton";
import { Plus, plus, trashIcon } from "../../../assets/svgIcons";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
const Especie = [
  { value: "AVE", label: "AVE" },
  { value: "CANINO", lable: "CANINO" },
  { value: "FELINO", label: "FELINO" },
  { value: "LAGOMORFO", label: "LAGOMORFO" },
  { value: "MARZUPIAL", label: "MARZUPIAL" },
  { value: "ROEDOR", label: "ROEDOR" },
];

export default function Datos({ setValue, setSelectedTab, setNewPet, newPit }) {
  const [isChecked, setIsChecked] = useState(false);

  const {
    handleGetTypes,
    types,
    setTypes,
    originalTypes,
    setOriginalTypes,
    loading,
    setLoading,
  } = useGetAnimalsTypes();

  const { handleGetAllRaza, raza } = useGetAllRaza();
  const { handleGetAllQualifications, qualifications } =
    useGetAllQualifications();

  useEffect(() => {
    handleGetTypes();
    handleGetAllQualifications();
    handleGetAllRaza();
  }, []);

  const handleAddNewRes = () => {
    setNewPet((prev) => ({
      ...newPit,
      resPersons: [...prev.resPersons, { name: "", dni: "", phone: "" }],
    }));
  };

  const handleChangeRes = (key, value, index) => {
    const newRes = [...newPit.resPersons];
    newRes[index][key] = value;
    setNewPet((prev) => ({
      ...prev,
      resPersons: newRes,
    }));
  };

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

  const handleDeleteIndex = (rowIndex) => {
    const newResData = newPit.resPersons.filter(
      (item, index) => index !== rowIndex
    );

    setNewPet({ ...newPit, resPersons: newResData });
  };

  return (
    <motion.form
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
    >
      <div className="inputs_group_fourth">
        <CustomInput
          value={newPit.animail_f_name}
          onChange={(e) =>
            setNewPet({ ...newPit, animail_f_name: e.target.value })
          }
          label="Nombre de la mascota"
          placeholder="Escriba el nombre de la mascota..."
          required
        />
        <CustomInput
          value={newPit.animail_l_name}
          onChange={(e) =>
            setNewPet({ ...newPit, animail_l_name: e.target.value })
          }
          label="Apellidos"
          placeholder="Apellidos"
          required
        />
        <div className="custom_input">
          <label htmlFor="">
            Sexo? <span className="text-danger">(*)</span>
          </label>
          <Select
            isClearable
            value={newPit.sex}
            onChange={(e) => setNewPet({ ...newPit, sex: e })}
            options={[
              { label: "Masculina", value: "Masculina" },
              { label: "Femenina", value: "Femenina" },
            ].map((item) => ({ label: item.label, value: item.value }))}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: "6px",
              }),
            }}
            placeholder={"Seleccionar..."}
          />
        </div>

        <div className="datos_checked_box">
          <div className="datos_checkbox">
            <input
              checked={newPit.microshipChecked}
              type="checkbox"
              onChange={(e) =>
                setNewPet({ ...newPit, microshipChecked: e.target.checked })
              }
            />
            <label>¿Cuenta con microchip?</label>
          </div>
          {newPit.microshipChecked && (
            <input
              value={newPit.micro}
              onChange={(e) => setNewPet({ ...newPit, micro: e.target.value })}
              type="text"
              className="text-checkbox"
              placeholder="Código de microchip"
            />
          )}
        </div>
      </div>

      <div className="inputs_group_grid">
        {/* <div className='select_box'>
          <label>Tamaño</label>
          <select
            onChange={(e) =>
              setDatosData({...datosData, Tamaño: e.target.value})
            }
          >
            <option>Seleccionar</option>
            <option>Pequeña</option>
            <option>Mediano</option>
            <option>Grande</option>
          </select>
        </div>
           */}

        <div className="select-search">
          <label>
            Tamaño <span>(*)</span>
          </label>

          <Select
            placeholder={"Seleccionar..."}
            value={newPit?.size}
            options={["Pequeño", "Mediano", "Grande"].map((item) => ({
              label: item,
              value: item,
            }))}
            onChange={(e) => setNewPet({ ...newPit, size: e })}
          />
          {/* <Select 
            options={Especie}/> */}
        </div>

        <div className="select-search">
          <label>
            {/* animal type */}
            Especie <span>(*)</span>
          </label>

          <Select
            value={newPit.type}
            options={types.map((item) => ({
              label: item?.title_es,
              value: item?.id,
            }))}
            onChange={(e) => setNewPet({ ...newPit, type: e })}
            placeholder={"Seleccionar..."}
          />
          {/* <Select 
            options={Especie}/> */}
        </div>

        <div className="select-search">
          <label>
            Raza <span>(*)</span>
          </label>
          <Select
            value={newPit.raza}
            options={raza?.map((item) => ({
              label: item.title_es,
              value: item.id,
            }))}
            onChange={(e) => {
              setNewPet({ ...newPit, raza: e });
            }}
            placeholder={"Seleccionar..."}
          />
        </div>
      </div>

      <div className="inputs_group_grid">
        <div className="select-search">
          <label>
            Calificación de la mascota <span>(*)</span>
          </label>
          <Select
            value={newPit.qualified}
            options={qualifications?.map((item) => ({
              label: item.title_es,
              value: item.id,
            }))}
            onChange={(e) => {
              setNewPet({ ...newPit, qualified: e });
            }}
            placeholder={"Seleccionar..."}
          />
        </div>

        <CustomInput
          value={newPit.coat_color}
          onChange={(e) => setNewPet({ ...newPit, coat_color: e.target.value })}
          label="Color"
          placeholder="Escriba el color del pelaje..."
          type="text"
        />
        <CustomInput
          value={newPit.dni}
          onChange={(e) => setNewPet({ ...newPit, dni: e.target.value })}
          label="DNI"
          placeholder="Escriba el color del pelaje..."
          type="text"
          required={true}
        />

        <CustomInput
          value={newPit?.dob}
          max={getToDayDate()}
          onChange={(e) => setNewPet({ ...newPit, dob: e.target.value })}
          label="Fecha de Nacimiento de la mascota"
          type="date"
          required
        />
      </div>

      <AnimatePresence>
        {newPit?.resPersons?.map((item, index) => {
          return (
            <motion.div
              exit={{ x: "1000px" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              className="d-flex align-items-center gap-2 "
            >
              <div
                className={cx("btn btn-danger d-inline mt-3", {
                  "opacity-0": index == 0,
                })}
                style={{ pointerEvents: index == 0 ? "none" : "" }}
                onClick={() => handleDeleteIndex(index)}
              >
                {trashIcon}
              </div>

              <div className="inputs_group_grid w-100">
                <CustomInput
                  value={item.name}
                  onChange={
                    (e) => handleChangeRes("name", e.target.value, index)
                    // setDatosData({...datosData, nombre_responsable1: e.target.value})
                  }
                  required
                  label={`Nombre del Responsable ${index + 1}`}
                  placeholder={`Escriba el nombre del Responsable ${index + 1}`}
                  type="text"
                />
                <CustomInput
                  value={item.dni}
                  onChange={
                    (e) => handleChangeRes("dni", e.target.value, index)
                    // setDatosData({...datosData, nombre_responsable1: e.target.value})
                  }
                  required
                  label={`DNI del Responsable ${index + 1}`}
                  placeholder={`Escriba el DNI del Responsable ${index + 1}`}
                  type="text"
                />
                <CustomInput
                  value={item.phone}
                  onChange={
                    (e) => handleChangeRes("phone", e.target.value, index)
                    // setDatosData({...datosData, nombre_responsable1: e.target.value})
                  }
                  required
                  label={`Teléfono del Responsable ${index + 1}`}
                  placeholder={`Escriba el teléfono del Responsable ${
                    index + 1
                  }`}
                  type="text"
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="d-flex justify-content-center">
        <CustomButton
          onClick={() => handleAddNewRes()}
          text={"Añadir Responsable"}
          icon={Plus}
        />
      </div>

      <div className="datos_textarea">
        <label>Biografía</label>
        <textarea
          value={newPit.bio}
          onChange={(e) => setNewPet({ ...newPit, bio: e.target.value })}
          placeholder="Escriba una referencia de la dirección..."
        ></textarea>
      </div>

      <button
        className="btn btn-primary mt-3 "
        onClick={() => setSelectedTab("2")}
      >
        <span>Siguiente</span>
        <FaAnglesRight />
      </button>

      {/* </div>
        </div> */}
    </motion.form>
  );
}
