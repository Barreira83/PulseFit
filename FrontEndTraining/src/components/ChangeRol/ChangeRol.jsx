import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useFetchHooks from "../../hooks/useFetchHooks";
import "./ChangeRol.scss";

const ChangeRol = () => {
  const { hookPostPatchFetch } = useFetchHooks();
  const [statusMessage, setStatusMessage] = useState("");
  const [mail, setMail] = useState("");
  const postBody = { email: mail };
  const mutation = useMutation(hookPostPatchFetch);

  return (
    <>
      <section
        className="rol-page
      "
      >
        <h1>Cambio de rol</h1>

        <ErrorMessage message={statusMessage} />

        <form className="rol-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          <button
            type="submit"
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(
                { endpoint: `rolToAdmin`, method: "PATCH", user: postBody },
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
                    setMail("");
                  },
                },
              );
            }}
          >
            Cambiar a Admin
          </button>
          <button
            type="submit"
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(
                { endpoint: `rolToNormal`, method: "PATCH", user: postBody },
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
                    setMail("");
                  },
                },
              );
            }}
          >
            Cambiar a Normal
          </button>
        </form>
      </section>
    </>
  );
};

export default ChangeRol;
