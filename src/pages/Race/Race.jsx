import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import "./style.css";
import { FaFile, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { base_url } from "../../constant";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import useGetAllRaza from "../../CustomHooks/useGetAllRaza";
import { Table } from "antd";
import cx from "classnames";
import Spinner from "../../utils/Spinner/Spinner";
import { useMediaQuery } from "../../CustomHooks/useMediaQueries";
import CustomInputWithSearch from "../../components/CustomInputWithSearch/CustomInputWithSearch";
import { edit } from "../../assets/svgIcons";
import Select from "react-select";
import toast from "react-hot-toast";

export default function Race() {
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
  const [selectValue, setSelectValue] = useState("");
  const [petsDashUser, setPetsDashUser] = useState(() => {
    const storedPetsDashUser = localStorage.getItem("petsDashUser");
    return storedPetsDashUser ? JSON.parse(storedPetsDashUser) : null;
  });

  const [filterValues, setFilterValues] = useState({
    title_en: "",
    title_es: "",
  });
  const [language, setLanguage] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [createdValue, setCreatedValue] = useState({
    title_en: "",
    title_es: "",
    especie_id: "",
  });
  const [especieId, setEspeceId] = useState();

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
    setCreatedValue({ ...createdValue, title_en: "", title_es: "" });
    setEspeceId();
  }

  function handleSubmitRaceForm(e) {
    e.preventDefault();
    createDataRaza();
    // setCreatedValue({
    //   ...createdValue,
    //   title_en: "",
    //   title_es: "",
    //   especie_id: "",
    // });
    // setShowModal({ ...showModeal, openModal: false });
  }

  // function to get all data and show it

  const {
    handleGetAllRaza,
    raza,
    setRaza,
    originalRaza,
    setOriginalRaza,
    loading: gettingLoading,
  } = useGetAllRaza();

  const columns = [
    {
      title: "Titulo en español",
      dataIndex: "title_es",
      key: "title_es",
      render: (text, row) => {
        return <div className={"text-center"}>{row.title_es}</div>;
      },
    },
    {
      title: "Titulo en ingles",
      dataIndex: "title_en",
      key: "title_en",
      render: (text, row) => {
        return <div className={"text-center"}>{row.title_en}</div>;
      },
    },

    petsDashUser?.type != "admin"
      ? null
      : {
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

    petsDashUser?.type != "admin"
      ? null
      : {
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
  ]?.filter(Boolean);

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);

  const [espFormSelection, setEspFormSelection] = useState([]);

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
    console.log("start");
    axios
      .get(`${base_url}get_all_especie_for_admin`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setEspeceiData(res.data);
        }
      })
      .catch((error) => console.log(error));
  };

  // created data values
  const createdData = {
    especie_id: createdValue.especie_id.value,
    title_en: createdValue.title_en,
    title_es: createdValue.title_es,
  };

  // to post data into raza
  const createDataRaza = async () => {
    console.log(createdData);

    if (!createdData.title_es) {
      toast.error("Por favor ingrese a la raza española");
      return;
    }
    if (!createdData.title_en) {
      toast.error("Por favor ingrese la raza inglesa");
      return;
    }
    if (!createdData.especie_id) {
      toast.error("Por favor ingrese Especie");
      return;
    }

    setLoading(true);
    setIsDisabled(true);
    try {
      const res = await axios.post(base_url + "create_raza", createdData);
      if (res.status === 200) {
        toast.success(res.data.message);
        handleGetAllRaza();
        handleCloseModal();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
      setIsDisabled(false);
      setCreatedValue({
        ...createdValue,
        title_en: "",
        title_es: "",
        especie_id: "",
      });
    }
  };

  // to edit the data
  const updatedData = {
    especie_id: rowData.especie_id,
    title_en: rowData.title_en,
    title_es: rowData.title_es,
  };
  const handleRazaEditBtn = async () => {
    if (rowData.title_es == "") {
      toast.error("Por favor ingrese a la raza española");
      return;
    }
    if (rowData.title_en == "") {
      toast.error("Por favor ingrese la raza inglesa");
      return;
    }
    if (rowData.especie_id == "") {
      toast.error("Por favor ingrese Especie");
      return;
    }

    setLoading(true);
    setIsDisabled(true);

    try {
      const res = await axios.post(
        `${base_url}update_raza/${rowData.id}`,
        updatedData
      );
      toast.success(res.data.message);
      handleGetAllRaza();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
      setIsDisabled(false);
    }
  };

  // to delete the data
  const handleRazaDeleteBtn = (id) => {
    setIsDisabled(true);
    setLoading(true);

    axios
      .post(base_url + `delete_raza/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        handleGetAllRaza();
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

  //to update the status
  const handleDepartUpdateBtn = () => {
    setIsDisabled(true);
    setLoading(true);

    axios
      .get(base_url + `update_raza_status/${rowData.id}`)
      .then((res) => {
        toast.success(res.data.message);
        setShowModal({ ...showModeal, updatedStatus: false });
        handleGetAllRaza();
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

  useEffect(() => {
    if (filterValues.title_en !== "" || filterValues.title_es !== "") {
      let newData = [];
      newData = data.filter(
        (obj) =>
          obj.title_en
            .toLowerCase()
            .includes(filterValues.title_en.toLowerCase()) ||
          obj.title_es
            .toLocaleLowerCase()
            .includes(filterValues.title_es.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }, [filterValues.title_en, filterValues.title_es, data]);

  useEffect(() => {
    handleGetAllRaza();
    get_all_EspeceiData();
  }, []);

  useEffect(() => {
    if (
      originalRaza &&
      originalRaza.length > 0 &&
      Array.isArray(originalRaza)
    ) {
      if (searchValue.length >= 1) {
        const newData = originalRaza.filter((item) => {
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
        setRaza(newData);
      } else {
        setRaza(originalRaza);
      }
    }
  }, [searchValue, originalRaza]);

  return (
    <>
      {/* create modal  */}
      <Modal
        title="Registrar   Raza"
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
              label="Raza Español"
              placeholder="Escriba el nombre de la raza..."
              onChange={(e) =>
                setCreatedValue({
                  ...createdValue,
                  title_es: e.target.value,
                })
              }
              value={createdValue.title_es}
            />
            <CustomInput
              required={true}
              label="Raza inglés"
              placeholder="Escriba el nombre de la raza..."
              onChange={(e) =>
                setCreatedValue({
                  ...createdValue,
                  title_en: e.target.value,
                })
              }
              value={createdValue.title_en}
            />
            <div className="input_group">
              <label>
                Especie <span className="text-danger"> (*)</span>
              </label>
              <Select
                placeholder={"Seleccionar..."}
                value={createdValue.especie_id}
                onChange={(e) => {
                  console.log(e);
                  setSelectValue(e.label);
                  setCreatedValue({ ...createdValue, especie_id: e });
                }}
                options={especeiData?.map((item) => ({
                  label: item?.title_es,
                  value: item?.id,
                }))}
              />
            </div>
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

      {/*edit modal */}
      <Modal
        title={"Actualizar Raza"}
        show={showModeal.editModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: (e) => handleRazaEditBtn(e),
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
          ) : (
            "Actualizar"
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
              label={"Raza Español"}
              required={true}
              placeholder="Escriba el nombre de la departamento..."
              onChange={(e) =>
                setRowData({ ...rowData, title_es: e.target.value })
              }
              value={rowData.title_es}
            />
            <CustomInput
              required={true}
              label={"Raza inglés"}
              placeholder="Escriba el nombre de la departamento..."
              onChange={(e) =>
                setRowData({ ...rowData, title_en: e.target.value })
              }
              value={rowData.title_en}
            />

            <div className="input_group">
              <label>
                Especie <span className="text-danger"> (*)</span>
              </label>
              <Select
                placeholder={"Seleccionar..."}
                value={
                  especeiData
                    ?.filter((e) => e?.id === rowData?.especie_id)
                    ?.map((e) => ({
                      label: e?.title_es,
                      value: e?.id,
                    }))[0] || null
                }
                onChange={(e) => {
                  console.log(e);
                  setSelectValue(e.label);
                  setRowData({ ...rowData, especie_id: e.value });
                }}
                options={especeiData?.map((item) => ({
                  label: item?.title_es,
                  value: item?.id,
                }))}
              />

              {/* <Select
                value={
                  especeiData
                    ?.filter((e) => e.id === rowData?.especie_id)
                    ?.map((e) => ({
                      label: e.title_es,
                      value: e.id,
                    }))[0] || null
                }
              /> */}
            </div>
          </form>
        )}
      </Modal>

      {/* delete modal   */}
      <Modal
        title={"Confirmación de eliminación..."}
        show={showModeal.deleteModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: (e) => handleRazaDeleteBtn(rowData.id),
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
        <FormCard header="Especies y Razas">
          <div style={{ width: isSmallScreen ? "100%" : "40.33%" }}>
            <CustomInputWithSearch
              placeholder="Buscando..."
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>

          <div className="mt-4 d-flex align-items-center gap-4">
            {petsDashUser?.type == "admin" && (
              <CustomButton
                textColor="#333"
                onClick={handleOpenModal}
                text="Nuevo"
                icon={<FaFile />}
                color={"#222"}
                bgColor="#fff"
              />
            )}
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
            dataSource={raza}
          />
        </div>
      )}
    </>
  );
}
