import React from "react";
import { useGetAllUsersQuery } from "../api/users.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const TableList = ({
  onEdit,
  onDelete,
  onToggleStatus,
  canEdit,
  canDelete,
  canToggleStatus,
}) => {
  const { data } = useGetAllUsersQuery();

  // Add action handlers and permission flags to each row
  const tableData =
    data?.data?.map((user) => ({
      ...user,
      onEdit,
      onDelete,
      onToggleStatus,
      canEdit,
      canDelete,
      canToggleStatus,
    })) || [];

  return (
    <div>
      <DataTable data={tableData} columns={columns} />
    </div>
  );
};

export default TableList;
