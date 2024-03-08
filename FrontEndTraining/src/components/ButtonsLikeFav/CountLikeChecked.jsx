import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import "./ButtonsLikeFav.scss";

const CountLikeChecked = ({ trainingId }) => {
  const [context] = useContext(authContext);
  const [like, setLike] = useState();
  const [countLikes, setCountLikes] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/likeChecked/${trainingId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        );

        if (response.ok) {
          const body = await response.json();
          setLike(body.data.likeCheck);
        } else {
          throw new Error("Error al hacer fetch al like del entreno ");
        }

        const responseCount = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/allLikes/${trainingId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        );

        if (responseCount.ok) {
          const bodyCount = await responseCount.json();
          setCountLikes(bodyCount.data);
        } else {
          throw new Error(
            "Error al hacer fetch al recuento de likes del entreno",
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [trainingId, context, like]);

  const handleButton = (table, method) => {
    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/${table}/${trainingId}`,
          {
            method: method,
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        );

        if (response.ok) {
          setLike(!like);
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
    <>
      <div className="likes-container">
        <button
          className={`LIKE ${like && "red"}`}
          onClick={() => {
            handleButton("like", like ? "DELETE" : "POST");
          }}
        ></button>
        <p className="number-likes">{countLikes}</p>
      </div>
    </>
  );
};
CountLikeChecked.propTypes = {
  trainingId: PropTypes.string,
};

export default CountLikeChecked;
