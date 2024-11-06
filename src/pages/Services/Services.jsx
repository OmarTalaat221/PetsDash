import * as XLSX from 'xlsx';
import { FaSearch } from "react-icons/fa";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import FormCard from "../../components/FormCard/FormCard";
import './style.css';
import { FaDownload, FaPencil } from "react-icons/fa6";
import TableComponent from "../../components/Table/Table";
import FromGroup from './../../components/FromGroup/FromGroup';
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { useState } from 'react';
import { services } from '../../utils/services';

export default function Services() {
    const headers = ["","TIPO","FECHA","DNI RUMP","MASCOTA","PROPIETARIO","EMAIL","TELEFONO","RECIBE","ENVIO"]
    const [isSearch , setIsSearch] = useState(false);

    const handleDownload = () => {
      const workbook = XLSX.utils.book_new();
      const sheetData = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, sheetData, "Sheet1");
  
    
      const wbBlob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })], {
        type: "application/octet-stream"
      });
  
      const url = URL.createObjectURL(wbBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'empty.xlsx');
      document.body.appendChild(link);
      link.click();
  
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    };



    
    return (
    <>
    <div className="service_page">
        <FormCard header="Solicitudes y Trámites">

          <FromGroup>
          <FromGroup.Input label={"Email:"} placeholder="Correo de Usuario" />
            <FromGroup.Input label={"Dni"} placeholder="Dni de la mascota" />
            <CustomSelect label={"Estado"} />
            <CustomSelect placeholder="TODOS" label={"Tipo de Servicio"} />
            <FromGroup.Input type='date' label={"Inicio"} />
            <FromGroup.Input type="date" label={"Fin"} />
          </FromGroup>

          <div className="btns">
                <CustomButton icon={<FaSearch />} onClick={() => {setIsSearch(true)}} bgColor="#5bc0de" text="Buscar"/>
                <CustomButton icon={<FaDownload />} onClick={handleDownload} bgColor="#5cb85c" text="Exportar" />
              </div>
        </FormCard>
    </div>

    <div className="service_table">
        <TableComponent header={headers}>
            {isSearch && services.map(item => <tr>
              <td className="edit_btn">
                <button><FaPencil /></button>
              </td>
              <td>{item.TIPO}</td>
              <td></td>
              <td>{item.DNI}</td>
              <td>{item.MASCOTA}</td>
              <td>{item.PROPIETARIO}</td>
              <td>{item.EMAIL}</td>
              <td>{item.TELEFONO}</td>
              <td>No</td>
              <td>{item.ENVIO == 0 ? "No":"Si"}</td>
            </tr>)}
        </TableComponent>
    </div>
    </>
  )
}
