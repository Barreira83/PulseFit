import { useState, useEffect } from "react";
import "./HomeSlider.scss";

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const imageSlide = [
    {
      url: "/pic-01.jpg",
      caption: "Image Slider 01",
    },
    {
      url: "/pic-02.jpg",
      caption: "Image Slider 02",
    },
    {
      url: "/pic-03.jpg",
      caption: "Image Slider 03",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imageSlide.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="slide-container">
      <div>
        {imageSlide.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.caption}
            style={{
              opacity: index === currentSlide ? "1" : "0",
              transition: "opacity 0.8s ease-in-out",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
