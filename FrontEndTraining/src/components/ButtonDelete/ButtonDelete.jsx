import Swal from "sweetalert2";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import deleteSvg from "../../assets/Delete.svg";
import "./ButtonDelete.scss";

const ButtonDelete = () => {
  const [context] = useContext(authContext);
  const navigate = useNavigate();

  const { trainingId } = useParams();

  const confirmation = () => {
    Swal.fire({
      title: "Está seguro?",
      text: "El entreno se borrará!",
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

  let route = "";
  if (context.role === "admin") {
    route = "/admin/entrenos";
  } else {
    route = "/entrenos";
  }

  const handleButton = () => {
    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/training/${trainingId}`,
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
            title: `El entreno se ha borrado con éxito!`,
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
      <button className="buttons-delete" onClick={confirmation}>
        {" "}
        <img src={deleteSvg} alt="Eliminar" className="delete" />
      </button>
    </>
  );
};

export default ButtonDelete;
