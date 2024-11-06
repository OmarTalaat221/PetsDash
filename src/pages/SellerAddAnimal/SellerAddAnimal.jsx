/* eslint-disable no-use-before-define */
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import { FaFolderPlus } from "react-icons/fa6";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import Select from "react-select";
import { globa_base_url } from "../../constant";
import { Table } from "antd";
import cx from "classnames";
import { edit } from "../../assets/svgIcons";
import { ClipLoader } from "react-spinners";
import { uploadImage } from "../../constant/uploadImage";

import useGetAllRaza from "../../CustomHooks/useGetAllRaza";
import useGetDepartments from "../../CustomHooks/useGetAllDepartments";
import useGetDepProvencia from "../../CustomHooks/useGetDepProvencia";
import useGetProvDis from "../../CustomHooks/useGetProvDis";
import { FaTrash } from "react-icons/fa6";
import useGetAllQualifications from "../../CustomHooks/useGetAllQualification";
import toast from "react-hot-toast";

export default function SellerAddAnimal() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [animals, setAnimals] = useState(false);
  const [originalAnimals, setOriginalAnimals] = useState(false);

  const [petsDashUser, setPetsDashUser] = useState(
    JSON.parse(localStorage.getItem("petsDashUser"))
  );

  const [formData, setFormData] = useState({
    user_id: petsDashUser?.id,
    animal_f_name: "",
    animal_l_name: "",
    pet_image: null,
    dob: "",
    sex: "",
    qualified: "",
    type: "",
    coat_color: "",
    address: "",
    raza: "",
    department: "",
    province: "",
    district: "",
    is_sterillized: null,
    bio: "",
    size: "",
  });

  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [bioModal, setBioModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const getToDayDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate());
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleConfirmCloseModal = () => {
    setConfirmButton(false);
  };

  const handleCloseModal = () => {
    setFormData({
      user_id: petsDashUser?.id,
      animal_f_name: "",
      animal_l_name: "",
      pet_image: null,
      dob: "",
      sex: "",
      qualified: "",
      type: "",
      coat_color: "",
      address: "",
      raza: "",
      department: "",
      province: "",
      district: "",
      is_sterillized: null,
      bio: "",
      size: "",
    });
    setIsOpenModal(false);
  };
  const handleEmptyInputs = () => {
    setFormData({
      user_id: petsDashUser?.id,
      animal_f_name: "",
      animal_l_name: "",
      pet_image: null,
      dob: "",
      sex: "",
      qualified: "",
      type: "",
      coat_color: "",
      address: "",
      raza: "",
      department: "",
      province: "",
      district: "",
      is_sterillized: null,
      bio: "",
      size: "",
    });
  };

  const sterilized = [
    { label: "No Esterilizada", id: 0 },
    { label: "Esterilizada", id: 1 },
  ];
  const size = [
    { label: "Pequeño", id: 0 },
    { label: "Medio", id: 1 },
    { label: "Grande", id: 2 },
  ];

  const gender = [
    { label: "Masculino", id: 0 },
    { label: "Femenino", id: 1 },
  ];

  const getAnimals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${globa_base_url}user/my_animals?token=${petsDashUser?.access_token}`
      );

      setAnimals(res?.data?.result);
      setOriginalAnimals(res?.data?.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { raza, loading: razaLoading, handleGetAllRaza } = useGetAllRaza();

  const {
    handleGetDepartments,
    departments,
    loading: departmentLoading,
  } = useGetDepartments();

  const {
    handleGetDepProvs,
    loading: depProvLoading,
    depProv,
  } = useGetDepProvencia(editModal ? rowData.department : formData.department);

  const {
    handleGetAllQualifications,
    loading: qualLoading,
    qualifications,
  } = useGetAllQualifications();

  const {
    handleGetProvDis,
    provDis,
    loading: provDisLaoding,
  } = useGetProvDis(editModal ? rowData.province : formData.province);

  const addAnimal = async () => {
    if (formData.pet_image == null) {
      toast.error("Por favor ingrese la imagen de su mascota");
      return;
    }
    if (formData.animal_f_name == "") {
      toast.error("Por favor, introduzca su nombre");
      return;
    }
    if (formData.animal_l_name == "") {
      toast.error("Por favor, introduzca su apellido");
      return;
    }
    if (formData.dob == "") {
      toast.error("Por favor, introduzca su fecha de nacimiento");
      return;
    }
    if (formData.type == "") {
      toast.error("Por favor ingrese su tipo de mascota");
      return;
    }
    if (formData.coat_color == "") {
      toast.error("Por favor ingrese su color de mascota");
      return;
    }
    if (formData.address == "") {
      toast.error("Por favor, introduzca su dirección");
      return;
    }
    if (formData.qualified == "") {
      toast.error("Por favor ingrese el clasificación de su mascota");
      return;
    }
    if (formData.is_sterillized === null) {
      toast.error("Por favor ingrese su esterilizado");
      return;
    }
    if (formData.sex == "") {
      toast.error("Por favor ingrese el sexo de su mascota");
      return;
    }
    if (formData.size == "") {
      toast.error("Por favor ingrese el tamaño de su mascota");
      return;
    }
    if (formData.raza == "") {
      toast.error("Por favor ingrese su raza");
      return;
    }
    if (formData.department == "") {
      toast.error("Por favor ingrese su departamento");
      return;
    }
    if (formData.province == "") {
      toast.error("Por favor ingrese su provincia");
      return;
    }
    if (formData.district == "") {
      toast.error("Por favor ingrese su distrito");
      return;
    }

    if (formData.bio == "") {
      toast.error("Por favor ingrese su biografía");
      return;
    }

    setLoading(true);
    try {
      let image = null;

      if (formData.pet_image instanceof File) {
        image = await uploadImage(formData.pet_image);
        delete formData.pet_image;
      }

      const dataSend = {
        ...formData,
        raza:
          typeof formData?.raza == "object"
            ? formData?.raza?.id
            : formData?.raza,
        pet_image: image?.data?.message,
      };

      const res = await axios.post(
        globa_base_url +
          `user/user_sign_animal?token=${petsDashUser?.access_token}`,
        dataSend,
        {
          headers: {
            lang: "es",
          },
        }
      );

      if (res.status === 200) {
        handleEmptyInputs();
        handleCloseModal();
      }

      toast.success("Animal agregado exitosamente");
      getAnimals();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const editAnimal = async () => {
    if (rowData.pet_image == null) {
      toast.error("Por favor ingrese la imagen de su mascota");
      return;
    }
    if (rowData.animal_f_name == "") {
      toast.error("Por favor, introduzca su nombre");
      return;
    }
    if (rowData.animal_l_name == "") {
      toast.error("Por favor, introduzca su apellido");
      return;
    }
    if (rowData.dob == "") {
      toast.error("Por favor, introduzca su fecha de nacimiento");
      return;
    }
    if (rowData.type == "") {
      toast.error("Por favor ingrese su tipo de mascota");
      return;
    }
    if (rowData.coat_color == "") {
      toast.error("Por favor ingrese su color de mascota");
      return;
    }
    if (rowData.address == "") {
      toast.error("Por favor, introduzca su dirección");
      return;
    }
    if (rowData.qualified == "") {
      toast.error("Por favor ingrese el clasificación de su mascota");
      return;
    }
    if (rowData.is_sterillized === null) {
      toast.error("Por favor ingrese su esterilizado");
      return;
    }
    if (rowData.sex == "") {
      toast.error("Por favor ingrese el sexo de su mascota");
      return;
    }
    if (rowData.size == "") {
      toast.error("Por favor ingrese el tamaño de su mascota");
      return;
    }
    if (rowData.raza == "") {
      toast.error("Por favor ingrese su raza");
      return;
    }
    if (rowData.department == "") {
      toast.error("Por favor ingrese su departamento");
      return;
    }
    if (rowData.province == "") {
      toast.error("Por favor ingrese su provincia");
      return;
    }
    if (rowData.district == "") {
      toast.error("Por favor ingrese su distrito");
      return;
    }

    if (rowData.bio == "") {
      toast.error("Por favor ingrese su biografía");
      return;
    }

    setLoading(true);
    try {
      let image = null;

      if (rowData.pet_image instanceof File) {
        const uploadedImage = await uploadImage(rowData.pet_image);
        image = uploadedImage?.data?.message;
      }

      const dataSend = {
        ...rowData,
        raza:
          typeof rowData?.raza == "object" ? rowData?.raza?.id : rowData?.raza,
        pet_image: image || rowData.pet_image,
      };

      const res = await axios.post(
        globa_base_url + `animals/admin_update_animal/${rowData.id}`,
        dataSend,
        {
          headers: {
            lang: "es",
          },
        }
      );

      if (res.status === 200) {
        setEditModal(false);
      }

      toast.success("Animal actualizado exitosamente");
      getAnimals();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnimal = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${globa_base_url}animals/admin_delete_animal/${rowData.id}`,
        {
          headers: {
            lang: "es",
          },
        }
      );

      if (res.status === 200) {
        setConfirmButton(false);
      }
      toast.success("¡Animal eliminado con éxito!");
      getAnimals();
    } catch (error) {
      handleErrorResponse(error);
    }
    setLoading(false);
  };
  const handleErrorResponse = (error) => {
    if (error.response) {
      console.error("Error response:", error.response);
      if (error.response.status === 422 && error.response.data.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          errors[key].forEach((message) => {
            toast.error(`${key}: ${message}`);
          });
        });
      }
    } else {
      console.error("Error updating data:", error);
      toast.error("Network or server error. Please try again later.");
    }
  };

  useEffect(() => {
    if (
      originalAnimals &&
      originalAnimals?.length > 0 &&
      Array.isArray(originalAnimals)
    ) {
      if (searchQuery?.length >= 1) {
        const newData = originalAnimals?.filter((item) => {
          if (
            searchQuery &&
            !item?.animal?.f_name
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase()) &&
            !item?.animal?.l_name
              ?.toLowerCase()
              .includes(searchQuery?.toLowerCase()) &&
            !item?.animal?.sex
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase()) &&
            !item?.animal?.size
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase()) &&
            !item?.animal?.coat_color
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase()) &&
            !item?.animal?.departmento?.title_es
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase()) &&
            !item?.animal?.raza?.title_es
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase()) &&
            !item?.animal?.provincia?.title_es
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase()) &&
            !item?.animal?.distrito?.title_es
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase())
          ) {
            return false;
          }
          return true;
        });
        setAnimals(newData);
      } else {
        setAnimals(originalAnimals);
      }
    }
  }, [originalAnimals, searchQuery]);

  const columns = [
    {
      title: "Imagen del Animal",
      dataIndex: "pet_image",
      key: "pet_image",
      render: (text, row) => (
        <img style={{ width: "150px" }} src={row?.animal?.pet_image} alt="" />
      ),
    },
    {
      title: "Nombre",
      dataIndex: "animal_f_name",
      key: "animal_f_name",
      render: (text, row) => (
        <div className="text-center">{row?.animal?.f_name}</div>
      ),
    },

    {
      title: "Apellido",
      dataIndex: "animal_l_name",
      key: "animal_l_name",
      render: (text, row) => (
        <div className="text-center">{row?.animal?.l_name}</div>
      ),
    },

    {
      title: "Raza",
      dataIndex: "raza",
      key: "raza",
      render: (text, row) => (
        <div className="text-center text-capitalize">
          {row?.animal?.raza?.title_es}
        </div>
      ),
    },
    {
      title: "Departmento",
      dataIndex: "departmento",
      key: "departmento",
      render: (text, row) => (
        <div className="text-center">{row?.animal?.departmento?.title_es}</div>
      ),
    },
    {
      title: "Provinicia",
      dataIndex: "provincia",
      key: "provincia",
      render: (text, row) => (
        <div className="text-center">{row?.animal?.provincia?.title_es}</div>
      ),
    },
    {
      title: "Distrito",
      dataIndex: "distrito",
      key: "distrito",
      render: (text, row) => (
        <div className="text-center">{row?.animal?.distrito?.title_es}</div>
      ),
    },

    {
      title: "Fecha de Nacimiento",
      dataIndex: "dob",
      key: "dob",
      render: (text, row) => (
        <div className="text-center">{row?.animal?.dob}</div>
      ),
    },
    {
      title: "Sexo",
      dataIndex: "sex",
      key: "sex",
      render: (text, row) => (
        <div className="text-center ">{row?.animal?.sex}</div>
      ),
    },
    {
      title: "Calificado",
      dataIndex: "qualified",
      key: "qualified",
      render: (text, row) => (
        <div className="text-center ">{row?.animal?.qualified}</div>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (text, row) => (
        <div className="text-center ">{row?.animal?.type}</div>
      ),
    },
    {
      title: "Tamaño",
      dataIndex: "size",
      key: "size",
      render: (text, row) => (
        <div className="text-center ">{row?.animal?.size}</div>
      ),
    },
    {
      title: "Color",
      dataIndex: "coat_color",
      key: "coat_color",
      render: (text, row) => (
        <div className="text-center ">{row?.animal?.coat_color}</div>
      ),
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
      render: (text, row) => (
        <div className="text-center ">{row?.animal?.address}</div>
      ),
    },

    {
      title: "Esterilizado",
      dataIndex: "is_sterillized",
      key: "is_sterillized",
      render: (text, row) => (
        <div className="text-center">
          <div
            className={cx("fw-bolder", {
              "text-danger": row?.animal?.is_sterillized == 0,
              "text-success": row?.animal?.is_sterillized != 0,
            })}
          >
            {row?.animal?.is_sterillized == 1
              ? "Esterilizada"
              : "No Esterilizada"}
          </div>
        </div>
      ),
    },
    {
      title: "Biografía",
      key: "bio",

      render: (text, row) => (
        <div className="d-flex align-items-center gap-2 justify-content-center">
          <button
            onClick={() => {
              setRowData(row?.animal);
              setBioModal(true);
              console.log(rowData);
            }}
            className=" btn-sm btn btn-info fs-6 text-white"
          >
            Biografía
          </button>
        </div>
      ),
    },
    // {
    //   title: "Comportamiento",
    //   key: "Comportamiento",

    //   render: (text, row) => (
    //     <div className="d-flex align-items-center gap-2 justify-content-center">
    //       <button
    //         onClick={() => {
    //           setRowData(row?.animal);
    //           setConfirmButton(true);
    //         }}
    //         className=" btn-sm btn btn-danger fs-6 text-white"
    //       >
    //         <FaTrash />
    //       </button>
    //       <button
    //         onClick={() => {
    //           setEditModal(true);
    //           setRowData(row?.animal);
    //           console.log(rowData);
    //         }}
    //         className=" btn-sm btn btn-primary fs-6  text-white"
    //       >
    //         {edit}
    //       </button>
    //     </div>
    //   ),
    // },
    {
      title: "Estado animal",
      dataIndex: "status",
      key: "status",
      render: (text, row) => (
        <div className="text-center text-capitalize">
          <div
            className={cx("fw-bolder", {
              "text-danger": row?.animal?.status == "rejected",
              "text-dark": row?.animal?.status == "pending",
              "text-success": row?.animal?.status == "approved",
            })}
          >
            {row?.animal?.status == "pending"
              ? "pendiente"
              : row?.animal?.status == "approved"
              ? "aprobado"
              : row?.animal?.status == "rejected"
              ? "rechazado"
              : null}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAnimals();
    handleGetAllRaza();
    handleGetDepartments();
    handleGetAllQualifications();
  }, []);

  useEffect(() => {
    handleGetDepProvs(editModal ? rowData?.department : formData?.department);
  }, [rowData.department, formData.department]);

  useEffect(() => {
    handleGetProvDis(editModal ? rowData?.province : formData?.province);
  }, [rowData.province, formData.province]);

  return (
    <>
      <Modal
        title={"Agregar Annimal"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        style={
          loading
            ? { height: "180px", overflow: "auto" }
            : { height: "100%", overflow: "scroll" }
        }
        size="900px"
        confirmButton={{
          onClick: () => {
            addAnimal();
          },
          children: loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader size={20} color="#fff" loading={loading} />
            </div>
          ) : (
            "Agregar"
          ),
          style: { backgroundColor: "#36b9cc" },
          props: {
            disabled: loading,
          },
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <ClipLoader size={50} color="rgb(54, 185, 204)" loading={loading} />
          </div>
        ) : (
          <form className="modal_form_animal">
            {formData.pet_image ? (
              <div>
                <div>
                  <img
                    src={URL.createObjectURL(formData.pet_image)}
                    alt=""
                    style={{ width: "150px" }}
                  />
                </div>
                <div
                  className="btn btn-danger my-2"
                  onClick={() => setFormData({ ...formData, pet_image: null })}
                >
                  Eliminar
                </div>
              </div>
            ) : (
              <CustomInput
                required={true}
                label="Imagen del Animal"
                name="pet_image"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, pet_image: e.target.files[0] })
                }
              />
            )}
            <CustomInput
              required={true}
              label="Nombre"
              name="animal_f_name"
              placeholder="Nombre..."
              onChange={(e) =>
                setFormData({ ...formData, animal_f_name: e.target.value })
              }
              value={formData.animal_f_name || ""}
            />

            <CustomInput
              required={true}
              label="Apellido"
              name="animal_l_name"
              placeholder="Apellido... "
              onChange={(e) =>
                setFormData({ ...formData, animal_l_name: e.target.value })
              }
              value={formData.animal_l_name || ""}
            />

            <CustomInput
              required={true}
              label="Fecha de nacimiento"
              max={getToDayDate()}
              type={"date"}
              placeholder="fecha de nacimiento"
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              value={formData.dob || ""}
            />

            <CustomInput
              required={true}
              label="Tipo"
              name="type"
              placeholder="Tipo..."
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              value={formData.type || ""}
            />

            <CustomInput
              required={true}
              label="Color"
              name="coat_color"
              placeholder="Color..."
              onChange={(e) =>
                setFormData({ ...formData, coat_color: e.target.value })
              }
              value={formData.coat_color || ""}
            />

            <CustomInput
              required={true}
              label="DIRECCIÓN"
              name="address"
              placeholder="DIRECCIÓN..."
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              value={formData.address || ""}
            />

            <div className="custom_input">
              <label htmlFor="">
                Calification <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={qualifications?.map((e) => ({
                  label: e.title_es,
                  value: e.id,
                }))}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    qualified: e.label,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  qualifications
                    ?.filter((e) => e.title_es == formData.qualified)
                    ?.map((e) => ({
                      label: e.title_es,
                      value: e.id,
                    }))[0] || null
                }
              />
            </div>

            <div className="custom_input">
              <label htmlFor="">
                Esterilizada <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={sterilized?.map((e) => ({
                  label: e.label,
                  value: e.id,
                }))}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_sterillized: e.value,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  sterilized
                    ?.filter((e) => e.id == formData.is_sterillized)
                    ?.map((e) => ({
                      label: e.label,
                      value: e.id,
                    }))[0] || null
                } // Ensure null value when form is reset
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Sexo <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={gender?.map((e) => {
                  return {
                    label: e.label,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sex: e.label,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  gender
                    ?.filter((e) => e.label == formData.sex)
                    ?.map((e) => ({
                      label: e.label,
                      value: e.id,
                    }))[0] || ""
                }
              />
            </div>

            <div className="custom_input">
              <label htmlFor="">
                Tamaño <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={size?.map((e) => {
                  return {
                    label: e.label,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    size: e.label,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  size
                    ?.filter((e) => e.label == formData.size)
                    ?.map((e) => ({
                      label: e.label,
                      value: e.id,
                    }))[0] || ""
                }
              />
            </div>

            <div className="custom_input">
              <label htmlFor="">
                Raza <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={raza?.map((e) => {
                  return {
                    label: e.title_es,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    raza: e.value,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                // value={
                //   raza
                //     ?.filter((e) => e.id == formData?.raza?.id)
                //     ?.map((e) => ({
                //       label: e.title_es,
                //       value: e.id,
                //     }))[0] || ""
                // }
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Departamento <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={departments?.map((e) => {
                  return {
                    label: e.title_es,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.value,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  departments
                    ?.filter((e) => e.id == formData.department)
                    ?.map((e) => ({
                      label: e.title_es,
                      value: e.id,
                    }))[0] || ""
                }
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Provincia <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={depProv?.map((e) => {
                  return {
                    label: e.title_es,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    province: e.value,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  depProv
                    ?.filter((e) => e.id == formData.province)
                    ?.map((e) => ({
                      label: e.title_es,
                      value: e.id,
                    }))[0] || ""
                }
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Distrito <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={provDis?.map((e) => {
                  return {
                    label: e.title_es,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    district: e.value,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  provDis
                    ?.filter((e) => e.id == formData.district)
                    ?.map((e) => ({
                      label: e.title_es,
                      value: e.id,
                    }))[0] || ""
                }
              />
            </div>

            <div className="custom_input">
              <label htmlFor="">
                Bio <span className="text-danger">(*)</span>
              </label>
              <textarea
                type="text"
                name="bio"
                placeholder="Bio..."
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio: e.target.value,
                  })
                }
                rows={1}
                value={formData.bio || ""}
              ></textarea>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        style={
          loading
            ? { height: "180px", overflow: "hidden" }
            : { height: "100%", overflow: "scroll" }
        }
        title={"Actualizar Animal"}
        show={editModal}
        onClose={() => setEditModal(false)}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: editAnimal,
          children: loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader size={20} color="#fff" loading={loading} />
            </div>
          ) : (
            "Actualizar"
          ),
          style: { backgroundColor: "#36b9cc" },
          props: {
            disabled: loading,
          },
        }}
        cancelButton={{
          onClick: () => setEditModal(false),
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <ClipLoader size={50} loading={loading} color="rgb(54, 185, 204)" />
          </div>
        ) : (
          <form className="modal_form_animal">
            {rowData?.pet_image ? (
              <div>
                <div>
                  <img
                    src={
                      rowData.pet_image instanceof File
                        ? URL.createObjectURL(rowData.pet_image)
                        : rowData.pet_image
                    }
                    alt=""
                    style={{ width: "150px" }}
                  />
                </div>
                <div
                  className="btn btn-danger my-2"
                  onClick={() => setRowData({ ...rowData, pet_image: null })}
                >
                  Eliminar
                </div>
              </div>
            ) : (
              <CustomInput
                required={true}
                label="Imagen del Animal"
                name="pet_image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setRowData({ ...rowData, pet_image: e.target.files[0] })
                }
              />
            )}

            <CustomInput
              required={true}
              label="Nombre"
              name="animal_f_name"
              placeholder="Nombre..."
              onChange={(e) =>
                setRowData({ ...rowData, animal_f_name: e.target.value })
              }
              value={rowData.animal_f_name || ""}
            />
            <CustomInput
              required={true}
              label="Apellido"
              name="animal_l_name"
              placeholder="Apellido..."
              onChange={(e) =>
                setRowData({ ...rowData, animal_l_name: e.target.value })
              }
              value={rowData.animal_l_name || ""}
            />
            <CustomInput
              required={true}
              label="Fecha de nacimiento"
              max={getToDayDate()}
              value={rowData.dob}
              type={"date"}
              placeholder="fecha de nacimiento"
              onChange={(e) => setRowData({ ...rowData, dob: e.target.value })}
            />

            <CustomInput
              label="Tipo"
              required={true}
              name="type"
              placeholder="Tipo..."
              onChange={(e) => setRowData({ ...rowData, type: e.target.value })}
              value={rowData.type || ""}
            />

            <CustomInput
              required={true}
              label="Color"
              name="coat_color"
              placeholder="Color..."
              onChange={(e) =>
                setRowData({ ...rowData, coat_color: e.target.value })
              }
              value={rowData.coat_color || ""}
            />

            <CustomInput
              required={true}
              label="DIRECCIÓN"
              name="address"
              placeholder="DIRECCIÓN..."
              onChange={(e) =>
                setRowData({ ...rowData, address: e.target.value })
              }
              value={rowData.address || ""}
            />

            <div className="custom_input">
              <label htmlFor="">
                Calification <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={qualifications?.map((e) => ({
                  label: e.title_es,
                  value: e.id,
                }))}
                onChange={(e) =>
                  setRowData({
                    ...rowData,
                    qualified: e.label,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  qualifications
                    ?.filter((e) => e.title_es == rowData?.qualified)
                    ?.map((e) => ({
                      label: e.title_es,
                      value: e.id,
                    }))[0] || null
                }
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Esterilizada <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={sterilized?.map((e) => {
                  return {
                    label: e.label,
                    value: e.id,
                  };
                })}
                onChange={(e) => {
                  setRowData({
                    ...rowData,
                    is_sterillized: e.value,
                  });
                  console.log(rowData);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  sterilized
                    ?.filter((e) => e.id == rowData.is_sterillized)
                    ?.map((e) => ({
                      label: e.label,
                      value: e.id,
                    }))[0]
                }
              />
            </div>

            <div className="custom_input">
              <label htmlFor="">
                Sexo <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={gender?.map((e) => {
                  return {
                    label: e.label,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setRowData({
                    ...rowData,
                    sex: e.label,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  gender
                    ?.filter((e) => e.label == rowData.sex)
                    ?.map((e) => ({
                      label: e.label,
                      value: e.id,
                    }))[0]
                }
              />
            </div>

            <div className="custom_input">
              <label htmlFor="">
                Tamaño <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={size?.map((e) => {
                  return {
                    label: e.label,
                    value: e.id,
                  };
                })}
                onChange={(e) => {
                  setRowData({
                    ...rowData,
                    size: e.label,
                  });
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  size
                    ?.filter((e) => e.label == rowData.size)
                    ?.map((e) => ({
                      label: e.label,
                      value: e.id,
                    }))[0]
                }
              />
            </div>

            <div className="custom_input">
              <label htmlFor="">
                Raza <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={raza?.map((e) => {
                  return {
                    label: e.title_es,
                    value: e.id,
                  };
                })}
                onChange={(e) => {
                  setRowData({
                    ...rowData,
                    raza: e.value,
                  });
                  console.log(e);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  raza
                    ?.filter((e) => e.id == rowData.raza?.id)
                    ?.map((item) => ({
                      label: item.title_es,
                      value: item.id,
                    }))[0]
                }
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Departamento <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={departments?.map((e) => {
                  return {
                    label: e.title_es,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setRowData({
                    ...rowData,
                    department: e.value,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  departments
                    ?.filter((e) => e.id == rowData.department)
                    ?.map((item) => ({
                      label: item.title_es,
                      value: item.id,
                    }))[0]
                }
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Provincia <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={depProv?.map((e) => {
                  return {
                    label: e.title_es,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setRowData({
                    ...rowData,
                    province: e.value,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  depProv
                    ?.filter((e) => e.id == rowData.province)
                    ?.map((e) => ({
                      label: e.title_es,
                      value: e.id,
                    }))[0]
                }
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Distrito <span className="text-danger">(*)</span>
              </label>

              <Select
                placeholder={"Seleccionar..."}
                options={provDis?.map((e) => {
                  return {
                    label: e.title_es,
                    value: e.id,
                  };
                })}
                onChange={(e) =>
                  setRowData({
                    ...rowData,
                    district: e.value,
                  })
                }
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: "6px",
                  }),
                }}
                value={
                  provDis
                    ?.filter((e) => e.id == rowData.district)
                    ?.map((e) => ({
                      label: e.title_es,
                      value: e.id,
                    }))[0]
                }
              />
            </div>
            <div className="custom_input">
              <label htmlFor="">
                Bio <span className="text-danger">(*)</span>
              </label>
              <textarea
                type="text"
                placeholder="Bio..."
                name="bio"
                value={rowData.bio || ""}
                onChange={(e) =>
                  setRowData({
                    ...rowData,
                    bio: e.target.value,
                  })
                }
                rows={1}
              ></textarea>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        title={"Confirmar eliminar Animal"}
        show={confirmButton}
        onClose={handleConfirmCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: deleteAnimal,
          children: loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader size={20} color="#fff" loading={loading} />
            </div>
          ) : (
            "Eliminar"
          ),
          style: { backgroundColor: "#cc3636" },
          props: {
            disabled: loading,
          },
        }}
        cancelButton={{
          onClick: handleConfirmCloseModal,
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <ClipLoader size={50} color="rgb(54, 185, 204)" loading={loading} />
          </div>
        ) : (
          <h1 className="">Estás seguro de eso?</h1>
        )}
      </Modal>
      <Modal
        title={"Biografía"}
        show={bioModal}
        onClose={() => setBioModal(false)}
        showCloseBtn={true}
        size="900px"
        cancelButton={{
          onClick: () => setBioModal(false),
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {<p className="">{rowData?.bio}</p>}
      </Modal>

      <div className="race_page">
        <FormCard header="Animales">
          <CustomInput
            placeholder="Buscar animales..." // <-- Search input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="department-search"
          />
          <div className="mt-4 d-flex align-items-center gap-4">
            <CustomButton
              textColor="#333"
              onClick={() => setIsOpenModal(true)}
              text="Agregar "
              icon={<FaFolderPlus />}
              color={"#222"}
              bgColor="#fff"
            />
          </div>
        </FormCard>
      </div>

      <div className="search_table_container">
        {loading ? (
          <div className="d-flex align-items-center justify-content-center">
            <ClipLoader size={50} loading={loading} color="rgb(54, 185, 204)" />
          </div>
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={animals}
          />
        )}
      </div>
    </>
  );
}
