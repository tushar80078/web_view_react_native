import ResponseDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import useUserDetails from "@/hooks/useUserDetails";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import RoleForm from "../components/role-form";
import TableList from "../components/table";
import DeleteModal from "../components/delete-modal";
import { useGetRoleByIdQuery } from "../api/role.api";

const RoleList = () => {
  const { currentModulePermissions } = useUserDetails("roles");

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [editingRoleId, setEditingRoleId] = useState(null);

  // Fetch role data when editing
  const { data: roleData, refetch } = useGetRoleByIdQuery(editingRoleId, {
    skip: !editingRoleId,
  });

  // Check permissions
  const canEdit = currentModulePermissions?.can_update || false;
  const canDelete = currentModulePermissions?.can_delete || false;

  const handleEdit = (role) => {
    if (canEdit) {
      // Clear previous edit data first
      setEditData(null);
      setEditingRoleId(role.id);
      setOpen(true);
    }
  };

  const handleDelete = (role) => {
    if (canDelete) {
      setRoleToDelete(role);
      setDeleteModalOpen(true);
    }
  };

  const handleFormClose = () => {
    setOpen(false);
    setEditData(null);
    setEditingRoleId(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setRoleToDelete(null);
  };

  // Update editData when roleData is fetched
  React.useEffect(() => {
    if (roleData?.data) {
      console.log("Setting edit data:", roleData.data);
      setEditData(roleData.data);
    }
  }, [roleData]);

  // Handle successful form submission
  const handleFormSuccess = () => {
    // Refetch the role data to get the latest data
    if (editingRoleId) {
      refetch();
    }
  };

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between pb-4">
        <p className="text-xl font-medium">Role Management</p>
        {currentModulePermissions?.can_create && (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            <PlusIcon />
            Add Role
          </Button>
        )}
      </div>

      <div>
        {currentModulePermissions?.can_read && (
          <TableList
            onEdit={handleEdit}
            onDelete={handleDelete}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        )}
      </div>

      <ResponseDialog
        title={editData ? "Edit Role" : "Add Role"}
        onOpenChange={() => {
          setOpen(false);
          handleFormClose();
        }}
        open={open}
        description={
          editData
            ? "Edit role details and permissions"
            : "Add role details and assign permissions"
        }
      >
        <RoleForm
          initialValues={editData}
          onCancel={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      </ResponseDialog>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        role={roleToDelete}
      />
    </div>
  );
};

export default RoleList;
