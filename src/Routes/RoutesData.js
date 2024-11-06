import AgreementPage from "../pages/Agreement/AgreementPage";
import DNI_page from "../pages/DNI_page/DNI_page";
import Envato from "../pages/EnvatoPage/Envato";
import Mascota from "../pages/Mascota/Mascota";
import SearchPage from "../pages/SearchPage/SearchPage";
import SignUp from "../pages/SignUp/SignUp";
import Race from "./../pages/Race/Race";
import Services from "./../pages/Services/Services";
import Users from "./../pages/Users/Users";
import Account from "./../pages/Account/Account";
import Calfication from "../pages/Calfication/Calfication";
import PeopleFindPets from "./../pages/PeopleFindPets/PeopleFindPets";
import Benefits from "../pages/Benefits/Benefits";
import ServicesDash from "../pages/ServicesDash/ServicesDash";
import Departamento from "./../pages/Departamento/Departamento";
import AddAnimal from "../pages/AddAnimal/AddAnimal";
// import Test from "../pages/Test/Test";
import Order from "./../pages/Order/Order";
import DeliveryMan from "./../pages/DeliveryMan/DeliveryMan";
import { Products } from "./../pages/Products/Products";
import HomePage from "../pages/HomePage/HomePage";
import AnimalType from "./../pages/AnimalType/AnimalType";
import Provincia from "./../pages/Provinicia/Provinicia";
import Distrito from "./../pages/Distrito/Distrito";
import About_us from "../pages/About_us/About_us";
import Brands from "../pages/Brands/Brands";
import HomeFeatures from "../pages/HomeFeatures/HomeFeatures";
import Testimonials from "./../pages/Testimonials/Testimonials";
import FAQs from "../components/pages/FAQs/FAQs";
import Admins from "../components/pages/adminns/Admins";
import Test from "../pages/Test/Test";
import Especie from "./../pages/Especie/Especie";
import Contact from "../pages/Contact/Contact";
import Error from "../components/Error/Error";
import MascotaUser from "./../pages/MascotaUser/MascotaUser";
import SellerAddAnimal from "./../pages/SellerAddAnimal/SellerAddAnimal";

export const allRoutes = [
  {
    name: "Account",
    pathnames: ["/account"],
    component: <Account />,
  },
  {
    name: "Mascotas",
    pathnames: ["/pets"],
    component: <Mascota />,
  },
  {
    name: "Busqueda",
    pathnames: ["/", "/search"],
    component: <SearchPage />,
  },
  {
    name: "error",
    pathnames: ["*"],
    component: <Error />,
  },

  {
    name: "Raza",
    pathnames: ["/raza"],
    component: <Race />,
  },
  {
    name: "Especie",
    pathnames: ["/especie"],
    component: <Especie />,
  },

  {
    name: "PeopleFindPets",
    pathnames: ["/people_find_pets"],
    component: <PeopleFindPets />,
  },
  {
    name: "Benefits",
    pathnames: ["/benefits"],
    component: <Benefits />,
  },
  {
    name: "Test",
    pathnames: ["/test"],
    component: <Test />,
  },
  {
    name: "Calfication",
    pathnames: ["/calfication"],
    component: <Calfication />,
  },
  {
    name: "Convenios",
    pathnames: ["/agreemetns"],
    component: <AgreementPage />,
  },

  {
    name: "Department",
    pathnames: ["/departmento"],
    component: <Departamento />,
  },
  // {
  //   name: "Brands",
  //   pathnames: "/brands",
  //   component: <Brands />,
  // },
  {
    name: "Add Animal",
    pathnames: ["/add_animal"],
    component: <AddAnimal />,
  },
  {
    name: "DNI",
    pathnames: ["/dni"],
    component: <DNI_page />,
  },

  {
    name: "Evento",
    pathnames: ["/evento"],
    component: <Envato />,
  },
  {
    name: "Home",
    pathnames: ["/home"],
    component: <HomePage />,
  },
  {
    name: "Services",
    pathnames: ["/services"],
    component: <ServicesDash />,
  },
  {
    name: "Order",
    pathnames: ["/order"],
    component: <Order />,
  },
  // {
  //   name: "Deliveryman",
  //   pathnames: "/deliveryman",
  //   component: <DeliveryMan />,
  // },
  {
    name: "Products",
    pathnames: ["/products"],
    component: <Products />,
  },
  {
    name: "Usuarios",
    pathnames: ["/users"],
    component: <Users />,
  },
  {
    name: "AnimalType",
    pathnames: ["/animal_type"],
    component: <AnimalType />,
  },
  {
    name: "Provincia",
    pathnames: ["/provincia/:dep_id"],
    component: <Provincia />,
  },
  {
    name: "Distrito",
    pathnames: ["/distrito/:prov_id"],
    component: <Distrito />,
  },

  {
    name: "About us",
    pathnames: ["/about-us"],
    component: <About_us />,
  },
  {
    name: "Mascotas",
    pathnames: ["/home-features"],
    component: <HomeFeatures />,
  },
  {
    name: "testimonios",
    pathnames: ["/testimonials"],
    component: <Testimonials />,
  },
  {
    name: "faqs",
    pathnames: ["/faqs"],
    component: <FAQs />,
  },
  {
    name: "Contact",
    pathnames: ["/contact"],
    component: <Contact />,
  },
  {
    name: "admins",
    pathnames: ["/admins"],
    component: <Admins />,
  },
];

export const userRoutes = [
  {
    name: "Account",
    pathnames: ["/account"],
    component: <Account />,
  },
  {
    name: "Mascotas",
    pathnames: ["/pets_user"],
    component: <MascotaUser />,
  },

  {
    name: "error",
    pathnames: ["*"],
    component: <Error />,
  },
  {
    name: "Raza",
    pathnames: ["/", "/raza"],
    component: <Race />,
  },
];
export const sellerRoutes = [
  {
    name: "Account",
    pathnames: ["/account"],
    component: <Account />,
  },
  {
    name: "Add Animal",
    pathnames: ["/", "/add_animal"],
    component: <SellerAddAnimal />,
  },

  {
    name: "error",
    pathnames: ["*"],
    component: <Error />,
  },
];
