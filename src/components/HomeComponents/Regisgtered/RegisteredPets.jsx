import React, {useState} from "react";
import Typo from "./../../../utils/Typo/Typo";
import CustomButton from "./../../CustomButton/CustomButton";
import CustomInput from "../../CustomInput/CustomInput";
import ReactQuill from "react-quill";
import Jodit from "../../../utils/jodit/Jodit";

const RegisteredPets = ({homeData, setHomeData}) => {
  console.log(homeData);

  const handleChangeRegistered = (e) => {
    setHomeData({...homeData, pets_num_txt: e});
  };

  const handleChangeRegisteredText = (number) => {
    setHomeData({...homeData, pets_num_number: number});
  };

  return (
    <div className='hone_banner'>
      <div className='d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          Texto de mascotas registradas
        </Typo>

          <Jodit
            onChange={(e) => setHomeData({...homeData, pets_num_txt: e})}
            content={homeData?.pets_num_txt}
          />

      </div>

      <div className='d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          Número de mascota registrada
        </Typo>
        {homeData?.pets_num_number && (
          <Jodit
            onChange={(e) => setHomeData({...homeData, pets_num_number: e})}
            content={homeData?.pets_num_number}
          />
        )}
        {/* <ReactQuill
          theme='snow'
          value={homeData?.pets_num_number}
          onChange={(e) => {
            handleChangeRegisteredText(e);
          }}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{header: 1}, {header: 2}],
              [{list: "ordered"}, {list: "bullet"}],
              [{script: "sub"}, {script: "super"}],
              [{indent: "-1"}, {indent: "+1"}],
              [{direction: "rtl"}],
              [{size: ["small", true, "large", "huge"]}],
              ["link", "image"],
              [{color: []}, {background: []}],
              [{font: []}],
              [{align: []}],
            ],
          }}
          style={{
            minHeight: "100px",
            color: "black",
            maxWidth: "100%",
            width: "100%",
          }}
        /> */}
      </div>
    </div>
  );
};

export default RegisteredPets;
