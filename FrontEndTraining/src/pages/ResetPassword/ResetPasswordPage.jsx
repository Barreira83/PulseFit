import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import "./ResetPasswordPage.scss";

const ResetPasswordPage = () => {
  const { hookPostPatchFetch } = useFetchHooks();
  const { temp } = useParams();
  const [statusMessage, setStatusMessage] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const navigate = useNavigate();
  const mutation = useMutation(hookPostPatchFetch);

  const postBody = { password: pass };

  const handleResetButton = (e) => {
    e.preventDefault();
    if (pass !== repeatPass) {
      setStatusMessage("No coinciden las contraseñas");
      setTimeout(() => {
        setStatusMessage("");
      }, 5000);
    } else {
      mutation.mutate(
        { endpoint: `loginReset/${temp}`, method: "PATCH", user: postBody },
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
          },
        },
      );
    }
  };

  return (
    <>
      <div className="reset-password-page">
        <h1 className="reset-password-heading">Reset Password</h1>
        <ErrorMessage message={statusMessage} />

        <form onSubmit={handleResetButton} className="reset-password-container">
          <div>
            <label htmlFor="pass" className="reset-password-label">
              Contraseña
            </label>
            <input
              type="password"
              id="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="reset-password-input"
            />
          </div>
          <div>
            <label htmlFor="repeatPass" className="reset-password-label">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="repeatPass"
              value={repeatPass}
              onChange={(e) => setRepeatPass(e.target.value)}
              className="reset-password-input"
            />
          </div>
          <input type="submit" className="reset-password-submit-btn" />
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
