import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import "./ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const { hookPostPatchFetch } = useFetchHooks();
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  const postBody = { email: mail };
  const mutation = useMutation(hookPostPatchFetch);

  const handleForgotButton = (e) => {
    e.preventDefault();
    if (!mail) {
      setStatusMessage("Debe de facilitar algun dato");
      setTimeout(() => {
        setStatusMessage("");
      }, 5000);
    }
    if (mail) {
      mutation.mutate(
        { endpoint: "loginForgot", method: "POST", user: postBody },
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
            navigate("/login");
            setMail("");
          },
        },
      );
    }
  };

  return (
    <>
      <section
        className="forgot-password-page
      "
      >
        <h1>Recuperar Contraseña</h1>

        <ErrorMessage message={statusMessage} />

        <form
          className="forgot-password-container"
          onSubmit={handleForgotButton}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          <input type="submit" className="submit-btn" />
        </form>
      </section>
    </>
  );
};

export default ForgotPasswordPage;
