import ResponseDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import useUserDetails from "@/hooks/useUserDetails";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import UserForm from "../components/user-form";
import TableList from "../components/table";
import DeleteModal from "../components/delete-modal";
import { useToggleUserStatusMutation } from "../api/users.api";
import toast from "react-hot-toast";

const UserList = () => {
  const { currentModulePermissions } = useUserDetails("users");

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [toggleStatusFn] = useToggleUserStatusMutation();

  // Check permissions
  const canEdit = currentModulePermissions?.can_update || false;
  const canDelete = currentModulePermissions?.can_delete || false;
  const canToggleStatus = currentModulePermissions?.can_update || false;

  const handleEdit = (user) => {
    if (canEdit) {
      setEditData(user);
      setOpen(true);
    }
  };

  const handleDelete = (user) => {
    if (canDelete) {
      setUserToDelete(user);
      setDeleteModalOpen(true);
    }
  };

  const handleToggleStatus = async (user) => {
    if (canToggleStatus) {
      try {
        const newStatus = user.status === "active" ? "inactive" : "active";
        const response = await toggleStatusFn({
          id: user.id,
          status: newStatus,
        });
        if (response.data) {
          toast.success(`User status changed to ${newStatus}!`);
        }
      } catch (error) {
        console.error("Error toggling user status:", error);
      }
    }
  };

  const handleFormClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between pb-4">
        <p className="text-xl font-medium">User Management</p>
        {currentModulePermissions?.can_create ? (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            <PlusIcon />
            Add User
          </Button>
        ) : (
          ""
        )}
      </div>

      <div>
        {currentModulePermissions?.can_read && (
          <TableList
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            canEdit={canEdit}
            canDelete={canDelete}
            canToggleStatus={canToggleStatus}
          />
        )}
      </div>

      <ResponseDialog
        title={editData ? "Edit User" : "Add User"}
        onOpenChange={setOpen}
        open={open}
        description={editData ? "Edit user details" : "Add user details"}
      >
        <UserForm initialValues={editData} onCancel={handleFormClose} />
      </ResponseDialog>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        user={userToDelete}
      />
    </div>
  );
};

export default UserList;
