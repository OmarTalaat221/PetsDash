import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import "./style.css";
import logoImg from "../../assets/images/worldpetsperu_logo.png";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCircleUser,
  FaPaw,
  FaUser,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import CustomSubmenuLabel from "../CustomSubmenuLabel/CustomSubmenuLabel";
import { Home, OutDoor } from "../../assets/svgIcons";
import { motion } from "framer-motion";
// import Brands from './c'
import { Window } from "./../../assets/svgIcons/index";
import cx from "classnames";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import useAdminMe from "../../CustomHooks/useAdminMe";
export default function SidebarComponent({
  showSide,
  setShowSide,
  logoutModal,
  setLogoutModal,
}) {
  const [petsDashUser, setPetsDashUser] = useState(() => {
    const storedPetsDashUser = localStorage.getItem("petsDashUser");
    return storedPetsDashUser ? JSON.parse(storedPetsDashUser) : null;
  });
  const location = useLocation();
  const { handleGetAdminData, adminData, setAdminData, loading } = useAdminMe();

  useEffect(() => {
    handleGetAdminData();
  }, []);

  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        className="sidebar"
      >
        {/* <div className="open_icon  close-icon"><FaChevronRight /></div> */}
        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              background: "transparent",
              height: "100vh",
              padding: "10px 20px",
            },
          }}
          className="custom-sidebar"
        >
          <a target="_blank">
            <img src={logoImg} />
          </a>

          {petsDashUser?.type == "admin" && (
            <Menu>
              <MenuItem
                component={<Link to="/account" />}
                className="menu_item sidebar-user"
              >
                {" "}
                <FaCircleUser /> <span>Mi cuenta</span>
              </MenuItem>

              <SubMenu
                label={
                  <CustomSubmenuLabel iconName={<FaPaw />} text="Mascota" />
                }
                className="sub-menu"
              >
                <h4>OPCIONES MASCOTAS:</h4>
                <MenuItem
                  className={cx("menu_item ", {
                    "rounded bg-success text-white":
                      location.pathname == "/pets",
                  })}
                  component={<Link to="/pets" />}
                >
                  Mascotas
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/animal_type",
                  })}
                  component={<Link to="/animal_type" />}
                >
                  Tipos de Animales
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/search" ||
                      location.pathname == "/",
                  })}
                  component={<Link to="/search" />}
                >
                  Busqueda
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/raza",
                  })}
                  component={<Link to="/raza" />}
                >
                  Raza
                </MenuItem>

                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/departmento" ||
                      location.pathname.startsWith("/provincia/") ||
                      location.pathname.startsWith("/distrito/"),
                  })}
                  component={<Link to="/departmento" />}
                >
                  Departamento
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/especie",
                  })}
                  component={<Link to="/especie" />}
                >
                  Especie
                </MenuItem>
                {/* <MenuItem
                className={cx("menu_item", {
                  " rounded bg-success text-white":
                    location.pathname == "/brands",
                })}
                component={<Link to="/brands" />}
              >
                Marcas
              </MenuItem> */}

                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/add_animal",
                  })}
                  component={<Link to="/add_animal" />}
                >
                  Agregar Animal
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/agreemetns",
                  })}
                  component={<Link to="/agreemetns" />}
                >
                  Convenios
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/dni",
                  })}
                  component={<Link to="/dni" />}
                >
                  DNI
                </MenuItem>
                {/* <MenuItem className="menu_item" component={<Link to="/req_serv" />}> */}
                {/* Solicitudes y Servicios */}
                {/* </MenuItem> */}
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/evento",
                  })}
                  component={<Link to="/evento" />}
                >
                  Evento
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/order",
                  })}
                  component={<Link to="/order" />}
                >
                  Orden
                </MenuItem>
                {/* <MenuItem
                className={cx("menu_item", {
                  " rounded bg-success text-white":
                    location.pathname == "/deliveryman",
                })}
                component={<Link to="/deliveryman" />}
              >
                Repartidor
              </MenuItem> */}
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/products",
                  })}
                  component={<Link to="/products" />}
                >
                  Productos
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/calfication",
                  })}
                  component={<Link to="/calfication" />}
                >
                  Calcificación
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/people_find_pets",
                  })}
                  component={<Link to="/people_find_pets" />}
                >
                  La gente encuentra mascotas{" "}
                </MenuItem>
              </SubMenu>

              <SubMenu
                label={
                  <CustomSubmenuLabel iconName={<FaUser />} text="Usuarios" />
                }
                className="sub-menu last-submenu"
              >
                <h4>OPCIONES USUARIOS:</h4>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/users",
                  })}
                  component={<Link to="/users" />}
                >
                  Usuarios
                </MenuItem>
                <MenuItem
                  className={cx("menu_item", {
                    " rounded bg-success text-white":
                      location.pathname == "/admins",
                  })}
                  component={<Link to="/admins" />}
                >
                  Administradores
                </MenuItem>
              </SubMenu>

              <MenuItem
                className={cx("menu_item_single", {
                  " rounded bg-white text-dark": location.pathname == "/home",
                })}
                component={<Link to="/home" />}
              >
                Página de inicio
              </MenuItem>
              <MenuItem
                className={cx("menu_item_single", {
                  " rounded bg-white text-dark":
                    location.pathname == "/home-features",
                })}
                component={<Link to="/home-features" />}
              >
                Características
              </MenuItem>
              <MenuItem
                className={cx("menu_item_single", {
                  " rounded bg-white text-dark":
                    location.pathname == "/testimonials",
                })}
                component={<Link to="/testimonials" />}
              >
                Testimonios
              </MenuItem>
              <MenuItem
                className={cx("menu_item_single", {
                  " rounded bg-white text-dark":
                    location.pathname == "/about-us",
                })}
                component={<Link to="/about-us" />}
              >
                Sobre nosotras
              </MenuItem>
              <MenuItem
                className={cx("menu_item_single", {
                  " rounded bg-white text-dark":
                    location.pathname == "/benefits",
                })}
                component={<Link to="/benefits" />}
              >
                Beneficios
              </MenuItem>
              <MenuItem
                className={cx("menu_item_single", {
                  " rounded bg-white text-dark":
                    location.pathname == "/services",
                })}
                component={<Link to="/services" />}
              >
                Services
              </MenuItem>
              <MenuItem
                className={cx("menu_item_single", {
                  " rounded bg-white text-dark": location.pathname == "/faqs",
                })}
                component={<Link to="/faqs" />}
              >
                Preguntas frecuentes
              </MenuItem>
              <MenuItem
                className={cx("menu_item_single", {
                  " rounded bg-white text-dark":
                    location.pathname == "/contact",
                })}
                component={<Link to="/contact" />}
              >
                Contacto
              </MenuItem>
              <MenuItem
                className="menu_item_single "
                onClick={() => {
                  setLogoutModal(true);
                  //     localStorage.removeItem("pits-token");
                  // window.location.reload();
                }}
              >
                {OutDoor} cerrar sesión
              </MenuItem>
            </Menu>
          )}

          {petsDashUser?.type == "user" && (
            <>
              <Menu>
                <SubMenu
                  label={
                    <CustomSubmenuLabel iconName={<FaPaw />} text="Mascota" />
                  }
                  className="sub-menu"
                >
                  <h4>OPCIONES MASCOTAS:</h4>
                  <MenuItem
                    className={cx("menu_item ", {
                      "rounded bg-success text-white":
                        location.pathname == "/pets_user",
                    })}
                    component={<Link to="/pets_user" />}
                  >
                    Mascotas
                  </MenuItem>

                  <MenuItem
                    className={cx("menu_item", {
                      " rounded bg-success text-white":
                        location.pathname == "/raza" ||
                        location.pathname == "/",
                    })}
                    component={<Link to="/raza" />}
                  >
                    Raza
                  </MenuItem>
                </SubMenu>

                <MenuItem
                  className="menu_item_single "
                  onClick={() => {
                    setLogoutModal(true);
                    //     localStorage.removeItem("pits-token");
                    // window.location.reload();
                  }}
                >
                  {OutDoor} cerrar sesión
                </MenuItem>
              </Menu>
            </>
          )}
          {petsDashUser?.type == "seller" && (
            <>
              <Menu>
                <SubMenu
                  label={
                    <CustomSubmenuLabel iconName={<FaPaw />} text="Mascota" />
                  }
                  className="sub-menu"
                >
                  <h4>OPCIONES MASCOTAS:</h4>
                  <MenuItem
                    className={cx("menu_item", {
                      " rounded bg-success text-white":
                        location.pathname == "/add_animal" ||
                        location.pathname == "/",
                    })}
                    component={<Link to="/add_animal" />}
                  >
                    Agregar Animal
                  </MenuItem>
                </SubMenu>

                <MenuItem
                  className="menu_item_single "
                  onClick={() => {
                    setLogoutModal(true);
                    //     localStorage.removeItem("pits-token");
                    // window.location.reload();
                  }}
                >
                  {OutDoor} cerrar sesión
                </MenuItem>
              </Menu>
            </>
          )}

          <div className="close-icon" onClick={() => setShowSide(false)}>
            <FaChevronLeft />
          </div>
        </Sidebar>
      </motion.div>
    </>
  );
}
