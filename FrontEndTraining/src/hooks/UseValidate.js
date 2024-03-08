const UseValidate = (
  name,
  typology,
  description,
  muscular,
  setStatusMessage
) => {
  if (name === "" || description === "" || muscular === "" || typology === "") {
    setStatusMessage("Debes cubrir todos los campos");
    setTimeout(() => {
      setStatusMessage("");
    }, 4000);

    return false;
  } else {
    if (name.length > 50) {
      setStatusMessage("El campo nombre tiene un máximo de 50 caracteres");
      setTimeout(() => {
        setStatusMessage("");
      }, 4000);

      return false;
    }
    if (typology.length > 50) {
      setStatusMessage("El campo tipología tiene un máximo de 50 caracteres");
      setTimeout(() => {
        setStatusMessage("");
      }, 4000);

      return false;
    }
    if (muscular.length > 50) {
      setStatusMessage(
        "El campo grupo muscular tiene un máximo de 50 caracteres"
      );
      setTimeout(() => {
        setStatusMessage("");
      }, 4000);

      return false;
    }
    return true;
  }
};

export default UseValidate;
