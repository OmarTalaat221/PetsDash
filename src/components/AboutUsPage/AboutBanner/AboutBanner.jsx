import React, {useEffect, useState} from "react";
import "./style.css";
import DnDFile from "./../../../utils/DnD_file/DnDFile";
import ReactQuill from "react-quill";
import Typo from "../../../utils/Typo/Typo";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import Jodit from './../../../utils/jodit/Jodit';
const AboutBanner = ({aboutData, setAboutData , bannerUrl, setBannerUrl}) => {
  const [bannerFile, setBannerFile] = useState(null);
  useEffect(() => {
    if (bannerFile) setAboutData({...aboutData, banner_file: bannerFile});
  }, [bannerFile]);

  const handleBannerTextChange = (e) => {
    setAboutData({...aboutData, banner_txt: e});
  };


  return !aboutData ? (
    ""
  ) : (
    <div className='hone_banner'>
      <div className='panner_image d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          Banner de inicio
        </Typo>

        <DnDFile
          fileUrl={bannerUrl}
          setFileUrl={setBannerUrl}
          file={bannerFile}
          setFile={setBannerFile}
        />
      </div>
      <div className='banner_text  d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
        Título del banner
        </Typo> 
        {
        <Jodit onChange={(e)=> setAboutData({...aboutData , banner_title:e})}  content={aboutData?.banner_title}   />
        }
      </div>
      <div className='banner_text  d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          Banner de texto
        </Typo> 
        {
        <Jodit onChange={(e)=> setAboutData({...aboutData , banner_text:e})}  content={aboutData?.banner_text}   />
        }
      </div>
    </div>
  );
};

export default AboutBanner;
