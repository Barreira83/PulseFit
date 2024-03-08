import PropTypes from "prop-types";
import { authContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthProvider = ({ children }) => {
  const [context, setContext] = useLocalStorage();

  return (
    <authContext.Provider value={[context, setContext]}>
      {children}
    </authContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
