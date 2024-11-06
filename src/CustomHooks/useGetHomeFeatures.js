import axios from "axios";
import React, { useState } from "react";
import { base_url } from "../constant";
import { toast } from "react-hot-toast";

const useGetHomeFeatures = () => {
  const [loading, setLoading] = useState(false);

  const [homeFeatures, setHomeFeatures] = useState([]);
  const [originalFeatures, setOriginalFeatures] = useState([]);

  const handleGetHomeFeatures = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}get_all_features_for_admin`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          console.log(res?.data);
          setHomeFeatures(res?.data.features);
          setOriginalFeatures(res?.data.features);
        } else {
          toast?.error("There is a problem i!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetHomeFeatures,
    loading,
    setLoading,
    homeFeatures,
    setHomeFeatures,
    originalFeatures,
    setOriginalFeatures,
  };
};

export default useGetHomeFeatures;
