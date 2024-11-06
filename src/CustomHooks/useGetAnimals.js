import axios from "axios";
import React, { useState } from "react";
import { globa_base_url } from "./../constant/index";
import { toast } from "react-hot-toast";

const useGetAllAnimals = () => {
  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [originalAnimals, setOriginalAnimals] = useState([]);

  const handleGetAllAnimals = async () => {
    setLoading(true);
    await axios
      .get(`${globa_base_url}animals/all_animals`)
      .then((res) => {
        if (res.data.status == "success") {
          setAnimals(res?.data?.result);
          setOriginalAnimals(res?.data?.result);
        } else {
          toast.error("There is a problem in raza!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetAllAnimals,
    animals,
    setAnimals,
    originalAnimals,
    setOriginalAnimals,
    loading,
    setLoading,
  };
};

export default useGetAllAnimals;
