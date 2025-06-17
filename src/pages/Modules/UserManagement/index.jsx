import ModuleLayouts from "@/layouts/module";
import React from "react";
import UserList from "./view/user-list";

const UserManagement = () => {
  return (
    <ModuleLayouts>
      <UserList />
    </ModuleLayouts>
  );
};

export default UserManagement;
