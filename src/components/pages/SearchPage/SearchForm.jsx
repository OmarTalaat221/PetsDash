import React, { useEffect, useState } from "react";
import "./style.css";
import FormCard from "../../FormCard/FormCard";
import {
  SearchIconify,
  downloadIcon,
  filterIcon,
} from "../../../assets/svgIcons";
import CustomButton from "../../CustomButton/CustomButton";
import axios from "axios";
import { base_url } from "../../../constant";
import useGetDepartments from "../../../CustomHooks/useGetAllDepartments";
import useGetDepProvencia from "../../../CustomHooks/useGetDepProvencia";
import useGetProvDis from "../../../CustomHooks/useGetProvDis";
import Select from "react-select";
import CustomInput from "../../CustomInput/CustomInput";

const petBirthdayOptions = [
  { label: "Seleccionar", value: "Seleccionar" },
  { label: "ENERO", value: "ENERO" },
  { label: "FEBRERO", value: "FEBRERO" },
  { label: "MARZO", value: "MARZO" },
  { label: "ABRIL", value: "ABRIL" },
  { label: "MAYO", value: "MAYO" },
  { label: "JUNIO", value: "JUNIO" },
  { label: "JULIO", value: "JULIO" },
  { label: "AGOSTO", value: "AGOSTO" },
  { label: "SETIEMBRE", value: "SETIEMBRE" },
  { label: "OCTUBRE", value: "OCTUBRE" },
  { label: "NOVIEMBRE", value: "NOVIEMBRE" },
  { label: "DICIEMBRE", value: "DICIEMBRE" },
];

const getToDayDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate());
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const SearchForm = ({
  searchData,
  handleSearch,
  setSearchData,
  setIsSubmitted,
  handleDownload,
}) => {
  const [language, setLanguage] = useState("es");
  const [razaSelection, setRazaSelection] = useState([]);

  useEffect(() => {
    const lang = document.documentElement.lang;
    setLanguage(lang);
  }, []);
  const [departamentoSelection, setDepartamentoSelection] = useState([]);
  const [provinciaSelection, setProvinciaSelection] = useState([]);
  const [distSelection, setDistSelection] = useState([]);
  // to get DepartamentoInput value
  const [departamentoId, setDepartamentoId] = useState();
  const [proviId, setProviId] = useState();

  // to get all data in raza selection
  const getAllRazaSelection = () => {
    axios
      .get(base_url + `get_all_raza_for_admin`)
      .then((res) => {
        if (res.status === 200 && Array.isArray(res.data.Raza)) {
          console.log(res.data.Raza);
          setRazaSelection(
            res.data.Raza.map((item) => ({
              value: item.id,
              label: language === "en" ? item.title_en : item.title_es,
            }))
          );
        }
      })
      .catch((eror) => console.log(eror));
  };

  // to get all department selection
  const handleDepartamentoFocus = async () => {
    axios
      .get(base_url + `get_all_departmento_for_admin`)
      .then((res) => {
        if (res.status === 200) {
          if (Array.isArray(res.data.Departments)) {
            if (res.data.Departments.length !== 0) {
              setDepartamentoId(res.data.Departments[0].id);
              setDepartamentoSelection(
                res.data.Departments.map((item) => ({
                  value: item.id,
                  label: language === "en" ? item.title_en : item.title_es,
                }))
              );
            }
          }
        }
      })
      .catch((error) => console.log(error));
  };
  //

  // to get all provinica selection
  const getAllProvinciaSelection = () => {
    axios
      .get(base_url + `departmento_prov/${departamentoId}`)
      .then((res) => {
        if (res.status === 200) {
          setProvinciaSelection(
            res.data.map((item) => ({
              value: item.id,
              label: language === "en" ? item.title_en : item.title_es,
            }))
          );
        }
      })
      .catch((eror) => console.log(eror));
  };

  // to get all data for dist
  const getAllDistSelection = () => {
    console.log(proviId);
    axios
      .get(base_url + `prov_dis/${proviId}`)
      .then((res) => {
        if (res.status === 200) {
          setDistSelection(
            res.data.map((item) => ({
              value: item.id,
              label: language === "en" ? item.title_en : item.title_es,
            }))
          );
        }
      })
      .catch((eror) => console.log(eror));
  };
  // getAllDistSelection()

  useEffect(() => {
    getAllProvinciaSelection();
    console.log(departamentoId);
  }, [departamentoId]);

  useEffect(() => {
    handleDepartamentoFocus();
    getAllDistSelection();
    getAllRazaSelection();
  }, []);

  const espData = [
    { value: "1", label: "TODOS" },
    { value: "2", label: "AVE" },
    { value: "3", label: "CANINO" },
    { value: "4", label: "FELINO" },
    { value: "5", label: "LAGOMORFO" },
    { value: "6", label: "MARZUPIAL" },
    { value: "7", label: "ROEDOR" },
  ];

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
    setSearchData({
      ...searchData,
      department: e,
      province: null,
      district: null,
    });
  };

  const handleSelectProv = (e) => {
    handleGetProvDis(e?.value);
    setSearchData({ ...searchData, province: e, district: null });
  };

  const handleSelectDis = (e) => {
    handleGetProvDis(e?.value);
    setSearchData({ ...searchData, district: e });
  };

  const sexData = [
    { label: "Masculina", value: "Masculina" },
    { label: "Femenina", value: "Femenina" },
  ];

  const hadnleSelecSex = (e) => {
    setSearchData({ ...searchData, sex: e });
  };

  return (
    <div className="search_form">
      <FormCard
        drawer={true}
        icon={filterIcon}
        header={"Filtros de Búsqueda"}
        children={
          <>
            <div className="dom_third_grid">
              <div className="input_group">
                <CustomInput
                  value={searchData.dni}
                  onChange={(e) =>
                    setSearchData({ ...searchData, dni: e.target.value })
                  }
                  label="DNI"
                  placeholder="Escriba el DNI de la mascota..."
                />
              </div>

              <div className="input_group">
                <CustomInput
                  value={searchData.name}
                  onChange={(e) =>
                    setSearchData({ ...searchData, name: e.target.value })
                  }
                  label="Nombre de la mascota"
                  placeholder="Escriba el nombre de la mascota..."
                  // required
                />
              </div>
              <div className="input_group">
                <label>
                  Sexo 
                </label>
                <Select
                  isClearable
                  placeholder={"Sexo"}
                  value={searchData?.sex}
                  onChange={(e) => {
                    console.log(e);
                    hadnleSelecSex(e);
                  }}
                  options={sexData}
                />
              </div>
            </div>
            <div className="dom_third_grid">
              <div className="input_group">
                <label>
                  Departamento 
                </label>
                <Select
                  isClearable
                  placeholder={"Departmento"}
                  value={searchData?.department}
                  onChange={(e) => {
                    console.log(e);
                    hadnleSelectDep(e);
                  }}
                  options={departments?.map((item) => ({
                    label: item.title_es,
                    value: item?.id,
                  }))}
                />
              </div>

              <div className="input_group">
                <label>
                  Provincia 
                </label>
                <Select
                  isClearable
                  placeholder={"Provincia"}
                  value={searchData.province}
                  onChange={(e) => {
                    handleSelectProv(e);
                  }}
                  options={depProv.map((item) => ({
                    label: item?.title_es,
                    value: item?.id,
                  }))}
                  defaultValue="Acobamba"
                />
              </div>
              <div className="input_group">
                <label>
                  Distrito
                </label>
                <Select
                  isClearable
                  placeholder={"Distrito"}
                  value={searchData.district}
                  onChange={(e) => handleSelectDis(e)}
                  options={provDis.map((item) => ({
                    label: item?.title_es,
                    value: item?.id,
                  }))}
                />
              </div>
            </div>

            <div className="dom_third_grid">
              <div className="input_group">
                <CustomInput
                  label="Fecha de inicio"
                  max={getToDayDate()}
                  type={"date"}
                  placeholder="fecha de nacimiento"
                  onChange={(e) => {
                    setSearchData({ ...searchData, startDate: e.target.value });
                  }}
                />
              </div>
              <div className="input_group">
                <CustomInput
                  label="Fecha de finalización"
                  max={getToDayDate()}
                  type={"date"}
                  placeholder="fecha de nacimiento"
                  onChange={(e) => {
                    setSearchData({ ...searchData, endDate: e.target.value });
                  }}
                />
              </div>
              <div className="input_group">
                <CustomInput
                  value={searchData.especie}
                  onChange={(e) =>
                    setSearchData({ ...searchData, especie: e.target.value })
                  }
                  label="Especie"
                  placeholder="Escriba el Especie de la mascota..."
                  // required
                />
              </div>
            </div>
            <div className=" d-flex gap-3">
              <CustomButton
                onClick={handleSearch}
                text={"Buscar"}
                bgColor={"#4e73df"}
                icon={SearchIconify}
              />
              <CustomButton
                text={"Explortar"}
                icon={downloadIcon}
                bgColor={"#5cb85c"}
                onClick={handleDownload}
              />
            </div>
          </>
        }
      />
    </div>
  );
};

export default SearchForm;
