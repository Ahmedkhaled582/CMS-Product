import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import Tableshow from "../../Components/Dashboard/Table";

export default function Users() {
  const [users, setusers] = useState([]);
  const [currentuser, setcurrentuser] = useState("");

  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setcurrentuser(res.data));
  }, []);
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setusers(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  async function handledelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      console.log(res);
      setusers((prev) => prev.filter((item) => item.id !==id))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>

      <Tableshow
        header={header}
        data={users}
        currentuser={currentuser}
        delete={handledelete}
      />
    </div>
  );
}
