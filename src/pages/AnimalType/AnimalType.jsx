import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import { FaFolderPlus, FaPencil } from "react-icons/fa6";
import TableComponent from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { base_url, globa_base_url, img_base_url } from "../../constant";

import { toast } from "react-hot-toast";
import { Table } from "antd";
import cx from "classnames";
import { edit } from "../../assets/svgIcons";
import { Loader } from "rsuite";
import { ClipLoader } from "react-spinners";
import { uploadImage } from "../../constant/uploadImage";
import CustomInputWithSearch from "../../components/CustomInputWithSearch/CustomInputWithSearch";
import { useMediaQuery } from "../../CustomHooks/useMediaQueries";

export default function AnimalType() {
  const isSmallScreen = useMediaQuery("(max-width:786px)");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_es: "",
  });
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [rowData, setRowData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const handleConfirmCloseModal = () => {
    setConfirmButton(false);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleEmptyInputs = () => {
    setFormData({
      name_en: "",
      name_es: "",
    });
  };

  const getAllData = async () => {
    setGetLoading(true);
    try {
      const res = await axios.get(
        globa_base_url + "animal_types/get_all_for_admin"
      );
      if (res.status === 200 && Array.isArray(res.data.result)) {
        setData(res.data.result);
        setOriginalData(res.data.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setGetLoading(false);
    }
  };

  const createAnimalType = async () => {
    setLoading(true);
    if (formData.name_en !== "" && formData.name_es !== "") {
      console.log("data is completed");
      try {
        const dataSend = {
          ...formData,
        };

        const res = await axios.post(
          globa_base_url + "animal_types/add_new",
          dataSend,
          {
            headers: {
              lang: "es",
            },
          }
        );

        toast.success("tipo de animal agregado exitosamente");
        getAllData();
      } catch (error) {
        handleErrorResponse(error);
        handleErrorResponse("there is an error");
      } finally {
        setLoading(false);
        handleEmptyInputs();
        handleCloseModal();
      }
    } else {
      console.log("data is completed");
      setLoading(false);
      toast.error("Complete todos los campos por favor");
    }
  };

  const updateAnimalType = async () => {
    if (rowData.name_es === "") {
      toast.error("Por favor ingrese el nombre del tipo de animal en español");
      return;
    }
    if (rowData.name_en === "") {
      toast.error("Por favor ingrese el nombre del tipo de animal en inglés");
      return;
    }
    setLoading(true);
    try {
      const dataSend = {
        ...rowData,
      };

      await axios.post(
        globa_base_url + `animal_types/update_one/${rowData.id}`,
        dataSend,
        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Tipo de animal actualizado exitosamente");
      getAllData();
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
        `${globa_base_url}animal_types/update_status/${rowData.id}`
      );
      if (res.status === 200) {
        toast.success("Actualizar el estado del tipo de animal con éxito");
        getAllData();
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      setConfirmButton(false);
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
      dataIndex: "name_es",
      key: "name_es",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Título en inglés",
      dataIndex: "name_en",
      key: "name_en",
      render: (text) => <div className="text-center">{text}</div>,
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
              console.log(rowData);
            }}
            className=" btn-sm btn btn-primary text-white"
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

  useEffect(() => {
    if (
      originalData &&
      originalData.length > 0 &&
      Array.isArray(originalData)
    ) {
      if (searchValue.length >= 1) {
        const newData = originalData.filter((item) => {
          if (
            searchValue &&
            !item?.name_es
              ?.toLowerCase()
              ?.includes(searchValue?.toLowerCase()) &&
            !item?.name_en?.toLowerCase()?.includes(searchValue?.toLowerCase())
          ) {
            return false;
          }

          return true;
        });
        setData(newData);
      } else {
        setData(originalData);
      }
    }
  }, [searchValue, originalData]);

  return (
    <>
      <Modal
        animation={true}
        title={"Agregar Tipo de animal"}
        show={isOpenModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: createAnimalType,
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
              name="name_es"
              placeholder="Ingrese el título en español..."
              onChange={(e) =>
                setFormData({ ...formData, name_es: e.target.value })
              }
              value={formData.name_es || ""}
            />

            <CustomInput
              label="Título en inglés"
              name="name_en"
              placeholder="Ingrese el título en inglés..."
              onChange={(e) =>
                setFormData({ ...formData, name_en: e.target.value })
              }
              value={formData.name_en || ""}
            />
          </form>
        )}
      </Modal>

      <Modal
        title={"Actualizar Tipo de animal"}
        show={editModal}
        onClose={() => setEditModal(false)}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateAnimalType,
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
              name="name_es"
              placeholder="Ingrese el título en español..."
              onChange={(e) =>
                setRowData({ ...rowData, name_es: e.target.value })
              }
              value={rowData.name_es || ""}
            />

            <CustomInput
              label="Título en inglés"
              name="name_en"
              placeholder="Ingrese el título en inglés..."
              onChange={(e) =>
                setRowData({ ...rowData, name_en: e.target.value })
              }
              value={rowData.name_en || ""}
            />
          </form>
        )}
      </Modal>

      <Modal
        title={"confirmar estado de actualización"}
        show={confirmButton}
        onClose={handleConfirmCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateStatus,
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
          <h1 className="">Estás seguro de eso?</h1>
        )}
      </Modal>
      <div className="race_page">
        <FormCard header="Tipo de animal">
          <div style={{ width: isSmallScreen ? "100%" : "40.33%" }}>
            <CustomInputWithSearch
              placeholder="Buscando..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
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
