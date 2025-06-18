import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "contact_info",
    header: "Contact Info",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const enterprise = row.original;
      return (
        <div className="flex gap-2">
          {enterprise.canEdit ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => enterprise.onEdit(enterprise)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <Badge variant={"outline"}>NA</Badge>
          )}
          {enterprise.canDelete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => enterprise.onDelete(enterprise)}
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
