import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => {
      const sku = row.getValue("sku");
      return sku || "N/A";
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price");
      return price ? `$${Number(price).toLocaleString()}` : "N/A";
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category");
      return category || "N/A";
    },
  },
  {
    accessorKey: "enterprise_name",
    header: "Enterprise",
  },
  {
    accessorKey: "employee_name",
    header: "Assigned Employee",
    cell: ({ row }) => {
      const employeeName = row.getValue("employee_name");
      return employeeName || "Unassigned";
    },
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
      const product = row.original;
      return (
        <div className="flex gap-2">
          {product.canEdit ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => product.onEdit(product)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <Badge variant={"outline"}>NA</Badge>
          )}
          {product.canDelete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => product.onDelete(product)}
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
