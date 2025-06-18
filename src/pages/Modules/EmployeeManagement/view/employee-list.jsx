import ResponseDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import useUserDetails from "@/hooks/useUserDetails";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import EmployeeForm from "../components/employee-form";
import TableList from "../components/table";
import DeleteModal from "../components/delete-modal";

const EmployeeList = () => {
  const { currentModulePermissions } = useUserDetails("employees");

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Check permissions
  const canEdit = currentModulePermissions?.can_update || false;
  const canDelete = currentModulePermissions?.can_delete || false;

  const handleEdit = (employee) => {
    if (canEdit) {
      setEditData(employee);
      setOpen(true);
    }
  };

  const handleDelete = (employee) => {
    if (canDelete) {
      setEmployeeToDelete(employee);
      setDeleteModalOpen(true);
    }
  };

  const handleFormClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between pb-4">
        <p className="text-xl font-medium">Employee Management</p>
        {currentModulePermissions?.can_create ? (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            <PlusIcon />
            Add Employee
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
            canEdit={canEdit}
            canDelete={canDelete}
          />
        )}
      </div>

      <ResponseDialog
        title={editData ? "Edit Employee" : "Add Employee"}
        onOpenChange={setOpen}
        open={open}
        description={
          editData ? "Edit employee details" : "Add employee details"
        }
      >
        <EmployeeForm initialValues={editData} onCancel={handleFormClose} />
      </ResponseDialog>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        employee={employeeToDelete}
      />
    </div>
  );
};

export default EmployeeList;
