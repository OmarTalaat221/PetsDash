import { FaFile, FaPen, FaSearch } from "react-icons/fa";
import FormCard from "../../components/FormCard/FormCard";
import "./style.css";
import CustomInputWithSearch from "../../components/CustomInputWithSearch/CustomInputWithSearch";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import TableComponent from "../../components/Table/Table";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { users } from "../../utils/users";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaPencil,
  FaRegTrashCan,
} from "react-icons/fa6";
import checkboxImg from "../../assets/images/check-on (1).png";
import Select from "react-select";
import noPets from "../../assets/images/noPets (1).png";
import { Table } from "antd";
import useGetUsers from "../../CustomHooks/useGetUsers";
import cx from "classnames";
import { formatDate } from "../../CustomHooks/dateFormats";
import Spinner from "../../utils/Spinner/Spinner";
const perfilOptions = [
  { label: "ADMINISTRADOR", value: "ADMINISTRADOR" },
  { label: "CLIENTE", value: "CLIENTE" },
  { label: "ASESOR", value: "ASESOR" },
  { label: "PROPIETARIO", value: "PROPIETARIO" },
];

const tabs = [
  {
    id: "1",
    name: "Datos",
  },
  {
    id: "2",
    name: "FOTO",
  },
];

export default function Users() {
  const [searchValue, setSearchValue] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("1");
  const fileInputRef = useRef(null);
  const [img, setImg] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    setImg(file);
  };

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  const {
    handleGetUsers,
    users,
    setUsers,
    originalUsers,
    setOriginalUsers,
    loading,
    setLoading,
  } = useGetUsers();
  useEffect(() => {
    handleGetUsers();
  }, []);

  useEffect(() => {
    if (
      originalUsers &&
      originalUsers.length > 0 &&
      Array.isArray(originalUsers)
    ) {
      if (searchValue.length >= 1) {
        const newData = originalUsers.filter((item) => {
          if (
            searchValue &&
            !item?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) &&
            !item?.email?.toLowerCase()?.includes(searchValue?.toLowerCase()) &&
            !item?.phone?.toLowerCase()?.includes(searchValue?.toLowerCase())
          ) {
            return false;
          }

          return true;
        });
        setUsers(newData);
      } else {
        setUsers(originalUsers);
      }
    }
  }, [searchValue, originalUsers]);

  const columns = [
    {
      title: "Nombre de usuario",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Correo electrónico",
      dataIndex: "email",
      key: "email",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Registrado en",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, row) => (
        <div className="text-center">{formatDate(row.created_at)}</div>
      ),
    },

    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
      render: (text, row) => <div className="text-center">{row.phone}</div>,
    },
  ];

  return (
    <>
      <Modal
        size="1000px"
        style={{ width: "800px" }}
        title="Registrar Usuario"
        show={isOpenModal}
        onClose={handleCloseModal}
      >
        <>
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

          {selectedTab == 1 ? (
            <form>
              <div className="user_input_group">
                <CustomInput
                  label="Nombres"
                  placeholder="Escriba el nombre..."
                  required
                />
                <CustomInput
                  label="Apellidos"
                  placeholder="Escriba el apellido..."
                  required
                />
                <div className="user-select">
                  <label>
                    Sexo <span>(*)</span>
                  </label>
                  <select>
                    <option>Seleccionar</option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                </div>
              </div>

              <div className="user_input_group">
                <CustomInput label="Fecha de Nacimiento" required type="date" />
                <CustomInput
                  label="Telefono"
                  placeholder="Escriba el telefono..."
                />
                <CustomInput
                  label="Celular"
                  placeholder="Escriba el celular..."
                />
              </div>

              <div className="user-select user-select-search">
                <label>
                  Perfil <span>(*)</span>
                </label>
                <Select
                  placeholder={"Seleccionar..."}
                  options={perfilOptions}
                />
              </div>

              <div className="user_input_group">
                <CustomInput
                  label="E-mail"
                  required
                  placeholder="Escriba el e-mail..."
                  type="email"
                />
                <CustomInput
                  label="Contraseña"
                  required
                  placeholder="Escriba la contraseña..."
                  type="password"
                />
                <CustomInput
                  label="Confirmación de contraseña"
                  required
                  placeholder="Confirma la contraseña..."
                  type="password"
                />
              </div>

              <div className="following_btn mt-4 gap-4">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setSelectedTab("2")}
                >
                  <span>
                    <FaAnglesRight />
                  </span>
                  <span>Siguiente</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="user_foto">
                <div>
                  <img src={img == "" ? noPets : img} />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button onClick={handleButtonClick}>Subir</button>
              </div>

              <button
                onClick={() => {
                  setSelectedTab(1);
                }}
                className="d-flex gap-2 align-items-center btn btn-sm btn-primary"
              >
                <FaAnglesLeft />
                <span>Atras</span>
              </button>
            </>
          )}

          <hr />

          <div className="modal_buttons ">
            <button className="confirm_button">GUARDAR</button>
            <button className="cancel_button">Cerrar</button>
          </div>
        </>
      </Modal>

      <div className="users_page">
        <FormCard header="Usuarios registrados">
          <form>
            <div className="department-search" style={{}}>
              <CustomInput
                value={searchValue}
                className="department-search"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar usuario..."
              />
            </div>
          </form>
        </FormCard>
      </div>

      <div className="search_table_container">
        {loading ? (
          <Spinner size={50} loading={loading} color={"rgb(54,185,204)"} />
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={users}
          />
        )}
      </div>
    </>
  );
}
