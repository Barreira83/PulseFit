import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const Logout = () => {
  const [, setContext] = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setContext({ name: "", token: "", role: "" });
    navigate("/login");
  };

  return (
    <div onClick={handleLogout} className="logout">
      Cerrar sesión
    </div>
  );
};

export default Logout;
