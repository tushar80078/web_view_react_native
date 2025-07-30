import { Button } from "@/components/ui/button";
import { logOutUser } from "@/redux/slice/user.slice";
import { purge } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const SebiHomePage = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOutUser());
    purge();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      Loggged in successfully
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logged Out
      </Button>
    </div>
  );
};

export default SebiHomePage;
