import { useContext } from "react";
import { authContext } from "../context/AuthContext";

const useFetchHooks = () => {
  const [context] = useContext(authContext);

  const hookGetFetch = async (endpoint, options = {}) => {
    try {
      const { page, pageSize } = options;
      const url = new URL(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/${endpoint}`,
      );

      if (page) url.searchParams.append("page", page);
      if (pageSize) url.searchParams.append("pageSize", pageSize);

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${context.token}`,
        },
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error);
      } else {
        return body.data;
      }
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error.message;
    }
  };

  const hookPostPatchFetch = async ({ endpoint, method, user }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/${endpoint}`,
        {
          body: JSON.stringify(user),
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context.token}`,
          },
        },
      );
      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error);
      } else {
        return body;
      }
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error.message;
    }
  };

  return { hookGetFetch, hookPostPatchFetch };
};

export default useFetchHooks;
