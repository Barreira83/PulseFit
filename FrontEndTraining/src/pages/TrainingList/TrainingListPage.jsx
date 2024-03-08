import { useContext } from "react";
import { Link } from "react-router-dom";
import addSvg from "../../assets/Add.svg";
import { authContext } from "../../context/AuthContext.jsx";
import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";
import "./TrainingListPage.scss";

const TrainingListPage = () => {
  const [context] = useContext(authContext);

  return (
    <div className="training-list">
      <h1>Entrenamientos</h1>
      {context.role === "admin" && (
        <Link to="/admin/crear" className="linkList">
          <button className="buttonAdd">
            <img src={addSvg} alt="Añadir" className="add" />
          </button>
        </Link>
      )}
      <OrderAndSearchInputTraining />
    </div>
  );
};

export default TrainingListPage;
