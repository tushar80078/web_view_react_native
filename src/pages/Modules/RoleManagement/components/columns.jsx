import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns = [
  {
    accessorKey: "name",
    header: "Role Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const role = row.original;
      return (
        <div className="flex gap-2">
          {role.canEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => role.onEdit(role)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {role.canDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => role.onDelete(role)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
