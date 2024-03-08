import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import DropDown from "../components/DropDown/DropDown";
import Menu from "../components/Menu";
import "./Header.scss";

const Header = () => {
  const [context] = useContext(authContext);
  return (
    <div className="header">
      <Menu />
      {context?.token && <DropDown />}
    </div>
  );
};

export default Header;
