import axios from "axios";
import React, { useState } from "react";
import { base_url } from "./../constant/index";
import { toast } from "react-hot-toast";

const useGetAnimalsTypes = () => {
  const [loading, setLoading] = useState(false);

  const [types, setTypes] = useState([]);
  const [originalTypes, setOriginalTypes] = useState([]);

  const handleGetTypes = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}get_all_especie_for_admin`)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setTypes(res?.data);
          console.log(res?.data);
          setOriginalTypes(res?.data);
        } else {
          toast.error("There is a problem !");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetTypes,
    types,
    setTypes,
    originalTypes,
    setOriginalTypes,
    loading,
    setLoading,
  };
};

export default useGetAnimalsTypes;
