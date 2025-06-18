import React from "react";
import { useGetAllEmployeesQuery } from "../api/employee.api";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const TableList = ({ onEdit, onDelete, canEdit, canDelete }) => {
  const { data } = useGetAllEmployeesQuery();

  // Add action handlers and permission flags to each row
  const tableData =
    data?.data?.map((employee) => ({
      ...employee,
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
