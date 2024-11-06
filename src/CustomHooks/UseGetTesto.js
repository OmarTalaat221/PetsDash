import axios from "axios";
import React, { useState } from "react";
import { base_url, img_base_url } from "../constant";
import { toast } from 'react-hot-toast';

const useGetTesto = () => {
  const [loading, setLoading] = useState(false);
  const [testo, setTesto] = useState([]);
  const [originalTesto, setOriginalTesto] = useState([]);

  const handleGetTesto = async () => {
    setLoading(true);
    await axios
      .get(`${img_base_url}says/get_all_for_admin`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res?.data?.result);
          setTesto(res?.data?.result);
          
          setOriginalTesto(res?.data?.result);
        } else {
          toast.error("There is a problem!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetTesto,
    testo,
    setTesto,
    loading,
    originalTesto,
  };
};

export default useGetTesto;