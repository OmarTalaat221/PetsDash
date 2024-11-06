import React, {useEffect, useState} from "react";
import "./style.css";
import ReactQuill from "react-quill";
import Typo from "./../../../utils/Typo/Typo";
import DnDFile from "../../../utils/DnD_file/DnDFile";
import Jodit from "../../../utils/jodit/Jodit";
const OurTarget = ({homeData, setHomeData , targetUrl, setTargetUrl}) => {

  const [targetFile, setTargetFile] = useState(null);
  useEffect(() => {
    if (targetFile) setHomeData({...homeData, propiedad_file: targetFile});
  }, [targetFile]);

  return (
    <div className='hone_banner'>
      <div className='d-flex flex-column  gap-3 '>
        <Typo variant={"lg"} fw={"bolder"}>
          Nuestro objetivo
        </Typo>
        {
          homeData?.propiedad_txt  &&
        <Jodit onChange={(e)=> setHomeData({...homeData , propiedad_txt:e})}  content={homeData?.propiedad_txt}   />
        }
    
      </div>

      <div className='d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          imagen
        </Typo>

        <DnDFile fileUrl={targetUrl} setFileUrl={setTargetUrl} file={targetFile} setFile={setTargetFile} />
      </div>
    </div>
  );
};

export default OurTarget;
