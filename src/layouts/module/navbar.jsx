import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
// import DashboardCommand from "./dashboard-command";
import { useEffect, useState } from "react";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();

  //   const [commandOpen, setCommandOpen] = useState(false);

  //   useEffect(() => {
  //     const down = (e) => {
  //       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
  //         e.preventDefault();
  //         setCommandOpen((open) => !open);
  //       }
  //     };

  //     document.addEventListener("keydown", down);

  //     return () => document.removeEventListener("keydown", down);
  //   }, []);

  return (
    <>
      {/* <DashboardCommand open={commandOpen} setOpen={setCommandOpen} /> */}
      <nav className="px-4 flex gap-x-2 items-center bg-background py-3">
        <Button
          className="size-9"
          variant={"outline"}
          onClick={() => toggleSidebar()}
        >
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
