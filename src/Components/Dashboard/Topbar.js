import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Axios } from "../../Api/Axios";
import { Navigate } from "react-router-dom";
import Cookie from "cookie-universal"

export default function Topbar() {
  const menu = useContext(Menu)
  const setisOpen = menu.setisOpen
  const [name , setname] = useState("")
  const cookie = Cookie()

  useEffect(() => {
    Axios.get(`/${USER}`)
    .then((data) => setname(data.data.name))
    .catch(() => Navigate("/login"))
},[])

async function handlelogout(){
  try {
      const res = await Axios.get(`/${LOGOUT}`)
      cookie.remove("e-commerce")
      window.location.pathname="/login"
  } catch (error) {
      console.log(error)
  }
}
    return (
      <div className="top-bar">
      <div className="d-flex align-items-center justify-content-between h-100">
      <div className="d-flex align-items-center gap-5">     
      <h3>E-Commerce</h3>
      <FontAwesomeIcon onClick={()=> setisOpen(prev => !prev)} cursor={"pointer"} icon={faBars} />
      </div>
      <div>
 
    <DropdownButton id="dropdown-basic-button" title={name}>
      <Dropdown.Item onClick={handlelogout}>Logout</Dropdown.Item>
    </DropdownButton>
      </div>
      </div>
      </div>
    );
  }
  
  
