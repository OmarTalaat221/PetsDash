import axios from "axios";
import React, { useState } from "react";
import { base_url } from "../constant";
import { toast } from "react-hot-toast";

const useGetProvDis = () => {
  const [loading, setLoading] = useState(false);

  const [provDis, setProvDis] = useState([]);
  const [originalProvDis, setOriginalProvDis] = useState([]);

  const handleGetProvDis = async (provId) => {
    setLoading(true);
    await axios
      .get(`${base_url}prov_dis/${provId}`)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res?.data);
          setProvDis(res?.data);
          setOriginalProvDis(res?.data);
        } else {
          toast?.error("There is a problem!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetProvDis,
    loading,
    setLoading,
    provDis,
    setProvDis,
    originalProvDis,
    setOriginalProvDis,
  };
};

export default useGetProvDis;
