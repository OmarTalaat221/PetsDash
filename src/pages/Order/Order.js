import FormCard from "../../components/FormCard/FormCard";
import "./Order.css";
import TableComponent from "../../components/Table/Table";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import FromGroup from "./../../components/FromGroup/FromGroup";
import CustomSelect from "./../../components/CustomSelect/CustomSelect";
import { base_url } from "../../constant";
import axios from "axios";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin, Table } from "antd";
import Spinner from "../../utils/Spinner/Spinner";
import Select from "react-select";

export default function Order() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [showUpdateOrderStatus, setShowUpdateOrderStatus] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const [rowData, setRowData] = useState({});
  const [isSubmitForm, setIsSubmitForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  // Hmada
  const [data, setData] = useState([]);
  const [updatedStatusId, setUpdatedStatusId] = useState("");
  const [statusInputValue, setStatusInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [previousState, setPreviousState] = useState("");
  const [changeOrderStatus, setChangeOrderStatus] = useState("");
  const buttons = [
    "pendiente",
    "rechazado",
    "aceptado",
    "en_entrega",
    "entregado",
  ];
  //data in status selection input
  const statusSelection = [
    { label: "Todos los pedidos", value: 1 },
    { label: "pendiente", value: 2 },
    { label: "rechazado", value: 3 },
    { label: "aceptado", value: 4 },
    { label: "en_entrega", value: 5 },
    { label: "entregado", value: 6 },
  ];
  const [orderDetails, setOrderDetails] = useState([]);
  const [language, setLanguage] = useState("");

  function handleCloseModal() {
    setIsOpenModal(false);
    setIsSubmitForm(false);
    setShowUpdateOrderStatus(false);
    setShowOrderDetails(false);
    setCheckedValue("");
  }

  function handleSubmitRaceForm(e) {
    e.preventDefault();
    setIsSubmitForm(true);
    setIsOpenModal(false);
    handleOrderStatusChange();
  }

  // to get all data (order) in table
  const get_all_data = () => {
    setGetDataLoading(true);
    axios
      .get(base_url + "orders/get_all_orders")
      .then((res) => {
        console.log(res.data.result);
        if (res.status === 200 && Array.isArray(res.data.result)) {
          setData(res.data.result);
          setFilteredData(res.data.result);
          // console.log(filteredData);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setGetDataLoading(false);
      });
  };
  const [checkedValue, setCheckedValue] = useState("");

  // to active the checked btn
  const handleCheckedStatusBtn = (item) => {
    setCheckedValue(item);
  };
  //to update order status

  const handleOrderStatusChange = () => {
    setIsDisabled(true);
    console.log(isDisabled);
    setLoader(true);
    // return
    if (checkedValue) {
      axios
        .post(base_url + `orders/change_status/${updatedStatusId}`, {
          status: checkedValue,
        })
        .then((res) => {
          toast.success(res.data.message);
          setShowUpdateOrderStatus(false);
          get_all_data();
          setCheckedValue("");
          setIsDisabled(false);
        })
        .catch((error) => {
          console.log(error);
          setIsDisabled(false);
          setCheckedValue("");
        })
        .finally(() => {
          setLoader(false);
          setIsDisabled(false);
        });
    } else {
      toast("check value");
    }
  };

  const [filteredStatusButtons, setFilteredStatusButtons] = useState([]);
  const handleFilterStatusButtons = (e) => {
    setFilteredStatusButtons(buttons.slice(buttons.indexOf(e) + 1));
  };

  //handle search
  useEffect(() => {
    if (statusInputValue == "Todos los pedidos" || statusInputValue == null) {
      setFilteredData(data);
    } else {
      const newData = data.filter(
        (item) => item.order_status === statusInputValue
      );
      setFilteredData(newData);
    }
  }, [statusInputValue]);

  useEffect(() => {
    get_all_data();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "title",
      key: "title",
      render: (text, row) => (
        <div className="text-center" color="green">
          {row.user.name}
        </div>
      ),
    },
    {
      title: "Teléfono",
      dataIndex: "Teléfono",
      key: "Teléfono",
      render: (text, row) => (
        <div className="text-center" color="green">
          {row.user.phone}
        </div>
      ),
    },
    {
      title: "Correo electrónico",
      dataIndex: "Correo electrónico",
      key: "Correo electrónico",
      render: (text, row) => (
        <div className="text-center" color="green">
          {row.user.email}
        </div>
      ),
    },
    {
      title: "Ubicación",
      dataIndex: "Correo electrónico",
      key: "Correo electrónico",
      render: (text, row) => (
        <div className="text-center" color="green">
          {row.location}
        </div>
      ),
    },
    {
      title: "Número nacional",
      dataIndex: "Correo electrónico",
      key: "Correo electrónico",
      render: (text, row) => (
        <div className="text-center" color="green">
          {row.national_number}
        </div>
      ),
    },
    {
      title: "Estado",
      dataIndex: "Correo electrónico",
      key: "Correo electrónico",
      render: (text, row) => (
        <div
          className="text-center fw-bold text-primary text-capitalize"
          color="green"
          style={{ color: "4e73df" }}
        >
          {row.order_status}
        </div>
      ),
    },
    {
      title: "Valor del pedido",
      dataIndex: "Valor del pedido",
      key: "Valor del pedido",
      render: (text, row) => (
        <div className="text-center" color="green">
          {row.order_value}
        </div>
      ),
    },
    {
      title: "Comportamiento",
      dataIndex: "Valor del pedido",
      key: "Valor del pedido",
      render: (text, row) => (
        <div className="d-flex align-items-center justify-content-center gap-2">
          {/* update button */}
          <button
            className="update_status_benefit"
            // className="update_status_benefit"
            onClick={() => {
              // to open the confirm form
              setShowUpdateOrderStatus(true);
              // to save the datea
              setRowData(row);
              console.log(row.order_status);
              setUpdatedStatusId(row.id);
              // save the status for this row to active it
              setPreviousState(row.order_status);
              handleFilterStatusButtons(row.order_status);
            }}
          >
            Actualizar
          </button>
          {/* show button */}
          <button
            className="btn btn-info text-light"
            onClick={() => {
              // to open the confirm form
              setShowOrderDetails(true);
              setRowData(row);
              console.log(row.id);
              setOrderDetails(row.orderprods);
              console.log(row.orderprods);
            }}
          >
            Mas Detalles
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log(statusInputValue);
  }, [statusInputValue]);

  return (
    <>
      {/* MODAL THAT SHOWN WHEN CLICK ON UPDATE */}
      <Modal
        // title={`Cambiar el estado del pedido (${rowData.order_status})`}
        title={
          <>
            <>
              Cambiar el estado del pedido (
              <span className="text-primary text-capitalize">
                {rowData.order_status || "Estado"}
              </span>
              )
            </>
          </>
        }
        show={showUpdateOrderStatus}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
        // {true?(
        confirmButton={{
          onClick: handleSubmitRaceForm,
          disabled: isDisabled,
          children: loader ? (
            <Spinner size={20} loading={loader} color={"#fff"} />
          ) : (
            "Guardar"
          ),
          style: {
            backgroundColor: "#36b9cc",
            display: rowData.order_status === "entregado" ? "none" : null,
          },
        }}
        // ):null}
        cancelButton={{
          onClick: handleCloseModal,
          children: "Cerrar",
          style: { backgroundColor: "#858796" },
        }}
      >
        {/* loadin  */}
        {loader ? (
          <Spinner size={50} loading={loader} color={"rgb(45,185,204)"} />
        ) : (
          <div className="changeStatus-btns flex-wrap my-3">
            {filteredStatusButtons.length !== 0 ? (
              filteredStatusButtons.map((item, i) => (
                <button
                  key={i}
                  value={item}
                  className={item === checkedValue ? "active" : ""}
                  onClick={(e) => {
                    setChangeOrderStatus(e.target.value);
                    handleCheckedStatusBtn(item);
                  }}
                >
                  <span className="text-capitalize">{item}</span>
                </button>
              ))
            ) : (
              <h3 style={{ color: "#4e73df" }}>
                <span style={{ fontWeight: 700, fontSize: "larger" }}>
                  {rowData.order_status}{" "}
                </span>
                es el último estado ..!
              </h3>
            )}
          </div>
        )}
      </Modal>

      {/* MODAL THAT SHOWN WHEN CLICK ON SHOW */}
      <Modal
        title="Order Details"
        show={showOrderDetails}
        onClose={handleCloseModal}
        showCloseBtn={true}
        size="900px"
      >
        <table>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>image</th>
          </tr>
          {orderDetails.map((item, i) => (
            <>
              <tr>
                <td>
                  {language === "en"
                    ? item.product.name_en
                    : item.product.name_en}
                </td>
                <td>{item.product.price}</td>
                <td>
                  <img src={item.product.image} alt="" />
                </td>
              </tr>
            </>
          ))}
        </table>
      </Modal>

      <div className="depart_page">
        <FormCard header={"Orden " + data.length}>
          <div className="w-50">
            <Select
              options={statusSelection}
              placeholder="Estado del pedido..."
              onChange={(selectedOption) =>
                setStatusInputValue(selectedOption?.label)
              }
              value={
                statusSelection.find(
                  (option) => option?.label === statusInputValue
                ) || null
              }
              isClearable
            />
          </div>
        </FormCard>
      </div>

      <div className="search_table_container">
        {getDataLoading ? (
          <Spinner
            size={50}
            color="rgb(54, 185, 204)"
            loading={getDataLoading}
          />
        ) : (
          <Table
            className="custom-header"
            columns={columns}
            dataSource={filteredData}
          />
        )}
      </div>
    </>
  );
}
