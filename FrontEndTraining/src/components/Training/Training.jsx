import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import "./Training.scss";

const Training = ({ data, setRender }) => {
  const [context] = useContext(authContext);

  const handleButton = (table, method, entreno) => {
    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/${table}/${entreno}`,
          {
            method: method,
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        );

        if (response.ok) {
          setRender(true);
        } else {
          const body = await response.json();
          console.error("ERROR fetchButton", body.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchButton();
  };

  return (
    <ul className="all-trainings">
      {data.map((training) => {
        return (
          <li key={training.id} className="list-training">
            <div className="botones">
              <button
                className={`FAV ${training.favTrue && "red"}`}
                onClick={() => {
                  handleButton(
                    "fav",
                    training.favTrue ? "DELETE" : "POST",
                    training.id,
                  );
                }}
              ></button>
              <div className="count-likes">
                <button
                  className={`LIKE ${training.likeTrue && "red"}`}
                  onClick={() => {
                    handleButton(
                      "like",
                      training.likeTrue ? "DELETE" : "POST",
                      training.id,
                    );
                  }}
                ></button>
                <p className="numb-likes">{training.allLikes}</p>
              </div>
            </div>

            <Link
              to={
                context.role === "admin"
                  ? `/admin/entreno/${training.id}`
                  : `/entreno/${training.id}`
              }
            >
              <h2 className="training-name">{training.name}</h2>

              <img
                src={`${import.meta.env.VITE_HOST_BACK}:${
                  import.meta.env.VITE_PORT_BACK
                }/${training.photo}`}
                alt="Imagen del entreno seleccionado"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

Training.propTypes = {
  data: PropTypes.array,
  setRender: PropTypes.func,
};

export default Training;
