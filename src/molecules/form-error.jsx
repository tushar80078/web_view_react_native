import { TriangleAlert } from "lucide-react";

const FormError = ({ error }) => {
  return (
    error && (
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive ">
        <TriangleAlert className="h-5 w-5" />
        <p>{error}</p>
      </div>
    )
  );
};

export default FormError;
