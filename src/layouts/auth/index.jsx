import React from "react";
import Navigation from "./navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserButton from "./user-button";
import { Link } from "react-router-dom";
import useUserDetails from "@/hooks/useUserDetails";

const AuthLayout = ({ children }) => {
  const { name } = useUserDetails();

  return (
    <div className="h-[100vh] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b h-[50vh] from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36    ">
        <div className="max-w-screen-2xl mx-auto">
          <div className="w-full flex items-center justify-between mb-10">
            <div className="flex items-center  lg:gap-x-16">
              {/* Header logo */}
              <Link href={"/"}>
                <div className="items-center hidden lg:flex">
                  <p
                    className="font-bold text-white text-3xl  "
                    style={{ fontWeight: "500" }}
                  >
                    NISM
                  </p>
                </div>
              </Link>

              {/* Tab navigation */}
              <Navigation />
            </div>
            <div>
              <UserButton
                email={"tusharbhosale2281@gmail.com"}
                name={"Tushar"}
              />
            </div>
          </div>
        </div>

        {/* Welcom message */}
        <div className="space-y-2 mb-4 ">
          <h2 className="text-2xl lg:text-4xl text-white font-medium">
            Welcome back, {name} 👋
          </h2>
          <p className="text-sm lg:text-base text-[#89b6fd]">
            This is your platform for Download NISM Certificate Data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className=" lg:px-14 px-3   -mt-[20vh] h-[67vh] ">
        <div className="max-w-screen-2xl  h-full   mx-auto w-full ">
          <ScrollArea className="bg-white rounded-md h-full  overflow-auto">
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
