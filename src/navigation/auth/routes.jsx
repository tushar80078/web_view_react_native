import UserManagement from "@/pages/Modules/UserManagement";
import EnterPriseManagement from "@/pages/Modules/EnterPriseManagement";
import AuthLoading from "@/pages/Loading";

export const authRoutes = [
  {
    path: "/user-management",
    access: ["All"],
    description: "This is for user management",
    element: <UserManagement />,
    isShowOnSidebar: false,
    icon: false,
    title: "User Management",
  },
  {
    path: "/auth-loading",
    access: ["All"],
    description: "This is for load permissions",
    element: <AuthLoading />,
    isShowOnSidebar: false,
    icon: false,
    title: "Auth loading",
  },
  {
    path: "/enterprise-management",
    access: ["All"],
    description: "This is for User management",
    element: <EnterPriseManagement />,
    isShowOnSidebar: false,
    icon: false,
    title: "User Management",
  },
];
