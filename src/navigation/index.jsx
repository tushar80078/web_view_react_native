import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "@/pages/Landing";
import PublicRoutes from "./public";
import useUserDetails from "@/hooks/useUserDetails";
import AuthenticatedRoutes from "./auth";

const Root = () => {
  const { isLoggedIn } = useUserDetails();

  return (
    <Routes>
      {isLoggedIn ? (
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
        path={"/"}
        element={
          isLoggedIn ? (
            <Navigate replace to={`/app`} />
          ) : (
            <Navigate replace to={`/*`} />
          )
        }
      />
    </Routes>
  );
};

export default Root;
