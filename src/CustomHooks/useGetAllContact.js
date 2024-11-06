import axios from "axios";
import React, { useState } from "react";
import { base_url, globa_base_url } from "./../constant/index";
import { toast } from "react-hot-toast";

const useGetAllContact = () => {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState([]);
  const [originalContact, setOriginalContact] = useState([]);

  const handleGetAllContact = async () => {
    setLoading(true);
    await axios
      .get(`${globa_base_url}user/get_site_info`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setContact(res?.data?.site_info);
          setOriginalContact(res?.data?.site_info);
        } else {
          toast.error("There is a problem in contact!");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleGetAllContact,
    contact,
    setContact,
    originalContact,
    setOriginalContact,
    loading,
    setLoading,
  };
};

export default useGetAllContact;
