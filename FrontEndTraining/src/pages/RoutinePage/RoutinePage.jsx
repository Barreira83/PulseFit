import { useQuery } from "react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import Routine from "../../components/Routine/Routine";
import useFetchHooks from "../../hooks/useFetchHooks";
import "./RoutinePage.scss";

const RoutinePage = () => {
  const [context] = useContext(authContext);
  const [allRoutines, setAllRoutines] = useState([]);
  const { hookGetFetch } = useFetchHooks();

  const { isLoading, isError, error, isSuccess } = useQuery(
    ["routineInfo", "getRoutine"],
    () => hookGetFetch("getRoutine"),
    {
      onSuccess: (data) => {
        setAllRoutines(data);
      },
    },
  );

  let route = "";
  if (context.role === "admin") {
    route = "/admin/crear-rutinas";
  } else {
    route = "/crear-rutinas";
  }
  return (
    <div className="routines-list-page">
      <h1>Mis Rutinas</h1>
      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? <Routine data={allRoutines} /> : null}
      <Link to={`${route}`} className="add-routine">
        Nueva Rutina
      </Link>
    </div>
  );
};

export default RoutinePage;
