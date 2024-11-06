

import React, { useState } from "react";
import { base_url, img_base_url } from "../constant";
import { toast } from 'react-hot-toast';
import axios from "axios";
const useGetAllAgreements = () => {

  const [loading, setLoading] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [orignalAgreements, setOriginalAgreements] = useState([]);

  const handleGerAgreements = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}agrements/get_all_for_admin`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setAgreements(res?.data?.data);
          
          setOriginalAgreements(res?.data?.data);
        } else {
          toast.error("Hay un problema");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };







  return {handleGerAgreements , loading , agreements , setAgreements , orignalAgreements , setOriginalAgreements}
}

export default useGetAllAgreements
