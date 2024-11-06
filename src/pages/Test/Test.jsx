import React, { useRef, useState } from "react";
import "./Test.css";
import registro from "../../assets/images/Registro.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import toast from "react-hot-toast";
import PetComponent from "../../components/PetComponent/PetComponent";
import CertificateComponent from "../../components/CertificateComponent/certificateComponent";
import RegistroComponent from "../../components/RegistroComponent/RegistroComponent";
import TableLayout from "./../../components/TableLayout/index";

const Test = () => {
  const certImageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleDniAndConvertToPdf = async () => {
    setLoading(true);

    try {
      const canvas = await html2canvas(certImageRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const pdfDataUri = pdf.output("bloburl");

      // Open PDF in a new tab
      window.open(pdfDataUri, "_blank");
    } catch (error) {
      console.error("Error converting to PDF:", error);
      toast.error("Error al convertir en PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RegistroComponent />
      {/* <TableLayout /> */}
    </>
  );
};

export default Test;
