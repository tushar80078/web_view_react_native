import UserManagement from "@/pages/Modules/UserManagement";
import EnterPriseManagement from "@/pages/Modules/EnterPriseManagement";
import RoleManagement from "@/pages/Modules/RoleManagement";
import EmployeeManagement from "@/pages/Modules/EmployeeManagement";
import ProductManagement from "@/pages/Modules/ProductManagement";
import Dashboard from "@/pages/Modules/Dashboard";
import AuthLoading from "@/pages/Loading";

export const authRoutes = [
  {
    path: "/dashboard",
    access: ["All"],
    description: "This is for dashboard",
    element: <Dashboard />,
    isShowOnSidebar: false,
    icon: false,
    title: "Dashboard",
  },
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
    description: "This is for Enterprise management",
    element: <EnterPriseManagement />,
    isShowOnSidebar: false,
    icon: false,
    title: "Enterprise Management",
  },
  {
    path: "/role-management",
    access: ["All"],
    description: "This is for Role management",
    element: <RoleManagement />,
    isShowOnSidebar: false,
    icon: false,
    title: "Role Management",
  },
  {
    path: "/employee-management",
    access: ["All"],
    description: "This is for Employee management",
    element: <EmployeeManagement />,
    isShowOnSidebar: false,
    icon: false,
    title: "Employee Management",
  },
  {
    path: "/product-management",
    access: ["All"],
    description: "This is for Product management",
    element: <ProductManagement />,
    isShowOnSidebar: false,
    icon: false,
    title: "Product Management",
  },
];
