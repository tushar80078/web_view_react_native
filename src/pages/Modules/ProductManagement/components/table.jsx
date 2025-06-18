import React from "react";
import { useGetAllProductsQuery } from "../api/product.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const TableList = ({ onEdit, onDelete, canEdit, canDelete }) => {
  const { data } = useGetAllProductsQuery();

  // Add action handlers and permission flags to each row
  const tableData =
    data?.data?.map((product) => ({
      ...product,
      onEdit,
      onDelete,
      canEdit,
      canDelete,
    })) || [];

  return (
    <div>
      <DataTable data={tableData} columns={columns} />
    </div>
  );
};

export default TableList;
