import React, { useState } from "react";
import { base_url } from "../constant";
import axios from "axios";
import { toast } from "react-hot-toast";

const useGetAboutPageData = () => {
  const [loading, setLoading] = useState(false);

  const [aboutData, setAboutData] = useState([]);

  const handleGetAboutData = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}about_data`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setAboutData(res?.data?.result);
        } else {
          toast.error("There is a problem in about page!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleGetAboutData, aboutData, setAboutData, loading, setLoading };
};

export default useGetAboutPageData;
