import axios from "axios";
import React, { useState } from "react";
import { base_url, img_base_url } from "../constant";
import { toast } from "react-hot-toast";

const useGetFaqs = () => {
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [originalFaqs, setOriginalFaqs] = useState([]);

  const handleGetFaqus = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}get_all_faqs_for_admin`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          console.log(res?.data?.Faqs);
          setFaqs(res?.data?.Faqs);

          setOriginalFaqs(res?.data?.Faqs);
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
    handleGetFaqus,
    faqs,
    setFaqs,
    loading,
    originalFaqs,
  };
};

export default useGetFaqs;
