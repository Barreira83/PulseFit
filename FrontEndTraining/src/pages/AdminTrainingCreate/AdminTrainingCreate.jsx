import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import UseValidate from "../../hooks/UseValidate";
import "./AdminTrainingCreate.scss";

const AdminTrainingCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typology, setTypology] = useState("");
  const [muscular, setMuscular] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [context] = useContext(authContext);
  const navigate = useNavigate();

  const createTraining = async (e) => {
    e.preventDefault();
    const validated = UseValidate(
      name,
      description,
      typology,
      muscular,
      setStatusMessage
    );

    if (validated) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("typology", typology);
        formData.append("muscle_group", muscular);
        formData.append("image", e.target.elements.photo.files[0]);

        const res = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/training`,
          {
            method: "POST",
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
            title: `El entreno ha sido creado con exito!`,
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: "rounded-popup",
            },
          });

          navigate("/admin/entrenos");
          setName("");
          setDescription("");
          setTypology("");
          setMuscular("");
        } else {
          const body = await res.json();
          console.log(body);
          setStatusMessage(body.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <section className="create-page">
        <h1>Añadir entreno</h1>

        <ErrorMessage message={statusMessage} />

        <form onSubmit={createTraining} className="create-container">
          <label htmlFor="name">Nombre entreno</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="typology">Tipología</label>
          <input
            type="text"
            name="typology"
            id="typology"
            value={typology}
            onChange={(e) => setTypology(e.target.value)}
          />

          <label htmlFor="group">Grupo muscular</label>
          <input
            type="text"
            name="group"
            id="group"
            value={muscular}
            onChange={(e) => setMuscular(e.target.value)}
          />

          <label htmlFor="description">Descripcion</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="photo">Subir imagen</label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            name="photo"
            id="photo"
          />

          <button type="submit" className="btn-crear-user">
            Enviar
          </button>
        </form>
      </section>
    </>
  );
};

export default AdminTrainingCreate;
