import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import { FaFolderPlus, FaPencil, FaTrash } from "react-icons/fa6";

import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Departamento.css";
import { base_url, globa_base_url, img_base_url } from "../../constant";

import { toast } from "react-hot-toast";
import { Table } from "antd";
import cx from "classnames";
import { edit } from "../../assets/svgIcons";
import { Loader } from "rsuite";
import { ClipLoader } from "react-spinners";
import { uploadImage } from "../../constant/uploadImage";
import useGetDepartments from "../../CustomHooks/useGetAllDepartments";
import { Link } from "react-router-dom";
import CustomInputWithSearch from "../../components/CustomInputWithSearch/CustomInputWithSearch";
import { useMediaQuery } from "../../CustomHooks/useMediaQueries";

export default function Departamento() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title_en: "",
    title_es: "",
  });

  const [updateState, setupdateState] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:786px)");

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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

  const {
    handleGetDepartments,
    departments,
    setDepartments,
    originalDepartments,
    loading: depLoading,
  } = useGetDepartments();

  // const createDepartment = async () => {
  //   setLoading(true);
  //   try {
  //     const dataSend = {
  //       ...formData,
  //     };

  //     const res = await axios.post(base_url + `create_departmento`, dataSend, {
  //       headers: {
  //         lang: "es",
  //       },
  //     });

  //     notify("Departamento agregado exitosamente", "success");
  //     handleGetDepartments();
  //   } catch (error) {
  //     handleErrorResponse(error);
  //   } finally {
  //     setLoading(false);
  //     handleEmptyInputs();
  //     handleCloseModal();
  //   }
  // };

  const updateDepartment = async () => {
    if (rowData.title_es == "") {
      toast.error("Por favor ingrese el departamento de español");
      return;
    }
    if (rowData.title_en == "") {
      toast.error("Por favor ingrese al departamento de inglés");
      return;
    }
    setLoading(true);
    try {
      const dataSend = {
        ...rowData,
      };

      await axios.post(
        base_url + `update_departmento/${rowData.id}`,
        dataSend,
        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Departamento actualizado exitosamente");
      handleGetDepartments();
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
      await axios.get(base_url + `update_departmento_status/${rowData.id}`, {
        headers: {
          lang: "es",
        },
      });

      toast.success("Estado del departamento eliminado exitosamente");
      handleGetDepartments();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      handleConfirmCloseModal();
      setupdateState(false);
    }
  };

  const deleteDepartamento = async () => {
    setLoading(true);
    try {
      await axios.post(
        base_url + `delete_departmento/${rowData.id}`,

        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Departamento eliminado exitosamente");
      handleGetDepartments();
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

    // last edition
    // {
    //   title: "Provincia en español",
    //   dataIndex: "title_es",
    //   key: "title_es",
    //   render: (text, row, rowIndex) => {
    //     return <div className="text-center">{row.provincia[0]?.title_es}</div>;
    //   },
    // },
    // {
    //   title: "Provincia en inglés",
    //   dataIndex: "title_en",
    //   key: "title_en",
    //   render: (text, row, rowIndex) => {
    //     return (
    //       <div className="text-center">{row?.provincia?.[0]?.title_en}</div>
    //     );
    //   },
    // },
    // {
    //   title: "Distrito en español",
    //   dataIndex: "title_es",
    //   key: "title_es",
    //   render: (text, row, rowIndex) => {
    //     return (
    //       <div className="text-center">
    //         {row?.provincia?.[0]?.distrito?.[0]?.title_es}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: "Distrito en inglés",
    //   dataIndex: "title_en",
    //   key: "title_en",
    //   render: (text, row, rowIndex) => {
    //     return (
    //       <div className="text-center">
    //         {row?.provincia?.[0]?.distrito?.[0]?.title_en}
    //       </div>
    //     );
    //   },
    // },
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
            className="btn-sm btn btn-danger fs-6 text-white"
          >
            <FaTrash />
          </button>
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

          <Link to={`/provincia/${row?.id}`} className="">
            <button className="btn btn-primary btn-sm">Provincia</button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    handleGetDepartments();
  }, []);

  useEffect(() => {
    if (
      originalDepartments &&
      originalDepartments.length > 0 &&
      Array.isArray(originalDepartments)
    ) {
      if (searchValue.length >= 1) {
        const newData = originalDepartments.filter((item) => {
          if (
            searchValue &&
            !item?.title_es
              ?.toLowerCase()
              ?.includes(searchValue?.toLowerCase()) &&
            !item?.title_en?.toLowerCase()?.includes(searchValue?.toLowerCase())
          ) {
            return false;
          }
          return true;
        });
        setDepartments(newData);
      } else {
        setDepartments(originalDepartments);
      }
    }
  }, [searchValue, originalDepartments]);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <>
      {/* create modal */}

      {/* <Modal
        title={"Agregar departamento"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: createDepartment,
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
      </Modal> */}

      {/* edit modal */}
      <Modal
        title={"Actualizar departamento"}
        show={editModal}
        onClose={() => setEditModal(false)}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateDepartment,
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

      {/* update status */}
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
          onClick: updateState ? updateStatus : deleteDepartamento,
          children: loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader size={20} color="#fff" loading={loading} />
            </div>
          ) : updateState ? (
            "Actualizar"
          ) : (
            "Borrar"
          ),
          style: { backgroundColor: updateState ? "#36b9cc" : "#cc3636" },
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
          <h3 className="my-4">
            {updateState
              ? `¿Está seguro de que desea actualizar este elemento?`
              : `¿Está seguro de que desea eliminar este elemento?`}
          </h3>
        )}
      </Modal>

      <div className="race_page">
        <FormCard header="Departamento">
          <div style={{ width: isSmallScreen ? "100%" : "40.33%" }}>
            <CustomInputWithSearch
              placeholder="Buscando..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </FormCard>
      </div>

      <div className="search_table_container">
        {depLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <ClipLoader
              size={50}
              loading={depLoading}
              color="rgb(54, 185, 204)"
            />
          </div>
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={departments}
          />
        )}
      </div>
    </>
  );
}
