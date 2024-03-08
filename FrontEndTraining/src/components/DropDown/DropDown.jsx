import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import Logout from "../Logout";
import "./DropDown.scss";

function BasicButtonExample() {
  const [context] = useContext(authContext);
  return (
    <DropdownButton
      id="dropdown-button"
      title={`${context?.token ? `Hola ${context?.name}!` : "Bienvenid@!"}`}
    >
      {context?.role === "normal" && (
        <Dropdown.Item href="/ajustes">Ajustes</Dropdown.Item>
      )}
      {context?.role === "admin" && (
        <Dropdown.Item href="/admin/ajustes">Ajustes</Dropdown.Item>
      )}
      <Dropdown.Item className="logout-dropdown">
        {context?.token && <Logout />}
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default BasicButtonExample;
