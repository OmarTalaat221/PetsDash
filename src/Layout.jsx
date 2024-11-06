import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";

export default function Layout() {
  return (
    <div className="main_layout">
        <Sidebar />
        <div style={{backgroundColor:"#f8f9fc"}}>
          <Navbar />
          <Outlet />
          <Footer />
        </div>
    </div>
  )
}
