// import CustomInput from "../../components/CustomInput/CustomInput";
// import CustomButton from "../../components/CustomButton/CustomButton";
// import FormCard from "../../components/FormCard/FormCard";
// import "./DeliveryMan.css";
// import { FaFile, FaSearch } from "react-icons/fa";
// import TableComponent from "../../components/Table/Table";
// import { race } from "../../utils/race";
// import { useEffect, useState } from "react";
// import Modal from "../../components/Modal/Modal";
// import FromGroup from "./../../components/FromGroup/FromGroup";
// import CustomSelect from "./../../components/CustomSelect/CustomSelect";
// import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
// import { base_url } from "../../constant";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LoadingOutlined } from "@ant-design/icons";
// import { Flex, Spin, Table } from "antd";
// import cx from "classnames";
// import Spinner from "../../utils/Spinner/Spinner";
// export default function DeliveryMan() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   // const [isSearch, setIsSearch] = useState(false);
//   const [isSubmitForm, setIsSubmitForm] = useState(false);
//   const [showUpdateStatus, setShowUpdateStatus] = useState(false);
//   const [rowData, setRowData] = useState({});

//   // Hmada
//   const [data, setData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [updatedId, setUpdatedId] = useState("");
//   const [phoneInputValue, setPhoneInputValue] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [postedData, setPostedData] = useState({
//     name: "",
//     phone: "",
//   });

//   const handleEmptyData = () => {
//     setPostedData({
//       name: "",
//       phone: "",
//     });
//   };

//   const [deleteModal, setDeleteModal] = useState(false);
//   function handleOpenModal() {
//     setIsOpenModal(true);
//   }
//   function handleCloseModal() {
//     setIsOpenModal(false);
//     setIsSubmitForm(false);
//     setShowUpdateStatus(false);
//     setDeleteModal(false);
//   }

//   function handleSubmitRaceForm(e) {
//     e.preventDefault();
//     setIsSubmitForm(true);
//     // setIsSearch(false);
//     setIsOpenModal(false);
//     createDataDelivery();
//   }

//   // function to get all data (deleivery man information)

//   const get_all_data = () => {
//     setLoader(true);

//     axios
//       .get(base_url + "get_all_delivery_for_admin")
//       .then((res) => {
//         console.log(res);
//         if (res.status === 200 && Array.isArray(res.data.Delivery)) {
//           setData(res.data.Delivery);
//           setOriginalData(res.data.Delivery);

//           console.log(filteredData);
//         }
//       })
//       .catch((error) => console.log(error))
//       .finally(() => setLoader(false));
//   };

//   // function to post data (delievery man information) in table

//   // to post data into raza
//   const createDataDelivery = async () => {
//     setIsDisabled(true);
//     console.log(postedData);
//     console.log(postedData.name === "undefined");
//     if (postedData.name !== "" && postedData.phone !== "") {
//       try {
//         axios.post(base_url + "create_delivery", postedData).then((res) => {
//           setIsDisabled(false);
//           toast.success(res.data.message);
//           get_all_data();
//         });
//       } catch (error) {
//         console.log(error);
//         setIsDisabled(false);
//       }
//     }
//   };

//   // function to update status of deleiver in table

//   const handleDepartUpdateBtn = async () => {
//     setLoader(true);
//     setIsDisabled(true);
//     console.log(updatedId);
//     try {
//       const res = await axios.get(
//         base_url + `update_delivery_status/${updatedId}`
//       );
//       console.log(res.data.message);
//       toast.success(res.data.message);
//       setShowUpdateStatus(false);
//       get_all_data();
//     } catch (error) {
//       setShowUpdateStatus(false);
//       console.error(error);
//     } finally {
//       setLoader(false);
//       setIsDisabled(false);
//     }
//   };

//   // to delete the data

//   const handleDeliveryDeleteBtn = (e) => {
//     console.log(e);
//     setIsDisabled(true);
//     setLoader(true);
//     axios
//       .post(base_url + `delete_delivery/${e}`)
//       .then((res) => {
//         console.log(res.data);
//         toast.success(res.data.message);
//         setIsDisabled(false);
//         handleCloseModal();
//         get_all_data();
//       })
//       .catch((error) => {
//         console.log(error);
//         setIsDisabled(false);
//       })
//       .finally(() => setLoader(false));
//     console.log("after dlete");
//   };

//   // handle search
//   // let newData = []
//   useEffect(() => {
//     const newData = data.filter((item) => item.phone.includes(phoneInputValue));
//     setFilteredData(newData);
//   }, [phoneInputValue]);
//   // console.log(especeiData)
//   useEffect(() => {
//     get_all_data();
//     // getAllEspSelection()
//   }, []);

//   useEffect(() => {
//     if (
//       originalData &&
//       originalData.length > 0 &&
//       Array.isArray(originalData)
//     ) {
//       if (phoneInputValue.length >= 1) {
//         const newData = originalData.filter((item) => {
//           if (
//             phoneInputValue &&
//             !item?.name.includes(phoneInputValue) &&
//             !item?.phone.includes(phoneInputValue)
//           ) {
//             return false;
//           }

