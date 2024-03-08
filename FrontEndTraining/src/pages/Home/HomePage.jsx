import FlipCard from "../../components/FlipCard/FlipCard";
import SimpleSlider from "../../components/HomeSlider/HomeSlider";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home">
      <FlipCard />
      <section className="title-section">
        <h1 className="main-title">{import.meta.env.VITE_APP_NAME}</h1>
      </section>
      <SimpleSlider />
    </div>
  );
};

export default HomePage;
