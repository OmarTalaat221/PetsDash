import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { edit, fileIcon } from "../../../assets/svgIcons";
import "./style.css";
import FormCard from "./../../../components/FormCard/FormCard";
import CustomSelect from "./../../../components/CustomSelect/CustomSelect";
import { Alert, Form, InputGroup } from "react-bootstrap";
import Modal from "../../../components/Modal/Modal";
import FromGroup from "../../../components/FromGroup/FromGroup";
import Select from "react-select";
import Jodit from "./../../../utils/jodit/Jodit";
import noPets from "../../../assets/images/noPets (1).png";

import useGetAllAnimals from "../../../CustomHooks/useGetAllAnimals";
import { Table, Tag } from "antd";
import axios from "axios";
import { base_url } from "../../../constant";
import toast from "react-hot-toast";
import useGetAllEvents from "../../../CustomHooks/useGetAllEvents";
import useGetAdmins from "../../../CustomHooks/useGetAdmins";
import { formatDate } from "../../../CustomHooks/dateFormats";
import { FaPlus } from "react-icons/fa6";
import { uploadImage } from "../../../constant/uploadFiles";
import Spinner from "../../../utils/Spinner/Spinner";

const Admins = () => {
  const [addNewModal, setAddNewModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const getToDayDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate());
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const {
    handleGetAdmins,
    admins,
    setAdmins,
    loading,
    originalData,
    setOriginalData,
  } = useGetAdmins();
  const [updateLoading, setUpdateLoading] = useState(false);

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    handleGetAdmins();
  }, []);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    l_name: "",
    admin_image: "",
    sex: "", //male,femal
    dob: "",
    celular: "",
    phone: "",
  });

  const handleEmptyData = (e) => {
    setNewAdmin({
      name: "",
      email: "",
      password: "",
      l_name: "",
      admin_image: "",
      sex: "", //male,femal
      dob: "",
      celular: "",
      phone: "",
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewAdmin({ ...newAdmin, admin_image: file });
  };

  const columns = [
    {
      title: "Imagen",
      render: (text, row) => (
        <div className="fw-bolder" color="green">
          <img width={150} src={row?.admin_image} alt="" />
        </div>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text, row) => (
        <div className="fw-bolder" color="green">
          {row.name}
        </div>
      ),
    },
    {
      title: "Apellidos",
      dataIndex: "l_name",
      key: "l_name",
      render: (text, row) => (
        <div className="fw-bolder text-center" color="green">
          {row.l_name}
        </div>
      ),
    },

    {
      title: "Sexo",
      dataIndex: "sex",
      key: "sex",
      render: (text, row) => (
        <div className="d-flex justify-content-center">{row?.sex}</div>
      ),
    },

    {
      title: "Telefono",
      dataIndex: "phone",
      key: "phone",
      render: (text, row) => (
        <div className="d-flex justify-content-center">{row?.phone}</div>
      ),
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
      render: (text, row) => (
        <div className="d-flex justify-content-center">{row?.celular}</div>
      ),
    },
    {
      title: "Correo electrónico",
      dataIndex: "email",
      key: "email",
      render: (text, row) => (
        <div className="d-flex justify-content-center">{row?.email}</div>
      ),
    },
    {
      title: "Fecha de Nacimiento",
      dataIndex: "dob",
      key: "dob",
      render: (text, row) => (
        <div className="d-flex justify-content-center">
          {formatDate(row?.dob)}
        </div>
      ),
    },
    {
      title: "Creado_en",
      dataIndex: "email",
      key: "email",
      render: (text, row) => (
        <div className="d-flex justify-content-center">
          {formatDate(row?.created_at)}
        </div>
      ),
    },
  ];

  const [addLoading, setAddloading] = useState(false);

  const sexData = [
    { label: "Masculina", value: "Masculina" },
    { label: "Femenina", value: "Femenina" },
  ];

  const handleClose = () => {
    setAddNewModal(false);
    handleEmptyData();
  };
  const hadnleSelecSex = (e) => {
    setNewAdmin({ ...newAdmin, sex: e });
  };

  const handlAddAdmin = async () => {
    const token = localStorage.getItem("pits-token");
    console.log(newAdmin);
    // return

    const dataset = {
      ...newAdmin,
      sex: newAdmin.sex.value,
    };

    if (!newAdmin.name) {
      toast.error("Introducir nombre!");
      return;
    }
    if (!newAdmin.l_name) {
      toast.error("Introducir apodo!");
      return;
    }
    if (!newAdmin.sex) {
      toast.error("Introducir sexo!");
      return;
    }

    if (!newAdmin.dob) {
      toast.error("Introduzca la fecha de nacimiento! ");
      return;
    }
    if (!newAdmin.phone) {
      toast.error("Introducir teléfono! ");
      return;
    }
    if (!newAdmin.celular) {
      toast.error("Introducir celular! ");
      return;
    }

    if (!newAdmin.email) {
      toast.error("Correo electrónico");
      return;
    }

    if (!newAdmin.password) {
      toast.error("Introducir contraseña!");
      return;
    }
    if (!newAdmin.admin_image) {
      toast.error("Elige una imagen para el administrador!");
      return;
    }

    let adminImage = null;
    if (newAdmin.admin_image instanceof File) {
      adminImage = await uploadImage(newAdmin.admin_image);
      dataset.admin_image = adminImage;
    }

    console.log(dataset);
    setAddloading(true);

    await axios
      .post(`${base_url}regist?token=${token}`, dataset)
      .then((res) => {
        if (res) {
          console.log(res);
          if (res.data.status == "success") {
            toast.success(res.data.message);
            setAddNewModal(false);
            handleGetAdmins();
          } else {
            toast.error(res.data.message);
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setAddloading(false);
        handleEmptyData();
      });
  };

  return (
    <div className="Envato_contaienr">
      <FormCard
        header={"Administradores"}
        children={
          <>
            <div className="envato_inputs">
              <div>
                {/* <CustomSelect
                data={[{name:"TODOS"},{name:"ALIMENTO"},{name:"ANTIPULGAS"},{name:"ARENA"},{name:"ATENCIÓN MÉDICA"},{name:"BAÑO"},{name:"CAMA"},{name:'CONTROL MÉDICO'}]}
                  inRow={true}
                  label={"Tipo:"}
                  placeholder={"TODOS"}
                /> */}
              </div>
              {/* <div>
                <CustomSelect
                data={[{name:"TODOS"},{name:"Big Bang"},{name:"loly"}]}
                placeholder={"TODOS"}
                  inRow={true}
                  label={"Mascota:"}
                  // placeholder={"Escriba el DNI de la mascota..."}
                />
              </div> */}
            </div>
            <div className="envato_card_buttons">
              <CustomButton
                onClick={() => setAddNewModal(true)}
                bgColor={"#858796"}
                icon={<FaPlus />}
                text={"administradores"}
              />
            </div>
          </>
        }
      />

      <div className="search_table_container">
        {loading ? (
          <Spinner size={50} loading={loading} color={"rgb(54,185,204)"} />
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={admins}
          />
        )}
      </div>

      {/* Moda */}

      <Modal
        size={"90%"}
        show={addNewModal}
        showCloseBtn
        animation={true}
        title={"Agregar administrador"}
        onClose={handleClose}
        confirmButton={{
          children: addLoading ? (
            <Spinner size={20} loading={addLoading} color={"#fff"} />
          ) : (
            "Agregar administrador"
          ),
          style: { backgroundColor: "#36b9cc" },
          onClick: () => {
            handlAddAdmin();
          },
          props: {
            disable: loading,
          },
        }}
        cancelButton={{
          children: "Cerrar",
          onClick: () => {
            setAddNewModal(false);
          },
          style: { backgroundColor: "#858796" },
        }}
        children={
          <>
            {addLoading ? (
              <Spinner
                size={50}
                loading={addLoading}
                color={"rgb(54,185,204)"}
              />
            ) : (
              <div className="">
                <div className="dom_third_grid">
                  <div className="input_group">
                    <CustomInput
                      value={newAdmin?.name}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, name: e.target.value })
                      }
                      label="Nombre"
                      placeholder="Introduce tu nombre..."
                      required
                    />
                  </div>
                  <div className="input_group">
                    <CustomInput
                      value={newAdmin?.l_name}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, l_name: e.target.value })
                      }
                      label="Apellidos"
                      placeholder="Apellidos..."
                      required
                    />
                  </div>
                  <div className="input_group">
                    <label>
                      Sexo <span> (*)</span>
                    </label>
                    <Select
                      value={newAdmin.sexo}
                      onChange={(e) => {
                        console.log(e);
                        hadnleSelecSex(e);
                      }}
                      placeholder="Seleccionar..."
                      options={sexData}
                    />
                  </div>
                </div>

                <div className="dom_third_grid">
                  <div className="input_group">
                    <CustomInput
                      value={newAdmin?.email}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, email: e.target.value })
                      }
                      label="Correo electrónico"
                      placeholder="Introducir correo electrónico..."
                      required
                    />
                  </div>
                  <div className="input_group">
                    <CustomInput
                      value={newAdmin?.password}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, password: e.target.value })
                      }
                      type={"password"}
                      label="Contraseña"
                      placeholder="Introducir contraseña"
                      required
                    />
                  </div>
                  <div className="input_group">
                    <CustomInput
                      type={"date"}
                      value={newAdmin?.dob}
                      onChange={(e) => {
                        setNewAdmin({ ...newAdmin, dob: e.target.value });
                        console.log(e.target.value);
                      }}
                      label="Fecha de Nacimiento"
                      placeholder="Fecha de Nacimiento"
                      required
                      max={getToDayDate()}
                    />
                  </div>
                </div>

                <div className="dom_third_grid">
                  <div className="input_group">
                    <CustomInput
                      value={newAdmin?.phone}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, phone: e.target.value })
                      }
                      label="Telefono"
                      placeholder="Introduce tu teléfono..."
                      required
                    />
                  </div>
                  <div className="input_group">
                    <CustomInput
                      value={newAdmin?.celular}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, celular: e.target.value })
                      }
                      label="Celular"
                      placeholder="Ingresa tu Celular..."
                      required
                    />
                  </div>
                </div>
                <div className="foto_page">
                  <div>
                    <img
                      src={
                        newAdmin?.admin_image
                          ? newAdmin?.admin_image instanceof File
                            ? URL.createObjectURL(newAdmin.admin_image)
                            : newAdmin.admin_image
                          : noPets
                      }
                      alt=""
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button onClick={handleButtonClick}>Subir</button>
                </div>

                {/* <button
          disabled={updateLoading}
          onClick={handlAddAdmin}
          className='mt-5'
          style={{
            width: "fit-content",
            backgroundColor: "#36b9cc",
            color: "white",
            padding: "7px",
            borderRadius: "5px",
          }}
        >
          Agregar administrador
        </button> */}
              </div>
            )}
          </>
        }
      />
    </div>
  );
};

export default Admins;
