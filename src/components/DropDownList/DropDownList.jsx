import { Link, useNavigate } from "react-router-dom"
import './style.css';


export default function DropDownList({list}) {
  const navigate = useNavigate();


  return (
    <div className="drop_down_list_container">
       <p>OPCIONES MASCOTAS:</p>
       

       {list.map(item => <Link to={item?.bathname}>{item?.name}</Link>)}
    </div>
  )
}
