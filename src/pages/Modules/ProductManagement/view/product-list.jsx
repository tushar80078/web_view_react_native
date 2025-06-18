import ResponseDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import useUserDetails from "@/hooks/useUserDetails";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import ProductForm from "../components/product-form";
import TableList from "../components/table";
import DeleteModal from "../components/delete-modal";

const ProductList = () => {
  const { currentModulePermissions } = useUserDetails("products");

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Check permissions
  const canEdit = currentModulePermissions?.can_update || false;
  const canDelete = currentModulePermissions?.can_delete || false;

  const handleEdit = (product) => {
    if (canEdit) {
      setEditData(product);
      setOpen(true);
    }
  };

  const handleDelete = (product) => {
    if (canDelete) {
      setProductToDelete(product);
      setDeleteModalOpen(true);
    }
  };

  const handleFormClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between pb-4">
        <p className="text-xl font-medium">Product Management</p>
        {currentModulePermissions?.can_create ? (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            <PlusIcon />
            Add Product
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
        title={editData ? "Edit Product" : "Add Product"}
        onOpenChange={setOpen}
        open={open}
        description={editData ? "Edit product details" : "Add product details"}
      >
        <ProductForm initialValues={editData} onCancel={handleFormClose} />
      </ResponseDialog>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        product={productToDelete}
      />
    </div>
  );
};

export default ProductList;
