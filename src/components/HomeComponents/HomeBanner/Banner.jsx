import React, {useEffect, useState} from "react";
import "./style.css";
import DnDFile from "./../../../utils/DnD_file/DnDFile";
import ReactQuill from "react-quill";
import Typo from "../../../utils/Typo/Typo";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import Jodit from './../../../utils/jodit/Jodit';
const Banner = ({homeData, setHomeData , bannerUrl, setBannerUrl}) => {

  


  const [bannerFile, setBannerFile] = useState(null);
  useEffect(() => {
    if (bannerFile) setHomeData({...homeData, banner_file: bannerFile});
  }, [bannerFile]);

  const handleBannerTextChange = (e) => {
    setHomeData({...homeData, banner_txt: e});
  };


  return !homeData ? (
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
          Banner de texto
        </Typo> 
        {
        <Jodit onChange={(e)=> setHomeData({...homeData , banner_txt:e})}  content={homeData?.banner_txt}   />
        }
      </div>
    </div>
  );
};

export default Banner;
