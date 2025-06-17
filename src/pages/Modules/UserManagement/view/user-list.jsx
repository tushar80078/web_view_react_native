import ResponseDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import useUserDetails from "@/hooks/useUserDetails";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

const UserList = () => {
  const { permissions } = useUserDetails();
  const [open, setOpen] = useState(false);
  const currentModulePermissions = permissions?.find(
    (ele) => ele.module == "users"
  );

  console.log("permissions", currentModulePermissions);
  return (
    <div>
      <div className="flex justify-between px-2 py-3">
        <p className="text-xl  font-medium">User Management</p>
        {currentModulePermissions?.can_create && (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            {" "}
            <PlusIcon />
            Add Users
          </Button>
        )}
      </div>
      <ResponseDialog
        title={"Add User"}
        onOpenChange={setOpen}
        open={open}
        description={"Add users details"}
      >
        Hello
      </ResponseDialog>
    </div>
  );
};

export default UserList;
