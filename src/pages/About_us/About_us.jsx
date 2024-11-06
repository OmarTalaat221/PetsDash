import React, { useEffect, useState } from "react";
import useGetAboutPageData from "../../CustomHooks/useGetAboutPageData";
import Banner from "../../components/HomeComponents/HomeBanner/Banner";
import AboutBanner from "../../components/AboutUsPage/AboutBanner/AboutBanner";
import { base_url } from "../../constant";
import axios from "axios";
import OurTarget from "../../components/HomeComponents/OurTarget/OurTarget";
import RegisteredPets from "../../components/HomeComponents/Regisgtered/RegisteredPets";
import DNI_Card from "../../components/HomeComponents/DNI_Card/DNI_Card";
import AboutContent from "../../components/AboutUsPage/AboutContent/AboutContent";
import { ClipLoader } from "react-spinners";

const About_us = () => {
  const [bannerUrl, setBannerUrl] = useState("");
  const [aboutUrl, setAboutUrl] = useState("");
  const [resText, setResText] = useState("");
  const [resTit, setResTit] = useState("");
  const [resUrl, setResUrl] = useState("");

  const { handleGetAboutData, aboutData, setAboutData, loading, setLoading } =
    useGetAboutPageData();

  useEffect(() => {
    handleGetAboutData();
  }, []);

  useEffect(() => {
    if (aboutData) {
      console.log(aboutData);
      setBannerUrl(aboutData?.banner_image);
      setAboutUrl(aboutData?.no_img);
      setResText(aboutData?.res_text);
      setResTit(aboutData?.res_tit);
      setResUrl(aboutData?.res_img);
    }
  }, [aboutData]);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <ClipLoader size={50} color="rgb(54, 185, 204)" loading={loading} />
    </div>
  ) : (
    <div className="home_page">
      <div className="home_section">
        <AboutBanner
          bannerUrl={bannerUrl}
          setBannerUrl={setBannerUrl}
          aboutData={aboutData}
          setAboutData={setAboutData}
        />
      </div>

      {
        <AboutContent
          aboutUrl={aboutUrl}
          setAboutUrl={setAboutUrl}
          aboutData={aboutData}
          setAboutData={setAboutData}
          resText={resText}
          setResTxt={setResText}
          resTit={resTit}
          setResTit={setResTit}
          resUrl={resUrl}
          setResUrl={setResUrl}
        />
      }

      <hr />

      {/* <button onClick={handleUpdateHomeData} className='btn btn-success'>Guardar cambios</button> */}
    </div>
    // }
  );
};
export default About_us;
