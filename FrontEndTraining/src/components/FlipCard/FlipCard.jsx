import "./FlipCard.scss";

const FlipCard = () => {
  return (
    <div className="grid-cards">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div
            className="flip-card-front"
            style={{ backgroundImage: 'url("/pic-04.jpg")' }}
          >
            {import.meta.env.VITE_APP_NAME.toUpperCase()}
          </div>

          <div className="flip-card-back">
            ¡Bienvenido a {import.meta.env.VITE_APP_NAME}! La herramienta ideal
            para gestionar tus entrenamientos de manera cómoda. Descubre
            diversos ejercicios, crea rutinas personalizadas y encuentra la
            motivación para alcanzar tus metas como entrenador fitness.
          </div>
        </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-inner">
          <div
            className="flip-card-front"
            style={{ backgroundImage: 'url("/pic-05.jpg")' }}
          >
            EXPLORA
          </div>

          <div className="flip-card-back">
            Explora nuestra extensa lista de ejercicios con facilidad. Utiliza
            la barra de búsqueda y los filtros para encontrar los movimientos
            que se adapten a tus necesidades. ¡Puedes ordenar incluso por número
            de likes para conocer los ejercicios más populares!
          </div>
        </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-inner">
          <div
            className="flip-card-front"
            style={{ backgroundImage: 'url("/pic-06.jpg")' }}
          >
            PERSONALIZA
          </div>

          <div className="flip-card-back">
            Personaliza tu experiencia de entrenamiento con{" "}
            {import.meta.env.VITE_APP_NAME}. Guarda tus ejercicios preferidos y
            organízalos en la sección de favoritos para acceder rápidamente a
            ellos. Además, aprovecha la función de crear rutinas de
            entrenamiento personalizadas para tus clientes de forma eficiente.
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlipCard;
