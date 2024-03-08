import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import Training from "../Training/Training";
import "./OrderTraining.scss";

const OrderAndSearchInputTraining = () => {
  const [context] = useContext(authContext);
  const [filter, setFilter] = useState([]);
  const [render, setRender] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (field, value) => {
    searchParams.set(field, value);
    setSearchParams(new URLSearchParams(searchParams));
  };

  useEffect(() => {
    const getTrainingFetch = async () => {
      try {
        const queryParams = searchParams.toString();

        const res = await fetch(
          `
        ${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/training?${queryParams}`,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }

        const body = await res.json();
        setFilter(body.data);
        setRender(false);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    const timerId = setTimeout(getTrainingFetch, 600);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchParams, context.token, render]);

  return (
    <>
      <form className="order-training-form">
        <div className="search-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={searchParams.get("name") || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="search-group">
          <label htmlFor="typology">Tipologia</label>
          <input
            type="text"
            id="typology"
            value={searchParams.get("typology") || ""}
            onChange={(e) => handleChange("typology", e.target.value)}
          />
        </div>

        <div className="search-group">
          <label htmlFor="muscleGroup">Grupo Muscular</label>
          <input
            type="text"
            id="muscleGroup"
            value={searchParams.get("muscle_group") || ""}
            onChange={(e) => handleChange("muscle_group", e.target.value)}
          />
        </div>
        <div className="order-group">
          <label htmlFor="order"></label>
          <select
            value={searchParams.get("order_by") || ""}
            name="order"
            id="order"
            onChange={(e) => {
              handleChange("order_by", e.target.value);
            }}
          >
            <option value="">Ordenar por</option>
            <option value="name">Nombre</option>
            <option value="date">Fecha</option>
            <option value="likes">Likes</option>
          </select>
        </div>
      </form>
      <Training data={filter} setRender={setRender} />
    </>
  );
};

OrderAndSearchInputTraining.propTypes = {
  allTraining: PropTypes.array,
};

export default OrderAndSearchInputTraining;
