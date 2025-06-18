import { Edit, Trash2, Power, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const salary = row.getValue("salary");
      return salary ? `$${Number(salary).toLocaleString()}` : "N/A";
    },
  },
  {
    accessorKey: "enterprise_name",
    header: "Enterprise",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at");
      return createdAt ? new Date(createdAt).toLocaleDateString() : "N/A";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex gap-2">
          {employee.canEdit ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => employee.onEdit(employee)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <Badge variant={"outline"}>NA</Badge>
          )}
          {employee.canDelete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => employee.onDelete(employee)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : (
            <Badge variant={"outline"}>NA</Badge>
          )}
        </div>
      );
    },
  },
];
