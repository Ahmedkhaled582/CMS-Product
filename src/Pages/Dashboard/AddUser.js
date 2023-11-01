import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function AddUser() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [role, setrole] = useState("");

  const focus = useRef("")

  useEffect(() => {
    focus.current.focus()
  },[])

  async function handlesubmit(e) {
    setloading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password:password,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={name}
            required
            ref={focus}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="name....."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="email......"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            required
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="password......"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setrole(e.target.value)}>
            <option disabled value="">Select Role</option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button disabled={name.length > 1 && email.length > 1 && password.length > 6 && role !=="" ? false : true} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
