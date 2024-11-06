import "./style.css";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../constant";

import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { Table } from "antd";
import FormCard from "../../components/FormCard/FormCard";
import toast from "react-hot-toast";

export default function PeopleFindPets() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [rowData, setRowData] = useState({});

  const columns = [
    {
      title: "Nombres",
      dataIndex: "nombres",
      key: "nombres",
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "Apellidos",
      dataIndex: "Apellidos",
      key: "Apellidos",
      render: (text) => <div className="text-center">{text}</div>,
    },

    {
      title: "Num One",
      dataIndex: "num_one",
      key: "num_one",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Num Two",
      dataIndex: "num_two",
      key: "num_two",
      render: (text, row) => <div className="text-center">{text}</div>,
    },

    {
      title: "Comportamiento",
      key: "Comportamiento",

      render: (text, row) => (
        <div className="d-flex align-items-center gap-2 justify-content-center">
          <button
            className="more_info_for_animal justify-content-center"
            onClick={() => {
              setIsOpenModal(true);
              setRowData(row);
            }}
          >
            Más información
          </button>
        </div>
      ),
    },
  ];

  const get_all_data = async () => {
    setLoading(true);
    try {
      const res = await axios.get(base_url + "all_findded_pets");
      if (res.status === 200 && Array.isArray(res.data.data)) {
        setData(res.data.data);
      } else {
        toast.error("Error fetching data!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Network error while fetching data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_all_data();
  }, []);

  return (
    <>
      <Modal
        title={"More Info For Animal"}
        show={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        showCloseBtn={true}
        size="900px"
        cancelButton={{
          onClick: () => setIsOpenModal(false),
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        <div className="modal_content__">
          <div className="modal_info_section">
            <h3 className="title_animal">{`${rowData?.nombres} ${rowData?.Apellidos}`}</h3>

            <p className="info_animal">
              <strong>Departmento:</strong>{" "}
              {rowData?.departmento?.title_es || "N/A"}
            </p>
            <p className="info_animal">
              <strong>Distrito:</strong> {rowData?.distrito?.title_es || "N/A"}
            </p>
            <p className="info_animal">
              <strong>Provincia:</strong>{" "}
              {rowData?.provincia?.title_es || "N/A"}
            </p>
            <p className="info_animal">
              <strong>Fecha De Nacimiento:</strong>{" "}
              {rowData?.fecha_de_nac || "N/A"}
            </p>
            <p className="info_animal">
              <strong>Color De Mascota:</strong>{" "}
              {rowData?.animal_color || "N/A"}
            </p>
          </div>
        </div>
      </Modal>

      <div className="race_page">
        <FormCard header="La gente encuentra mascotas"></FormCard>
      </div>

      <div className="search_table_container">
        {loading ? (
          <div className="d-flex align-items-center justify-content-center">
            <ClipLoader size={50} loading={loading} color="rgb(54, 185, 204)" />
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
