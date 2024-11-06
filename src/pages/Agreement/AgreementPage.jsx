import React, { useEffect, useState } from "react";
import FormCard from "../../components/FormCard/FormCard";
import { arrowLeft, arrowRight, edit, filterIcon } from "../../assets/svgIcons";
import CustomInput from "./../../components/CustomInput/CustomInput";
import "./style.css";
import CustomButton from "./../../components/CustomButton/CustomButton";
import TableComponent from "../../components/Table/Table";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { Form, InputGroup } from "react-bootstrap";
import FromGroup from "../../components/FromGroup/FromGroup";
import Modal from "../../components/Modal/Modal";
import {
  FaCircleXmark,
  FaPencil,
  FaPlus,
  FaRegTrashCan,
} from "react-icons/fa6";
import { convenios } from "../../utils/convenios";
import { Table } from "antd";
import Spinner from "./../../utils/Spinner/Spinner";
import useGetAllAgreements from "../../CustomHooks/useGetAllAgreements";
import useGetAnimalsTypes from "../../CustomHooks/useGetAnimalsTypes";
import Select from "react-select";
import useGetDepartments from "../../CustomHooks/useGetAllDepartments";
import useGetDepProvencia from "../../CustomHooks/useGetDepProvencia";
import useGetProvDis from "../../CustomHooks/useGetProvDis";
import { base_url } from "../../constant";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import cx from "classnames";
import { esES } from "rsuite/esm/locales";
import PetComponent from "../../components/PetComponent/PetComponent";
const AgreementPage = () => {
  const [newAgreementModal, setNewAgreementModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("1");
  const [isSearch, setIsSearch] = useState(false);
  const [typoSearch, setTypoSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [selectedDep, setSelectedDep] = useState("");
  const [selectedProv, setSelectedProv] = useState("");
  const [selectedDis, setSelectedDis] = useState("");
  const [newAgreement, setNewAgreement] = useState({
    departmento_id: "",
    provincia_id: "",
    address: "",
    districto_id: "",
    lat: "",
    long: "",
    clinical_name: "",
    phone: "",
    pun_auto: "",
    detalle: "",
    types: "",
  });

  const [modals, setModals] = useState({
    addModal: false,
    update: false,
    showAnimal: false,
  });

  const tabs = [
    {
      id: "1",
      name: "Datos",
    },
    {
      id: "2",
      name: "Dirección",
    },
  ];

  const [addLoading, setAddLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [rowTypes, setRowTypes] = useState([]);

  const {
    handleGerAgreements,
    loading,
    agreements,
    setAgreements,
    orignalAgreements,
    setOriginalAgreements,
  } = useGetAllAgreements();

  const { handleGetTypes, types, setTypes, originalTypes, setOriginalTypes } =
    useGetAnimalsTypes();

  const { handleGetDepartments, departments } = useGetDepartments();
  const { handleGetDepProvs, depProv } = useGetDepProvencia();
  const { handleGetProvDis, provDis } = useGetProvDis();

  const hadnleSelectDep = (type, e) => {
    handleGetDepProvs(e?.value);

    if (type != "edit") {
      setNewAgreement({
        ...newAgreement,
        departmento_id: e,
        provincia_id: "",
        districto_id: "",
      });
    } else {
      setRowData({
        ...rowData,
        departmento_id: e,
        provincia_id: "",
        districto_id: "",
      });
    }
  };
  const handleSelectProv = (type, e) => {
    handleGetProvDis(e?.value);
    if (!type) {
      setNewAgreement({ ...newAgreement, provincia_id: e, districto_id: "" });
    } else {
      setRowData({ ...rowData, provincia_id: e, districto_id: "" });
    }
  };

  const handleSelectDis = (type, e) => {
    handleGetProvDis(e?.value);
    if (!type) {
      setNewAgreement({ ...newAgreement, districto_id: e });
    } else {
      setRowData({ ...rowData, districto_id: e });
    }
  };
  const handleSearchProv = (e) => {
    handleGetDepProvs(e?.value);
    setSelectedDep(e);
  };

  const handleSearchDis = (e) => {
    handleGetProvDis(e?.value);
    setSelectedProv(e);
  };

  useEffect(() => {
    handleGetDepartments();
  }, []);

  useEffect(() => {
    console.log(newAgreement);
  }, [newAgreement]);

  useEffect(() => {
    handleGerAgreements();
    handleGetTypes();
  }, []);

  const handleEmptyData = () => {
    setNewAgreement({
      departmento_id: "",
      provincia_id: "",
      address: "",
      districto_id: "",
      lat: "",
      long: "",
      clinical_name: "",
      phone: "",
      pun_auto: "",
      detalle: "",
      types: "",
    });
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "clinical_name",
      key: "clinical_name",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "DIRECCIÓN",
      dataIndex: "address",
      key: "address",
      render: (text, row) => <div className="text-center">{row.address}</div>,
    },
    {
      title: "Telefono",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Oferta",
      dataIndex: "detalle",
      key: "detalle",
      render: (text) => (
        <div title={text} className="ellipsis text-center">
          {text}
        </div>
      ),
    },

    {
      title: "Departamento",
      render: (text, row) => (
        <div className="text-center">{row?.departmento?.title_es}</div>
      ),
    },
    {
      title: "Provincia",
      render: (text, row) => (
        <div className="text-center">{row?.provincia?.title_es}</div>
      ),
    },
    {
      title: "Distrito",
      render: (text, row) => (
        <div className="text-center">{row?.districto?.title_es}</div>
      ),
    },
    // {
    //   title: "Departamento",
    //   render: (text , row) => <div

    //   className='text-center'>{row?.provincia?.title_es}</div>,
    // },
    {
      title: "Punto autorizado",
      dataIndex: "pun_auto",
      key: "pun_auto",
      render: (text, row) => (
        <div className="text-center">
          <div
            className={cx("fs-4", {
              "text-success": row.pun_auto == 1,
              "text-danger": row.pun_auto != 1,
            })}
          >
            {" "}
            {row.pun_auto == 1 ? <FaCheckCircle /> : <FaCircleXmark />}
          </div>
        </div>
      ),
    },
    {
      title: "Comportamiento",
      render: (text, row) => (
        <div className="text-center">
          <div className="">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                setRowData({
                  ...row,
                  departmento_id: {
                    value: row.departmento_id,
                    label: row.departmento?.title_es,
                  },
                  provincia_id: {
                    value: row.provincia_id,
                    label: row.provincia?.title_es,
                  },
                  districto_id: {
                    value: row.districto_id,
                    label: row.districto?.title_es,
                  },
                });
                setRowTypes(
                  row.ag_type.map((item) => ({
                    value: +item.type,
                    label: types?.find((type) => item?.type == type?.id)
                      ?.title_es,
                  }))
                );
                setUpdateModal(true);
              }}
            >
              {edit}
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleAddNewAgreement = async () => {
    if (newAgreement.types == "") {
      toast.error("Por favor ingrese el tipo");
      return;
    }
    if (newAgreement.clinical_name == "") {
      toast.error("Por favor ingrese el nombre");
      return;
    }
    if (newAgreement.phone == "") {
      toast.error("Por favor ingrese el teléfono");
      return;
    }
    if (newAgreement.pun_auto == "") {
      toast.error("Por favor ingrese Punto autorizado");
      return;
    }
    if (newAgreement.detalle == "") {
      toast.error("Por favor, ingrese la oferta");
      return;
    }
    if (newAgreement.departmento_id == "") {
      toast.error("Por favor ingrese el departamento");
      return;
    }
    if (newAgreement.provincia_id == "") {
      toast.error("Por favor ingrese la provincia");
      return;
    }
    if (newAgreement.districto_id == "") {
      toast.error("Por favor ingrese el distrito");
      return;
    }
    if (newAgreement.address == "") {
      toast.error("Por favor, introduzca la dirección");
      return;
    }
    setAddLoading(true);
    const concatTypes = newAgreement.types.map((item) => item.value).join("**");
    const dataset = {
      ...newAgreement,
      types: concatTypes,
      departmento_id: newAgreement.departmento_id.value,
      provincia_id: newAgreement.departmento_id.value,
      districto_id: newAgreement.districto_id.value,
      lat: "0",
      long: "0",
    };

    console.log(dataset);
    // return
    await axios
      .post(`${base_url}agrements/add_new`, dataset)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setNewAgreementModal(false);
          handleEmptyData();
          handleGerAgreements();
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  const handleUpdateAgreement = async () => {
    if (rowData.types == "") {
      toast.error("Por favor ingrese el tipo");
      return;
    }
    if (rowData.clinical_name == "") {
      toast.error("Por favor ingrese el nombre");
      return;
    }
    if (rowData.phone == "") {
      toast.error("Por favor ingrese el teléfono");
      return;
    }
    if (rowData.pun_auto == "") {
      toast.error("Por favor ingrese Punto autorizado");
      return;
    }
    if (rowData.detalle == "") {
      toast.error("Por favor, ingrese la oferta");
      return;
    }
    if (rowData.departmento_id == "") {
      toast.error("Por favor ingrese el departamento");
      return;
    }
    if (rowData.provincia_id == "") {
      toast.error("Por favor ingrese la provincia");
      return;
    }
    if (rowData.districto_id == "") {
      toast.error("Por favor ingrese el distrito");
      return;
    }
    if (rowData.address == "") {
      toast.error("Por favor, introduzca la dirección");
      return;
    }
    const concatTypes = rowTypes.map((item) => item.value).join("**");

    const dataset = {
      ...rowData,
      types: concatTypes,
      departmento_id: rowData?.departmento_id.value,
      provincia_id: rowData?.departmento_id.value,
      districto_id: rowData?.districto_id.value,
      lat: "0",
      long: "0",
    };

    delete dataset.districto;

    console.log(dataset);
    setAddLoading(true);

    await axios
      .post(`${base_url}agrements/update_one/${rowData?.id}`, dataset)
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setUpdateModal(false);
          // handleEmptyData();
          handleGerAgreements();
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  useEffect(() => {
    console.log(typoSearch);
    console.log(orignalAgreements);

    if (
      orignalAgreements &&
      orignalAgreements.length > 0 &&
      Array.isArray(orignalAgreements)
    ) {
      if (
        nameSearch.length >= 1 ||
        selectedDep?.value ||
        selectedProv?.value ||
        selectedDis?.value
      ) {
        const newData = orignalAgreements.filter((item) => {
          if (
            nameSearch &&
            !item?.clinical_name
              ?.toLowerCase()
              ?.includes(nameSearch?.toLowerCase())
          ) {
            return false;
          }

          if (selectedDep && item.departmento_id != selectedDep.value) {
            return false;
          }
          if (selectedProv && item.provincia_id != selectedProv?.value) {
            return false;
          }
          if (selectedDis && item.districto_id != selectedDis?.value) {
            return false;
          }
          return true;
        });
        setAgreements(newData);
      } else {
        setAgreements(orignalAgreements);
      }
    }
  }, [nameSearch, selectedDep, selectedDis, selectedProv, orignalAgreements]);

  return (
    <div className="agreement_container">
      <FormCard
        header={"Maintenance of Agreements"}
        children={
          <>
            <div className="serach_agreements">
              <CustomInput
                placeholder={"Buscar por nombre ..."}
                value={nameSearch}
                label={"Nombre"}
                onChange={(e) => setNameSearch(e.target.value)}
              />

              <div className="custom_input">
                <label htmlFor="">Departamento</label>

                <Select
                  isClearable
                  placeholder={"Seleccionar..."}
                  options={departments?.map((e) => {
                    return {
                      label: e.title_es,
                      value: e.id,
                    };
                  })}
                  onChange={(e) => {
                    handleSearchProv(e);
                    setSelectedProv(null);
                    setSelectedDis(null);
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      padding: "6px",
                    }),
                  }}
                  value={selectedDep || ""}
                />
              </div>

              <div className="custom_input">
                <label htmlFor="">Provincia</label>

                <Select
                  isClearable
                  placeholder={"Seleccionar..."}
                  options={depProv?.map((e) => {
                    return {
                      label: e.title_es,
                      value: e.id,
                    };
                  })}
                  onChange={(e) => {
                    handleSearchDis(e);
                    setSelectedDis(null);
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      padding: "6px",
                    }),
                  }}
                  value={selectedProv || ""}
                />
              </div>

              <div className="custom_input">
                <label htmlFor="">Distrito</label>

                <Select
                  isClearable
                  placeholder={"Seleccionar..."}
                  options={provDis?.map((e) => {
                    return {
                      label: e.title_es,
                      value: e.id,
                    };
                  })}
                  onChange={(e) => setSelectedDis(e)}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      padding: "6px",
                    }),
                  }}
                  value={selectedDis || ""}
                />
              </div>
            </div>
            <div className="agreement_card_buttons">
              <CustomButton
                onClick={() => setNewAgreementModal(true)}
                bgColor={"gray"}
                text={"Nuevo"}
                icon={<FaPlus />}
              />
            </div>
          </>
        }
      />

      <div className="search_table_container">
        {loading ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
          </div>
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={agreements}
          />
        )}
      </div>

      {/* modal that show when clicking on nueovo*/}
      <Modal
        size={"90%"}
        show={newAgreementModal}
        showCloseBtn
        title={"Register Agreement"}
        onClose={() => setNewAgreementModal(false)}
        children={
          addLoading ? (
            <Spinner size={50} color="rgb(54, 185, 204)" loading={addLoading} />
          ) : (
            <>
              <div className="modal_tabs">
                {tabs?.map((tab, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`modal_tab ${
                        selectedTab == tab?.id ? "active" : ""
                      }`}
                    >
                      {tab?.name}
                    </div>
                  );
                })}
              </div>

              {selectedTab == 1 ? (
                <div>
                  <div className="dom_third_grid d-flex flex-column gap-4">
                    <div className="input_group">
                      <label>
                        Typo<span> (*)</span>
                      </label>
                      <Select
                        placeholder={"Seleccionar..."}
                        value={newAgreement.types}
                        isMulti
                        onChange={(e) => {
                          console.log(e);
                          setNewAgreement({ ...newAgreement, types: e });
                        }}
                        options={types.map((type) => ({
                          value: type.id,
                          label: type.title_es,
                        }))}
                      />
                    </div>

                    <div className="input_group  ">
                      <CustomInput
                        value={newAgreement?.clinical_name}
                        required={true}
                        label={"Nombre"}
                        placeholder="Nombre"
                        onChange={(e) =>
                          setNewAgreement({
                            ...newAgreement,
                            clinical_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input_group  ">
                      <CustomInput
                        required={true}
                        label={"Telefono"}
                        placeholder="Telefono"
                        value={newAgreement?.phone}
                        onChange={(e) =>
                          setNewAgreement({
                            ...newAgreement,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* <FromGroup>
                  <div className='dom_third_grid d-flex flex-column gap-4'>
                    <div className='input_group'>
                      <label>
                        Typo<span> (*)</span>
                      </label>
                      <Select
                        value={newAgreement.types}
                        isMulti
                        onChange={(e) => {
                          setNewAgreement({...newAgreement});
                        }}
                        options={types.map((type) => ({
                          value: type.id,
                          label: type.title_es,
                        }))}
                      />
                    </div>
                  </div>

                  <FromGroup.Input
                    required={true}
                    label={"Nombre"}
                    placeholder='Nombe de la clinica'
                    onChange={() => setNewAgreement({...newAgreement})}
                  />
                  <FromGroup.Input
                    required={true}
                    label={"Telefono"}
                    placeholder='Telefono de la clinica'
                  />
                </FromGroup> */}
                  <div className=" row mt-3 gy-5">
                    <div className=" col-12 col-md-2 d-flex algin-items-center">
                      <CustomInput
                        style={{
                          width: "fit-content",
                          transform: "scale(2)",
                          transformOrigin: "top left",
                          marginInline: "auto",
                          // marginRight:'30px'
                        }}
                        onChange={(e) =>
                          setNewAgreement({
                            ...newAgreement,
                            pun_auto: Number(e.target.checked),
                          })
                        }
                        type="checkbox"
                        label={"Punto autorizado"}
                        checked={Boolean(newAgreement?.pun_auto)}
                      />
                    </div>
                    <div className=" col-12 col-md-10">
                      <CustomInput
                        label={"Oferta"}
                        placeholder={"Escriba una referencia del evento..."}
                        textarea={true}
                        value={newAgreement.detalle}
                        onChange={(e) =>
                          setNewAgreement({
                            ...newAgreement,
                            detalle: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="following_btn mt-4">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedTab("2")}
                    >
                      <span>{arrowRight}</span>
                      <span>Siguiente</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column gap-4">
                  <FromGroup>
                    <CustomSelect
                      data={departments?.map((item) => ({
                        label: item.title_es,
                        value: item?.id,
                      }))}
                      onChange={(e) => {
                        hadnleSelectDep(null, e);
                      }}
                      required={true}
                      value={newAgreement?.departmento_id?.label || ""}
                      label={"Departamento"}
                    />
                    <CustomSelect
                      value={newAgreement?.provincia_id?.label || ""}
                      onChange={(e) => {
                        handleSelectProv(null, e);
                      }}
                      data={depProv.map((item) => ({
                        label: item?.title_es,
                        value: item?.id,
                      }))}
                      required={true}
                      label={"Provincia"}
                    />

                    <CustomSelect
                      value={newAgreement.districto_id.label}
                      onChange={(e) => handleSelectDis(null, e)}
                      data={provDis.map((item) => ({
                        label: item?.title_es,
                        value: item?.id,
                      }))}
                      required={true}
                      label={"Distrito"}
                    />
                  </FromGroup>
                  <CustomInput
                    label={"Dirección"}
                    required={true}
                    placeholder={"Dirección/Departamento/Interior"}
                    onChange={(e) =>
                      setNewAgreement({
                        ...newAgreement,
                        address: e.target.value,
                      })
                    }
                    value={newAgreement.address}
                  />

                  <div className="row">
                    {/* <div className="col">
                      <CustomInput
                        label={"Latitud"}
                        placeholder={"Latitud en google maps"}
                        onChange={(e) =>
                          setNewAgreement({
                            ...newAgreement,
                            lat: e.target.value,
                          })
                        }
                        value={newAgreement.lat}
                      />
                    </div>
                    <div className="col">
                      <CustomInput
                        onChange={(e) =>
                          setNewAgreement({
                            ...newAgreement,
                            long: e.target.value,
                          })
                        }
                        label={"Longitud"}
                        placeholder={"Longitud en google maps"}
                        value={newAgreement.long}
                      />
                    </div> */}
                  </div>

                  <div className="following_btn mt-4">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedTab("1")}
                    >
                      <span>{arrowLeft}</span>
                      <span>Altras</span>
                    </button>
                  </div>
                </div>
              )}

              <hr />

              <div className="modal_buttons ">
                <button
                  className="confirm_button"
                  onClick={handleAddNewAgreement}
                >
                  {addLoading ? (
                    <Spinner size={20} color="#fff" loading={addLoading} />
                  ) : (
                    "GUARDAR"
                  )}
                </button>
                <button
                  onClick={() => setNewAgreementModal(false)}
                  className="cancel_button"
                >
                  Cerrar
                </button>
              </div>
            </>
          )
        }
      />

      <Modal
        size={"90%"}
        show={updateModal}
        showCloseBtn
        title={"Acuerdo de actualización"}
        onClose={() => setUpdateModal(false)}
        children={
          addLoading ? (
            <Spinner size={50} color="rgb(54, 185, 204)" loading={addLoading} />
          ) : (
            <>
              <div className="modal_tabs">
                {tabs?.map((tab, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`modal_tab ${
                        selectedTab == tab?.id ? "active" : ""
                      }`}
                    >
                      {tab?.name}
                    </div>
                  );
                })}
              </div>

              {selectedTab == 1 ? (
                <div>
                  <div className="dom_third_grid d-flex flex-column gap-4">
                    <div className="input_group">
                      <label>
                        Typo<span> (*)</span>
                      </label>
                      <Select
                        placeholder={"Seleccionar..."}
                        value={rowTypes}
                        isMulti
                        onChange={(e) => {
                          setRowTypes(e);
                          console.log(e);
                        }}
                        options={types.map((type) => ({
                          value: type.id,
                          label: type.title_es,
                        }))}
                      />
                    </div>

                    <div className="input_group  ">
                      <CustomInput
                        value={rowData?.clinical_name}
                        required={true}
                        label={"Nombre"}
                        placeholder="Nombre"
                        onChange={(e) =>
                          setRowData({
                            ...rowData,
                            clinical_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input_group  ">
                      <CustomInput
                        required={true}
                        label={"Telefono"}
                        placeholder="Telefono"
                        value={rowData?.phone}
                        onChange={(e) =>
                          setRowData({
                            ...rowData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* <FromGroup>
                  <div className='dom_third_grid d-flex flex-column gap-4'>
                    <div className='input_group'>
                      <label>
                        Typo<span> (*)</span>
                      </label>
                      <Select
                        value={newAgreement.types}
                        isMulti
                        onChange={(e) => {
                          setNewAgreement({...newAgreement});
                        }}
                        options={types.map((type) => ({
                          value: type.id,
                          label: type.title_es,
                        }))}
                      />
                    </div>
                  </div>

                  <FromGroup.Input
                    required={true}
                    label={"Nombre"}
                    placeholder='Nombe de la clinica'
                    onChange={() => setNewAgreement({...newAgreement})}
                  />
                  <FromGroup.Input
                    required={true}
                    label={"Telefono"}
                    placeholder='Telefono de la clinica'
                  />
                </FromGroup> */}
                  <div className=" row mt-3 gy-5">
                    <div className=" col-12 col-md-2 d-flex algin-items-center">
                      <CustomInput
                        style={{
                          width: "fit-content",
                          transform: "scale(3)",
                          transformOrigin: "top left",
                          marginInline: "auto",
                          // marginRight:'30px'
                        }}
                        checked={Boolean(rowData?.pun_auto)}
                        onChange={(e) =>
                          setRowData({
                            ...rowData,
                            pun_auto: Number(e.target.checked),
                          })
                        }
                        type="checkbox"
                        label={"Punto autorizado"}
                      />
                    </div>
                    <div className="col0-12 col-md-10">
                      <CustomInput
                        label={"Oferta"}
                        placeholder={"Escriba una referencia del evento..."}
                        textarea={true}
                        value={rowData.detalle}
                        onChange={(e) =>
                          setRowData({
                            ...rowData,
                            detalle: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="following_btn mt-4">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedTab("2")}
                    >
                      <span>{arrowRight}</span>
                      <span>Siguiente</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column gap-4">
                  <FromGroup>
                    <CustomSelect
                      data={departments?.map((item) => ({
                        label: item.title_es,
                        value: item?.id,
                      }))}
                      onChange={(e) => hadnleSelectDep("edit", e)}
                      required={true}
                      value={rowData?.departmento_id?.label || ""}
                      label={"Departamento"}
                    />
                    <CustomSelect
                      value={rowData?.provincia_id?.label || ""}
                      onChange={(e) => {
                        handleSelectProv("edit", e);
                      }}
                      data={depProv.map((item) => ({
                        label: item?.title_es,
                        value: item?.id,
                      }))}
                      required={true}
                      label={"Provincia"}
                    />

                    <CustomSelect
                      value={rowData?.districto_id?.label}
                      onChange={(e) => handleSelectDis("edit", e)}
                      data={provDis.map((item) => ({
                        label: item?.title_es,
                        value: item?.id,
                      }))}
                      required={true}
                      label={"Distrito"}
                    />
                  </FromGroup>
                  <CustomInput
                    label={"Dirección"}
                    required={true}
                    value={rowData?.address}
                    placeholder={"Dirección/Departamento/Interior"}
                    onChange={(e) =>
                      setRowData({
                        ...rowData,
                        address: e.target.value,
                      })
                    }
                  />

                  <div className="row">
                    {/* <div className="col">
                      <CustomInput
                        label={"Latitud"}
                        value={rowData?.lat}
                        placeholder={"Latitud en google maps"}
                        onChange={(e) =>
                          setNewAgreement({
                            ...newAgreement,
                            lat: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col">
                      <CustomInput
                        onChange={(e) =>
                          setNewAgreement({
                            ...newAgreement,
                            long: e.target.value,
                          })
                        }
                        label={"Longitud"}
                        value={rowData?.long}
                        placeholder={"Longitud en google maps"}
                      />
                    </div> */}
                  </div>

                  <div className="following_btn mt-4">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedTab("1")}
                    >
                      <span>{arrowLeft}</span>
                      <span>Altras</span>
                    </button>
                  </div>
                </div>
              )}

              <hr />

              <div className="modal_buttons ">
                <button
                  className="confirm_button"
                  onClick={handleUpdateAgreement}
                >
                  GUARDAR
                </button>
                <button
                  onClick={() => setUpdateModal(false)}
                  className="cancel_button"
                >
                  Cerrar
                </button>
              </div>
            </>
          )
        }
      />
    </div>
  );
};

export default AgreementPage;
