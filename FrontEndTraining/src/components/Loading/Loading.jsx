import Spinner from "../../assets/Spinner.svg";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <img src={Spinner} alt="Spinner" className="spinner-img" />
    </div>
  );
};

export default Loading;
