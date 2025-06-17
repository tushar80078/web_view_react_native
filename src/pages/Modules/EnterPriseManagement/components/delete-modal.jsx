import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteEnterpriseMutation } from "../api/enterprise.api";
import toast from "react-hot-toast";

const DeleteModal = ({ isOpen, onClose, enterprise }) => {
  const [deleteEnterprise, { isLoading }] = useDeleteEnterpriseMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteEnterprise(enterprise.id);
      if (response.data) {
        toast.success("Enterprise deleted successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error deleting enterprise:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            enterprise "{enterprise?.name}" and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
