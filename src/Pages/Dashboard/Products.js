import { useEffect, useState } from "react";
import { PRO, PRODUCTS } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { Link } from "react-router-dom";
import Tableshow from "../../Components/Dashboard/Table";

export default function Products() {
  const [products, setproducts] = useState([]);


 
  useEffect(() => {
    Axios.get(`/${PRODUCTS}`)
      .then((data) => setproducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  
  const header = [
    {
      key : "title",
      name : "Title"
    },
    {
      key :"description",
      name : "Description"
      
    },
    {
        key :"price",
        name : "Price"
        
      },
      {
        key :"rating",
        name : "Rating"
        
      },
  ]
  async function handledelete(id) {
    try {
      const res = await Axios.delete(`${PRO}/${id}`);
      console.log(res);
      setproducts((prev) => prev.filter((item) => item.id !==id))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
    <div className="d-flex align-items-center justify-content-between">
      <h1>Products Page</h1>
      <Link className="btn btn-primary" to="/dashboard/categories/add">
      Add Products
      </Link>


      </div>

      <Tableshow header={header} data={products} delete={handledelete}/>
      
    </div>
  );
}
  
  