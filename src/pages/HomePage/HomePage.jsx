import React, { useEffect, useState } from "react";
import "./styles.css";
import Typo from "./../../utils/Typo/Typo";
import Banner from "../../components/HomeComponents/HomeBanner/Banner";
import OurTarget from "../../components/HomeComponents/OurTarget/OurTarget";
import RegisteredPets from "./../../components/HomeComponents/Regisgtered/RegisteredPets";
import DNI_Card from "./../../components/HomeComponents/DNI_Card/DNI_Card";
import useGetHomeData from "../../CustomHooks/useGetHomeData";
import axios from "axios";
import { base_url } from "../../constant";
import Jodit from "./../../utils/jodit/Jodit";
import { uploadImage } from "../../constant/uploadFiles";
import { ClipLoader } from "react-spinners";
const HomePage = () => {
  // const {handleGetHomeData , homeData:homeData , setHomeData:setHomeData , loading , setLoading} = useGetHomeData()
  // console.log(homeData,"homeData")
  // useEffect(()=>{
  //   handleGetHomeData()
  // },[])
  const [loading, setLoading] = useState(false);
  const [originalHomeData, setOriginalHomeData] = useState({});
  const [bannerUrl, setBannerUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [dniURl, setDniUrl] = useState("");

  const getHomeData = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}home_data`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setOriginalHomeData(res.data.result);
          setBannerUrl(res.data.result.banner_img);
          setTargetUrl(res.data.result.propiedad_image);
          setDniUrl(res.data.result.dni_image);
          // alert(JSON.stringify(res?.data?.result))
        } else {
          // toast.error("There is a problem in home data!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getHomeData();
  }, []);

  const handleUpdateHomeData = async () => {
    let bannerImage = null;
    if (originalHomeData?.banner_file) {
      bannerImage = await uploadImage(originalHomeData?.banner_file);
      delete originalHomeData.banner_file;
    }
    let propiedadImage = null;
    if (originalHomeData?.propiedad_file) {
      propiedadImage = await uploadImage(originalHomeData?.propiedad_file);
      delete originalHomeData.propiedad_file;
    }
    let dniImage = null;
    if (originalHomeData?.dni_file) {
      dniImage = await uploadImage(originalHomeData?.dni_file);
      delete originalHomeData.dni_file;
    }

    const dataset = {
      ...originalHomeData,
      banner_img: bannerImage || originalHomeData.banner_img,
      propiedad_image: propiedadImage || originalHomeData.propiedad_image,
      dni_image: dniImage || originalHomeData.dni_image,
    };

    console.log(dataset);
    // return

    await axios
      .post(`${base_url}update_home_page`, dataset)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setOriginalHomeData(res.data.result);
          setBannerUrl(res.data.result.banner_img);
          setTargetUrl(res.data.result.propiedad_image);
          setDniUrl(res.data.result.dni_image);
          getHomeData();
          // alert("changed successfully")
        } else {
          // toast.error("There is a problem in home data!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return loading ? (
    <div className="py-2 d-flex justify-content-center align-items-center">
      <ClipLoader size={50} color="rgb(54, 185, 204)" loading={loading} />
    </div>
  ) : (
    <div className="home_page">
      <div className="home_section">
        <Banner
          bannerUrl={bannerUrl}
          setBannerUrl={setBannerUrl}
          homeData={originalHomeData}
          setHomeData={setOriginalHomeData}
        />
      </div>

      <hr />
      <OurTarget
        targetUrl={targetUrl}
        setTargetUrl={setTargetUrl}
        homeData={originalHomeData}
        setHomeData={setOriginalHomeData}
      />
      <hr />
      <RegisteredPets
        homeData={originalHomeData}
        setHomeData={setOriginalHomeData}
      />
      <hr />
      <DNI_Card
        dniURl={dniURl}
        setDniUrl={setDniUrl}
        homeData={originalHomeData}
        setHomeData={setOriginalHomeData}
      />

      <button onClick={handleUpdateHomeData} className="btn btn-success">
        Guardar cambios
      </button>
    </div>
  );
};

export default HomePage;
