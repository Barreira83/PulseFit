import Swal from "sweetalert2";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import "./ButtonDeleteUser.scss";

const ButtonDeleteUser = () => {
  const [context, setContext] = useContext(authContext);
  const navigate = useNavigate();

  const confirmation = () => {
    Swal.fire({
      title: "Está seguro?",
      text: "El usuario se borrará!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo eliminar mi cuenta.",
    }).then((result) => {
      if (result.value) {
        handleButton();
      }
    });
  };

  const handleButton = () => {
    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/removeUser`,
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
            title: `El usuario se ha borrado con exito!`,
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: "rounded-popup",
            },
          });
          const bodyButtonDel = await response.json();
          console.log("Respuesta a Button Delete", bodyButtonDel);
          setContext({ name: "", token: "", role: "" });
          navigate("/");
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
    <button
      className={
        context.role === "admin" ? "btn-delete-admin" : "btn-delete-user"
      }
      onClick={confirmation}
    >
      Eliminar cuenta
    </button>
  );
};

export default ButtonDeleteUser;
