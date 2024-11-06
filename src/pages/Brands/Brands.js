// import CustomInput from "../../components/CustomInput/CustomInput";
// import FormCard from "../../components/FormCard/FormCard";
// import "./Brands.css";
// import TableComponent from "../../components/Table/Table";
// import {useEffect, useState} from "react";
// import Modal from "../../components/Modal/Modal";
// import {FaPencil, FaPlus, FaRegTrashCan} from "react-icons/fa6";
// import {base_url} from "../../constant";
// import {uploadImage} from "../../constant/uploadImage";
// import axios from "axios";
// import {ToastContainer, toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import cx from "classnames";
// import {edit, plus, trashIcon} from "../../assets/svgIcons";
// import {Loader} from "rsuite";
// import {ClipLoader} from "react-spinners";
// import {Table} from "antd";
// import Spinner from "../../utils/Spinner/Spinner";
// import {FaTrash} from "react-icons/fa";
// import Typo from "../../utils/Typo/Typo";

// export default function Brands() {
//   const [showModeal, setShowModal] = useState({
//     editModal: false,
//     updatedStatus: false,
//     openModal: false,
//     deleteModal: false,
//   });

//   const headers = ["images", "Estado", "Acciones"];
//   const [rowData, setRowData] = useState({});
//   const [data, setData] = useState([]);
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [newImage, setNewImage] = useState(null);
//   const [newImageUrl, setNewImageUrl] = useState(null);
//   const [editedImage, setEditedImage] = useState(null);
//   const [copiedImage, setCopiedImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [addLoading, setAddLoading] = useState(false);
//   const [getLoading, setGetLoading] = useState(false);

//   const columns = [
//     {
//       title: "image ",
//       dataIndex: "image",
//       key: "image",
//       render: (image) => (
//         <div className='text-center'>
//           <img src={image} alt='' />,
//         </div>
//       ),
//     },
//     {
//       title: "Estado",
//       dataIndex: "hidden",
//       key: "hidden",
//       render: (text, row) => (
//         <div className='text-center'>
//           <div
//             className={cx("fw-bolder", {
//               "text-success": row.hidden == 0,
//               "text-danger": row.hidden != 0,
//             })}
//           >
//             {row.hidden == 0 ? "Mostrado" : "Oculta"}
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Comportamiento",
//       key: "Comportamiento",

//       render: (text, row) => (
//         <div className='d-flex align-items-center gap-2 justify-content-center'>
//           <button
//             onClick={() => {
//               setRowData(row);
//               setShowModal({...showModeal, updatedStatus: true});
//             }}
//             className=' btn-sm btn btn-info text-white'
//           >
//             cambiar estado
//           </button>
//           <button
//             onClick={() => {
//               setShowModal({...showModeal, editModal: true});
//               setRowData(row);
//             }}
//             className=' btn-sm btn btn-primary fs-6 text-white'
//           >
//             {edit}
//           </button>
//           <button
//             onClick={() => {
//               setRowData(row);
//               setShowModal({...showModeal, deleteModal: true});
//             }}
//             className=' btn-sm btn btn-danger fs-6 text-white'
//           >
//             <FaTrash />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   function handleCloseModal() {
//     setShowModal({
//       ...showModeal,
//       openModal: false,
//       updatedStatus: false,
//       editModal: false,
//     });
//   }

//   // to get all images in brands
//   const get_all_data = () => {
//     setGetLoading(true);
//     axios
//       .get(base_url + "brands/get_for_admin")
//       .then((res) => {
//         if (res.status === 200) {
//           setData(res.data.data);
//         }
//       })
//       .catch((error) => console.log(error))
//       .finally(() => {
//         setGetLoading(false);
//       });
//   };

//   // created new image
//   const createImage = async () => {
//     console.log("Created");
//     if (newImage) {
//       const formData = new FormData();
//       formData.append("image", newImage);
//       setIsDisabled(true);
//       try {
//         setAddLoading(true);
//         axios
//           .post("https://camp-coding.site/petsimages/file_update.php", formData)
//           .then((res) => {
//             setNewImageUrl(res.data.message);
//             setNewImage(null);
//             setIsDisabled(false);
//             setLoading(false);
//           });
//       } catch (error) {
//         notify(error, "error");
//         console.log(error);
//         setIsDisabled(false);
//       } finally {
//         setAddLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     if (newImageUrl) {
//       console.log(newImageUrl);
//       axios
//         .post("https://camp-coding.site/pets/api/admins/brands/add_new", {
//           image: newImageUrl,
//         })
//         .then((res) => {
//           console.log(res.data.message);
//           notify(res.data.message, "success");
//           setNewImageUrl(null);
//           get_all_data();
//         });
//     }
//   }, [newImageUrl]);

