import { useMedia } from "react-use";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/app/sebi",
    label: "Bulk Upload",
  },
  {
    href: "/app/bb",
    label: " Upload",
  },
];

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = useMedia("(max-width:1024px)", false);

  const [isOpen, setIsOpen] = useState(false);

  const onClick = (href) => {
    navigate(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            asChild
            variant={"outline"}
            size={"sm"}
            className="font-normal  text-white bg-white/10 hover:bg-white/20 focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition border-none "
          >
            <span>
              <Menu className="h-4 w-4" />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="px-2  ">
          <SheetHeader>
            <SheetTitle>NISM</SheetTitle>
            <SheetDescription>Certification Download Platform</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-y-2 ">
            {routes.map((route) => {
              return (
                <Button
                  key={route.href}
                  variant={route.href === pathname ? "secondary" : "ghost"}
                  onClick={() => onClick(route.href)}
                  className="w-full justify-start"
                >
                  {route.label}
                </Button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-auto">
      {routes.map((route) => {
        return (
          <Button
            key={route.href}
            asChild
            size={"sm"}
            variant={"outline"}
            className={cn(
              "w-full cursor-pointer lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
              pathname === route.href ? "bg-white/10" : "bg-transparent"
            )}
            onClick={() => navigate(route.href)}
          >
            <span>{route.label}</span>
          </Button>
        );
      })}
    </nav>
  );
};

export default Navigation;
