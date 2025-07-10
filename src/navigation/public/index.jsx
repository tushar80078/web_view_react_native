import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import LandingPage from "@/pages/Landing";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path={"/*"} element={<Navigate replace to={`/home`} />} />
    </Routes>
  );
};

export default PublicRoutes;
