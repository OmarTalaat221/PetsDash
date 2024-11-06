import axios from "axios";
import React, { useState } from "react";
import { base_url, globa_base_url, img_base_url } from "../constant/index";
import { toast } from "react-hot-toast";

const useGetAllQualifications = () => {
  const [loading, setLoading] = useState(false);
  const [qualifications, setQualifications] = useState([]);
  const [originalQualifications, setOriginalQualifications] = useState([]);

  const handleGetAllQualifications = async () => {
    setLoading(true);
    await axios
      .get(`${globa_base_url}user/calification/get_all`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setQualifications(res?.data?.data);
          setOriginalQualifications(res?.data?.data);
        } else {
          toast.error("There is a problem in qualifications!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetAllQualifications,
    qualifications,
    setQualifications,
    originalQualifications,
    setOriginalQualifications,
    loading,
    setLoading,
  };
};

export default useGetAllQualifications;
