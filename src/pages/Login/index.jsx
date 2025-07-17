import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "./schema";
import FormError from "@/molecules/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userLoginThunk } from "@/redux/thunks/user.thunk";
import { useDispatch } from "react-redux";
import useUserDetails from "@/hooks/useUserDetails";
import Password from "@/molecules/password";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { navigateUserTo } = useUserDetails();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await dispatch(userLoginThunk({ ...data })).unwrap();

      setLoading(false);

      if (!response?.success) {
        toast.error(response?.data?.msg || "Please try again.");
        setError(response?.data?.msg);
      }

      if (response?.data) {
        toast.success("Logged in!");
        navigateUserTo();
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Please try again.");
      setLoading(false);
      setError(error?.response?.data?.msg);
      console.log("ERROR-LOGIN-SCREEN - ", error);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl ">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-6 md:p-8 "
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome Back</h1>
                      <p className="text-muted-foreground text-balance">
                        Login to your account
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Password
                        control={form.control}
                        fieldName="password"
                        label="Password"
                        placeholder="Enter your password"
                      />
                    </div>
                    {error && <FormError error={error} />}

                    <Button type="submit" className="w-full" disabled={loading}>
                      Sign in
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="bg-radial from-blue-600 to-blue-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                <img
                  src={"/logo.svg"}
                  alt="image"
                  className="h-[92px] w-[92px]"
                />
                <p className="text-2xl font-semibold text-white">NISM</p>
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
