import React, { useRef, useState } from "react";
import "./style.css";
import FormCard from "../../components/FormCard/FormCard";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Print } from "../../assets/svgIcons";
import PetComponent from "../../components/PetComponent/PetComponent";
import axios from "axios";
import { base_url } from "../../constant";
import Spinner from "../../utils/Spinner/Spinner";
import toast from "react-hot-toast";
import Modal from "../../components/Modal/Modal";
import { useReactToPrint } from "react-to-print";
import CertificateComponent from "../../components/CertificateComponent/certificateComponent";
import RegistroComponent from "./../../components/RegistroComponent/RegistroComponent";

const DNI_page = () => {
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [dniModal, setDniModal] = useState(false);
  const [certificateModal, setCertificateModal] = useState(false);
  const [registroModal, setRegistroModal] = useState(false);
  const [petData, setPetData] = useState(null);
  const petComponentRef = useRef();
  const certificateRef = useRef();
  const registroRef = useRef();

  const handleDniPrint = useReactToPrint({
    contentRef: petComponentRef,
    documentTitle: "Pet DNI Document",
  });
  const handleCertificatePrint = useReactToPrint({
    contentRef: certificateRef,
    documentTitle: "Certificate Document",
  });
  const handleRegistroPrint = useReactToPrint({
    contentRef: registroRef,
    documentTitle: "Registro Document",
  });

  const handleDni = async () => {
    setLoading(true);
    try {
      const dataset = { dni: dni };
      const res = await axios.post(`${base_url}dni_request`, dataset);
      if (res.data.status === "success") {
        setPetData(res.data.result);
      } else {
        toast.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener los datos");
    } finally {
      setLoading(false);
      setDni("");
    }
  };

  return (
    <>
      <div className="dni_page">
        <FormCard
          header={"Imprimir DNI de Mascota"}
          children={
            <>
              <CustomInput
                className="department-search"
                onChange={(e) => setDni(e.target.value)}
                label={"DNI"}
                value={dni}
                placeholder={"Escriba el DNI de la mascota..."}
              />
              <div className="dni_card_buttons">
                <CustomButton
                  onClick={() => {
                    if (!dni) {
                      toast.error("Introducir DNI!");
                      return;
                    }
                    handleDni();
                    setDniModal(true);
                  }}
                  icon={Print}
                  bgColor={"#5bc0de"}
                  text={"Imprimir DNI"}
                />
                <CustomButton
                  onClick={() => {
                    if (!dni) {
                      toast.error("Introducir DNI!");
                      return;
                    }
                    handleDni();
                    setRegistroModal(true);
                  }}
                  icon={Print}
                  bgColor={"#5bc0de"}
                  text={"Certificado de Registro"}
                />
                <CustomButton
                  onClick={() => {
                    if (!dni) {
                      toast.error("Introducir DNI!");
                      return;
                    }
                    handleDni();
                    setCertificateModal(true);
                  }}
                  icon={Print}
                  bgColor={"#5bc0de"}
                  text={"Certificado de Responsable"}
                />
              </div>
            </>
          }
        />
      </div>

      <Modal
        title={
          <>
            <p></p>
          </>
        }
        show={dniModal}
        onClose={() => setDniModal(false)}
        showCloseBtn={true}
        size="90%"
        confirmButton={{
          onClick: handleDniPrint,
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
          ) : (
            "Imprimir"
          ),
          style: { backgroundColor: "#36b9cc" },
          props: { disabled: loading },
        }}
        cancelButton={{
          onClick: () => setDniModal(false),
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
        ) : (
          <PetComponent petComponentRef={petComponentRef} data={petData} />
        )}
      </Modal>
      <Modal
        title={
          <>
            <p></p>
          </>
        }
        show={certificateModal}
        onClose={() => setCertificateModal(false)}
        showCloseBtn={true}
        size="90%"
        confirmButton={{
          onClick: handleCertificatePrint,
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
          ) : (
            "Imprimir"
          ),
          style: { backgroundColor: "#36b9cc" },
          props: { disabled: loading },
        }}
        cancelButton={{
          onClick: () => setCertificateModal(false),
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
        ) : (
          <CertificateComponent
            certificateRef={certificateRef}
            data={petData}
          />
        )}
      </Modal>
      <Modal
        title={
          <>
            <p></p>
          </>
        }
        show={registroModal}
        onClose={() => setRegistroModal(false)}
        showCloseBtn={true}
        size="90%"
        confirmButton={{
          onClick: handleRegistroPrint,
          children: loading ? (
            <Spinner size={20} color="#fff" loading={loading} />
          ) : (
            "Imprimir"
          ),
          style: { backgroundColor: "#36b9cc" },
          props: { disabled: loading },
        }}
        cancelButton={{
          onClick: () => setRegistroModal(false),
          children: "Cerca",
          style: { backgroundColor: "#858796" },
        }}
      >
        {loading ? (
          <Spinner size={50} color="rgb(54, 185, 204)" loading={loading} />
        ) : (
          <RegistroComponent registroRef={registroRef} data={petData} />
        )}
      </Modal>
    </>
  );
};

export default DNI_page;
