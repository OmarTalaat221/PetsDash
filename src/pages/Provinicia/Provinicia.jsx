import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import { FaFolderPlus, FaPencil, FaTrash } from "react-icons/fa6";

import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { base_url, globa_base_url, img_base_url } from "../../constant";

import { toast } from "react-hot-toast";
import { Table } from "antd";
import cx from "classnames";
import { arrowLeft, edit } from "../../assets/svgIcons";
import { Loader } from "rsuite";
import { ClipLoader } from "react-spinners";
import { uploadImage } from "../../constant/uploadImage";
import useGetDepartments from "../../CustomHooks/useGetAllDepartments";
import { Link, useParams } from "react-router-dom";
import useGetDepProvencia from "../../CustomHooks/useGetDepProvencia";

export default function Provincia() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title_en: "",
    title_es: "",
  });

  const [updateState, setupdateState] = useState(false);

  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleConfirmCloseModal = () => {
    setupdateState(false);
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

  const { dep_id } = useParams();

  const {
    handleGetDepProvs,
    depProv,
    loading: provLoading,
  } = useGetDepProvencia(dep_id);

  const createProvinicia = async () => {
    setLoading(true);
    console.log(formData.title_es, "----- ", formData.title_en);
    if (formData.title_en !== "" && formData.title_es !== "") {
      try {
        const dataSend = {
          ...formData,
          departmento_id: dep_id,
        };

        const res = await axios.post(base_url + `create_provincia`, dataSend, {
          headers: {
            lang: "es",
          },
        });

        toast.success("Provinicia agregado exitosamente");
        handleGetDepProvs(dep_id);
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setLoading(false);
        handleEmptyInputs();
        handleCloseModal();
      }
    } else {
      setLoading(false);
      toast.error("Complete todos los campos por favor");
    }
  };

  const updateProvinicia = async () => {
    if (rowData.title_es == "") {
      toast.error("Por favor, introduzca la provincia española");
      return;
    }
    if (rowData.title_en == "") {
      toast.error("Por favor ingrese la provincia inglesa");
      return;
    }
    setLoading(true);
    try {
      const dataSend = {
        ...rowData,
        departmento_id: dep_id,
      };

      await axios.post(base_url + `update_provincia/${rowData.id}`, dataSend, {
        headers: {
          lang: "es",
        },
      });

      toast.success("Provinicia actualizado exitosamente");
      handleGetDepProvs(dep_id);
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
      await axios.get(base_url + `update_provincia_status/${rowData.id}`, {
        headers: {
          lang: "es",
        },
      });

      toast.success("Estado del Provinicia eliminado exitosamente");
      handleGetDepProvs(dep_id);
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      handleConfirmCloseModal();
      setupdateState(false);
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
      title: "Título en español",
      dataIndex: "title_es",
      key: "title_es",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Título en inglés",
      dataIndex: "title_en",
      key: "title_en",
      render: (text, row) => <div className="text-center">{text}</div>,
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
              setEditModal(true);
              setRowData(row);
            }}
            className=" btn-sm btn btn-primary fs-6 text-white"
          >
            {edit}
          </button>

          <button
            onClick={() => {
              setRowData(row);
              setConfirmButton(true);
              setupdateState(true);
            }}
            className="update_status_benefit"
          >
            Actualizar
          </button>

          <Link to={`/distrito/${row?.id}`} className="">
            <button className="btn btn-primary btn-sm">Distrito</button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    handleGetDepProvs(dep_id);
  }, []);

  return (
    <>
      <Modal
        title={"Agregar Provinicia"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: createProvinicia,
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
              value={formData.title_es}
            />

            <CustomInput
              label="Título en inglés"
              name="title_en"
              placeholder="Ingrese el título en inglés..."
              onChange={(e) =>
                setFormData({ ...formData, title_en: e.target.value })
              }
              value={formData.title_en}
            />
          </form>
        )}
      </Modal>

      <Modal
        title={"Actualizar Provinicia"}
        show={editModal}
        onClose={() => setEditModal(false)}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateProvinicia,
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
        title={
          updateState
            ? "Confirmar actualización del artículo"
            : "Confirmar la eliminación del artículo"
        }
        show={confirmButton}
        onClose={handleConfirmCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateState ? updateStatus : null,
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
            {updateState
              ? `¿Está seguro de que desea actualizar este elemento?`
              : `¿Está seguro de que desea eliminar este elemento?`}
          </h1>
        )}
      </Modal>
      <div className="race_page">
        <FormCard header="Provinicia">
          <Link to={-1}>
            <button className="back_button ">{arrowLeft}</button>
          </Link>
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
        {provLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <ClipLoader
              size={50}
              loading={provLoading}
              color="rgb(54, 185, 204)"
            />
          </div>
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={depProv}
          />
        )}
      </div>
    </>
  );
}
