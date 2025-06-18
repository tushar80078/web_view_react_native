import ModuleLayouts from "@/layouts/module";
import React from "react";
import EmployeeList from "./view/employee-list";

const EmployeeManagement = () => {
  return (
    <ModuleLayouts>
      <EmployeeList />
    </ModuleLayouts>
  );
};

export default EmployeeManagement;
