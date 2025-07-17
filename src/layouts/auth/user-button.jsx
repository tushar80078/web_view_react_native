import GeneratedAvatar from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import useUserDetails from "@/hooks/useUserDetails";
import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const UserButton = () => {
  const isMobile = useIsMobile();
  const { logout, email, name } = useUserDetails();

  const handleLogout = () => {
    toast.success("Logged out!");
    logout();
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-1 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2 ">
          <GeneratedAvatar seed={name} variant="initials" className="size-9 " />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{name}</DrawerTitle>
            <DrawerDescription>{email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant={"outline"}
              onClick={() => {
                handleLogout();
              }}
            >
              <LogOutIcon className="text-black size-4" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg p-1 border border-border/10  w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2 ">
        <GeneratedAvatar seed={email} variant="initial" className="size-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
