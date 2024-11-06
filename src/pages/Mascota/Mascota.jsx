import "./style.css";
import { FaCheckCircle, FaUserPlus } from "react-icons/fa";
import { FaCircleXmark, FaFile, FaTrash } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import Modal from "../../components/Modal/Modal";
import Alert from "../../components/Alert/Alert";
import CustomInputWithSearch from "../../components/CustomInputWithSearch/CustomInputWithSearch";
import FormCard from "../../components/FormCard/FormCard";
import CustomButton from "./../../components/CustomButton/CustomButton";
import Datos from "../../components/PetsModalComponents/Datos/Datos";
import Domicilio from "../../components/PetsModalComponents/Domicilio/Domicilio";
import Salud from "../../components/PetsModalComponents/Salud/Salud";
import Foto from "../../components/PetsModalComponents/Foto/Foto";
import useGetUsers from "../../CustomHooks/useGetUsers";
import { userPlus } from "../../assets/svgIcons";
import AddNewUserModal from "./AddNewUserModal";
import { toast } from "react-hot-toast";
import { Table, Tag } from "antd";
import { useMediaQuery } from "./../../CustomHooks/useMediaQueries";
import { AnimatePresence, motion } from "framer-motion";
import { base_url } from "../../constant";
import axios from "axios";
import { uploadImage } from "./../../constant/uploadImage";
import useGetAgrags from "../../CustomHooks/useGetAgrags";
import PetComponent from "../../components/PetComponent/PetComponent";
import Select from "react-select";
import { formatDate } from "../../CustomHooks/dateFormats";
import TimeAgo from "react-timeago";
import cx from "classnames";
import Spinner from "../../utils/Spinner/Spinner";
import { useReactToPrint } from "react-to-print";

const tabs = [
  {
    id: "1",
    name: "Datos",
  },
  {
    id: "2",
    name: "Domicilio",
  },
  {
    id: "3",
    name: "Salud",
  },
  {
    id: "4",
    name: "Foto",
  },
];

