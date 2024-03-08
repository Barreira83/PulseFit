import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import "./Routine.scss";

const Routine = ({ data }) => {
  const [context] = useContext(authContext);

  let route = "";
  if (context.role === "admin") {
    route = "/admin/configurar-rutina/";
  } else {
    route = "/configurar-rutina/";
  }

  return (
    <ul className="routine-list">
      {data.map((routine) => {
        return (
          <li key={routine.id} className="routine">
            <Link to={`${route}${routine.id}`}>
              <h2 className="routine-name">{routine.name}</h2>

              <p className="routine-description">{routine.description}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

Routine.propTypes = {
  data: PropTypes.array,
};

export default Routine;
