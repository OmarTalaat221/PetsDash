

import axios from 'axios';
import React, { useState } from 'react'
import { base_url, globa_base_url } from '../constant';
import toast from 'react-hot-toast';

const useGetAdmins = () => {
  const [loading , setLoading] = useState(false);
  const [admins  , setAdmins] = useState([]);
  const [originalData ,setOriginalData] = useState();


  const handleGetAdmins = async () => {
    const token = localStorage.getItem("pits-token");
    setLoading(true);
    await axios.get(`${globa_base_url}user/get_admins?token=${token}`).then(res=>{
      console.log(res);
      if(res.data.status ==='success'){
        setAdmins(res.data.result);
        setOriginalData(res.data.result);
      }else{
        toast.error('Hay un problema!');
      }
      setLoading(false);
    })

  }




  return {handleGetAdmins , admins , setAdmins , loading ,originalData , setOriginalData}
}

export default useGetAdmins
