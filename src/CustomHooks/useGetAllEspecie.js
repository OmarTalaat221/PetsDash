import axios from "axios";
import React, { useState } from "react";
import { base_url } from "./../constant/index";
import { toast } from "react-hot-toast";

const useGetAllEspecie = () => {
  const [loading, setLoading] = useState(false);
  const [especie, setEspecie] = useState([]);
  const [originalEspecie, setOriginalEspecie] = useState([]);

  const handleGetAllEspecie = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}get_all_especie_for_admin`)
      .then((res) => {
        setEspecie(res?.data);
        setOriginalEspecie(res?.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetAllEspecie,
    especie,
    setEspecie,
    originalEspecie,
    setOriginalEspecie,
    loading,
    setLoading,
  };
};

export default useGetAllEspecie;
