import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { CAT, USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Category() {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [disable, setdesable] = useState(true);
  const [loading, setloading] = useState(false);

  const {id} = useParams()
  const nav = useNavigate()
  useEffect(() => {
    setloading(true)
    Axios.get(`${CAT}/${id}`)
      .then((data) => {
        settitle(data.data.title);
        setloading(false)
      })
      .then(() => setdesable(false)
      ).catch(
        () => nav("/dashboard/categories/page/404" , {replace: true})
      )
      
  }, []);

  async function handlesubmit(e) {
    setloading(true);
    e.preventDefault();
    const form = new FormData()
    form.append("title" ,title)
    form.append("image" ,image)
    try {
      const res = await Axios.post(`${CAT}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            required
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="title....."
          />
        </Form.Group>
          
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Image</Form.Label>  
        <Form.Control
            onChange={(e) => setimage(e.target.files.item(0))}
            type="file"
          />
        </Form.Group>
        
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
