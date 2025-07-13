import Sebi from "@/pages/Modules/SEBI/index";

export const authRoutes = [
  {
    path: "/sebi",
    access: ["All"],
    description: "This is for sebi corporation",
    element: <Sebi />,
    isShowOnSidebar: false,
    icon: false,
    title: "Sebi",
    corporate: ["sebi"],
  },
];