//   // to edit the data
//   const handleImageEditBtn = async () => {
//     if (!rowData.image) {
//       toast.error(" Deberías elegir una imagen");
//       return;
//     }

//     let image = null;
//     if (rowData.image instanceof File) {
//       image = await uploadImage(rowData.image);
//     }

//     const dataset = {
//       image: image ? image.data.message : rowData.image,
//     };

//     setLoading(true);
//     await axios
//       .post(`${base_url}brands/update_one/${rowData.id}`, dataset)
//       .then((res) => {
//         if (res.data.status === "success") {
//           toast.success(res.data.message);
//           setShowModal({...showModeal, editModal: false});
//           get_all_data();
//         }
//       })
//       .catch((error) => console.log(error))
//       .finally(() => setLoading(false));
//   };

//   // to delete the data  good
//   const notify = (message, success) => {
//     if (success === "success") {
//       toast.success(message);
//     } else if (success === "error") {
//       toast.error(message);
//     }
//   };
//   const handleBrandsDeleteBtn = (e) => {
//     setIsDisabled(true);
//     setLoading(true);
//     axios
//       .get(base_url + `brands/delete_one/${rowData.id}`)
//       .then((res) => {
//         console.log("deleted");
//         notify("marca eliminada exitosamente", "success");
//         setIsDisabled(false);
//         setLoading(false);
//         get_all_data();
//         setShowModal({...showModeal, deleteModal: false});
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//         setIsDisabled(false);
//         setShowModal({...showModeal, deleteModal: false});
//       });
//   };

//   //to update the status
//   const handleDepartUpdateBtn = (e) => {
//     setIsDisabled(true);
//     setLoading(true);
//     axios
//       .get(base_url + `brands/update_status/${rowData.id}`)
//       .then((res) => {
//         setShowModal({...showModeal, updatedStatus: false});
//         notify(res.data.message, "success");
//         setIsDisabled(false);
//         setLoading(false);
//         get_all_data();
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//         setIsDisabled(false);
//       });
//   };

//   useEffect(() => {
//     get_all_data();
//   }, []);

//   return (
//     <>
//       <ToastContainer />

//       {/* model that show edit modal */}
//       <Modal
//         title={"Confirmar actualización de marca"}
//         show={showModeal.editModal}
//         onClose={handleCloseModal}
//         showCloseBtn={true}
//         size='900px'
//         confirmButton={{
//           onClick: (e) => handleImageEditBtn(e),
//           children: loading ? (
//             <div className='d-flex justify-content-center align-items-center'>
//               <ClipLoader size={20} color='#fff' loading={loading} />
//             </div>
//           ) : (
//             "Actualizar"
//           ),
//           style: {backgroundColor: "#36b9cc"},
//         }}
//         cancelButton={{
//           onClick: handleCloseModal,
//           children: "Cerrar",
//           style: {backgroundColor: "#858796"},
//         }}
//       >
//         {loading ? (
//           <Spinner size={50} color='rgb(54, 185, 204)' loading={loading} />
//         ) : (
//           <form className='modal_form'>
//             {rowData.image ? (
//               <div className='d-flex flex-column gap-3'>
//                 <img
//                   src={
//                     rowData.image instanceof File
//                       ? URL.createObjectURL(rowData.image)
//                       : rowData?.image
//                   }
//                   alt=''
//                   style={{
//                     width: "150px",
//                     height: "130px",
//                     objectFit: "contain",
//                   }}
//                 />
//                 <div>
//                   <button
//                     onClick={() => {
//                       setCopiedImage(rowData.imaeg);
//                       setRowData({...rowData, image: null});
//                     }}
//                     className='btn btn-danger'
//                   >
//                     Eliminar
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <CustomInput
//                 label='Image'
//                 name='Image'
//                 type='file'
//                 accept='image/*'
//                 onChange={(e) =>
//                   setRowData({...rowData, image: e.target.files[0]})
//                 }
//               />
//             )}
//           </form>
//         )}
//       </Modal>
//       <div className='race_page'>
//         <FormCard header='Marcas'>
//           <form className='modal_form'>
//             {newImage ? (
//               <div>
//                 <div>
//                   <img
//                     src={
//                       newImage instanceof File
//                         ? URL.createObjectURL(newImage)
//                         : newImage
//                     }
//                     alt=''
//                     style={{width: "100px", height: "80px"}}
//                   />
//                 </div>
//                 <div
//                   className='btn btn-danger my-2'
//                   onClick={() => setNewImage(null)}
//                 >
//                   Eliminar
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <label htmlFor='id'>
//                   <div className='mb-2'>Icon</div>
//                   <Typo
//                     cursor={"pointer"}
//                     variant={"h3"}
//                     p={"10px"}
//                     bg={"primary"}
//                     color={"white"}
//                     br={"15px"}
//                     fit={true}
//                     className={""}
//                   >
//                     <FaPlus />
//                   </Typo>

