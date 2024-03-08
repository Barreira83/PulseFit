const UseValidateUser = (name, email, setStatusMessage) => {
  if (name === "" || email === "") {
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
    if (email.length > 50) {
      setStatusMessage("El campo email tiene un máximo de 50 caracteres");
      setTimeout(() => {
        setStatusMessage("");
      }, 4000);
      return false;
    }

    return true;
  }
};

export default UseValidateUser;
