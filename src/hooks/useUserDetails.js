import {
  AlignHorizontalSpaceAroundIcon,
  LayoutDashboardIcon,
  UserRoundIcon,
  ShieldIcon,
} from "lucide-react";
import { useSelector } from "react-redux";

const routes = [
  {
    icon: UserRoundIcon,
    label: "User Management",
    href: "/app/user-management",
    mappingKey: "users",
  },
  {
    icon: AlignHorizontalSpaceAroundIcon,
    label: "Enterprise Management",
    href: "/app/enterprise-management",
    mappingKey: "enterprises",
  },
  {
    icon: ShieldIcon,
    label: "Role Management",
    href: "/app/role-management",
    mappingKey: "roles",
  },
  {
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    href: "/app/dashboard",
    mappingKey: "dashboard",
  },

  // You can add more routes here
];

const useUserDetails = (moduleName = "") => {
  const { isLoggedIn, userDetails, permissions } = useSelector(
    (state) => state.auth
  );

  // Extract allowed modules from permission objects
  const allowedModules = permissions?.map((perm) => perm.module) || [];

  // Filter routes based on allowed modules
  const allowedRoutes = routes.filter((route) =>
    allowedModules.includes(route.mappingKey)
  );

  const currentModulePermissions = permissions?.find(
    (ele) => ele.module == moduleName
  );

  return {
    isLoggedIn,
    data: userDetails,
    permissions,
    allowedRoutes,
    currentModulePermissions,
  };
};

export default useUserDetails;
