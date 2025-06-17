import ResponseDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import useUserDetails from "@/hooks/useUserDetails";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import AddEnterpriseForm from "../components/enterprise-form";
import TableList from "../components/table";
import DeleteModal from "../components/delete-modal";

const EnterpriseList = () => {
  const { currentModulePermissions } = useUserDetails("enterprises");

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enterpriseToDelete, setEnterpriseToDelete] = useState(null);

  // Check permissions
  const canEdit = currentModulePermissions?.can_update || false;
  const canDelete = currentModulePermissions?.can_delete || false;

  const handleEdit = (enterprise) => {
    if (canEdit) {
      setEditData(enterprise);
      setOpen(true);
    }
  };

  const handleDelete = (enterprise) => {
    if (canDelete) {
      setEnterpriseToDelete(enterprise);
      setDeleteModalOpen(true);
    }
  };

  const handleFormClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setEnterpriseToDelete(null);
  };

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between pb-4">
        <p className="text-xl  font-medium">Enterprise </p>
        {currentModulePermissions?.can_create && (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            {" "}
            <PlusIcon />
            Add Enterprise
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
        title={editData ? "Edit Enterprise" : "Add Enterprise"}
        onOpenChange={setOpen}
        open={open}
        description={
          editData ? "Edit enterprise details" : "Add enterprise details"
        }
      >
        <AddEnterpriseForm
          initialValues={editData}
          onCancel={handleFormClose}
        />
      </ResponseDialog>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        enterprise={enterpriseToDelete}
      />
    </div>
  );
};

export default EnterpriseList;
