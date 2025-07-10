import React from "react";
import AuthLayout from "@/layouts/auth";
import BulkUpload from "./views/bulk-upload";

const SebiHomePage = () => {
  return (
    <AuthLayout>
      <BulkUpload />
    </AuthLayout>
  );
};

export default SebiHomePage;