//           return true;
//         });
//         setData(newData);
//       } else {
//         setData(originalData);
//       }
//     }
//   }, [phoneInputValue, originalData]);
//   const columns = [
//     {
//       title: "Nombre",
//       dataIndex: "title",
//       key: "title",
//       render: (text, row) => (
//         <div className="text-center" color="green">
//           {row.name}
//         </div>
//       ),
//     },
//     {
//       title: "Teléfono",
//       dataIndex: "title",
//       key: "title",
//       render: (text, row) => (
//         <div className="text-center" color="green">
//           {row.phone}
//         </div>
//       ),
//     },
//     {
//       title: "Estado",
//       dataIndex: "title",
//       key: "title",
//       render: (text, row) => (
//         <div
//           className={cx("text-center fw-bolder", {
//             "text-danger": row.hidden == "1",
//             "text-success": row.hidden != "1",
//           })}
//           color="green"
//         >
//           {row.hidden == 0 ? "Mostrado" : "Oculta"}
//         </div>
//       ),
//     },
//     {
//       title: "comportamiento",
//       dataIndex: "title",
//       key: "title",
//       render: (text, row) => (
//         <div className="edit_btns justify-content-center">
//           <button
//             className="update_status_benefit"
//             onClick={(e) => {
//               // to open the confirm form
//               setShowUpdateStatus(true);
//               setRowData(row);
//               setUpdatedId(row.id);
//             }}
//           >
//             Actualizar
//           </button>
//           <button
//             onClick={() => {
//               setRowData(row);
//               setDeleteModal(true);
//             }}
//             disabled={isDisabled}
//           >
//             <FaRegTrashCan />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <ToastContainer />

//       <Modal
//         title="Registrador Repartidor"
//         show={isOpenModal}
//         onClose={handleCloseModal}
//         showCloseBtn={true}
//         size="900px"
//         confirmButton={{
//           onClick: handleSubmitRaceForm,
//           children: " Guardar",
//           // onChange:{handleGuardarBtn},
//           style: { backgroundColor: "#36b9cc" },
//         }}
//         cancelButton={{
//           onClick: handleCloseModal,
//           children: "Cerrar",
//           style: { backgroundColor: "#858796" },
//         }}
//       >
//         <form className="modal_form">
//           <CustomInput
//             label="Nombre"
//             placeholder="Escriba el name de la Delievery..."
//             onChange={(e) =>
//               setPostedData({ ...postedData, name: e.target.value })
//             }
//           />
//           <CustomInput
//             label="Teléfono"
//             placeholder="Ingresa el teléfono del Delivery..."
//             onChange={(e) =>
//               setPostedData({ ...postedData, phone: e.target.value })
//             }
//           />
//         </form>
//       </Modal>

//       <div className="race_page">
//         <FormCard header="Repartidor">
//           <div>
//             <CustomInput
//               className="department-search"
//               label={"Buscar"}
//               placeholder="buscar..."
//               onChange={(e) => setPhoneInputValue(e.target.value)}
//             />
//           </div>

//           <div className="mt-4 d-flex align-items-center gap-4">
//             <CustomButton
//               textColor="#333"
//               onClick={handleOpenModal}
//               text="Nuevo"
//               icon={<FaFile />}
//               color={"#222"}
//               bgColor="#fff"
//             />
//           </div>
//         </FormCard>
//       </div>

//       {loader ? (
//         <Spinner size={50} loading={loader} color={"rgb(54,185,204)"} />
//       ) : (
//         <>
//           <Modal
//             title="Estado de actualización"
//             show={showUpdateStatus}
//             onClose={handleCloseModal}
//             showCloseBtn={true}
//             size="900px"
//             confirmButton={{
//               onClick: (item) => handleDepartUpdateBtn(item),
//               children: " Guardar",
//               style: { backgroundColor: "#36b9cc" },
//               props: { disabled: isDisabled },
//             }}
//             cancelButton={{
//               //   no errors here
//               onClick: handleCloseModal,
//               children: "Cerrar",
//               style: { backgroundColor: "#858796" },
//             }}
//           >
//             {/* loadin  */}
//             {loader ? (
//               <Flex align="center" className="loader" gap="middle">
//                 <Spin
//                   indicator={
//                     <LoadingOutlined
//                       style={{
//                         fontSize: 48,
//                       }}
//                       spin
//                     />
//                   }
//                 />
//               </Flex>
//             ) : null}
//             {rowData.hidden == 0 ? (
//               <h1>¿Estás seguro de ocultar este elemento?</h1>
//             ) : (
//               <h1>¿Estás seguro de que deseas mostrar este artículo?</h1>
//             )}
//           </Modal>
//           <Modal
//             title="Confirmación de eliminación"
//             show={deleteModal}
//             onClose={handleCloseModal}
//             showCloseBtn={true}
//             size="900px"
//             confirmButton={{
//               onClick: () => handleDeliveryDeleteBtn(rowData.id),
//               children: " Borrar",
//               props: { disabled: isDisabled, className: "btn btn-danger" },
//             }}
//             cancelButton={{
//               //   no errors here
//               onClick: handleCloseModal,
//               children: "Cerrar",
//               style: { backgroundColor: "#858796" },
//             }}
//           >
//             {/* loadin  */}
//             {loader ? (
//               <Flex align="center" className="loader" gap="middle">
//                 <Spin
//                   indicator={
//                     <LoadingOutlined
//                       style={{
//                         fontSize: 48,
//                       }}
//                       spin
//                     />
//                   }
//                 />
//               </Flex>
//             ) : null}
//             <h2 className="my-3">¿Realmente desea eliminar este elemento?</h2>
//           </Modal>

//           <div className="search_table_container">
//             <Table
//               className="custom-header"
//               columns={columns}
//               dataSource={data}
//             />
//           </div>
//         </>
//       )}
//     </>
//   );
// }
