import { useState } from "react";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Password = ({ fieldName, placeholder, control }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange, value } }) => (
          <Input
            id={fieldName}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            value={value}
            className={cn("py-5 my-3 placeholder:text-gray-400 pr-10")}
          />
        )}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 "
      >
        {showPassword ? (
          <FiEyeOff
            size={20}
            className={cn("text-gray-500 hover:text-gray-700")}
          />
        ) : (
          <FiEye
            size={20}
            className={cn("text-gray-500 hover:text-gray-700")}
          />
        )}
      </button>
    </div>
  );
};

export default Password;
