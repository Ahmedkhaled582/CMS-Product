import { useEffect, useState } from "react";
import { CAT, CATEGORIES } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import Tableshow from "../../Components/Dashboard/Table";

export default function Categories() {
  const [categories, setcategories] = useState([]);


 
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setcategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  
  const header = [
    {
      key : "title",
      name : "Title"
    },
    {
      key :"image",
      name : "Image"
      
    },
  ]
  async function handledelete(id) {
    try {
      const res = await Axios.delete(`${CAT}/${id}`);
      console.log(res);
      setcategories((prev) => prev.filter((item) => item.id !==id))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
    <div className="d-flex align-items-center justify-content-between">
      <h1>Categories Page</h1>
      <Link className="btn btn-primary" to="/dashboard/categories/add">
      Add Category
      </Link>


      </div>

      <Tableshow header={header} data={categories} delete={handledelete}/>
      
    </div>
  );
}
  
  