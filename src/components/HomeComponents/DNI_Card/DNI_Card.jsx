import React, {useEffect, useState} from "react";
import Typo from "../../../utils/Typo/Typo";
import ReactQuill from "react-quill";
import DnDFile from "../../../utils/DnD_file/DnDFile";
import Jodit from "./../../../utils/jodit/Jodit";

const DNI_Card = ({homeData, setHomeData, dniURl, setDniUrl}) => {
  const [dniFile, setDniFile] = useState(null);
  // const [dniURl, setDniUrl] = useState("");

  const hnadleChangeDNI_text = (e) => {
    setHomeData({...homeData, dni_txt: e});
  };

  useEffect(() => {
    if (dniFile) setHomeData({...homeData, dni_file: dniFile});
  }, [dniFile]);

  return (
    <div className='home_banner d-flex flex-column gap-4'>
      <div className='d-flex flex-column  gap-5'>
        <Typo variant={"lg"} fw={"bolder"}>
          Texto de mascotas registradas
        </Typo>

        <Jodit
          content={homeData?.dni_txt}
          onChange={(e) => hnadleChangeDNI_text(e)}
        />
      </div>

      <div className='panner_image d-flex flex-column gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          Imagen
        </Typo>

        <DnDFile
          fileUrl={dniURl}
          setFileUrl={setDniUrl}
          file={dniFile}
          setFile={setDniFile}
        />
      </div>
    </div>
  );
};

export default DNI_Card;
