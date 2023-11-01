import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { CAT, CATEGORIES, PRO } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setform] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const dummyform = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
  };
  const [images, setimages] = useState([]);
  const [categories, setcategories] = useState([]);
  const [sent, setsent] = useState(false);
  const [loading, setloading] = useState(false);
  const [id, setid] = useState();
  const [uploading, setuploading] = useState(0);



  const nav = useNavigate();

  // ref
  const focus = useRef("");
  const openimage = useRef(null);
  const progress = useRef([])

  useEffect(() => {
    focus.current.focus();
  }, []);

  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setcategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // handle edit
  async function handleedit(e) {
    setloading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${PRO}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  }

  //  handle submit form
  async function handlesubmitform() {
    try {
      const res = await Axios.post(`${PRO}/add`, dummyform);
      setid(res.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  //  handle change
  function handlechange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
    setsent(true);
    if (sent !== true) {
      handlesubmitform();
    }
  }

  // handle image changes
  async function handleimagechange(e) {
    const j = useRef(-1)
    setimages((prev) => [...prev, ...e.target.files]);
    const imageasfile = e.target.files;
    const formdata = new FormData();
    for (let i = 0; i < imageasfile.length; i++) {
      formdata.append("image", imageasfile[i]);
      formdata.append("product_id", id);
      try {
        const res = await Axios.post(`/product-img/add`, formdata,{
          onUploadProgress : (ProgressEvent) => {
            const {loaded , total} = ProgressEvent
            const percent = Math.floor((loaded * 100) / total)
            if (percent % 10 === 0 ) {
              progress.current[j.current].style.width = `${percent}%`
              progress.current[j.current].setAttribute(`percent`,`${percent}%`)
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleopenimage() {
    openimage.current.click();
  }

  const categoriesshow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imageshow = images.map((img, key) => (
    <div className="border p-2 w-100">
      <div
        key={key}
        className="d-flex align-items-center justify-content-start gap-2 "
      >
        <img src={URL.createObjectURL(img)} width="80px"></img>
        <div>
          <p className="mb-1">{img.name}</p>
          <p>
            {img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
      </div>
      <div className="custom-progress mt-3">
        <span ref={(e) => (progress.current[key] = e)}   className="inner-progress"></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleedit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={form.category}
            required
            ref={focus}
            onChange={handlechange}
            name="category"
            placeholder="category....."
          >
            <option disabled>Select Category</option>
            {categoriesshow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            required
            ref={focus}
            disabled={!sent}
            onChange={handlechange}
            name="title"
            type="text"
            placeholder="title....."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            required
            onChange={handlechange}
            disabled={!sent}
            name="description"
            type="text"
            placeholder="description....."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={form.price}
            required
            onChange={handlechange}
            disabled={!sent}
            name="price"
            type="number"
            placeholder="price....."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            value={form.discount}
            required
            onChange={handlechange}
            disabled={!sent}
            name="discount"
            type="number"
            placeholder="discount....."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>About</Form.Label>
          <Form.Control
            value={form.About}
            required
            onChange={handlechange}
            disabled={!sent}
            name="About"
            type="text"
            placeholder="About....."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
          <Form.Label>Images</Form.Label>
          <Form.Control
            multiple
            hidden
            ref={openimage}
            disabled={!sent}
            onChange={handleimagechange}
            type="file"
          />
        </Form.Group>
        <div
          onClick={handleopenimage}
          className="d-flex align-items-center justify-content-center gap-2 py-3 w-100 rounded mb-2 flex-column"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
            cursor: sent && "pointer",
          }}
        >
          <img
            src={require("../../image/upload.png")}
            alt="upload here"
            width="100px"
            style={{ filter: !sent && "grayscale(1)" }}
          />
          <p
            className="mb-0 fw-bold"
            style={{ color: !sent ? "gray" : "#0086fe" }}
          >
            Upload Images
          </p>
        </div>

        <div className="d-flex align-items-start flex-column gap-2">
          {imageshow}
        </div>

        <button
          disabled={form.title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
