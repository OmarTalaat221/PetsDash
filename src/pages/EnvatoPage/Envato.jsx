import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { edit, fileIcon } from "../../assets/svgIcons";
import "./style.css";
import FormCard from "./../../components/FormCard/FormCard";
import CustomSelect from "./../../components/CustomSelect/CustomSelect";
import { Alert, Form, InputGroup } from "react-bootstrap";
import Modal from "../../components/Modal/Modal";
import FromGroup from "../../components/FromGroup/FromGroup";
import Select from "react-select";
import Jodit from "./../../utils/jodit/Jodit";
import useGetAllAnimals from "../../CustomHooks/useGetAllAnimals";
import { Table, Tag } from "antd";
import axios from "axios";
import { base_url } from "../../constant";
import toast from "react-hot-toast";
import useGetAllEvents from "../../CustomHooks/useGetAllEvents";
import Spinner from "../../utils/Spinner/Spinner";

const Envato = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [addNewModal, setAddNewModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [rowAnimals, setRowAnimals] = useState([]);
  const [addLoading, setAddloading] = useState(false);

  const yesNoOptions = [
    {
      label: "Si",
      value: 1,
    },
    {
      label: "No",
      value: 0,
    },
  ];

  const {
    handleGetEvents,
    events,
    setEvents,
    loading: eventsLoading,
    originalEvents,
    setOriginalEvents,
  } = useGetAllEvents();

  const {
    loading,
    allAnimals,
    getAllAnimals,
    originalData,
    setOriginalData,
    setLoading,
  } = useGetAllAnimals();

  useEffect(() => {
    getAllAnimals();
    handleGetEvents();
  }, []);

  const [newEvent, setNewEvent] = useState({
    title: "",
    details: "",
    address: "",
    time: "",
    animals: "",
  });

  const handleEmptyData = (e) => {
    setNewEvent({ title: "", details: "", address: "", time: "", animals: "" });
  };

  const columns = [
    {
      title: "título",
      dataIndex: "title",
      key: "title",
      render: (text, row) => (
        <div className="text-center" color="green">
          {row.title}
        </div>
      ),
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
      render: (text, row) => (
        <div className="text-center" color="green">
          {row.address}
        </div>
      ),
    },

    {
      title: "Más detalles",
      dataIndex: "address",
      key: "address",
      render: (text, row) => (
        <div className="d-flex justify-content-center">
          <button
            onClick={() => {
              setShowDetailsModal(true);
              setRowData(row);
            }}
            className="btn btn-info btn-sm text-light"
          >
            Más detalles...
          </button>
        </div>
      ),
    },

    {
      title: "Actualizar datos",
      dataIndex: "address",
      key: "address",
      render: (text, row) => (
        <div className="d-flex justify-content-center">
          <button
            onClick={() => {
              setUpdateModal(true);
              setRowData(row);
              setRowAnimals(
                row?.env_animals?.map((item) => ({
                  value: item.id,
                  label: `${item?.animal?.f_name} ${item?.animal?.l_name}`,
                }))
              );
            }}
            className="btn btn-primary btn-sm"
          >
            {edit}
          </button>
        </div>
      ),
    },
  ];

  const handAddEvent = async () => {
    if (!newEvent.animals || newEvent.animals.length < 1) {
      toast.error("¡Se requieren mascotas!");
      return;
    }

    if (!newEvent.title) {
      toast.error("Se requiere título!");
      return;
    }

    if (!newEvent.address) {
      toast.error("¡Se requiere dirección!");
      return;
    }

    if (!newEvent.time) {
      toast.error("¡Se requiere tiempo!");
      return;
    }

    if (!newEvent.details) {
      toast.error("¡Se requieren detalles!");
      return;
    }

    const concatPets = newEvent.animals.map((an) => an.value).join("**");
    const dataset = {
      ...newEvent,
      animals: concatPets,
    };
    console.log(dataset);

    setAddloading(true);

    await axios
      .post(`${base_url}envatos/add_new_envato`, dataset)
      .then((res) => {
        if (res) {
          console.log(res);
          if (res.data.status == "success") {
            toast.success(res.data.message);
            setAddNewModal(false);
            handleEmptyData();
            handleGetEvents();
          } else {
            toast.error(res.data.message);
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setAddloading(false);
      });
  };

  const handleUpdateData = async () => {
    if (!rowAnimals || rowAnimals?.length < 1) {
      toast.error("¡Se requieren mascotas!");
      return;
    }

    if (!rowData?.title) {
      toast.error("Se requiere título!");
      return;
    }

    if (!rowData?.address) {
      toast.error("¡Se requiere dirección!");
      return;
    }

    if (!rowData?.time) {
      toast.error("¡Se requiere tiempo!");
      return;
    }

    if (!rowData?.details) {
      toast.error("¡Se requieren detalles!");
      return;
    }

    const concatPets = rowAnimals.map((an) => an.value).join("**");
    const dataset = {
      ...rowData,
      animals: concatPets,
    };

    console.log(dataset);

    setAddloading(true);

    await axios
      .post(`${base_url}envatos/update_envato/${rowData?.id}`, dataset)
      .then((res) => {
        if (res) {
          console.log(res);
          if (res.data.status == "success") {
            toast.success(res.data.message);
            setUpdateModal(false);
            handleGetEvents();
          } else {
            toast.error(res.data.message);
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setUpdateLoading(false);
        setAddloading(false);
      });
  };

  return (
    <div className="Envato_contaienr">
      {!events ||
        (events.length < 1 && (
          <div className="evento_alert">
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <Alert.Heading>No se encontraron registros.</Alert.Heading>
            </Alert>
          </div>
        ))}

      <FormCard
        header={"Evento de Mascota"}
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
                icon={fileIcon}
                bgColor={"#858796"}
                text={"Nuevo"}
              />
            </div>
          </>
        }
      />

      {loading ? (
        <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
      ) : (
        <div className="search_table_container">
          <Table
            className="custom-header"
            columns={columns}
            dataSource={events}
          />
        </div>
      )}

      {/* Moda */}

      <Modal
        size={"90%"}
        show={updateModal}
        showCloseBtn
        title={"Actualizar evento"}
        onClose={() => setUpdateModal(false)}
        confirmButton={{
          children: addLoading ? (
            <Spinner size={20} color="#fff" loading={addLoading} />
          ) : (
            "Actualizar"
          ),
          props: {
            className: "btn btn-info text-light",
            disabled: updateLoading,
          },
          onClick: handleUpdateData,
        }}
        cancelButton={{
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
          onClick: () => setUpdateModal(false),
        }}
        children={
          addLoading ? (
            <Spinner size={50} color="rgb(54, 185, 204)" loading={addLoading} />
          ) : (
            <>
              <div className="dom_third_grid d-flex flex-column gap-4">
                <div className="input_group">
                  <label>
                    Elige entre mascotas<span> (*)</span>
                  </label>
                  <Select
                    placeholder={"Seleccionar..."}
                    value={rowAnimals}
                    isMulti
                    onChange={(e) => {
                      console.log(e);
                      setRowAnimals(e);
                    }}
                    options={allAnimals.map((animal) => ({
                      value: animal.id,
                      label: `${animal.f_name} ${animal.l_name}`,
                    }))}
                  />
                </div>
                <div className="input_group  ">
                  <CustomInput
                    label="Título del evento"
                    required
                    value={rowData?.title}
                    placeholder="Título del evento"
                    onChange={(e) =>
                      setRowData({ ...rowData, title: e.target.value })
                    }
                  />
                </div>
                <div className="input_group">
                  <CustomInput
                    label="Dirección del evento"
                    required
                    value={rowData?.address}
                    placeholder="Dirección del evento"
                    onChange={(e) =>
                      setRowData({ ...rowData, address: e.target.value })
                    }
                  />
                </div>
                <div className="input_group  ">
                  <CustomInput
                    label="Hora del evento"
                    type={"date"}
                    required
                    value={rowData?.time}
                    placeholder="Hora del evento"
                    onChange={(e) =>
                      setRowData({ ...rowData, time: e.target.value })
                    }
                  />
                </div>
                <div className="input_group my-3">
                  <label>
                    Detalles del evento<span> (*)</span>
                  </label>
                  <Jodit
                    onChange={(e) => setRowData({ ...rowData, details: e })}
                    content={rowData?.details}
                  />
                </div>
              </div>
            </>
          )
        }
      />
      <Modal
        size={"90%"}
        show={showDetailsModal}
        showCloseBtn
        title={"Más detalles..."}
        onClose={() => setShowDetailsModal(false)}
        cancelButton={{
          children: "Cerrar",
          onClick: () => setShowDetailsModal(false),
          style: { backgroundColor: "#858796" },
        }}
        children={
          <>
            <div className="dom_third_grid d-flex flex-column gap-4">
              <div className="input_group mt-3">
                <label>
                  Mascotas seleccionadas<span></span>
                </label>

                <ol>
                  {rowData &&
                    rowData?.env_animals?.map((item) => {
                      return (
                        <li className="my-2 fw-semibold" key={item.id}>
                          {item?.animal?.f_name} {item?.animal?.l_name}
                        </li>
                      );
                    })}
                </ol>

                {/* here type selected pits */}
              </div>

              <div className="input_group mt-3">
                <label>
                  Detalles del evento<span></span>
                </label>
                {rowData && rowData?.details && (
                  <div dangerouslySetInnerHTML={{ __html: rowData?.details }} />
                )}
              </div>
            </div>
          </>
        }
      />

      <Modal
        size={"90%"}
        show={addNewModal}
        showCloseBtn
        title={"Registrar Evento"}
        onClose={() => setAddNewModal(false)}
        confirmButton={{
          children: addLoading ? (
            <Spinner size={20} color="#fff" loading={addLoading} />
          ) : (
            "Agregar"
          ),
          style: { backgroundColor: "#36b9cc" },
          onClick: () => {
            handAddEvent();
          },
          props: {
            disable: loading,
          },
        }}
        cancelButton={{
          children: "Cerrar",
          onClick: () => setAddNewModal(false),
          style: { backgroundColor: "#858796" },
        }}
        children={
          addLoading ? (
            <Spinner size={50} color="rgb(54, 185, 204)" loading={addLoading} />
          ) : (
            <>
              <div className="dom_third_grid d-flex flex-column gap-4">
                <div className="input_group">
                  <label>
                    Elige entre mascotas<span> (*)</span>
                  </label>
                  <Select
                    placeholder={"Seleccionar..."}
                    value={newEvent.animals}
                    isMulti
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, animals: e });
                    }}
                    options={allAnimals.map((animal) => ({
                      value: animal.id,
                      label: `${animal.f_name} ${animal.l_name}`,
                    }))}
                  />
                </div>
                <div className="input_group  ">
                  <CustomInput
                    label="Título del evento"
                    required
                    value={newEvent.title}
                    placeholder="Título del evento"
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                  />
                </div>
                <div className="input_group  ">
                  <CustomInput
                    label="Dirección del evento"
                    required
                    value={newEvent.address}
                    placeholder="Dirección del evento"
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, address: e.target.value })
                    }
                  />
                </div>
                <div className="input_group  ">
                  <CustomInput
                    label="Hora del evento"
                    type={"date"}
                    required
                    value={newEvent.time}
                    placeholder="Hora del evento"
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, time: e.target.value })
                    }
                  />
                </div>
                <div className="input_group my-3">
                  <label>
                    Detalles del evento<span> (*)</span>
                  </label>
                  <Jodit
                    onChange={(e) => setNewEvent({ ...newEvent, details: e })}
                    content={newEvent?.details}
                  />
                </div>
              </div>
            </>
          )
        }
      />
    </div>
  );
};

export default Envato;
