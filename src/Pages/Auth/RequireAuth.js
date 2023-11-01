import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../Api/Axios";
import Err403 from "./403";

export default function RequireAuth({allowedRole}) {
  const [user, setuser] = useState("");

  const Navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setuser(data.data))
      .catch(() => Navigate("/login"));
  }, []);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
    
  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : ( <Err403 role={user.role}/>) 
  ) : (
    <Navigate to={"/Login"} />
  );
}
