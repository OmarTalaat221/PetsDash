import React, {useEffect, useState} from "react";
import "./style.css";
import Typo from "./../../../utils/Typo/Typo";
import DnDFile from "../../../utils/DnD_file/DnDFile";
import Jodit from "../../../utils/jodit/Jodit";
import { uploadImage } from "../../../constant/uploadFiles";
import axios from "axios";
import { base_url } from "../../../constant";
import toast from "react-hot-toast";
const AboutContent = ({aboutData, setAboutData, aboutUrl, setAboutUrl , resTxt , setResTxt , resTit , setResTit , resUrl , setResUrl}) => {


  const [aboutFile, setAboutFile] = useState(null);
  const [resFile, setResFile] = useState(null)

  const [loading , setLoading] = useState(false)

  
  useEffect(() => {
    if (aboutFile) setAboutData({...aboutData, about_file: aboutFile});
  }, [aboutFile]);

  useEffect(() => {
    if (resFile) setAboutData({...aboutData, resFile: resFile});
  }, [resFile]);



  const handleUpdateAboutData = async ()=>{
      
    let bannerImage = null;
    if(aboutData?.banner_file){
      bannerImage = await uploadImage(aboutData?.banner_file)
      delete aboutData.banner_file
    }

    let about_image = null
    if(aboutData?.about_file){
      about_image = await uploadImage(aboutData?.about_file)
      delete aboutData.about_file
    }

    let res_image = null
    if(aboutData?.resFile){
      res_image = await uploadImage(aboutData?.resFile);
      delete aboutData.resFile
    }

    console.log("bannerImage: " + bannerImage)

    const dataset = {
      ...aboutData,
      no_img:about_image || aboutData.no_img,
      banner_image : bannerImage ? bannerImage : aboutData.banner_image,
      res_img:res_image || aboutData.res_img
    }
    delete dataset.banner_img

    console.log(dataset)

    


    setLoading(true)

    await axios
    .post(`${base_url}update_about_page`, dataset)
    .then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        
        toast.success(res.data.message);
      } else {
        // toast.error("There is a problem in home data!");
      }
    })
    .catch((e) => console.log(e))
    .finally(() => {
      setLoading(false);
    });


  }

  return (
    <div className='hone_banner'>
      <div className='d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          imagen
        </Typo>

        <DnDFile
          fileUrl={aboutUrl}
          setFileUrl={setAboutUrl}
          file={aboutFile}
          setFile={setAboutFile}
        />
      </div>
      <div className='d-flex flex-column  gap-3 '>
        <Typo variant={"lg"} fw={"bolder"}>
          Acerca del título de la sección
        </Typo>
        {
          <Jodit
            onChange={(e) => setAboutData({...aboutData, no_txt: e})}
            content={aboutData?.no_txt}
          />
        }
      </div>

      {/* hmada */}
      <div className='d-flex flex-column  gap-3 '>
        <Typo variant={"lg"} fw={"bolder"}>
          texto responsable
        </Typo>
        {
          <Jodit
            onChange={(e) => setAboutData({...aboutData, res_txt: e})}
            content={aboutData?.res_txt}
          />
        }
      </div>
      <div className='d-flex flex-column  gap-3 '>
        <Typo variant={"lg"} fw={"bolder"}>
          Título responsable
        </Typo>
        {
          <Jodit
            onChange={(e) => setAboutData({...aboutData, res_tit: e})}
            content={aboutData?.res_tit}
          />
        }
      </div>
      <div className='d-flex flex-column  gap-3'>
        <Typo variant={"lg"} fw={"bolder"}>
          imagen responsable
        </Typo>

        <DnDFile
          fileUrl={resUrl}
          setFileUrl={setResUrl}
          file={resFile}
          setFile={setResFile}
        />
      </div>

      <button onClick={handleUpdateAboutData} className='btn btn-success'>Guardar cambios</button>
      
    </div>
  );
};

export default AboutContent;
