import { useEffect, useRef, useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./style.css";
import noPets from "../../assets/images/noPets (1).png";
import useAdminMe from "../../CustomHooks/useAdminMe";
import Select from "react-select";
import CustomInput from "../../components/CustomInput/CustomInput";
import { base_url, globa_base_url } from "../../constant";
import toast from "react-hot-toast";
import axios from "axios";
import { uploadImage } from "./../../constant/uploadFiles";
import Spinner from "./../../utils/Spinner/Spinner";

export default function Account() {
  const [petUser, setPetUser] = useState(
    JSON.parse(localStorage.getItem("petsDashUser"))
  );
  const fileInputRef = useRef(null);
  const [img, setImg] = useState("");
  const { handleGetAdminData, adminData, setAdminData, loading } = useAdminMe();
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    petUser?.type == "admin"
      ? setAdminData({ ...adminData, admin_image: file })
      : setAdminData({ ...adminData, user_image: file });
  };

  useEffect(() => {
    handleGetAdminData();
  }, []);

  const sexData = [
    { label: "Masculina", value: "Masculina" },
    { label: "Femenina", value: "Femenina" },
  ];

  const hadnleSelecSex = (e) => {
    setAdminData({ ...adminData, sex: e.value });
  };

  const handleUpdateAdminData = async () => {
    setUpdateLoading(true);
    try {
      let adminImage = null;
      if (adminData.admin_image instanceof File) {
        adminImage = await uploadImage(adminData.admin_image);
      }
      const dataset = {
        ...adminData,
        admin_image: adminImage || adminData.admin_image,
        sex: adminData.sex,
      };
      const response = await axios.post(
        `${globa_base_url}admins/update_admin_data`,
        dataset
      );
      const message = response.data.message;
      response?.data?.status === "success"
        ? toast.success(message)
        : toast.error(message);
    } catch (error) {
      console.error(error);
      toast.error("Error updating data. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleUpdateUserData = async () => {
    setUpdateLoading(true);
    try {
      let image = null;
      if (adminData?.user_image instanceof File) {
        image = await uploadImage(adminData?.user_image);
      }
      const dataset = {
        ...adminData,
        user_image: image || adminData?.user_image,
      };
      const response = await axios.post(
        `${globa_base_url}user/update_user_data`,
        dataset
      );
      const message = response.data.message;
      response?.data?.status === "success"
        ? toast.success(message)
        : toast.error(message);
    } catch (error) {
      console.error(error);
      toast.error("Error updating data. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <Spinner loading={loading} size={50} color={"rgb(54,185,204)"} />;
  }

  return (
    <>
      <div className="account_card px-5 py-5 mb-5">
        <div className="account_card_header p-4">
          <h4>MI CUENTA</h4>
        </div>
        <div className="dom_third_grid">
          <div className="input_group">
            <CustomInput
              value={adminData?.name}
              onChange={(e) =>
                setAdminData({ ...adminData, name: e.target.value })
              }
              label="Nombre"
              placeholder="Introduce tu nombre..."
              required
            />
          </div>
          {petUser?.type == "user" || petUser?.type == "seller" ? null : (
            <div className="input_group">
              <CustomInput
                value={adminData?.l_name}
                onChange={(e) =>
                  setAdminData({ ...adminData, l_name: e.target.value })
                }
                label="Apellidos"
                placeholder="Introduce tu apodo..."
                required
              />
            </div>
          )}
          {petUser?.type == "user" || petUser?.type == "seller" ? null : (
            <div className="input_group">
              <label>
                Sexo <span> (*)</span>
              </label>
              <Select
                placeholder={"Seleccionar..."}
                value={sexData.filter((sex) => sex.value === adminData?.sex)}
                onChange={(e) => hadnleSelecSex(e)}
                options={sexData}
              />
            </div>
          )}
        </div>
        <div className="dom_third_grid">
          {petUser?.type == "user" || petUser?.type == "seller" ? null : (
            <div className="input_group">
              <CustomInput
                type={"date"}
                value={adminData?.dob}
                onChange={(e) =>
                  setAdminData({ ...adminData, dob: e.target.value })
                }
                label="Fecha de Nacimiento"
                placeholder="Fecha de Nacimiento"
                required
              />
            </div>
          )}
          <div className="input_group">
            <CustomInput
              value={adminData?.phone}
              onChange={(e) =>
                setAdminData({ ...adminData, phone: e.target.value })
              }
              label="Telefono"
              placeholder="Introduce tu teléfono..."
              required
            />
          </div>
          {petUser?.type == "user" || petUser?.type == "seller" ? null : (
            <div className="input_group">
              <CustomInput
                value={adminData?.celular}
                onChange={(e) =>
                  setAdminData({ ...adminData, celular: e.target.value })
                }
                label="Celular"
                placeholder="Ingresa tu Celular..."
                required
              />
            </div>
          )}
        </div>
        <div className="foto_page">
          {petUser?.type == "admin" ? (
            <div>
              <img
                src={
                  adminData?.admin_image
                    ? adminData?.admin_image instanceof File
                      ? URL.createObjectURL(adminData?.admin_image)
                      : adminData?.admin_image
                    : noPets
                }
                alt=""
              />
            </div>
          ) : (
            <div>
              <img
                src={
                  adminData?.user_image
                    ? adminData?.user_image instanceof File
                      ? URL.createObjectURL(adminData?.user_image)
                      : adminData?.user_image
                    : noPets
                }
                alt=""
              />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={handleButtonClick}>Subir</button>
        </div>

        <button
          disabled={updateLoading}
          onClick={
            petUser?.type == "admin"
              ? handleUpdateAdminData
              : handleUpdateUserData
          }
          className="mt-5"
          style={{
            width: "fit-content",
            backgroundColor: "#36b9cc",
            color: "white",
            padding: "7px",
            borderRadius: "5px",
          }}
        >
          {updateLoading ? (
            <Spinner size={20} color={"#fff"} loading={updateLoading} />
          ) : (
            "ACTUALIZAR MIS DATOS"
          )}
        </button>
      </div>
    </>
  );
}
