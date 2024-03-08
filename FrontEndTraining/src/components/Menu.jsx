import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../context/AuthContext";

export const Menu = () => {
  const [context] = useContext(authContext);

  return (
    <div className="menu">
      <header className="menu-items">
        {!context?.token && (
          <>
            <NavLink to="/" className="nav-link">
              HOME
            </NavLink>

            <NavLink to="/login" className="nav-link">
              LOGIN
            </NavLink>

            <NavLink to="/registro" className="nav-link">
              REGISTRO
            </NavLink>
          </>
        )}
        {context?.role === "admin" && (
          <>
            <NavLink to="/" className="nav-link">
              HOME
            </NavLink>

            <NavLink to="/admin/entrenos" className="nav-link">
              ENTRENOS
            </NavLink>

            <NavLink to="/admin/favoritos" className="nav-link">
              FAVORITOS
            </NavLink>

            <NavLink to="/admin/rutinas" className="nav-link">
              RUTINAS
            </NavLink>
          </>
        )}
        {context?.role === "normal" && (
          <>
            <NavLink to="/" className="nav-link">
              HOME
            </NavLink>

            <NavLink to="/entrenos" className="nav-link">
              ENTRENOS
            </NavLink>

            <NavLink to="/favoritos" className="nav-link">
              FAVORITOS
            </NavLink>

            <NavLink to="/rutinas" className="nav-link">
              RUTINAS
            </NavLink>
          </>
        )}
      </header>
    </div>
  );
};
export default Menu;
