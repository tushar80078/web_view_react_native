import React from "react";
import { useGetPermissionQuery } from "../api/loading.api";
import { LoaderCircleIcon } from "lucide-react";
import useUserDetails from "@/hooks/useUserDetails";
import { useNavigate } from "react-router-dom";

const AuthLoadingPage = () => {
  const { data } = useUserDetails();
  console.log("data", data);
  useGetPermissionQuery({ id: data?.role_id }, { skip: !data?.role_id });
  const navigate = useNavigate();

  const { allowedRoutes } = useUserDetails();

  if (allowedRoutes?.length > 0) {
    navigate(allowedRoutes[0]?.href);
    return;
  }

  return (
    <div className="flex h-[100vh] w-full justify-center items-center flex-col">
      <LoaderCircleIcon className="animate-spin size-10" />
      <p className="text-xl font-semibold mt-2">Loading Permission</p>
    </div>
  );
};

export default AuthLoadingPage;
