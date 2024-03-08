import {
  AdminTrainingCreate,
  AdminTrainingModify,
  AdminUserSetting,
  FavListPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  RoutinePage,
  SettingsPage,
  TrainingDetailPage,
  TrainingListPage,
} from "./pages";

import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { authContext } from "./context/AuthContext";
import ChangeRol from "./components/ChangeRol/ChangeRol";
import Footer from "./layout/Footer";
import FormRemoveUserByEmail from "./components/FormRemoveUserByEmail/FormRemoveUserByEmail";
import FormAddRoutine from "./components/FormAddRoutine/FormAddRoutine";
import Header from "./layout/Header";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RoutineConfigPage from "./pages/RoutineConfigPage/RoutineConfigPage";

const Layout = () => {
  const [context, setContext] = useContext(authContext);
  useEffect(() => {
    const getRole = async () => {
      try {
        const req = await fetch(
          `
        ${import.meta.env.VITE_HOST_BACK}:${import.meta.env.VITE_PORT_BACK}/verify`,
          {
            headers: { Authorization: `Bearer ${context?.token}` },
          },
        );
        const body = await req.json();
        const role = await body.rol;

        setContext({ ...context, role });
      } catch (error) {
        console.error("Token no válido");
      }
    };

    if (context.token && !context.role) {
      getRole();
    }
  }, [context, setContext]);

  const routes = [...routesWithoutAuth];

  if (context?.token && context?.role !== "admin") {
    routes.push(...routesWithAuth);
  } else if (context?.role === "admin") {
    routes.push(...routesAdmin);
  } else {
    routes.push(...loginRoutes);
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const routesAdmin = [
  {
    path: "/admin/entrenos",
    element: <TrainingListPage />,
  },
  {
    path: "/admin/entreno/:trainingId",
    element: <TrainingDetailPage />,
  },
  {
    path: "/admin/favoritos",
    element: <FavListPage />,
  },
  {
    path: "/admin/modificar/:trainingId",
    element: <AdminTrainingModify />,
  },
  {
    path: "/admin/crear",
    element: <AdminTrainingCreate />,
  },
  {
    path: "/admin/ajustes",
    element: <AdminUserSetting />,
  },
  {
    path: "/admin/ajustes/rol",
    element: <ChangeRol />,
  },
  {
    path: "/admin/ajustes/borrar-usuario",
    element: <FormRemoveUserByEmail />,
  },
  {
    path: "/admin/rutinas",
    element: <RoutinePage />,
  },
  {
    path: "/admin/crear-rutinas",
    element: <FormAddRoutine />,
  },
  {
    path: "/admin/configurar-rutina/:id",
    element: <RoutineConfigPage />,
  },
];

const routesWithAuth = [
  {
    path: "/entrenos",
    element: <TrainingListPage />,
  },
  {
    path: "/favoritos",
    element: <FavListPage />,
  },
  {
    path: "/entreno/:trainingId",
    element: <TrainingDetailPage />,
  },
  {
    path: "/ajustes",
    element: <SettingsPage />,
  },
  {
    path: "/rutinas",
    element: <RoutinePage />,
  },
  {
    path: "/crear-rutinas",
    element: <FormAddRoutine />,
  },
  {
    path: "/configurar-rutina/:id",
    element: <RoutineConfigPage />,
  },
];

const routesWithoutAuth = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
];

const loginRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registro",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:temp",
    element: <ResetPasswordPage />,
  },
];

export default Layout;
