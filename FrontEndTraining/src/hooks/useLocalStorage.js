import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const localStorageValue = localStorage.getItem("userData");
  const [contextState, setContextState] = useState(
    localStorageValue
      ? JSON.parse(localStorageValue)
      : { name: "", token: "", role: "" },
  );
  const changeState = (newData) => {
    const newContext = { ...contextState };
    Object.entries(newData).forEach(([key, value]) => {
      newContext[key] = value;
    });
    if (JSON.stringify(contextState) !== JSON.stringify(newContext)) {
      setContextState(newContext);
    }
  };
  useEffect(() => {
    if (contextState) {
      localStorage.setItem("userData", JSON.stringify(contextState));
    }
  }, [contextState]);

  return [contextState, changeState];
};
export default useLocalStorage;
