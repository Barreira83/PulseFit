import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import UseValidateUser from "../../hooks/UseValidateUser";
import "./UserForm.scss";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [dataDb, setDataDb] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [context, setContext] = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/getUser`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const body = await response.json();
          setDataDb(body.data);
          setName(body.data.name);
          setEmail(body.data.email);
          setNewPass("");
          setIsLoading(false);
          setIsSuccess(true);
        } else {
          throw new Error("Error al hacer fetch a los datos de usuario");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [context]);

  const modifyUser = async (e) => {
    e.preventDefault();
    if (dataDb.name === name && dataDb.email === email) {
      setStatusMessage("Debes cambiar algún dato");
      setTimeout(() => {
        setStatusMessage("");
      }, 4000);
    } else {
      const validated = UseValidateUser(name, email, setStatusMessage);

      if (validated) {
        try {
          setContext({ ...context, name });
          const formData = new FormData();
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", newPass);

          const res = await fetch(
            `${import.meta.env.VITE_HOST_BACK}:${
              import.meta.env.VITE_PORT_BACK
            }/modifyUser`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${context.token}`,
              },
              body: formData,
            }
          );

          if (res.ok) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `La modificación ha sido completada con exito!`,
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: "rounded-popup",
              },
            });
            navigate(`/`);
            setName("");
            setEmail("");
            setNewPass("");
          } else {
            const body = await res.json();
            console.log(body.error);
            setStatusMessage(body.error);
          }
        } catch (error) {
          console.error(error);
          setStatusMessage("La modificación ha fallado");
        }
      }
    }
  };

  return (
    <>
      <section className="user-page">
        <h1>Modificar usuario</h1>

        <ErrorMessage message={statusMessage} />
        {isLoading ? <Loading /> : null}
        {isSuccess ? (
          <form onSubmit={modifyUser} className="user-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="pass">Nueva password</label>
            <input
              type="password"
              name="pass"
              id="pass"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />

            <button type="submit" className="btn-modify-user">
              Modificar datos
            </button>
          </form>
        ) : null}
      </section>
    </>
  );
};

export default UserForm;
