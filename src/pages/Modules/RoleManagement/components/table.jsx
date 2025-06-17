import React from "react";
import { useGetAllRolesQuery } from "../api/role.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const TableList = ({ onEdit, onDelete, canEdit, canDelete }) => {
  const { data } = useGetAllRolesQuery();

  // Add action handlers and permission flags to each row
  const tableData =
    data?.data?.map((role) => ({
      ...role,
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
