import axios from "axios";
import React, { useState } from "react";
import { base_url, globa_base_url, img_base_url } from "../constant";
import { toast } from "react-hot-toast";

const useAdminMe = () => {
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("pits-token") ? localStorage.getItem("pits-token") : ""
  );

  const handleGetAdminData = async () => {
    setLoading(true);

    await axios
      .post(`${globa_base_url}user/admin_me?token=${token}`)
      .then((res) => {
        console.log(res);
        if (res && res.data) {
          console.log(res?.data);
          setAdminData(res?.data);
        } else {
          toast.error("Hay un problema");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetAdminData,
    adminData,
    setAdminData,
    loading,
  };
};

export default useAdminMe;
