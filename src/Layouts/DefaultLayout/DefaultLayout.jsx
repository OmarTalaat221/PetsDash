import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUp from "../../pages/SignUp/SignUp";
import Login from "../../pages/Login/Login";
import ForgetPassword from "../../pages/ForgetPassword/ForgetPassword";
import "./style.css";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import useAdminMe from "../../CustomHooks/useAdminMe";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import CheckCode from "../../pages/checkCode/checkCode";
import { ClipLoader } from "react-spinners";
import Modal from "../../components/Modal/Modal";
const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSide, setShowSide] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  useLayoutEffect(() => {
    handleGetAdminData();
  }, []);

  const { handleGetAdminData, adminData, setAdminData, loading, originalFaqs } =
    useAdminMe();

  useLayoutEffect(() => {
    console.log(adminData);
  }, [adminData]);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center my-3">
      <ClipLoader size={50} color="rgb(54, 185, 204)" loading={loading} />
    </div>
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="z_index"
      />
      {!adminData ? (
        <Routes>
          {/* <Route path='/signup' element={<SignUp />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/chekc_code" element={<CheckCode />} />
        </Routes>
      ) : (
        <>
          <div className="main_layout ">
            <AnimatePresence>
              {showSide && (
                <motion.div
                  className="sidebar_content "
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                >
                  <Sidebar
                    logoutModal={logoutModal}
                    setLogoutModal={setLogoutModal}
                    showSide={showSide}
                    setShowSide={setShowSide}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className={cx("body_content", { open: showSide })}
              style={{ backgroundColor: "#f8f9fc" }}
            >
              <Navbar
                logoutModal={logoutModal}
                setLogoutModal={setLogoutModal}
                showSide={showSide}
                setShowSide={setShowSide}
              />
              {children}
              <Footer />
            </motion.div>
          </div>
          <Modal
            size={"90%"}
            show={logoutModal}
            showCloseBtn
            animation={true}
            title={"Cerrar sesión"}
            onClose={() => setLogoutModal(false)}
            confirmButton={{
              children: "Cerrar sesión",
              style: { backgroundColor: "#36b9cc" },
              onClick: () => {
                localStorage.removeItem("pits-token");
                localStorage.removeItem("petsDashUser");

                window.location.reload();
              },
            }}
            cancelButton={{
              children: "Cerrar",
              onClick: () => {
                setLogoutModal(false);
              },
              style: { backgroundColor: "#858796" },
            }}
            children={
              <>
                <h3>¿De verdad quieres cerrar sesión?</h3>
              </>
            }
          />
        </>
      )}
    </>
  );
};

export default DefaultLayout;
