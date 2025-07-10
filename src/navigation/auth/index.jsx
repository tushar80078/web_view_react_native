import { useEffect, useState } from "react";
import { authRoutes } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
import useUserDetails from "@/hooks/useUserDetails";

const AuthenticatedRoutes = ({ userRole }) => {
  const [authRoutesState, setAuthRoutesState] = useState([]);
  const { corporate } = useUserDetails();

  useEffect(() => {
    const routes = authRoutes?.filter(
      (route) =>
        route.access.includes(userRole) ||
        (route.access.includes("All") &&
          corporate?.corporate_name === route.corporate)
    );

    setAuthRoutesState(routes);
  }, [userRole]);

  // Only reder when authRoutesState has minimum one route.
  if (authRoutesState.length == 0) {
    return null;
  }

  return (
    <Routes>
      {/**-------------  Conditionally Redering All Routes On The Basis Of Role -------------**/}

      {authRoutesState.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route
        path={"/*"}
        element={<Navigate replace to={`/app${authRoutesState[0]?.path}`} />}
      />
    </Routes>
  );
};

export default AuthenticatedRoutes;