//                   <CustomInput
//                     id='id'
//                     className='d-none'
//                     label=''
//                     name='image'
//                     type='file'
//                     accept='image/*'
//                     onChange={(e) =>
//                       // setRowData({ ...rowData, image: e.target.files[0] })
//                       setNewImage(e.target.files[0])
//                     }
//                   />
//                 </label>
//               </>
//             )}
//           </form>
//           {
//             newImage &&
//             <div className='mt-4 d-flex align-items-center gap-4'>
//               <button
//                 className='btn-sm btn btn-primary text-white'
//                 disabled={isDisabled}
//                 onClick={() => createImage()}
//               >
//                 {addLoading ? (
//                   <div className='d-flex justify-content-center align-items-center'>
//                     <ClipLoader size={20} color='#fff' loading={addLoading} />
//                   </div>
//                 ) : (
//                   "Agregar"
//                 )}
//               </button>
//             </div>
//           }
//         </FormCard>
//       </div>
//       <div className='search_table_container'>
//         {getLoading ? (
//           <Spinner size={50} color='rgb(54, 185, 204)' loading={getLoading} />
//         ) : (
//           <Table
//             className='custom-header'
//             columns={columns}
//             dataSource={data}
//           />
//         )}
//       </div>

//       <Modal
//         title={"Confirmar el estado de la actualización"}
//         show={showModeal.updatedStatus}
//         onClose={() => setShowModal({...showModeal, updatedStatus: false})}
//         showCloseBtn={true}
//         size='900px'
//         confirmButton={{
//           onClick: handleDepartUpdateBtn,
//           children: loading ? (
//             <div className='d-flex justify-content-center align-items-center'>
//               <ClipLoader size={20} color='#fff' loading={loading} />
//             </div>
//           ) : (
//             "actualizer"
//           ),
//           style: {backgroundColor: "#36b9cc"},
//           props: {disabled: isDisabled},
//         }}
//         cancelButton={{
//           onClick: () => setShowModal({...showModeal, updatedStatus: false}),
//           children: "Cerrar",
//           style: {backgroundColor: "#858796"},
//         }}
//       >
//         {loading ? (
//           <Spinner size={50} color='rgb(54, 185, 204)' loading={loading} />
//         ) : (
//           <h3>
//             {" "}
//             {rowData.hidden == 0
//               ? " ¿Estás seguro de ocultar este elemento?"
//               : "¿Estás seguro de que quieres mostrar este artículo?"}
//           </h3>
//         )}
//       </Modal>

//       {/* delete modal */}
//       <Modal
//         title={"Confirmar eliminar elemento"}
//         show={showModeal.deleteModal}
//         onClose={() => setShowModal({...showModeal, deleteModal: false})}
//         showCloseBtn={true}
//         size='900px'
//         confirmButton={{
//           onClick: handleBrandsDeleteBtn,
//           children: loading ? (
//             <div className='d-flex justify-content-center align-items-center'>
//               <ClipLoader size={20} color='#fff' loading={loading} />
//             </div>
//           ) : (
//             "Eliminar"
//           ),
//           style: {backgroundColor: "#cc3636"},
//           props: {disabled: isDisabled},
//         }}
//         cancelButton={{
//           //   no errors here
//           onClick: () => setShowModal({...showModeal, deleteModal: false}),
//           children: "Cerrar",
//           style: {backgroundColor: "#858796"},
//         }}
//       >
//         {loading ? (
//           <Spinner size={50} color='rgb(54, 185, 204)' loading={loading} />
//         ) : (
//           <h3>¿Quieres eliminar este elemento?</h3>
//         )}
//       </Modal>
//     </>
//   );
// }
