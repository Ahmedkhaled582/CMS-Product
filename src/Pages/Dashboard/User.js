import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [disable, setdesable] = useState(true);
  const [loading, setloading] = useState(false);
  const [role, setrole] = useState("");

  const {id} = useParams()
  const nav = useNavigate()

  useEffect(() => {
    setloading(true)
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setname(data.data.name);
        setemail(data.data.email);
        setrole(data.data.role);
        setloading(false)
      })
      .then(() => setdesable(false)
      ).catch(
        () => nav("/dashboard/users/page/404" , {replace: true})
      )
      
  }, []);

  async function handlesubmit(e) {
    setloading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
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
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setrole(e.target.value)}>
            <option disabled value="">Select Role</option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
