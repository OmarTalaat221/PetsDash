import axios from "axios";
import React, { useState } from "react";
import { base_url } from "./../constant/index";
import { toast } from "react-hot-toast";

const useGetDepProvencia = () => {
  const [loading, setLoading] = useState(false);

  const [depProv, setDepProv] = useState([]);
  const [originalDepProv, setOriginalDepProv] = useState([]);

  const handleGetDepProvs = async (depId) => {
    setLoading(true);
    await axios
      .get(`${base_url}departmento_prov/${depId}`)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res?.data);
          setDepProv(res?.data);
          setOriginalDepProv(res?.data);
        } else {
          toast.error("There is a problem in departments!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetDepProvs,
    depProv,
    setDepProv,
    originalDepProv,
    setOriginalDepProv,
    loading,
    setLoading,
  };
};

export default useGetDepProvencia;
