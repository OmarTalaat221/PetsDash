import React, {useRef, useState} from "react";
import "./style.css";
import { trashIcon } from "./svg";

const DnDFile = ({file , setFile , fileUrl , setFileUrl}) => {
  const input = useRef(null);
  const [isActive, setIsActive] = useState(false);
  // const [fileUrl, setFileUrl] = useState("");

  const handleChange = (e) => {
    setFile(prev => prev = e.target.files[0]);
    showFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsActive(true);
  };

  const handleDragLeave = () => {
    setIsActive(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
    showFile(e.dataTransfer.files[0]);
    setIsActive(false)
  };

  function showFile(file) {
    let fileType = file?.type; 
    console.log(file)
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader(); 
      fileReader.onload = () => {
        let fileURL = fileReader.result; 
        let imgTag = fileURL; 
        setFileUrl(imgTag);
      };
      fileReader.readAsDataURL(file);
    } else {

      alert("This is not an Image File!");
      setIsActive(false);
    }
  }

  const handleRemoveImage = ()=>{
    setFile(null)
    setFileUrl(null)
    setIsActive(false)
  }

  return (
    <div
      className={`drag-area ${isActive ? "active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
     <div className="btn_header">
        <header>
          {isActive ? "Liberar para cargar archivo" : " O arrastrar y soltar para cargar el archivo"}
        </header>
        <button
          onClick={() => {
            input.current.click();
          }}
        >
          Explorar archivo 
        </button>

     </div>
      <input onChange={handleChange} ref={input} type='file' hidden />
      {fileUrl ? 
      
        <div className="dndImage">
          <div className="dnd_delete_icon" onClick={handleRemoveImage}>{trashIcon}</div>
          <img src={fileUrl} alt='' />
        </div>
      
      : ""}
    </div>
  );
};

export default DnDFile;
