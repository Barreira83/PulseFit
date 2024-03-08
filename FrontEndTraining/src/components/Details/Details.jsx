import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import CountLikeChecked from "../ButtonsLikeFav/CountLikeChecked";
import editSvg from "../../assets/Edit.svg";
import FavChecked from "../ButtonsLikeFav/FavChecked";
import Loading from "../Loading/Loading";
import useFetchHooks from "../../hooks/useFetchHooks";
import "./Details.scss";

const Details = ({ trainingId }) => {
  const [details, setDetails] = useState({});
  const [context] = useContext(authContext);

  const { hookGetFetch } = useFetchHooks();
  const { isLoading, isSuccess } = useQuery(
    [`details${trainingId}`, `training/${trainingId}`],
    () => hookGetFetch(`training/${trainingId}`),
    {
      onSuccess: (data) => {
        setDetails(data);
      },
    },
  );
  let route = "";
  if (context.role === "admin") {
    route = "/admin/entrenos?";
  } else {
    route = "/entrenos?";
  }
  return (
    <div className="container-detail">
      {context.role === "admin" && (
        <>
          <div className="container-EMA">
            <ButtonDelete />
            <Link to={`/admin/modificar/${trainingId}`}>
              <button className="button">
                <img src={editSvg} alt="Eliminar" className="edit" />
              </button>
            </Link>
          </div>
        </>
      )}
      {isLoading ? <Loading /> : null}
      {isSuccess
        ? details.name && (
            <>
              <h1 className="title">{details.name}</h1>
              <div className="details">
                <div className="photo-container">
                  <img
                    className="photo"
                    src={`${import.meta.env.VITE_HOST_BACK}:${
                      import.meta.env.VITE_PORT_BACK
                    }/${details.photo}`}
                    alt="Foto de entreno"
                  />
                </div>{" "}
                <div className="interact-container">
                  <div className="tags">
                    <Link to={`${route}typology=${details.typology}`}>
                      <button className="tag">
                        Tipologia: {details.typology}
                      </button>
                    </Link>
                    <Link to={`${route}muscle_group=${details.muscle_group}`}>
                      <button className="tag">
                        Grupo muscular: {details.muscle_group}
                      </button>
                    </Link>
                  </div>
                  <div className="logos">
                    <FavChecked trainingId={trainingId} />
                    <CountLikeChecked trainingId={trainingId} />
                  </div>
                </div>
                <div className="description-container">
                  <p className="description">{details.description}</p>
                </div>
              </div>
            </>
          )
        : null}
    </div>
  );
};

Details.propTypes = {
  trainingId: PropTypes.string,
};

export default Details;
