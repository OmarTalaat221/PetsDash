import React, { useState } from "react";
import { base_url } from "../constant";
import axios from "axios";
import { toast } from "react-hot-toast";

const useGetHomeData = () => {
  const [loading, setLoading] = useState(false);

  const [homeData, setHomeData] = useState([]);

  const handleGetHomeData = async () => {
    await axios
      .get(`${base_url}home_data`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setHomeData(res?.data?.result);
          // alert(JSON.stringify(res?.data?.result))
        } else {
          toast.error("There is a problem in home data!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleGetHomeData, homeData, setHomeData, loading, setLoading };
};

export default useGetHomeData;
