import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { links } from "./NavLink";

export default function Sidebar() {
  const menu = useContext(Menu);
  const Windowcontext = useContext(WindowSize);
  const windowsize = Windowcontext.windowsize;
  const isOpen = menu.isOpen;

  const [user, setuser] = useState("");

  const Navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setuser(data.data))
      .catch(() => Navigate("/login"));
  }, []);

  return (
    <>
    <div style={{position:"fixed" , top:"70px" , left:"0" ,width:"100%" , height:"100vh" , backgroundColor:"rgba(0 ,0 ,0,0.2)" , display : windowsize < "768" && isOpen ? "block" : "none"}}></div>
    <div
      className="side-bar pt-3"
      style={{
        left: windowsize < "768" ? (isOpen ? 0 : "-100%") : 0,
        width: isOpen ? "240px" : "fit-content",
        position: windowsize < "768" ? "fixed" : "sticky"
      }}
    >
    {links.map((link , key) => (
      link.role.includes(user.role) && (
        <NavLink
      key={key}
      to={link.path}
      className="d-flex align-items-center gap-2 side-bar-link"
    >
      <FontAwesomeIcon
        icon={link.icon}
        style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 13px" }}
      />
      <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
        {link.name}
      </p>
    </NavLink>
      )
    ))}
      
    </div>
    </>
  );
}
