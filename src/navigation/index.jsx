import { Route, Routes, Navigate } from "react-router-dom";
import PublicRoutes from "./public";
import AuthenticatedRoutes from "./auth";
import useUserDetails from "@/hooks/useUserDetails";

const Root = () => {
  const { logout } = useUserDetails();

  const getToken = () => {
    let userToken = localStorage.getItem("token");
    if (userToken) {
      return true;
    } else {
      logout();
      return false;
    }
  };

  return (
    <Routes>
      {getToken() ? (
        <>
          {/**-------------  Authenticated Routes -------------**/}
          <Route
            path="/app/*"
            element={<AuthenticatedRoutes userRole={"All"} />}
          />
        </>
      ) : (
        <>
          {/**-------------  Public Routes -------------**/}
          <Route path="/*" element={<PublicRoutes />} />
        </>
      )}

      <Route
        path={"/*"}
        element={
          getToken() ? (
            <Navigate replace to={`/app/*`} />
          ) : (
            <Navigate replace to={`/*`} />
          )
        }
      />
    </Routes>
  );
};

export default Root;
