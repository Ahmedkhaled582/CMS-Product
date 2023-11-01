import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LOGIN , baseURL } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";

export default function Login() {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [err, seterr] = useState("");

  const cookie = Cookie();

  const [loading, setloading] = useState(false);


  const focus = useRef("")


  useEffect(() => {
    focus.current.focus()
  },[])


  function handlechange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setloading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      const role = res.data.user.role
      const go = role === "1995" ? "users" : "writer"
      window.location.pathname=`/dashboard/${go}`
    } catch (error) {
      console.log(error);
      setloading(false);
      if (error.response.status === 401) {
        seterr("Wrong Email Or Password");
      } else {
        seterr("Internal Server ERR");
      }
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div
          style={{ height: "100vh" }}
          className="ahmed row align-items-center justify-content-center"
        >
          <Form className="form " onSubmit={handlesubmit}>
            <div className="custom-form">
              <h1>Login</h1>
              <Form.Group
                className="form-c mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  value={form.email}
                  onChange={handlechange}
                  name="email"
                  ref={focus}
                  required
                  type="email"
                  placeholder="Enter Your Email.."
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-c mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  value={form.password}
                  onChange={handlechange}
                  minLength={6}
                  required
                  type="password"
                  name="password"
                  placeholder="Enter Your Password.."
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <button type="submit" className="btn btn1 btn-primary mb-3">
                Login
              </button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>

              {err != "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
