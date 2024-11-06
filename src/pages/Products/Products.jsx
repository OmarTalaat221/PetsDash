import React, { useEffect, useState } from "react";
import TableComponent from "../../components/Table/Table";
import "./style.css";
import { FaFolderPlus, FaPencil, FaTrash } from "react-icons/fa6";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormCard from "../../components/FormCard/FormCard";
import CustomInput from "../../components/CustomInput/CustomInput";
import { Button } from "react-bootstrap";
import "rsuite/Button/styles/index.css";
import { Loader } from "rsuite";
import { Table } from "antd";
import Spinner from "./../../utils/Spinner/Spinner";
import cx from "classnames";
import { uploadImage } from "./../../constant/uploadImage";
import { base_url } from "../../constant";
import toast from "react-hot-toast";
import { edit } from "../../assets/svgIcons";
export const Products = () => {
  const [data, setData] = useState([]);
  const [Img, setImg] = useState();

  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [DeleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [FAQSModal, setFAQSModal] = useState(false);
  const [NewProduct, setNewProduct] = useState(false);
  const [EditProduct, setEditProduct] = useState(false);
  const [RowDataFeaturs, setRowDataFeaturs] = useState();
  const [RowDataFAQS, setRowDataFAQS] = useState();

  const [AddNewProductData, setAddNewProductData] = useState({
    name_en: "",
    name_es: "",
    description_en: "",
    description_es: "",
    image: null,
    price: "",
    features: "",
    faqs: "",
  });

  const handleEmptyData = () => {
    setAddNewProductData({
      name_en: "",
      name_es: "",
      description_en: "",
      description_es: "",
      image: null,
      price: "",
      features: "",
      faqs: "",
    });

    setFAQSInputs([
      {
        ans_en: "",
        ans_es: "",
        ques_en: "",
        ques_es: "",
      },
    ]);

    setInputPairs([{ feature_description_en: "", feature_description_es: "" }]);
  };

  const [RowData, setRowData] = useState();
  const [modalStatus, setModalStatus] = useState(false);

  const Featuresheaders = ["Descripción en Inglés", "Descripción en Español"];

  const FAQSheaders = [
    "Pregunta en Inglés",
    "Pregunta en Español",
    "Respuestas en Inglés",
    "Respuestas en Español",
  ];

  const [inputPairs, setInputPairs] = useState([
    { feature_description_en: "", feature_description_es: "" },
  ]);

  const handleInputChange = (index, field, event) => {
    const newInputPairs = [...inputPairs];
    newInputPairs[index][field] = event.target.value;
    setInputPairs(newInputPairs);
  };

  const handleAddInputPair = () => {
    setInputPairs([
      ...inputPairs,
      { feature_description_en: "", feature_description_es: "" },
    ]);
  };

  const handleRemoveInputPair = (indexToRemove) => {
    setInputPairs(inputPairs.filter((_, index) => index !== indexToRemove));
  };

  const [FAQSInputs, setFAQSInputs] = useState([
    {
      ans_en: "",
      ans_es: "",
      ques_en: "",
      ques_es: "",
    },
  ]);

  const handleFAQSChange = (index, field, event) => {
    const newInputFAQs = [...FAQSInputs];
    newInputFAQs[index][field] = event.target.value;
    setFAQSInputs(newInputFAQs);
  };

  const handleAddFAQSPair = () => {
    setFAQSInputs([
      ...FAQSInputs,
      {
        ans_en: "",
        ans_es: "",
        ques_en: "",
        ques_es: "",
      },
    ]);
  };

  const handleRemoveFAQSPair = (indexToRemove) => {
    setFAQSInputs(FAQSInputs.filter((_, index) => index !== indexToRemove));
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const get_all_data = async () => {
    setLoading(true);
    axios
      .get(base_url + "get_products_for_admin")
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setData(res.data);
          console.log(data);
        } else if (res.data.status === "faild") {
          toast.error(res.data.message);
        } else {
          toast.error("someThing went wrong");
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    get_all_data();
    console.log(data);
  }, []);

  const UploadNewImg = async () => {
    if (Img) {
      const formData = new FormData();
      formData.append("image", Img);

      try {
        const response = await axios.post(
          "https://camp-coding.site/pets/api/img_upload",
          formData
        );

        setRowData({
          ...RowData,
          image: response.data.result.image,
        });
        // imgUrl = response.data.result.image
        console.log(response);

        console.log(response.data.result.image);
        console.log(response.result.image);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handelAddNewProduct = async () => {
    let imgUrl = null;

    if (!AddNewProductData.image) {
      toast.error("Elija una imagen para el producto!");
      return;
    }

    if (!AddNewProductData.name_en) {
      toast.error("Introduzca el nombre del producto en inglés!");
      return;
    }

    if (!AddNewProductData.name_es) {
      toast.error("Introduce el nombre en español del producto!");
      return;
    }
    if (!AddNewProductData.description_en) {
      toast.error("Ingrese una descripción en inglés del producto.");
      return;
    }
    if (!AddNewProductData.description_es) {
      toast.error("Ingrese una descripción en español del producto.");
      return;
    }

    if (!AddNewProductData?.price) {
      toast.error("Introduzca el precio para el precio!");
      return;
    }

    if (AddNewProductData?.price < 1) {
      toast.error("Precio menor a 1!");
      return;
    }

    const featuresData = inputPairs
      .map((item) => Object.values(item).flat(100))
      .flat();
    const emptyFeature = featuresData.findIndex((item) => !item).toString();

    if (emptyFeature != "-1") {
      toast.error("Datos completos de características!");
      return;
    }

    const faqsData = FAQSInputs.map((item) =>
      Object.values(item).flat(100)
    ).flat();
    const emptyfaq = faqsData.findIndex((item) => !item).toString();

    if (emptyfaq != "-1") {
      toast.error("Datos completos de preguntas frecuentes");
      return;
    }

    if (AddNewProductData.image) {
      imgUrl = await uploadImage(AddNewProductData.image);
      imgUrl = imgUrl.data.message;
    }

    console.log(imgUrl);

    // let AllFeaturs = values.join("**")
    const joinedDescriptions = inputPairs.map((item) => {
      return item.feature_description_en + "**" + item.feature_description_es;
    });

    const joinedFAQS = FAQSInputs.map((item) => {
      return (
        item.ques_en +
        "**" +
        item.ques_es +
        "**" +
        item.ans_en +
        "**" +
        item.ans_es
      );
    });

    console.log(joinedDescriptions);

    let featuresValues = joinedDescriptions.join("**pets**");
    console.log(featuresValues);

    let FAQSValues = joinedFAQS.join("**pets**");

    const dataSendAddProd = {
      name_en: AddNewProductData.name_en,
      name_es: AddNewProductData.name_es,
      description_en: AddNewProductData.description_en,
      description_es: AddNewProductData.description_es,
      image: imgUrl,
      price: AddNewProductData.price,
      features: featuresValues,
      product_faqs: FAQSValues,
    };

    console.log(dataSendAddProd);
    console.log(inputPairs);
    console.log(FAQSInputs);
    setAddLoading(true);
    await axios
      .post(
        "https://camp-coding.site/pets/api/admins/create_product",
        dataSendAddProd,
        {
          headers: {
            lang: "es",
          },
        }
      )
      .then((res) => {
        if ((res.data.status = "success")) {
          console.log(res);
          toast.success("product add successfully");
          get_all_data();
          setNewProduct(false);
          handleEmptyData();
        } else if ((res.data.status = "faild")) {
          toast.error(res.data.message);
        } else {
          toast.error("someThing went wrong");
        }
      })
      .finally(() => {
        setAddLoading(false);
      })
      .catch((e) => {
        console.log(e);
        // toast.error(e?.response?.data?.errors?.features[0]);
      });
  };

  const handelEditProduct = async () => {
    if (RowData.image === null) {
      toast.error("Por favor ingrese la imagen del producto");
      return;
    }

    if (RowData.name_en === "") {
      toast.error("Por favor ingrese el nombre del producto en inglés");
      return;
    }
    if (RowData.name_es === "") {
      toast.error("Por favor ingrese el nombre del producto en español");
      return;
    }
    if (RowData.description_en === "") {
      toast.error("Por favor ingrese la descripción del producto en inglés");
      return;
    }
    if (RowData.description_es === "") {
      toast.error("Por favor ingrese la descripción del producto en español");
      return;
    }
    if (RowData.price === "") {
      toast.error("Por favor ingrese el precio del producto");
      return;
    }
    console.log(RowData);

    const joinedDescriptions = inputPairs
      .map((item) => {
        return item.feature_description_en + "**" + item.feature_description_es;
      })
      .join("**pets**");

    const joinedFAQS = FAQSInputs.map((item) => {
      return (
        item.ques_en +
        "**" +
        item.ques_es +
        "**" +
        item.ans_en +
        "**" +
        item.ans_es
      );
    }).join("**pets**");

    console.log(joinedDescriptions);

    let image = null;
    if (RowData?.image instanceof File) {
      image = await uploadImage(RowData?.image);
      image = image?.data.message;
    }

    const dataSendAddProd = {
      name_en: RowData?.name_en,
      name_es: RowData?.name_es,
      description_en: RowData?.description_en,
      description_es: RowData?.description_es,
      image: image || RowData?.image,
      price: RowData?.price,
      features: joinedDescriptions,
      product_faqs: joinedFAQS,
    };

    console.log(dataSendAddProd);
    console.log(RowDataFAQS);
    console.log(RowDataFeaturs);

    setEditLoading(true);
    await axios
      .post(
        `https://camp-coding.site/pets/api/admins/update_product/${RowData?.id}`,
        dataSendAddProd,
        {
          headers: {
            lang: "es",
          },
        }
      )
      .then((res) => {
        if ((res.data.status = "success")) {
          console.log(res);
          toast.success("product add successfully");
          get_all_data();
          setEditProduct(false);
        } else if ((res.data.status = "faild")) {
          toast.error("faild to edit product");
        } else {
          toast.error("someThing went wrong");
        }
      })
      .finally(() => {
        setEditLoading(false);
      })
      .catch((e) => {
        console.log(e);
        // toast.error(e?.response?.data?.errors?.features[0]);
      });
  };

  const deleteProduct = () => {
    console.log(RowData.id);
    setDeleteLoading(true);
    // return
    axios
      .post(`${base_url}delete_product/${RowData.id}`)
      .then((res) => {
        get_all_data();
        toast.success(res.data.message);
        setDeleteModal(false);
      })
      .finally(() => {
        setDeleteLoading(false);
      })
      .catch((error) => toast.error(error));
  };

  const columns = [
    {
      title: "Imagen",
      dataIndex: "Imagen",
      key: "Imagen",
      render: (text, row) => (
        <img style={{ width: "80px" }} src={row.image} alt="" />
      ),
    },
    {
      title: "Nombre en Inglés",
      dataIndex: "name_en",
      key: "name_en",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Nombre en Español",
      dataIndex: "name_es",
      key: "name_es",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Descripción en Inglés",
      dataIndex: "description_en",
      key: "description_en",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Descripción en Español",
      dataIndex: "description_es",
      key: "description_es",
      render: (text, row) => <div className="text-center">{text}</div>,
    },
    {
      title: "Características",
      dataIndex: "description_es",
      key: "description_es",
      render: (text, row) => (
        <div className="d-flex">
          <button
            onClick={() => {
              setRowData(row);
              setIsOpenModal(true);
            }}
            className="btn btn-primary btn-sm mx-auto"
          >
            Vista
          </button>
        </div>
      ),
    },
    {
      title: "Preguntas Frecuentes",
      key: "Preguntas_Frecuentes",
      render: (text, row) => (
        <div className="d-flex">
          <button
            onClick={() => {
              setRowData(row);
              setFAQSModal(true);
            }}
            className="btn btn-primary btn-sm mx-auto"
          >
            Vista
          </button>
        </div>
      ),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (text, row) => (
        <div className="text-center">
          <div
            className={cx("fw-bolder", {
              "text-success": row.hidden == 0,
              "text-danger": row.hidden != 0,
            })}
          >
            {row.hidden == 0 ? "Mostrado" : "Oculta"}
          </div>
        </div>
      ),
    },
    {
      title: "Estado",
      key: "estado",
      render: (text, row) => (
        <div className="d-flex justify-content-center">
          <button
            onClick={() => {
              setRowData(row);
              setModalStatus(true);
            }}
            className="update_status_benefit"
          >
            Actualizar
          </button>
        </div>
      ),
    },
    {
      title: "#",
      key: "#",
      render: (text, row) => (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <button
            onClick={() => {
              setRowData(row);
              setDeleteModal(true);
              // setConfirmButton(true);
            }}
            className="btn-sm btn btn-danger fs-6 text-white"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => {
              setRowData(row);
              setEditProduct(true);
              setRowDataFeaturs(row.features);
              setRowDataFAQS(row.faqs);
              setInputPairs(row.features);
              setFAQSInputs(row.faqs);
              console.log(row);
            }}
            className="btn-sm btn btn-primary text-white"
          >
            {/* <FaPencil /> */}
            {edit}
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateStatus = async () => {
    setStatusLoading(true);
    await axios
      .get(`${base_url}update_product_status/${RowData.id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          toast.success(res.data.message);
          get_all_data();
          setModalStatus(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setStatusLoading(false);
      });
  };

  return (
    <>
      {
        <Modal
          title={"Características"}
          show={isOpenModal}
          onClose={handleCloseModal}
          showCloseBtn={true}
          size="900px"
        >
          <div className="race_table">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <TableComponent header={Featuresheaders}>
                {RowData?.features?.map((item) => (
                  <tr key={item?.id}>
                    <td>{item?.feature_description_en}</td>
                    <td>{item?.feature_description_es}</td>
                  </tr>
                ))}
              </TableComponent>
            )}
          </div>
        </Modal>
      }

      {
        <Modal
          title={"Preguntas Frecuentes"}
          show={FAQSModal}
          // animation={true}
          onClose={() => setFAQSModal(false)}
          showCloseBtn={true}
          size="900px"
        >
          <div className="race_table">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <TableComponent header={FAQSheaders}>
                {RowData?.faqs?.length > 0 ? (
                  RowData?.faqs.map((item) => (
                    <tr key={item?.id}>
                      <td>{item?.ques_en}</td>
                      <td>{item?.ques_es}</td>
                      <td>{item?.ans_en}</td>
                      <td>{item?.ans_es}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" rowSpan="5">
                      Sin datos
                    </td>
                  </tr>
                )}
              </TableComponent>
            )}
          </div>
        </Modal>
      }
      {
        <Modal
          title={"Estado de actualización"}
          show={modalStatus}
          // animation={true}
          onClose={() => setModalStatus(false)}
          showCloseBtn={true}
          size="900px"
        >
          {statusLoading ? (
            <Spinner
              loading={statusLoading}
              size={50}
              color={"rgb(54,185,204)"}
            />
          ) : (
            <h3>
              {RowData?.hidden == "1"
                ? "¿Realmente desea mostrar este producto?"
                : "¿Realmente desea ocultar este producto?"}
            </h3>
          )}

          <div className="d-flex mt-4">
            <button
              disabled={statusLoading}
              className="btn btn-info text-light ms-auto px-5"
              onClick={handleUpdateStatus}
            >
              {statusLoading ? (
                <Spinner loading={statusLoading} size={20} color={"#fff"} />
              ) : (
                "Sí"
              )}
            </button>
          </div>
        </Modal>
      }
      {
        <Modal
          title={"Estado de actualización"}
          show={deleteModal}
          // animation={true}
          onClose={() => setDeleteModal(false)}
          showCloseBtn={true}
          size="900px"
        >
          {DeleteLoading ? (
            <Spinner
              loading={DeleteLoading}
              size={50}
              color={"rgb(54,185,204)"}
            />
          ) : (
            <h3>¿Está seguro de que desea eliminar este elemento?</h3>
          )}

          <div className="d-flex mt-4">
            <button
              disabled={DeleteLoading}
              className="btn btn-danger ms-auto px-5"
              onClick={deleteProduct}
            >
              {DeleteLoading ? (
                <Spinner loading={DeleteLoading} size={20} color={"#fff"} />
              ) : (
                "Sí"
              )}
            </button>
          </div>
        </Modal>
      }

      <div className="race_page">
        <FormCard header="Especies y Productos">
          <div className="mt-4 d-flex align-items-center gap-4">
            <CustomButton
              textColor="#333"
              onClick={() => setNewProduct(true)}
              text="Agregar"
              icon={<FaFolderPlus />}
              color={"#222"}
              bgColor="#fff"
            />
          </div>
        </FormCard>
      </div>
      <div className="search_table_container">
        {loading ? (
          <div className="m-4">
            <Spinner loading={loading} size={50} color={"rgb(54,185,204)"} />
          </div>
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={data}
          />
        )}
      </div>
      {
        <Modal
          title={"Añadir nuevo producto"}
          show={NewProduct}
          // animation={true}
          onClose={() => {
            setNewProduct(false);
            handleEmptyData();
          }}
          showCloseBtn={true}
          size={"900px"}
          style={{ height: "100%", overflow: "auto" }}
        >
          {addLoading ? (
            <Spinner loading={addLoading} size={50} color={"rgb(54,185,204)"} />
          ) : (
            <>
              {AddNewProductData.image ? (
                <>
                  <img
                    src={
                      AddNewProductData.image instanceof File
                        ? URL.createObjectURL(AddNewProductData.image)
                        : AddNewProductData.image
                    }
                    alt=""
                    style={{ width: "200px" }}
                  />
                  <div>
                    <button
                      className="btn btn-danger my-2"
                      onClick={() =>
                        setAddNewProductData({
                          ...AddNewProductData,
                          image: null,
                        })
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              ) : (
                <CustomInput
                  label="Imagen"
                  type="file"
                  placeholder="Imagen"
                  required
                  onChange={(e) => {
                    setAddNewProductData({
                      ...AddNewProductData,
                      image: e.target.files[0],
                    });
                  }}
                />
              )}
              <CustomInput
                label="Nombre en inglés"
                placeholder="Nombre en inglés..."
                required
                onChange={(e) => {
                  setAddNewProductData({
                    ...AddNewProductData,
                    name_en: e.target.value,
                  });
                }}
                value={AddNewProductData.name_en}
              />
              <CustomInput
                label="Nombre en Español"
                placeholder="Nombre en Español..."
                required
                onChange={(e) => {
                  setAddNewProductData({
                    ...AddNewProductData,
                    name_es: e.target.value,
                  });
                }}
                value={AddNewProductData.name_es}
              />
              <CustomInput
                label="Descripción en inglés"
                placeholder="Descripción en inglés..."
                required
                onChange={(e) => {
                  setAddNewProductData({
                    ...AddNewProductData,
                    description_en: e.target.value,
                  });
                }}
                value={AddNewProductData.description_en}
              />
              <CustomInput
                label="Descripción en Español"
                placeholder="Descripción en Español..."
                required
                onChange={(e) => {
                  setAddNewProductData({
                    ...AddNewProductData,
                    description_es: e.target.value,
                  });
                }}
                value={AddNewProductData.description_es}
              />
              <CustomInput
                label="Precio"
                placeholder="0.0"
                required
                onChange={(e) => {
                  setAddNewProductData({
                    ...AddNewProductData,
                    price: e.target.value,
                  });
                }}
                value={AddNewProductData.price}
              />
              <div>
                <div>
                  <form
                    style={{
                      border: ".1px solid #6e707e",
                      padding: "10px",
                      margin: "10px 0",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 5px 0px #6e707e",
                    }}
                  >
                    {inputPairs.map((inputPair, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <CustomInput
                          type="text"
                          required
                          label="Descripción de características en inglés"
                          value={inputPair.feature_description_en}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "feature_description_en",
                              e
                            )
                          }
                          placeholder="Descripción de características en inglés..."
                          style={{ marginRight: "10px" }}
                        />
                        <CustomInput
                          label="Descripción de Características en Español"
                          required
                          type="text"
                          value={inputPair.feature_description_es}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "feature_description_es",
                              e
                            )
                          }
                          placeholder="Descripción en Español"
                        />
                        <button
                          type="button"
                          className="btn btn-danger mt-3"
                          onClick={() => handleRemoveInputPair(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={handleAddInputPair}
                      className="btn btn-success"
                      style={{
                        margin: "10px auto",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Add More
                    </Button>
                  </form>
                </div>

                <div>
                  <form
                    title="FAQs"
                    style={{
                      border: ".1px solid #6e707e",
                      padding: "10px",
                      margin: "10px 0",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 5px 0px #6e707e",
                    }}
                  >
                    {FAQSInputs.map((FAQSPair, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <CustomInput
                          type="text"
                          required
                          label="Pregunta de FAQ  (inglés)"
                          value={FAQSPair.ques_en}
                          onChange={(e) =>
                            handleFAQSChange(index, "ques_en", e)
                          }
                          placeholder="Pregunta de FAQ in inglés..."
                          style={{ marginRight: "10px" }}
                        />
                        <CustomInput
                          required
                          label="Pregunta de FAQ (Español)"
                          type="text"
                          value={FAQSPair.ques_es}
                          onChange={(e) =>
                            handleFAQSChange(index, "ques_es", e)
                          }
                          placeholder="Pregunta de FAQ en Español..."
                        />
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "15px 0",
                          }}
                        >
                          <span className="faq_span">
                            <label>Descripción de FAQ (inglés)</label>
                            <textarea
                              style={{
                                width: "100%",
                                padding: "10px",
                              }}
                              type="text"
                              value={FAQSPair.ans_en}
                              onChange={(e) =>
                                handleFAQSChange(index, "ans_en", e)
                              }
                              placeholder="Ingrese la descripción en inglés..."
                            />
                          </span>
                          <span className="faq_span">
                            <label>Descripción de FAQ (Español)</label>
                            <textarea
                              style={{
                                width: "100%",
                                padding: "10px",
                              }}
                              type="text"
                              value={FAQSPair.ans_es}
                              onChange={(e) =>
                                handleFAQSChange(index, "ans_es", e)
                              }
                              placeholder="Ingrese la descripción en Español..."
                            />
                          </span>
                        </span>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveFAQSPair(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={handleAddFAQSPair}
                      className="btn btn-success"
                      style={{
                        margin: "auto",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Add More
                    </Button>
                  </form>
                </div>
              </div>
            </>
          )}
          <button
            disabled={addLoading}
            style={{ float: "right" }}
            onClick={handelAddNewProduct}
            className="btn btn-info text-light"
          >
            {addLoading ? (
              <Spinner loading={addLoading} size={20} color={"#fff"} />
            ) : (
              "Agregar"
            )}
          </button>
        </Modal>
      }

      {
        <Modal
          title={"Editar product"}
          show={EditProduct}
          onClose={() => {
            setEditProduct(false);
            handleEmptyData();
          }}
          showCloseBtn={true}
          size="900px"
          style={{ height: "100%", overflow: "auto" }}
        >
          {editLoading ? (
            <Spinner
              loading={editLoading}
              size={50}
              color={"rgb(54,185,204)"}
            />
          ) : (
            <div
              className={cx("d-flex flex-column gap-2", {
                "mb-5": RowData?.image,
              })}
            >
              {RowData?.image && (
                <>
                  <img
                    src={
                      RowData?.image instanceof File
                        ? URL.createObjectURL(RowData?.image)
                        : RowData?.image
                    }
                    alt=""
                    style={{ width: "200px" }}
                  />
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => setRowData({ ...RowData, image: null })}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}

              {!RowData?.image && (
                <CustomInput
                  label="imagen"
                  type="file"
                  placeholder="imagen"
                  required={true}
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                    setRowData({
                      ...RowData,
                      image: e.target.files[0],
                    });
                  }}
                />
              )}

              <CustomInput
                label="Nombre en inglés"
                placeholder="Nombre en inglés..."
                required={true}
                defaultValue={RowData?.name_en}
                onChange={(e) =>
                  setRowData({ ...RowData, name_en: e.target.value })
                }
              />

              <CustomInput
                label="Nombre en español"
                placeholder="Nombre en español..."
                required={true}
                defaultValue={RowData?.name_es}
                onChange={(e) =>
                  setRowData({ ...RowData, name_es: e.target.value })
                }
              />

              <CustomInput
                label="Descripción en inglés"
                placeholder="Descripción en inglés..."
                required={true}
                defaultValue={RowData?.description_en}
                onChange={(e) =>
                  setRowData({ ...RowData, description_en: e.target.value })
                }
              />

              <CustomInput
                label="Descripción en español"
                placeholder="Descripción en español..."
                required={true}
                defaultValue={RowData?.description_es}
                onChange={(e) =>
                  setRowData({ ...RowData, description_es: e.target.value })
                }
              />

              <CustomInput
                label="Precio"
                placeholder="0.0"
                required={true}
                defaultValue={RowData?.price}
                onChange={(e) =>
                  setRowData({ ...RowData, price: e.target.value })
                }
              />

              <div>
                <form
                  style={{
                    border: "0.1px solid #6e707e",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 5px 0px #6e707e",
                  }}
                >
                  {inputPairs?.map((inputPair, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <CustomInput
                        required={true}
                        type="text"
                        label="Descripción de características en inglés"
                        value={inputPair.feature_description_en}
                        onChange={(e) =>
                          handleInputChange(index, "feature_description_en", e)
                        }
                        placeholder="Descripción de características en inglés..."
                        style={{ marginRight: "10px" }}
                      />
                      <CustomInput
                        required={true}
                        label="Descripción de características en español"
                        type="text"
                        value={inputPair.feature_description_es}
                        onChange={(e) =>
                          handleInputChange(index, "feature_description_es", e)
                        }
                        placeholder="Descripción en español..."
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveInputPair(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={handleAddInputPair}
                    className="btn btn-success"
                    style={{
                      width: "90%",
                      margin: "10px auto",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Add More
                  </Button>
                </form>
              </div>

              <div>
                <form
                  title="FAQs"
                  style={{
                    border: "0.1px solid #6e707e",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 5px 0px #6e707e",
                  }}
                >
                  {FAQSInputs.map((FAQSPair, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <CustomInput
                        required={true}
                        type="text"
                        label="Pregunta de FAQ (inglés)"
                        value={FAQSPair.ques_en}
                        onChange={(e) => handleFAQSChange(index, "ques_en", e)}
                        placeholder="Pregunta de FAQ en inglés ..."
                        style={{ marginRight: "10px" }}
                      />
                      <CustomInput
                        required={true}
                        label="Pregunta de FAQ (Español)"
                        type="text"
                        value={FAQSPair.ques_es}
                        onChange={(e) => handleFAQSChange(index, "ques_es", e)}
                        placeholder="Pregunta de FAQ en Español..."
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "15px 0",
                        }}
                      >
                        <div className="faq_span">
                          <label>Pregunta de FAQ (inglés)</label>
                          <textarea
                            style={{ width: "100%", padding: "10px" }}
                            value={FAQSPair.ans_en}
                            onChange={(e) =>
                              handleFAQSChange(index, "ans_en", e)
                            }
                            placeholder="ingrese la descripción en inglés..."
                          />
                        </div>
                        <div className="faq_span">
                          <label>Descripción de FAQ (Español)</label>
                          <textarea
                            style={{ width: "100%", padding: "10px" }}
                            value={FAQSPair.ans_es}
                            onChange={(e) =>
                              handleFAQSChange(index, "ans_es", e)
                            }
                            placeholder="ingrese la descripción en Espanol..."
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveFAQSPair(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={handleAddFAQSPair}
                    className="btn btn-success"
                    style={{
                      width: "90%",
                      margin: "auto",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Add More
                  </Button>
                </form>
              </div>
            </div>
          )}

          <button
            style={{ float: "right" }}
            disabled={editLoading}
            onClick={handelEditProduct}
            className="btn btn-info text-light"
          >
            {editLoading ? (
              <Spinner size={20} color={"#fff"} loading={editLoading} />
            ) : (
              "Editar"
            )}
          </button>
        </Modal>
      }
    </>
  );
};
