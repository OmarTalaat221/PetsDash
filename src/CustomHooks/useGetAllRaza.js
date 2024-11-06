import axios from "axios";
import React, { useState } from "react";
import { base_url } from "./../constant/index";
import { toast } from "react-hot-toast";

const useGetAllRaza = () => {
  const [loading, setLoading] = useState(false);
  const [raza, setRaza] = useState([]);
  const [originalRaza, setOriginalRaza] = useState([]);

  const handleGetAllRaza = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}get_all_raza_for_admin`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setRaza(res?.data?.Raza);
          setOriginalRaza(res?.data?.Raza);
        } else {
          toast.error("There is a problem in raza!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetAllRaza,
    raza,
    setRaza,
    originalRaza,
    setOriginalRaza,
    loading,
    setLoading,
  };
};

export default useGetAllRaza;
