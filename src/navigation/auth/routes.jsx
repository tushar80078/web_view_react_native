import UserManagement from "@/pages/UserManagement";

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
];
