import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";

export default function Tableshow(props) {
  const currentuser = props.currentuser || {
    name : ""
  };



  const headershow = props.header.map((item) => <th>{item.name}</th>);
  const datashow = props.data.map((item, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
        {item2.key === "image" ? ( <img width="50px" src={item[item2.key]}/>)
        : item[item2.key] === "1995"
            ? "Admin"
            : item[item2.key] === "2001"
            ? "User"
            : item[item2.key] === "1996"
            ? "Writer"
            : item[item2.key] === "1999"
            ? "Product Manger"
            : item[item2.key]}
            {currentuser && item[item2.key] === currentuser.name && " (You)"}
        </td>
      ))}
      <td>
        <div className="d-flex justify-content-center">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-center">
        {currentuser.name !== item.name &&
          <FontAwesomeIcon
            color="red"
            cursor={"pointer"}
            onClick={() => props.delete(item.id)}
            fontSize={"19px"}
            icon={faTrash}
          />
        }
        </div>
      </td>
    </tr>
  ));
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          {headershow}
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {props.data.length === 0 && (
        <tr className="text-center">
        <td colSpan={12}>Loading...</td>
        </tr>
      )}
      {datashow}
      </tbody>
    </Table>
  );
}
