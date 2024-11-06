import React, { useEffect, useState } from "react";
import useGetHomeFeatures from "../../CustomHooks/useGetHomeFeatures";
import { Table } from "antd";
import { edit, trashIcon } from "../../assets/svgIcons";
import FormCard from "../../components/FormCard/FormCard";
import { useMediaQuery } from "../../CustomHooks/useMediaQueries";
import CustomInputWithSearch from "../../components/CustomInputWithSearch/CustomInputWithSearch";
import { FaFile, FaPlus } from "react-icons/fa";
import CustomButton from "../../components/CustomButton/CustomButton";
import Modal from "../../components/Modal/Modal";
import FromGroup from "../../components/FromGroup/FromGroup";
import { base_url } from "../../constant";
import axios from "axios";
import { uploadImage } from "../../constant/uploadImage";
import { uploadImage as uploadFile } from "./../../constant/uploadFiles";
import { toast } from "react-hot-toast";
import { Loader } from "rsuite";
import Typo from "../../utils/Typo/Typo";
import cx from "classnames";
import { ClipLoader } from "react-spinners";
import Spinner from "./../../utils/Spinner/Spinner";
const HomeFeatures = () => {
  const {
    handleGetHomeFeatures,
    loading,
    setLoading,
    homeFeatures,
    setHomeFeatures,
    originalFeatures,
    setOriginalFeatures,
  } = useGetHomeFeatures();

  const [searchValue, setSearchValue] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [rowData, setRowData] = useState({});

  const [modals, setModals] = useState({
    addModal: false,
    updateModal: false,
    statusModal: false,
  });

  const [newFeature, setNewFeature] = useState({
    title_es: "",
    title_en: "",
    description_en: "",
    description_es: "",
    icon: "",
  });

  const handleEmptyInputs = () => {
    setNewFeature({
      title_es: "",
      title_en: "",
      description_en: "",
      description_es: "",
      icon: null,
    });
  };
  useEffect(() => {
    if (
      originalFeatures &&
      originalFeatures.length > 0 &&
      Array.isArray(originalFeatures)
    ) {
      if (searchValue.length >= 1) {
        const newData = originalFeatures.filter((item) => {
          if (
            searchValue &&
            !item?.title_es
              ?.toLowerCase()
              ?.includes(searchValue?.toLowerCase()) &&
            !item?.title_en
              ?.toLowerCase()
              ?.includes(searchValue?.toLowerCase()) &&
            !item?.description_en
              ?.toLowerCase()
              ?.includes(searchValue?.toLowerCase()) &&
            !item?.description_es
              ?.toLowerCase()
              ?.includes(searchValue?.toLowerCase())
          ) {
            return false;
          }

          return true;
        });
        setHomeFeatures(newData);
      } else {
        setHomeFeatures(originalFeatures);
      }
    }
  }, [searchValue, originalFeatures]);

  const columns = [
    {
      title: "icono",
      dataIndex: "icon",
      key: "icon",
      render: (text, row) => (
        <div>
          <img width={100} src={row.icon} alt="" />
        </div>
      ),
    },
    {
      title: "Título en español",
      dataIndex: "title_es",
      key: "title_es",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Título en inglés",
      dataIndex: "title_en",
      key: "title_en",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Descripción en español",
      dataIndex: "description_es",
      key: "description_es",
      render: (text) => (
        <div title={text} className="ellipsis text-center">
          {text}
        </div>
      ),
    },
    {
      title: "Descripción en inglés",
      dataIndex: "description_en",
      key: "description_en",
      render: (text) => (
        <div title={text} className="ellipsis text-center">
          {text}
        </div>
      ),
    },

    {
      title: "Estado",
      dataIndex: "",
      key: "description_en",
      render: (text, row) => (
        <div
          className={cx("fw-bolder", {
            "text-success": row.hidden == 0,
            "text-danger": row.hidden != 0,
          })}
        >
          {row.hidden == 0 ? "Mostrado" : "Oculta"}
        </div>
      ),
    },

    {
      title: "Comportamiento",
      key: "Comportamiento",
      render: (text, row) => (
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={() => {
              setRowData(row);
              setModals({ ...modals, statusModal: true });
            }}
            className="update_status_benefit"
          >
            Actualizar
          </button>
          <button
            onClick={() => {
              setModals({ ...modals, updateModal: true });
              setRowData(row);
              console.log(row);
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
    handleGetHomeFeatures();
  }, []);

  const handleSearch = () => {};

  const handleAddFeature = async () => {
    let icon = null;

    if (!newFeature.title_en) {
      console.log("emty title");
      toast.error("Se requiere título en inglés!");
      return;
    }

    if (!newFeature.title_es) {
      toast.error("Se requiere título en español!");
      return;
    }

    if (!newFeature.description_en) {
      toast.error("Se requiere descripción en inglés");
      return;
    }

    if (!newFeature.description_es) {
      toast.error("Se requiere descripción en español");
      return;
    }

    if (!newFeature.icon) {
      toast.error("El icono es obligatorio");
      return;
    }

    console.log(newFeature?.icon);
    if (newFeature?.icon instanceof File) {
      icon = await uploadFile(newFeature?.icon);
    }

    const datasend = {
      ...newFeature,
      icon,
    };

    console.log(datasend);
    setAddLoading(true);

    await axios
      .post(`${base_url}create_feature`, datasend)
      .then((res) => {
        if (res) {
          console.log(res);
          if (res.data.status == "success") {
            toast.success(res.data.message);
            handleGetHomeFeatures();
            setModals({ ...modals, addModal: false });
            handleEmptyInputs();
          } else {
            toast.error(res.data.message);
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setAddLoading(false));
  };

  const handleUpdateFeature = async () => {
    setUpdateLoading(true);

    let image = null;
    if (rowData?.icon instanceof File) {
      image = await uploadFile(rowData?.icon);
    }

    const datasend = {
      ...rowData,
      icon: image ? image : rowData.icon,
    };

    await axios
      .post(`${base_url}update_feature/${rowData.id}`, datasend)
      .then((res) => {
        if (res) {
          console.log(res);
          if (res.data.status == "success") {
            toast.success(res.data.message);
            handleGetHomeFeatures();
            setModals({ ...modals, updateModal: false });
          } else {
            toast.error(res.data.message);
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setUpdateLoading(false));
  };

  const handleUpdateStatus = async () => {
    setStatusLoading(true);
    await axios
      .get(`${base_url}update_feature_status/${rowData.id}`)
      .then((res) => {
        if (res) {
          if (res.data.status == "success") {
            toast.success(res.data.message);
            handleGetHomeFeatures();
            setModals({ ...modals, statusModal: false });
          } else {
            toast.error(res.data.message);
          }
        }
      })
      .finally(() => {
        setStatusLoading(false);
      });
  };

  const isSmallScreen = useMediaQuery("(max-width:786px)");

  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <ClipLoader size={50} color="rgb(54, 185, 204)" loading={loading} />
    </div>
  ) : (
    <div>
      <Modal
        title="Agregar función"
        size="1000px"
        style={{ overflow: "auto" }}
        confirmButton={{
          children: addLoading ? (
            <Spinner size={20} loading={addLoading} color={"#fff"} />
          ) : (
            "GUARDAR"
          ),
          style: { backgroundColor: "#36b9cc" },
          props: { disabled: addLoading },
          onClick: () => {
            console.log("hello");
            handleAddFeature();
          },
        }}
        cancelButton={{
          children: "Cerrar",
          onClick: () => setModals({ ...modals, addModal: false }),
          style: { backgroundColor: "#858796" },
        }}
        show={modals.addModal}
        onClose={() => setModals({ ...modals, addModal: false })}
        showCloseBtn={true}
        animation={true}
      >
        {addLoading ? (
          <Spinner size={50} loading={addLoading} color={"rgb(54,185,204)"} />
        ) : (
          <FromGroup gap={"20px"} rowCount={2}>
            {/* first row */}
            <FromGroup.Input
              value={newFeature.title_en}
              onChange={(e) =>
                setNewFeature({ ...newFeature, title_en: e.target.value })
              }
              required={true}
              placeholder={"Título del artículo en inglés"}
              label={"Título del artículo en inglés"}
            />
            <FromGroup.Input
              value={newFeature.title_es}
              onChange={(e) =>
                setNewFeature({ ...newFeature, title_es: e.target.value })
              }
              required={true}
              placeholder={"Título del artículo en español"}
              label={"Título del artículo en español"}
            />
            <FromGroup.Input
              value={newFeature.description_en}
              onChange={(e) =>
                setNewFeature({ ...newFeature, description_en: e.target.value })
              }
              required={true}
              type="text"
              placeholder={"Descripción de funciones en inglés"}
              label={"Descripción de funciones en inglés"}
            />
            <FromGroup.Input
              value={newFeature.description_es}
              onChange={(e) =>
                setNewFeature({ ...newFeature, description_es: e.target.value })
              }
              required={true}
              placeholder={"Descripción de funciones en español"}
              label={"Descripción de funciones en español"}
            />
            {newFeature?.icon ? (
              <div>
                <div>
                  <img
                    src={URL.createObjectURL(newFeature.icon)}
                    alt=""
                    style={{ width: "150px" }}
                  />
                </div>
                <div
                  className="btn btn-danger my-2"
                  onClick={() => setNewFeature({ ...newFeature, icon: null })}
                >
                  Eliminar
                </div>
              </div>
            ) : (
              <FromGroup.Input
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setNewFeature({ ...newFeature, icon: e.target.files[0] });
                }}
                required={true}
                type="file"
                placeholder={"Icono de función"}
                label={"Icono de función"}
              />
            )}
          </FromGroup>
        )}
      </Modal>
      <Modal
        title="Función de actualización"
        size="1000px"
        style={{ overflow: "auto" }}
        confirmButton={{
          children: updateLoading ? (
            <Spinner size={20} loading={updateLoading} color={"#fff"} />
          ) : (
            "GUARDAR"
          ),
          style: { backgroundColor: "#36b9cc" },
          props: { disabled: addLoading },
          onClick: () => {
            handleUpdateFeature();
          },
        }}
        cancelButton={{
          children: "Cerrar",
          onClick: () => setModals({ ...modals, updateModal: false }),
          style: { backgroundColor: "#858796" },
        }}
        show={modals.updateModal}
        onClose={() => setModals({ ...modals, updateModal: false })}
        showCloseBtn={true}
        animation={true}
      >
        {updateLoading ? (
          <Spinner
            size={50}
            loading={updateLoading}
            color={"rgb(54,185,204)"}
          />
        ) : (
          <FromGroup gap={"20px"} rowCount={2}>
            {/* first row */}
            <FromGroup.Input
              value={rowData.title_en}
              onChange={(e) =>
                setRowData({ ...rowData, title_en: e.target.value })
              }
              required={true}
              placeholder={"Título del artículo en inglés"}
              label={"Título del artículo en inglés"}
            />
            <FromGroup.Input
              value={rowData.title_es}
              onChange={(e) =>
                setRowData({ ...rowData, title_es: e.target.value })
              }
              required={true}
              placeholder={"Título del artículo en español"}
              label={"Título del artículo en español"}
            />
            <FromGroup.Input
              value={rowData.description_en}
              onChange={(e) =>
                setRowData({ ...rowData, description_en: e.target.value })
              }
              required={true}
              type="text"
              placeholder={"Descripción de funciones en inglés"}
              label={"Descripción de funciones en inglés"}
            />
            <FromGroup.Input
              value={rowData.description_es}
              onChange={(e) =>
                setRowData({ ...rowData, description_es: e.target.value })
              }
              required={true}
              placeholder={"Descripción de funciones en español"}
              label={"Descripción de funciones en español"}
            />

            {rowData?.icon ? (
              <div>
                <div>
                  <img
                    src={
                      rowData?.icon instanceof File
                        ? URL.createObjectURL(rowData?.icon)
                        : rowData?.icon
                    }
                    alt="Icon"
                    style={{ width: "150px" }}
                  />
                </div>
                <div
                  className="btn btn-danger my-2"
                  onClick={() => setRowData({ ...rowData, icon: null })}
                >
                  Eliminar
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="icon">Icono de función</label>
                <input
                  id="icon"
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setRowData({ ...rowData, icon: e.target.files[0] });
                  }}
                  required
                />
              </div>
            )}
          </FromGroup>
        )}
      </Modal>

      <Modal
        title="estado de actualización"
        size="1000px"
        style={{ overflow: "auto" }}
        confirmButton={{
          children: statusLoading ? (
            <Spinner size={20} loading={statusLoading} color={"#fff"} />
          ) : (
            "GUARDAR"
          ),
          style: { backgroundColor: "#36b9cc" },
          props: { disabled: statusLoading },
          onClick: () => {
            console.log("hello");
            handleUpdateStatus();
          },
        }}
        cancelButton={{
          children: "Cerrar",
          onClick: () => setModals({ ...modals, statusModal: false }),
          style: { backgroundColor: "#858796" },
        }}
        show={modals.statusModal}
        onClose={() => setModals({ ...modals, statusModal: false })}
        showCloseBtn={true}
        animation={true}
      >
        {statusLoading ? (
          <Spinner
            size={50}
            loading={statusLoading}
            color={"rgb(54,185,204)"}
          />
        ) : (
          <Typo variant={"h3"} my={"20px"}>
            ¿Realmente quieres cambiar de estado?
          </Typo>
        )}
      </Modal>

      <FormCard
        drawer={true}
        header={"Características en la página de inicio"}
        children={
          <>
            <form onSubmit={handleSearch}>
              <div style={{ width: isSmallScreen ? "100%" : "40.33%" }}>
                <CustomInputWithSearch
                  placeholder="Ingrese..."
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  value={searchValue}
                />
              </div>

              <div className="mt-3">
                <CustomButton
                  onClick={() => setModals({ ...modals, addModal: true })}
                  icon={<FaPlus />}
                  text={"AGREGAR"}
                  bgColor={"#3574d1"}
                />
              </div>
            </form>
          </>
        }
      />

      <div className="search_table_container">
        <Table
          className="custom-header"
          columns={columns}
          dataSource={homeFeatures}
        />
      </div>
    </div>
  );
};

export default HomeFeatures;
