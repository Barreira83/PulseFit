import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

const RoutineDelete = ({ routineId }) => {
  const [context] = useContext(authContext);
  const navigate = useNavigate();

  const confirmation = () => {
    Swal.fire({
      title: "Está seguro?",
      text: "La rutina se borrará!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo eliminarlo.",
    }).then((result) => {
      if (result.value) {
        handleButton();
      }
    });
  };

  const handleButton = () => {
    let route = "";
    if (context.role === "admin") {
      route = "/admin/rutinas";
    } else {
      route = "/rutinas";
    }
    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/deleteRoutine/${routineId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        );

        if (response.ok) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `La rutina se ha borrado con exito!`,
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: "rounded-popup",
            },
          });
          const bodyButtonDel = await response.json();
          console.log("Respuesta a Button Delete", bodyButtonDel);

          navigate(route);
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
      <button onClick={confirmation} className="routine-delete">
        Eliminar rutina
      </button>
    </>
  );
};

RoutineDelete.propTypes = {
  routineId: PropTypes.string,
};

export default RoutineDelete;
