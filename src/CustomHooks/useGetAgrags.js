

import axios from 'axios';
import React, { useState } from 'react'
import { base_url } from '../constant';
import toast from 'react-hot-toast';

const useGetAgrags = () => {
  const [loading , setLoading] = useState();
  const [agrags ,setAgrags] = useState();
  const [originalData ,setOriginalData] = useState();
  const getAgrags = async () => {

    setLoading(true);
    await axios.get(`${base_url}get_agrags`).then(res=>{
      console.log(res);
      if(res.data.status ==='success'){
        setAgrags(res.data.result);
        setOriginalData(res.data.result);
      }else{
        toast.error('There is a problem in getting agrags!');
      }
      setLoading(false);
    })

  }









  return {loading, getAgrags , originalData, setAgrags , agrags}
}

export default useGetAgrags
