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

import { toast } from "react-hot-toast";
import { Table } from "antd";
import cx from "classnames";
import { edit } from "../../assets/svgIcons";

import { ClipLoader } from "react-spinners";
import useGetAllContact from "../../CustomHooks/useGetAllContact";

export default function Contact() {
  //   const [isOpenModal, setIsOpenModal] = useState(false);

  //   const [formData, setFormData] = useState({
  //     facebook_link: "",
  //     instagram_link: "",
  //     phone: "",
  //     email: "",
  //   });

  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [rowData, setRowData] = useState({});

  //   const handleCloseModal = () => {
  //     setIsOpenModal(false);
  //   };

  //   const handleEmptyInputs = () => {
  //     setFormData({
  //       facebook_link: "",
  //       instagram_link: "",
  //       phone: "",
  //       email: "",
  //     });
  //   };

  const {
    handleGetAllContact,
    contact,

    loading: contactLoading,
  } = useGetAllContact();

  const updateContact = async () => {
    setLoading(true);
    try {
      const dataSend = {
        ...rowData,
      };

      await axios.post(base_url + `update_site_info/${rowData.id}`, dataSend, {
        headers: {
          lang: "es",
        },
      });

      toast.success("Contacto actualizado exitosamente");
      handleGetAllContact();
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
      setEditModal(false);
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
      title: "Instagram",
      dataIndex: "instagram_link",
      key: "instagram_link",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Facebook",
      dataIndex: "facebook_link",
      key: "facebook_link",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Correo Electrónico",
      dataIndex: "email",
      key: "email",
      render: (text) => <div className="text-center">{text}</div>,
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
    handleGetAllContact();
  }, []);

  return (
    <>
      <Modal
        title={"Actualizar Contacto"}
        show={editModal}
        onClose={() => setEditModal(false)}
        showCloseBtn={true}
        size="900px"
        confirmButton={{
          onClick: updateContact,
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
              label="Instagram"
              name="instagram_link"
              placeholder="Ingrese el enlace de instagram..."
              onChange={(e) =>
                setRowData({ ...rowData, instagram_link: e.target.value })
              }
              value={rowData.instagram_link || ""}
            />

            <CustomInput
              label="Facebook"
              name="facebook_link"
              placeholder="Ingrese el enlace de facebook..."
              onChange={(e) =>
                setRowData({ ...rowData, facebook_link: e.target.value })
              }
              value={rowData.facebook_link || ""}
            />
            <CustomInput
              label="Teléfono"
              name="phone"
              placeholder="Ingrese el teléfono..."
              onChange={(e) =>
                setRowData({ ...rowData, phone: e.target.value })
              }
              value={rowData.phone || ""}
            />
            <CustomInput
              label="Correo Electrónico"
              name="enail"
              placeholder="Ingrese el correo electrónico..."
              onChange={(e) =>
                setRowData({ ...rowData, email: e.target.value })
              }
              value={rowData.email || ""}
            />
          </form>
        )}
      </Modal>

      <div className="race_page">
        <FormCard header="Contacto">
          <div className="mt-4 d-flex align-items-center gap-4">
            {/* <CustomButton
              textColor="#333"
              onClick={() => setIsOpenModal(true)}
              text="Agregar"
              icon={<FaFolderPlus />}
              color={"#222"}
              bgColor="#fff"
            /> */}
          </div>
        </FormCard>
      </div>

      <div className="search_table_container">
        {contactLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <ClipLoader
              size={50}
              loading={contactLoading}
              color="rgb(54, 185, 204)"
            />
          </div>
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={contact}
          />
        )}
      </div>
    </>
  );
}
