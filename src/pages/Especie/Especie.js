import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import { FaFile, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { base_url } from "../../constant";
import axios from "axios";

import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import useGetAllEspecie from "../../CustomHooks/useGetAllEspecie";
import { Table } from "antd";
import cx from "classnames";
import Spinner from "../../utils/Spinner/Spinner";
import { useMediaQuery } from "../../CustomHooks/useMediaQueries";
import CustomInputWithSearch from "../../components/CustomInputWithSearch/CustomInputWithSearch";
import { edit } from "../../assets/svgIcons";

export default function Especie() {
  const [showModeal, setShowModal] = useState({
    editModal: false,
    updatedStatus: false,
    openModal: false,
    deleteModal: false,
  });

  const isSmallScreen = useMediaQuery("(max-width:786px)");

  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [especeiData, setEspeceiData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [filterValues, setFilterValues] = useState({
    especieEnValue: "",
    especieEsValue: "",
  });
  const [language, setLanguage] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [createdValue, setCreatedValue] = useState({
    especieEnValue: "",
    especieEsValue: "",
  });

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  function handleOpenModal() {
    setShowModal({ ...showModeal, openModal: true });
  }
  const handleOpenEidtModal = () => {
    setShowModal({ ...showModeal, editModal: true });
  };
  function handleCloseModal() {
    setShowModal({
      ...showModeal,
      openModal: false,
      updatedStatus: false,
      editModal: false,
      deleteModal: false,
    });
    setCreatedValue({
      ...createdValue,
      especieEnValue: "",
      especieEsValue: "",
    });
  }

  function handleSubmitRaceForm(e) {
    if (createdValue.especieEsValue == "") {
      toast.error("Por favor, introduzca la especie en español");
      return;
    }
    if (createdValue.especieEnValue == "") {
      toast.error("Por favor, introduzca la especie en inglés");
      return;
    }
    e.preventDefault();
    createDataEspecie();
    setCreatedValue({
      ...createdValue,
      especieEnValue: "",
      especieEsValue: "",
    });
    // setShowModal({ ...showModeal, openModal: false });
  }

  // function to get all data and show it

  const {
    handleGetAllEspecie,
    especie,
    setEspecie,
    originalEspecie,
    setOriginalEspecie,
    loading: gettingLoading,
  } = useGetAllEspecie();

  console.log(especie);

  const columns = [
    {
      title: "Especie Titulo en español",
      dataIndex: "title_es",
      key: "title_es",
      render: (text, row) => {
        return <div className={"text-center"}>{row.title_es}</div>;
      },
    },
    {
      title: "Especie Titulo en ingles",
      dataIndex: "title_en",
      key: "title_en",
      render: (text, row) => {
        return <div className={"text-center"}>{row.title_en}</div>;
      },
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
      dataIndex: "",
      key: "",
      render: (text, row) => (
        <div className="justify-content-center d-flex align-items-center gap-2">
          <button
            onClick={() => {
              handleOpenEidtModal(true);
              setRowData(row);
            }}
            disabled={isDisabled}
            className="btn-sm btn btn-primary fs-6 text-white"
          >
            {edit}
          </button>
          <button
            className="update_status_benefit"
            onClick={() => {
              // to open the confirm form
              setRowData(row);
              setShowModal({ ...showModeal, updatedStatus: true });
            }}
          >
            Actualizar
          </button>
          <button
            onClick={() => {
              setRowData(row);
              setShowModal({ ...showModeal, deleteModal: true });
            }}
            disabled={isDisabled}
            className=" btn-sm btn btn-danger fs-6 text-white"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  // const get_all_data = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(base_url + "get_all_raza_for_admin");

  //     if (res.status === 200 && Array.isArray(res.data.Raza)) {
  //       setData(res.data.Raza);
  //       setFilteredData(res.data.Raza);
  //       console.log("Data length:", res.data.Raza.length);
  //     } else {
  //       console.warn("Unexpected response format or no data found.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message || error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [espFormSelection, setEspFormSelection] = useState([]);
  let task = [];

  // to set esp form selection
  const espFormData = espFormSelection.map((item) => {
    let textContent;
    if (language === "en") {
      textContent = item.title_en;
    } else {
      textContent = item.title_es;
    }
    return <option>{textContent}</option>;
  });

  // to get all option in especeiData
  const get_all_EspeceiData = () => {
    // console.log("get_all_especie_for_admin");
    axios
      .get(base_url + "get_all_especie_for_admin")
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          setEspeceiData(res.data);
          // console.log(especeiData);
        }
      })
      .catch((error) => console.log(error));
  };

  // created data values
  const createdData = {
    especie_id: 2,
    title_en: createdValue.especieEnValue,
    title_es: createdValue.especieEsValue,
  };

  // to create data into raza
  const createDataEspecie = async () => {
    if (createdValue.especieEsValue == "") {
      toast.error("Por favor, introduzca la especie en español");
      return;
    }
    if (createdValue.especieEnValue == "") {
      toast.error("Por favor, introduzca la especie en inglés");
      return;
    }
    console.log(createdData);
    setLoading(true);
    setIsDisabled(true);

    try {
      const res = await axios.post(base_url + "create_especie", createdData);
      if (res.status === 200) {
        toast.success(res.data.message);
        handleGetAllEspecie();
        handleCloseModal();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
      setIsDisabled(false);
    }
  };
  // to edit the data
  const updatedData = {
    especie_id: rowData.especie_id,
    title_en: rowData.title_en,
    title_es: rowData.title_es,
  };
  const handleEspecieEditBtn = async () => {
    if (rowData.title_es == "") {
      toast.error("Por favor, introduzca la especie en español");
      return;
    }
    if (rowData.title_en == "") {
      toast.error("Por favor, introduzca la especie en inglés");
      return;
    }
    setLoading(true);
    setIsDisabled(true);

    try {
      const res = await axios.post(
        `${base_url}update_especie/${rowData.id}`,
        updatedData
      );
      toast.success(res.data.message);
      handleGetAllEspecie();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
      setIsDisabled(false);
    }
  };

  const handleEspecieDeleteBtn = (id) => {
    setIsDisabled(true);
    setLoading(true);

    axios
      .post(base_url + `delete_especie/${rowData.id}`)
      .then((res) => {
        toast.success(res.data.message);
        handleGetAllEspecie();
        handleCloseModal();
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
        setShowModal({ ...showModeal, deleteModal: false });
      })
      .finally(() => {
        setLoading(false);
        setIsDisabled(false);
      });
  };

  //to update the status
  const handleDepartUpdateBtn = () => {
    setIsDisabled(true);
    setLoading(true);

    axios
      .get(base_url + `update_especie_status/${rowData.id}`)
      .then((res) => {
        toast.success(res.data.message);
        setShowModal({ ...showModeal, updatedStatus: false });
        handleGetAllEspecie();
        handleCloseModal();
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setIsDisabled(false);
      });
  };

  // handle search
  useEffect(() => {
    if (
      filterValues.especieEnValue !== "" ||
      filterValues.especieEsValue !== ""
    ) {
      let newData = [];
      newData = data.filter(
        (obj) =>
          obj.title_en
            .toLowerCase()
            .includes(filterValues.especieEnValue.toLocaleLowerCase()) ||
          obj.title_es
            .toLocaleLowerCase()
            .includes(filterValues.especieEsValue.toLocaleLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }, [filterValues.especieEnValue, filterValues.especieEsValue, data]);

  useEffect(() => {
    handleGetAllEspecie();
  }, []);

  useEffect(() => {
    if (
      originalEspecie &&
      originalEspecie.length > 0 &&
      Array.isArray(originalEspecie)
    ) {
      if (searchValue.length >= 1) {
        const newData = originalEspecie.filter((item) => {
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
        setEspecie(newData);
      } else {
        setEspecie(originalEspecie);
      }
    }
  }, [searchValue, originalEspecie]);

  return (
    <>
      {/* create modal  */}
      <Modal
        title="Registrar   Especie"
        show={showModeal.openModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: handleSubmitRaceForm,
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
          ) : (
            "Guardar"
          ),
          style: { backgroundColor: "#36b9cc" },
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
        ) : (
          <form className="modal_form">
            <CustomInput
              required={true}
              label="Especie Español"
              placeholder="Introduzca la especie española..."
              onChange={(e) =>
                setCreatedValue({
                  ...createdValue,
                  especieEsValue: e.target.value,
                })
              }
              value={createdValue.especieEsValue}
            />
            <CustomInput
              required={true}
              label="Especie inglés"
              placeholder="Introduzca especie en inglés..."
              onChange={(e) =>
                setCreatedValue({
                  ...createdValue,
                  especieEnValue: e.target.value,
                })
              }
              value={createdValue.especieEnValue}
            />
          </form>
        )}
      </Modal>

      {/* update status modal */}
      <Modal
        title="Estado de actualización"
        show={showModeal?.updatedStatus}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: () => handleDepartUpdateBtn(),
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
          ) : (
            "Guardar"
          ),
          style: { backgroundColor: "#36b9cc" },
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
        ) : (
          <h3 className="my-3">
            {rowData.hidden == 1
              ? "¿Estás segura de que quieres mostrar este artículo?"
              : "¿Estás seguro de que deseas ocultar este artículo?"}
          </h3>
        )}
      </Modal>

      <Modal
        title={"Actualizar Especie"}
        show={showModeal.editModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: (e) => handleEspecieEditBtn(e),
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
          ) : (
            "Guardar"
          ),
          style: { backgroundColor: "#36b9cc" },
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
        ) : (
          <form className="modal_form">
            <CustomInput
              required={true}
              label={"Especie Español"}
              placeholder="Introduzca la especie española..."
              onChange={(e) =>
                setRowData({ ...rowData, title_es: e.target.value })
              }
              value={rowData.title_es}
            />
            <CustomInput
              required={true}
              label={"Especie inglés"}
              placeholder="Introduzca especie en inglés..."
              onChange={(e) =>
                setRowData({ ...rowData, title_en: e.target.value })
              }
              value={rowData.title_en}
            />
          </form>
        )}
      </Modal>

      <Modal
        title={"Confirmación de eliminación..."}
        show={showModeal.deleteModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: () => handleEspecieDeleteBtn(),
          props: { className: "btn btn-danger" },
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
          ) : (
            "Borrar"
          ),
        }}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
        ) : (
          <h3 className="my-3">
            ¿Estás seguro de que deseas eliminar este artículo?
          </h3>
        )}
      </Modal>
      <div className="race_page">
        <FormCard header="Especies">
          <div style={{ width: isSmallScreen ? "100%" : "40.33%" }}>
            <CustomInput
              placeholder="Buscando..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>

          <div className="mt-4 d-flex align-items-center gap-4">
            <CustomButton
              textColor="#333"
              onClick={handleOpenModal}
              text="Nuevo"
              icon={<FaFile />}
              color={"#222"}
              bgColor="#fff"
            />
          </div>
        </FormCard>
      </div>
      {gettingLoading ? (
        <Spinner size={50} color="rgb(54, 185, 204)" loading={gettingLoading} />
      ) : (
        <div className="search_table_container">
          <Table
            className="custom-header"
            columns={columns}
            dataSource={especie}
          />
        </div>
      )}
    </>
  );
}
