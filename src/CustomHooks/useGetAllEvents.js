import axios from "axios";
import React, { useState } from "react";
import { base_url, img_base_url } from "../constant";
import { toast } from 'react-hot-toast';

const useGetAllEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);

  const handleGetEvents = async () => {
    setLoading(true);
    await axios
      .get(`${base_url}envatos/get_all`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          console.log(res?.data?.result);
          setEvents(res?.data?.result);
          
          setOriginalEvents(res?.data?.result);
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
    handleGetEvents,
    events,
    setEvents,
    loading,
    originalEvents,
    setOriginalEvents,
  };
};

export default useGetAllEvents;