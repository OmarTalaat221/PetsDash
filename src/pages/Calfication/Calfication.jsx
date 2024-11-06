/* eslint-disable no-use-before-define */
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import { FaFolderPlus, FaPencil, FaTrash } from "react-icons/fa6";
import TableComponent from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";

import axios from "axios";
import "./style.css";
import { base_url, globa_base_url, img_base_url } from "../../constant";

import { Table } from "antd";
import cx from "classnames";
import { edit } from "../../assets/svgIcons";
import { Loader } from "rsuite";
import { ClipLoader } from "react-spinners";
import { uploadImage } from "../../constant/uploadImage";
import { toast } from "react-hot-toast";

export default function Calfication() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title_en: "",
    title_es: "",
  });
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleConfirmCloseModal = () => {
    setConfirmButton(false);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleEmptyInputs = () => {
    setFormData({
      title_en: "",
      title_es: "",
    });
  };

  const getAllData = async () => {
    setGetLoading(true);
    try {
      const res = await axios.get(base_url + `calification/get_all`);
      if (res.status === 200 && Array.isArray(res.data.data)) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setGetLoading(false);
    }
  };

  const createCalification = async () => {
    if (formData.title_es == "") {
      toast.error("Por favor ingrese calcificación en español");
      return;
    }
    if (formData.title_en == "") {
      toast.error("Por favor ingrese calcificación en inglés");
      return;
    }
    setLoading(true);

    try {
      const dataSend = {
        ...formData,
      };

      const res = await axios.post(
        base_url + `calification/create_one`,
        dataSend,
        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Calificación agregado exitosamente");
      getAllData();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      handleEmptyInputs();
      handleCloseModal();
    }
  };

  const updateCalification = async () => {
    if (rowData.title_es == "") {
      toast.error("Por favor ingrese calcificación en español");
      return;
    }
    if (rowData.title_en == "") {
      toast.error("Por favor ingrese calcificación en inglés");
      return;
    }
    setLoading(true);
    try {
      const dataSend = {
        ...rowData,
      };

      await axios.post(
        base_url + `calification/update_one/${rowData.id}`,
        dataSend,
        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Calificación actualizado exitosamente");
      getAllData();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      setEditModal(false);
    }
  };

  const deleteCalification = async () => {
    setLoading(true);
    try {
      await axios.get(
        base_url + `calification/delete_one/${rowData.id}`,

        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Calificación actualizado exitosamente");
      getAllData();
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

  const columns = [
    {
      title: "Título español",
      dataIndex: "title_es",
      key: "title_es",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Título en inglés",
      dataIndex: "title_en",
      key: "title_en",
      render: (text) => <div className="text-center">{text}</div>,
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
            className=" btn-sm btn btn-danger fs-6 text-white"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => {
              setEditModal(true);
              setRowData(row);
              console.log(rowData);
            }}
            className=" btn-sm btn btn-primary fs-6 text-white"
          >
            {edit}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <Modal
        title={"Agregar calificación"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: createCalification,
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
          <form className="modal_form">
            <CustomInput
              label="Título español"
              name="title_es"
              placeholder="Ingrese el título en español..."
              onChange={(e) =>
                setFormData({ ...formData, title_es: e.target.value })
              }
              value={formData.title_es || ""}
            />

            <CustomInput
              label="Título en inglés"
              name="title_en"
              placeholder="Ingrese el título en inglés..."
              onChange={(e) =>
                setFormData({ ...formData, title_en: e.target.value })
              }
              value={formData.title_en || ""}
            />
          </form>
        )}
      </Modal>

      <Modal
        title={"Actualizar calificación"}
        show={editModal}
        onClose={() => setEditModal(false)}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateCalification,
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
          <form className="modal_form">
            <CustomInput
              label="Título español"
              name="title_es"
              placeholder="Ingrese el título en español..."
              onChange={(e) =>
                setRowData({ ...rowData, title_es: e.target.value })
              }
              value={rowData.title_es || ""}
            />

            <CustomInput
              label="Título en inglés"
              name="title_en"
              placeholder="Ingrese el título en inglés..."
              onChange={(e) =>
                setRowData({ ...rowData, title_en: e.target.value })
              }
              value={rowData.title_en || ""}
            />
          </form>
        )}
      </Modal>

      <Modal
        title={"Confirmar la eliminación del artículo"}
        show={confirmButton}
        onClose={handleConfirmCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: deleteCalification,
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
          <h1 className="">
            ¿Está seguro de que desea eliminar este elemento?
          </h1>
        )}
      </Modal>
      <div className="race_page">
        <FormCard header="Calificación">
          <div className="mt-4 d-flex align-items-center gap-4">
            <CustomButton
              textColor="#333"
              onClick={() => setIsOpenModal(true)}
              text="Agregar"
              icon={<FaFolderPlus />}
              color={"#222"}
              bgColor="#fff"
            />
          </div>
        </FormCard>
      </div>

      <div className="search_table_container">
        {getLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <ClipLoader
              size={50}
              loading={getLoading}
              color="rgb(54, 185, 204)"
            />
          </div>
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={data}
          />
        )}
      </div>
    </>
  );
}
