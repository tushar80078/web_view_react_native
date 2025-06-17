import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import SignUp from "@/pages/SignUp";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default PublicRoutes;
