import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext.jsx";
import Training from "../../components/Training/Training.jsx";
import "./FavListPage.scss";

const FavListPage = () => {
  const [allFavs, setAllFavs] = useState([]);
  const [render, setRender] = useState(false);
  const [context] = useContext(authContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/fav`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        );

        if (response.ok) {
          const body = await response.json();
          setAllFavs(body.data);
          setRender(false);
        } else {
          throw new Error("Error al hacer fetch al listado de favoritos");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [context, render]);

  return (
    <>
      <div className="training-list-fav">
        <h1>Entranamientos favoritos</h1>
        {allFavs.length > 0 ? (
          <Training data={allFavs} setRender={setRender} />
        ) : (
          <p>No tienes entrenamientos favoritos por el momento.</p>
        )}
      </div>
    </>
  );
};
FavListPage.propTypes = {
  data: PropTypes.array,
  renderElement: PropTypes.func,
};

export default FavListPage;
