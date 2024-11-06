import React from 'react'
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import Account from './pages/Account/Account'
import Mascota from './pages/Mascota/Mascota'
import SearchPage from './pages/SearchPage/SearchPage'
import AgreementPage from './pages/Agreement/AgreementPage'
import DNI_page from './pages/DNI_page/DNI_page'
import Envato from './pages/EnvatoPage/Envato';
import SignUp from './pages/SignUp/SignUp'
import DefaultLayout from './Layouts/DefaultLayout/DefaultLayout';
import RoutesData from './Routes/Routes'
import "./App.css";
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <>
  


    

  <DefaultLayout>
  <Toaster
  position="top-right"
  reverseOrder={false}
  containerClassName='z_index'
/>
    <RoutesData />
  </DefaultLayout>


      {/* <Routes>
         <Route path="/" element={<Layout />}>
         <Route path="/account" element={<Account />} />
         <Route path='/pets' element={<Mascota />}/>
         <Route path='/search' element={<SearchPage />}/>
         <Route path='/agreemetns' element={<AgreementPage />}/>
         <Route path='/dni' element={<DNI_page />}/>
         <Route path='/envato' element={<Envato />}/>

         <Route path='/signup' element={<SignUp />}/>
         </Route>
      </Routes> */}
    </>
  )
}
