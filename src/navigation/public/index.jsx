import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import LandingPage from "@/pages/Landing";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path={"/*"} element={<Navigate replace to={`/login`} />} />
    </Routes>
  );
};

export default PublicRoutes;
