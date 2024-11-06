import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import { FaFolderPlus, FaPencil } from "react-icons/fa6";
import TableComponent from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import cx from "classnames";
import { edit } from "../../assets/svgIcons";

import { base_url, globa_base_url, img_base_url } from "../../constant";

import { ClipLoader } from "react-spinners";

// import useGetTesto from "../../CustomHooks/useGetTesto";

import { uploadImage } from "../../constant/uploadImage";
import useGetTesto from "../../CustomHooks/UseGetTesto";
import { Table } from "antd";
import Spinner from "../../utils/Spinner/Spinner";
import toast from "react-hot-toast";

export default function Testimonials() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    text_es: "",
    text_en: "",
    name: "",
    hidden: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [confirmButton, setConfirmButton] = useState(false);
  const [rowData, setRowData] = useState({});
  const [editModal, setEditModal] = useState(false);

  const columns = [
    {
      title: "Ícono ",
      dataIndex: "image",
      key: "image",
      render: (img) => <img style={{ width: "150px" }} src={img} alt="" />,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Título en inglés",
      dataIndex: "text_en",
      key: "text_en",
      render: (text, row) => (
        <div title={text} className="text-center ellipsis ">
          {text}
        </div>
      ),
    },
    {
      title: "Título español",
      dataIndex: "text_es",
      key: "text_es",
      render: (text, row) => (
        <div title={text} className="text-center ellipsis ">
          {text}
        </div>
      ),
    },
    {
      title: "Estado",
      dataIndex: "hidden",
      key: "hidden",
      render: (text, row) => (
        <div className="text-center">
          <div
            className={cx("fw-bolder", {
              "text-success": row.hidden == 0,
              "text-danger": row.hidden != 0,
            })}
          >
            {row.hidden == 0 ? "Mostrado" : "Oculta"}
          </div>
        </div>
      ),
    },
    {
      title: "Comportamiento",
      key: "Comportamiento",

      render: (text, row) => (
        <div className="d-flex align-items-center gap-2 justify-content-center">
          <button
            onClick={() => {
              setRowData(row);
              setConfirmButton(true);
            }}
            className="update_status_benefit"
          >
            Actualizar
          </button>
          <button
            onClick={() => {
              setEditModal(true);
              setRowData(row);
              // console.log(rowData);
            }}
            className=" btn-sm btn btn-primary text-white"
          >
            {edit}
          </button>
        </div>
      ),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOpenModal = (item) => {
    if (item) {
      setEditMode(true);
      setCurrentId(item.id);
      setFormData({
        image: item.image,
        text_es: item.text_es,
        text_en: item.text_en,
        name: item.name,
      });
    } else {
      setEditMode(false);
      setFormData({
        image: null,
        text_es: "",
        text_en: "",
        name: "",
      });
    }
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setCurrentId(null);
  };
  const handleConfirmModal = (id) => {
    setConfirmButton(true);
    setCurrentId(id);
  };
  const handleConfirmCloseModal = (id) => {
    setConfirmButton(false);
    setCurrentId(null);
  };

  const { handleGetTesto, testo, loading: testoLoading } = useGetTesto();

  const createTesto = async () => {
    console.log("create");
    console.log(formData.image);
    setLoading(true);
    try {
      let image = null;

      if (formData.image) {
        image = await uploadImage(formData.image);

        delete formData.image;
      }

      const testoData = {
        ...formData,
        image: image?.data?.message,
      };
      const res = await axios.post(
        "https://camp-coding.site/pets/api/says/add_new",
        testoData,
        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Testimonial creado exitosamente!");
      console.log("suceese");
      handleGetTesto();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTesto = async () => {
    setLoading(true);
    try {
      let image = null;

      if (rowData.image instanceof File) {
        const uploadedImage = await uploadImage(rowData.image);
        image = uploadedImage?.data?.message;
      }

      const testoData = {
        ...rowData,
        image: image || rowData.image,
      };

      console.log(testoData);
      // return
      console.log(testoData);
      await axios.post(
        globa_base_url + `says/update_one/${rowData.id}`,
        testoData,
        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Beneficio actualizado exitosamente");
      handleGetTesto();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      setEditModal(false);
    }
  };

  const updateStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${img_base_url}says/update_status/${rowData.id}`
      );
      if (res.status === 200) {
        toast.success("Estado del testimonio actualizado exitosamente");
        handleGetTesto();
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      handleConfirmCloseModal();
    }
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

  const handleSubmitForm = async (e) => {
    if (
      formData.image === null ||
      formData.name === "" ||
      formData.text_es === "" ||
      formData.text_en === ""
    ) {
      toast.error("Por favor completa la información", "error");
      return;
    }
    e.preventDefault();

    // if (editMode) {
    //   await updateTesto();
    // } else {
    await createTesto();
    // }
    setIsOpenModal(false);
  };

  useEffect(() => {
    handleGetTesto();
  }, []);

  return (
    <>
      <Modal
        title={"Agregar testimonio"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: handleSubmitForm,
          loading: loading,
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
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
          children: "Close",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <ClipLoader color="#36b9cc" loading={loading} size={50} />
          </div>
        ) : (
          <form className="modal_form">
            {formData.image ? (
              <div>
                <div>
                  <img
                    src={
                      formData.image instanceof File
                        ? URL.createObjectURL(formData.image)
                        : formData.image
                    }
                    alt=""
                    style={{ width: "100px", height: "80px" }}
                  />
                </div>
                <div
                  className="btn btn-danger my-2"
                  onClick={() => setFormData({ ...formData, image: null })}
                >
                  Eliminar
                </div>
              </div>
            ) : (
              <CustomInput
                label="Image"
                name="image"
                type="file"
                onChange={handleInputChange}
              />
            )}

            <CustomInput
              label="Nombre"
              name="name"
              placeholder="Introduzca la Nombre..."
              onChange={handleInputChange}
              value={formData.name}
            />

            <CustomInput
              label="Testimonial(ES)"
              name="text_es"
              placeholder="Ingrese la testimonial en español..."
              onChange={handleInputChange}
              value={formData.text_es}
            />

            <CustomInput
              label="Testimonial(EN)"
              name="text_en"
              placeholder="Ingrese el testimonio en ingles..."
              onChange={handleInputChange}
              value={formData.text_en}
            />
          </form>
        )}
      </Modal>

      {/* edit modal */}
      <Modal
        title={"Actualizar beneficio"}
        show={editModal}
        onClose={() => setEditModal(false)}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateTesto,
          children: loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader size={20} color="#fff" loading={loading} />
            </div>
          ) : (
            "Actualizer"
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
          <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
        ) : (
          <form className="modal_form">
            {rowData?.image ? (
              <div>
                <div>
                  <img
                    src={
                      rowData.image instanceof File
                        ? URL.createObjectURL(rowData.image)
                        : rowData.image
                    }
                    alt=""
                    style={{ width: "100px", height: "80px" }}
                  />
                </div>
                <div
                  className="btn btn-danger my-2"
                  onClick={() => setRowData({ ...rowData, image: null })}
                >
                  Eliminar
                </div>
              </div>
            ) : (
              <CustomInput
                label="Icon"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setRowData({ ...rowData, image: e.target.files[0] })
                }
              />
            )}

            <CustomInput
              label="Nombre"
              name="name"
              placeholder="Ingrese el título en español..."
              onChange={(e) => setRowData({ ...rowData, name: e.target.value })}
              value={rowData.name || ""}
            />

            <CustomInput
              label="Título español"
              name="text_es"
              placeholder="Ingrese el título en español..."
              onChange={(e) =>
                setRowData({ ...rowData, text_es: e.target.value })
              }
              value={rowData.text_es || ""}
            />

            <CustomInput
              label="Título en inglés"
              name="text_en"
              placeholder="Ingrese el título en inglés..."
              onChange={(e) =>
                setRowData({ ...rowData, text_en: e.target.value })
              }
              value={rowData.text_en || ""}
            />
          </form>
        )}
      </Modal>

      <Modal
        title={"Confirmar estado de actualización"}
        show={confirmButton}
        onClose={handleConfirmCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateStatus,
          children: loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader color="#fff" loading={loading} size={20} />
            </div>
          ) : (
            "Actualizar"
          ),
          style: { backgroundColor: "#36b9cc" },
        }}
        cancelButton={{
          onClick: handleConfirmCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <ClipLoader color="#36b9cc" loading={loading} size={50} />
          </div>
        ) : (
          <h1 className="">¿Estás seguro de eso?</h1>
        )}
      </Modal>

      <div className="race_page">
        <FormCard header="Testimonios">
          <div className="mt-4 d-flex align-items-center gap-4">
            <CustomButton
              textColor="#333"
              onClick={() => handleOpenModal()}
              text="Agregar testimonios"
              icon={<FaFolderPlus />}
              color={"#222"}
              bgColor="#fff"
            />
          </div>
        </FormCard>
      </div>
      <div className="search_table_container">
        {testoLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <ClipLoader
              size={50}
              loading={testoLoading}
              color="rgb(54, 185, 204)"
            />
          </div>
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={testo}
          />
        )}
      </div>
    </>
  );
}
