import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { authContext } from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import "./FormAddRoutine.scss";

const FormAddRoutine = () => {
  const [context] = useContext(authContext);
  const { hookPostPatchFetch } = useFetchHooks();
  const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const mutation = useMutation(hookPostPatchFetch);

  const handleRoutineButton = (e) => {
    e.preventDefault();

    if (name === "" || description === "") {
      setStatusMessage("Todos los campos deben estar cubiertos");
      setTimeout(() => {
        setStatusMessage("");
      }, 4000);
    } else {
      const postBody = { name, description };
      mutation.mutate(
        { endpoint: "addRoutine", method: "POST", user: postBody },
        {
          onError: (error) => {
            setStatusMessage(error);
            setTimeout(() => {
              setStatusMessage("");
            }, 5000);
          },
          onSuccess: (data) => {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: "rounded-popup",
              },
            });
            navigate(`${route}`);
          },
        }
      );
    }
  };

  let route = "";
  if (context.role === "admin") {
    route = "/admin/rutinas";
  } else {
    route = "/rutinas";
  }

  return (
    <div className="routine-create">
      {mutation.isLoading && <Loading />}
      <h1>Crear Rutina</h1>

      <ErrorMessage message={statusMessage} />
      <section className="routine-form">
        <form className="routine-container" onSubmit={handleRoutineButton}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="description">Descripcion</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input type="submit" className="submit-btn" value="Crear" />
        </form>
      </section>
    </div>
  );
};

export default FormAddRoutine;
