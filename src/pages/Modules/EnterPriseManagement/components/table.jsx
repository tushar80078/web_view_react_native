import React from "react";
import { useGetAllEnterprisesQuery } from "../api/enterprise.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const TableList = ({ onEdit, onDelete, canEdit, canDelete }) => {
  const { data } = useGetAllEnterprisesQuery();

  // Add action handlers and permission flags to each row
  const tableData =
    data?.data?.map((enterprise) => ({
      ...enterprise,
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
