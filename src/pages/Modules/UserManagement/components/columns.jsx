import { Edit, Trash2, Power, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role_name",
    header: "Role",
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
    accessorKey: "last_login",
    header: "Last Login",
    cell: ({ row }) => {
      const lastLogin = row.getValue("last_login");
      return lastLogin ? new Date(lastLogin).toLocaleDateString() : "Never";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          {user.canEdit ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => user.onEdit(user)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <Badge variant={"outline"}>NA</Badge>
          )}
          {user.canToggleStatus ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => user.onToggleStatus(user)}
              className="h-8 w-8 p-0"
            >
              {user.status === "active" ? (
                <PowerOff className="h-4 w-4 text-orange-600" />
              ) : (
                <Power className="h-4 w-4 text-green-600" />
              )}
            </Button>
          ) : (
            <Badge variant={"outline"}>NA</Badge>
          )}
          {user.canDelete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => user.onDelete(user)}
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
