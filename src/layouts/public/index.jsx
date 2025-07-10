import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <header className="px-5 py-3 h-[8vh] flex justify-between items-center border-b">
        <h1 className="text-xl font-semibold">NISM</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="flex items-center text-sm"
            onClick={() => navigate("/login")}
          >
            Login
            <ChevronRight className="size-5 ml-1" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {/* Footer */}
      <footer className="h-[12vh] border-t flex flex-col text-sm text-gray-500">
        <div className="flex h-full justify-center items-center gap-20">
          <div>Privacy Policy</div>
          <div>Terms of Service</div>
          <div>Help Center</div>
        </div>
        <div className="flex h-full justify-center items-center">
          © 2024 Domain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
