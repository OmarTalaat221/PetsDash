

import axios from 'axios';
import React, { useState } from 'react'
import { base_url, globa_base_url } from '../constant';
import toast from 'react-hot-toast';

const useGetAllAnimals = () => {
  const [loading , setLoading] = useState();
  const [allAnimals ,setAllAnimals] = useState([]);
  const [originalData ,setOriginalData] = useState();
  const getAllAnimals = async () => {

    setLoading(true);
    await axios.get(`${globa_base_url}animals/all_animals`).then(res=>{
      console.log(res);
      if(res.data.status ==='success'){
        setAllAnimals(res.data.result);
        setOriginalData(res.data.result);
      }else{
        toast.error('There is a problem in getting agrags!');
      }
      setLoading(false);
    })

  }









  return {loading, allAnimals ,  getAllAnimals , originalData, setOriginalData , setLoading}
}

export default useGetAllAnimals
