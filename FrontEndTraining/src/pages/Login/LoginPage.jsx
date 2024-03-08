import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import "./LoginPage.scss";

const LoginPage = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [context, setContext] = useContext(authContext);
  const { hookPostPatchFetch } = useFetchHooks();
  const mutation = useMutation(hookPostPatchFetch);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      if (context?.token) {
        navigate("/");
      }
    };

    handleLogin();
  }, [context, navigate]);

  const handleLoginButton = async (e) => {
    const loginBody = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    e.preventDefault();
    mutation.mutate(
      { endpoint: "login", method: "POST", user: loginBody },
      {
        onError: (error) => {
          setStatusMessage(error);

          setTimeout(() => {
            setStatusMessage("");
          }, 5000);
        },
        onSuccess: (data) => {
          const updatedContext = {
            name: data.name,
            token: data.token,
            role: data.rol,
          };
          setContext(updatedContext);

          if (updatedContext.token) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `Bienvenid@ ${updatedContext.name}!`,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "rounded-popup",
              },
            });
            navigate("/");
          }
        },
      },
    );
  };

  return (
    <>
      <section className="login-page">
        {mutation.isLoading && <Loading />}
        <h1>Login</h1>
        <ErrorMessage message={statusMessage} />

        <form className="login-container" onSubmit={handleLoginButton}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <input type="submit" className="submit-btn" value="Acceder" />
        </form>
        <Link to="/forgot-password" className="forgot-password">
          Olvide la contraseña
        </Link>
      </section>
    </>
  );
};

export default LoginPage;