export default function Mascota() {
  const [addUserModal, setAddUserModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [alert, setAlert] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegisteredModal, setIsRegisteredModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("1");
  const [addLoading, setAddloading] = useState(false);
  const [petLoading, setPetLoading] = useState(false);
  const [isSelectFocus, setIsSelectFocus] = useState(false);
  const [moreDetailsModal, setMoreDetailsModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [newPit, setNewPet] = useState({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    f_name: "",
    l_name: "",
    sex: "",
    departmento_id: "",
    provincia_id: "",
    districto_id: "",
    micro: "",
    bio: "",
    type: "",
    raza: "",
    qualified: "",
    coat_color: "",
    dob: "",
    officials: "",
    resPersons: [{ name: "", dni: "", phone: "" }],
    address: "",
    piso: "",
    referencia: "",
    mascota_tiene: "",
    esta_cast: "",
    visit_per: "",
    cuenta_con_vac_sext: "",
    cuenta_con_vac_trip_fel: "",
    cuenta_con: "",
    fecha_de_date: "",
    posee_alg_alerg: "",
    posee_alg_enf: "",
    pet_img: null,
    size: "",
    is_sterillized: "",
    animail_f_name: "",
    animail_l_name: "",
    hide_as_stri: "",
  });

  const [filteredData, setFilteredData] = useState([]);
  const [petsCard, setPetsCard] = useState([]);

  const [pitCardModal, setPitCardModal] = useState(false);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    console.log(newPit);
  }, [newPit]);

  const handleSelectPit = () => {
    if (newPit.user_id) {
      setIsRegisteredModal(true);
      setIsModalOpen(false);
      return;
    }

    toast.error("Elige un usuario primero");
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    if (email === "") {
      setAlert("Correo: Ingrese un correo válido");
    } else {
      setAlert("");
      setIsRegisteredModal(true);
      setIsModalOpen(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  const handleEmptyData = () => {
    setNewPet({
      user_id: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      f_name: "",
      l_name: "",
      sex: "",
      departmento_id: "",
      provincia_id: "",
      districto_id: "",
      micro: "",
      bio: "",
      type: "",
      raza: "",
      qualified: "",
      coat_color: "",
      dob: "",
      officials: "",
      resPersons: [{ name: "", dni: "", phone: "" }],
      address: "",
      piso: "",
      referencia: "",
      mascota_tiene: "",
      esta_cast: "",
      visit_per: "",
      cuenta_con_vac_sext: "",
      cuenta_con_vac_trip_fel: "",
      cuenta_con: "",
      fecha_de_date: "",
      posee_alg_alerg: "",
      posee_alg_enf: "",
      pet_img: null,
      size: "",
      is_sterillized: "",
      animail_f_name: "",
      animail_l_name: "",
      hide_as_stri: "",
    });
  };

  function handleCloseModal() {
    setIsModalOpen(false);
    setAlert("");
    setIsSubmitted(false);
    setMoreDetailsModal(false);
    setIsRegisteredModal(false);
    handleEmptyData();
  }

  const { handleGetUsers, users } = useGetUsers();
  const { loading, getAgrags, originalData, setAgrags, agrags } =
    useGetAgrags();

  useEffect(() => {
    handleGetUsers();
    getAgrags();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text, row) => (
        <button
          className="btn-sm btn btn-primary fs-6 text-white"
          onClick={() => {
            setRowData(row);
            getPetCard(row);
            setPitCardModal(true);
          }}
        >
          {row.id}
        </button>
      ),
    },

    {
      title: "Imagen",
      dataIndex: "pet_img",
      key: "pet_img",
      render: (text, row) => <img width={150} src={row?.pet_img} alt="" />,
    },

    {
      title: "nombre de mascota",
      render: (text, row) => <div>{row?.useranimal?.animal?.f_name}</div>,
    },
    {
      title: "Apellidos",
      render: (text, row) => <div>{row?.useranimal?.animal?.l_name}</div>,
    },
    {
      title: "Sexo",
      render: (text, row) => <div>{row?.useranimal?.animal?.sex}</div>,
    },
    {
      title: "microchip",
      render: (text, row) => (
        <Tag color="gray">{row.micro ?? "no tiene microchip"}</Tag>
      ),
    },
    {
      title: "Fecha de nacimiento",
      render: (text, row) => (
        <div>{formatDate(row?.useranimal?.animal?.dob)}</div>
      ),
    },
    {
      title: "creado_en",
      render: (text, row) => (
        <div>
          <Tag color="cyan">
            <TimeAgo date={new Date(row?.useranimal?.animal?.created_at)} />
          </Tag>
        </div>
      ),
    },
    {
      title: "Tamaño",
      render: (text, row) => <div>{row?.useranimal?.animal?.size}</div>,
    },
    {
      title: "DIRECCIÓN",
      render: (text, row) => <div>{row?.useranimal?.animal?.address}</div>,
    },

    {
      title: "Color",
      render: (text, row) => <div>{row?.useranimal?.animal?.coat_color}</div>,
    },
    // progress...
    {
      title: "Calificación",
      render: (text, row) => <div>{row?.useranimal?.animal?.qualified}</div>,
    },
    // progress...
    {
      title: "Raza",
      render: (text, row) => (
        <div>{row?.useranimal?.animal?.raza?.title_es}</div>
      ),
    },
    {
      title: "Biografía",
      render: (text, row) => <div>{row?.useranimal?.animal?.bio}</div>,
    },
    {
      title: "Piso",
      render: (text, row) => <div>{row?.piso ?? "__"}</div>,
    },
    {
      title: "Referencia",
      render: (text, row) => <div>{row?.referencia}</div>,
    },
    // progress...
    {
      title: "Especie",
      render: (text, row) => <div>{row?.type}</div>,
    },
    {
      title: "Departamento",
      render: (text, row) => <div>{row?.departmento?.title_es ?? "__"}</div>,
    },
    {
      title: "Provincia",
      render: (text, row) => <div>{row?.provincia?.title_es ?? "__"}</div>,
    },
    {
      title: "Distrito",
      render: (text, row) => <div>{row?.districto?.title_es ?? "__"}</div>,
    },

    {
      title: "Más detalles...",
      render: (text, row) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            setRowData(row);
            console.log(row);
            setMoreDetailsModal(true);
          }}
        >
          Más detalles
        </button>
      ),
    },
    {
      title: "Acciones...",
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
          {/* <button
            onClick={() => {
              setEditModal(true);
              setRowData(row);
              console.log(rowData);
            }}
            className=" btn-sm btn btn-primary fs-6 text-white"
          >
            {edit}
          </button> */}
        </div>
      ),
    },
  ];

  const isSmallScreen = useMediaQuery("(max-width:786px)");

  const handAddPit = async () => {
    setAddloading(true);

    let image = null;
    if (newPit.pet_img) {
      image = await uploadImage(newPit.pet_img);
      delete newPit.pet_img;
    }
    console.log(image);

    //  return

    const concatOfficials = newPit.resPersons
      .map((item) => [item.name, item.dni, item.phone].join("**"))
      .join("**pets**");

    const datasend = {
      ...newPit,
      pet_img: image?.data?.message || "",
      sex: newPit?.sex?.value,
      size: newPit.size.value,
      type: newPit.type.label,
      provincia_id: newPit.provincia_id.value,
      qualified: newPit.qualified.label,
      raza: newPit.raza.value,
      esta_cast: newPit.esta_cast.value,
      departmento_id: newPit.departmento_id.value,
      districto_id: newPit.districto_id.value,
      visit_per: newPit.visit_per.value,
      cuenta_con_vac_sext: newPit.cuenta_con_vac_sext.value,
      cuenta_con_vac_trip_fel: newPit.cuenta_con_vac_trip_fel.value,
      officials: concatOfficials,
      cuenta_con: newPit.cuenta_con.value,
      is_sterillized: newPit.is_sterillized.value,
      posee_alg_alerg: newPit.posee_alg_alerg.value,
      posee_alg_enf: newPit.posee_alg_enf.value,
    };

    console.log(datasend);
    // return
    await axios
      .post(`${base_url}agrag_animal`, datasend)
      .then((res) => {
        if (res) {
          console.log(res);
          if (res.data.status == "success") {
            toast.success(res.data.message);
            handleCloseModal();
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

  const handleSearchIcon = () => {
    console.log(originalData);
    if (
      originalData &&
      originalData.length > 0 &&
      Array.isArray(originalData)
    ) {
      if (searchValue.length >= 1) {
        const newData = originalData.filter((item) => {
          console.log("test " + item.id);
          if (
            searchValue &&
            !item?.useranimal?.animal?.f_name.includes(searchValue) && // good
            !item?.useranimal?.animal?.l_name.includes(searchValue) && // good
            !item?.user?.email.includes(searchValue) && // good
            !item?.user?.name.includes(searchValue) && //good
            !item?.micro?.includes(searchValue) && // good
            !String(item?.id).includes(searchValue) //good
          ) {
            return false;
          }

          return true;
        });
        setFilteredData(newData);
        // setAgrags(newData);
      } else {
        console.log("e");
        setFilteredData([]);
      }
    }
  };
  const deleteMascota = async () => {
    setDeleteLoading(true);
    try {
      const res = await axios.post(
        base_url + `delete_agrag/${rowData.id}`,

        {
          headers: {
            lang: "es",
          },
        }
      );

      toast.success("Mascota eliminado exitosamente");
      if (res.status == 200) {
        getAgrags();
        setConfirmButton(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // const { data , cols} = PetComponent()

  const [showCard, setShowCard] = useState(false);
  const getPetCard = (data) => {
    setPetLoading(true);
    axios
      .post(`${base_url}id_request`, { id: data?.id })
      .then((res) => {
        setPetsCard(res.data.result);
        setShowCard(true); // Show the card
      })
      .catch((err) => {
        console.error("Error fetching pet card:", err);
      })
      .finally(() => {
        setPetLoading(false);
      });
  };

  return (
    <>
      {/* {showCard ? (
        <div
          id="pdf-content"
          style={{ position: "absolute", left: "-10000px", top: "-10000px" }}
        >
          <PetComponent data={petsCard} />
        </div>
      ) : null} */}
      <Modal
        title={
          <>
            <p></p>
          </>
        }
        show={pitCardModal}
        onClose={() => setPitCardModal(false)}
        showCloseBtn={true}
        size="95%"
        confirmButton={{
          onClick: reactToPrintFn,
          children: petLoading ? (
            <Spinner size={20} loading={petLoading} color={"#fff"} />
          ) : (
            "imprimir"
          ),
        }}
        cancelButton={{
          onClick: () => setPitCardModal(false),
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {petLoading ? (
          <Spinner size={50} loading={petLoading} color={"rgb(54,185,204)"} />
        ) : (
          <div ref={contentRef}>
            <PetComponent data={petsCard} />
          </div>
        )}
      </Modal>
      <Modal
        title="Seleccionar propietario"
        size="1000px"
        style={{ height: "600px", overflow: "auto" }}
        confirmButton={{
          children: addLoading ? (
            <Spinner size={20} loading={addLoading} color={"#fff"} />
          ) : (
            "GUARDAR"
          ),
          style: { backgroundColor: "#36b9cc" },
          onClick: () => {
            handAddPit();
          },
          props: {
            className: selectedTab !== "4" ? "d-none " : "text-white",
          },
        }}
        cancelButton={{
          children: "Cerrar",
          onClick: () => {
            handleCloseModal();
          },
          style: { backgroundColor: "#858796" },
        }}
        show={isRegisteredModal}
        onClose={handleCloseModal}
        showCloseBtn={true}
        animation={true}
      >
        <div className="modal_tabs">
          {tabs?.map((tab, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedTab(tab.id)}
                className={`modal_tab ${
                  selectedTab == tab?.id ? "active" : ""
                }`}
              >
                {tab?.name}
              </div>
            );
          })}
        </div>
        {addLoading ? (
          <Spinner size={50} loading={addLoading} color={"rgb(54,185,204)"} />
        ) : (
          <AnimatePresence mode="wait">
            {selectedTab == 1 && (
              <Datos
                setNewPet={setNewPet}
                newPit={newPit}
                setSelectedTab={setSelectedTab}
              />
            )}
            {selectedTab == 2 && (
              <Domicilio
                setNewPet={setNewPet}
                newPit={newPit}
                setSelectedTab={setSelectedTab}
              />
            )}
            {selectedTab == 3 && (
              <Salud
                setNewPet={setNewPet}
                newPit={newPit}
                setSelectedTab={setSelectedTab}
              />
            )}
            {selectedTab == 4 && (
              <Foto
                setNewPet={setNewPet}
                newPit={newPit}
                setSelectedTab={setSelectedTab}
              />
            )}
          </AnimatePresence>
        )}

        {/* <PetsModalComponents /> */}
      </Modal>

      <Modal
        title="Seleccionar propietario"
        size="700px"
        confirmButton={{
          style: { backgroundColor: "#36b9cc" },
          onClick: handleSelectPit,
          props: {
            disabled: !newPit.user_id,
            className: ` ${!newPit.user_id ? "opacity-50" : ""} text-white`,
          },
          children: (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FaUserPlus />
              <span>Seleccionar</span>
            </div>
          ),
        }}
        cancelButton={{
          style: { backgroundColor: "#858796" },
          onClick: handleCloseModal,
          children: <span>Cerrar</span>,
        }}
        show={isModalOpen}
        onClose={handleCloseModal}
        showCloseBtn={true}
        animation={true}
      >
        {isSubmitted && alert && <Alert bgColor="#fdf3d8" color="#806520" />}
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ minHeight: "100px" }}
            animate={isSelectFocus ? { minHeight: "400px" } : {}}
            className=""
          >
            <label>Correo</label>
            <Select
              placeholder={"Seleccionar..."}
              onChange={(e) => {
                setNewPet({ ...newPit, user_id: e.value });
                // setIsSelectFocus(false)
              }}
              label={":"}
              onFocus={() => setIsSelectFocus(true)}
              // onBlur={() => setIsSelectFocus(false)}
              options={users.map((user) => ({
                label: user.name,
                value: user.id,
              }))}
            />
          </motion.div>

          <CustomButton
            onClick={() => setAddUserModal(true)}
            className={"mt-3"}
            icon={userPlus}
            text={"Agregar nuevo usuario"}
          />
        </form>
      </Modal>

      <Modal
        title="Más detalles..."
        size="700px"
        cancelButton={{
          style: { backgroundColor: "#858796" },
          onClick: () => setMoreDetailsModal(false),
          children: <span>Cerrar</span>,
        }}
        show={moreDetailsModal}
        onClose={() => setMoreDetailsModal(false)}
        showCloseBtn={true}
        animation={true}
      >
        <div className="d-flex flex-column gap-4">
          <div className="mx-3  px-3 by d-flex align-items-center justify-content-between">
            <div className="">¿La mascota está castrada?</div>
            <div
              className={cx("fs-4 text-center", {
                "text-success  ": rowData.esta_cast == 1,
                "text-danger": rowData.esta_cast != 1,
              })}
            >
              {rowData?.esta_cast == 1 ? <FaCheckCircle /> : <FaCircleXmark />}
            </div>
          </div>
          {/* ------------------------ */}
          <div className="mx-3 px-3 by d-flex align-items-center justify-content-between">
            <div className="">¿Visita periodicamente al veterinario?</div>
            <div
              className={cx("fs-4 text-center", {
                "text-success  ": rowData.visit_per == 1,
                "text-danger": rowData.visit_per != 1,
              })}
            >
              {rowData?.visit_per == 1 ? <FaCheckCircle /> : <FaCircleXmark />}
            </div>
          </div>
          {/* ------------------------ */}
          <div className="mx-3 px-3 by d-flex align-items-center justify-content-between">
            <div className="">¿Cuenta con vacunación séxtuple?</div>
            <div
              className={cx("fs-4 text-center", {
                "text-success  ": rowData.cuenta_con_vac_sext == 1,
                "text-danger": rowData.cuenta_con_vac_sext != 1,
              })}
            >
              {rowData?.cuenta_con_vac_sext == 1 ? (
                <FaCheckCircle />
              ) : (
                <FaCircleXmark />
              )}
            </div>
          </div>
          {/* ------------------------ */}
          {/* ------------------------ */}
          <div className="mx-3 px-3 by d-flex align-items-center justify-content-between">
            <div className="">¿Cuenta con vacunación triple felina?</div>
            <div
              className={cx("fs-4 text-center", {
                "text-success  ": rowData.cuenta_con_vac_trip_fel == 1,
                "text-danger": rowData.cuenta_con_vac_trip_fel != 1,
              })}
            >
              {rowData?.cuenta_con_vac_trip_fel == 1 ? (
                <FaCheckCircle />
              ) : (
                <FaCircleXmark />
              )}
            </div>
          </div>
          {/* ------------------------ */}
          <div className="mx-3 px-3 by d-flex align-items-center justify-content-between">
            <div className="">¿Cuenta con limpieza dental?</div>
            <div
              className={cx("fs-4 text-center", {
                "text-success  ": rowData.cuenta_con == 1,
                "text-danger": rowData.cuenta_con != 1,
              })}
            >
              {rowData?.cuenta_con == 1 ? <FaCheckCircle /> : <FaCircleXmark />}
            </div>
          </div>
          {/* ------------------------ */}
          <div className="mx-3 px-3 by d-flex align-items-center justify-content-between">
            <div className="">¿Posee alguna alergia?</div>
            <div
              className={cx("fs-4 text-center", {
                "text-success  ": rowData.posee_alg_alerg == 1,
                "text-danger": rowData.posee_alg_alerg != 1,
              })}
            >
              {rowData?.posee_alg_alerg == 1 ? (
                <FaCheckCircle />
              ) : (
                <FaCircleXmark />
              )}
            </div>
          </div>
          {/* ------------------------ */}
          {/* ------------------------ */}
          <div className="mx-3 px-3 by d-flex align-items-center justify-content-between">
            <div className="">¿Posee alguna enfermedad?</div>
            <div
              className={cx("fs-4 text-center", {
                "text-success  ": rowData.posee_alg_enf == 1,
                "text-danger": rowData.posee_alg_enf != 1,
              })}
            >
              {rowData?.posee_alg_enf == 1 ? (
                <FaCheckCircle />
              ) : (
                <FaCircleXmark />
              )}
            </div>
          </div>
          {/* ------------------------ */}
          <div className="mx-3 px-3 by d-flex align-items-center justify-content-between">
            <div className="">¿El animal es estéril?</div>
            <div
              className={cx("fs-4 text-center", {
                "text-success  ":
                  rowData.useranimal?.animal?.is_sterillized == 1,
                "text-danger": rowData.useranimal?.animal?.is_sterillized != 1,
              })}
            >
              {rowData?.useranimal?.animal?.is_sterillized == 1 ? (
                <FaCheckCircle />
              ) : (
                <FaCircleXmark />
              )}
            </div>
          </div>
          {/* ------------------------ */}
        </div>
      </Modal>

      <Modal
        title={"Confirmar la eliminación"}
        show={confirmButton}
        onClose={() => setConfirmButton(false)}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: deleteMascota,
          children: deleteLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner size={20} color="#fff" loading={deleteLoading} />
            </div>
          ) : (
            "Borrar"
          ),

          props: {
            disabled: deleteLoading,
            className: "btn btn-danger",
          },
        }}
        cancelButton={{
          onClick: () => setConfirmButton(false),
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {deleteLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner
              size={50}
              color="rgb(54, 185, 204)"
              loading={deleteLoading}
            />
          </div>
        ) : (
          <h3 className="">
            ¿Está seguro de que desea eliminar este elemento?
          </h3>
        )}
      </Modal>
      <AddNewUserModal
        newPit={newPit}
        handleGetUsers={handleGetUsers}
        setNewPet={setNewPet}
        handleCloseModal={handleCloseModal}
        open={addUserModal}
        setOpen={setAddUserModal}
      />
      <FormCard
        drawer={true}
        header={"Mantenimiento de Mascota"}
        children={
          <>
            <form onSubmit={handleSearch}>
              <div style={{ width: isSmallScreen ? "100%" : "40.33%" }}>
                <CustomInputWithSearch
                  placeholder="Buscando..."
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    console.log(e.target.value);
                  }}
                  handleSearch={handleSearchIcon}
                />
              </div>
              <div className="mt-3">
                <CustomButton
                  onClick={handleOpenModal}
                  icon={<FaFile />}
                  text={"AGREGAR MASCOTA"}
                  bgColor={"#D1A535"}
                />
              </div>
            </form>
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
            dataSource={filteredData}
          />
        </div>
      )}
    </>
  );
}
