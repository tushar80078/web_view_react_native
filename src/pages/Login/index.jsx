import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "./schema";
import {
  useLoginMutation,
  useRegenerateAdminPasswordMutation,
} from "./api/auth.api";
import { Loader2, OctagonAlertIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { FaGoogle, FaGithub } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginFn, { error, isLoading }] = useLoginMutation();
  const [regenerateAdminPassword, { isLoading: isRegenerating }] =
    useRegenerateAdminPasswordMutation();
  const [adminCreds, setAdminCreds] = useState(null);
  const [regenError, setRegenError] = useState(null);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await loginFn(data);
    if (response.data) {
      navigate("/app/auth-loading");
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-screen px-4">
      <Card className="overflow-hidden p-0 w-full max-w-md">
        <CardContent className="grid p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>
                      {error?.data?.message ||
                        error?.data?.err ||
                        "Login failed. Please check your credentials."}
                    </AlertTitle>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      Signing in...{" "}
                      <Loader2 className="animate-spin size-5 ml-2" />
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={isRegenerating}
                    onClick={async () => {
                      setRegenError(null);
                      setAdminCreds(null);
                      try {
                        const res = await regenerateAdminPassword().unwrap();
                        setAdminCreds(res.data);
                      } catch (err) {
                        setRegenError(
                          err?.data?.message ||
                            "Failed to regenerate admin password"
                        );
                      }
                    }}
                  >
                    {isRegenerating
                      ? "Regenerating..."
                      : "Regenerate Admin Password"}
                  </Button>
                  {regenError && (
                    <Alert className="bg-destructive/10 border-none mt-2">
                      <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                      <AlertTitle>{regenError}</AlertTitle>
                    </Alert>
                  )}
                  {adminCreds && (
                    <div className="bg-muted rounded p-4 mt-2 text-center border">
                      <div className="font-semibold mb-1">
                        Admin Credentials
                      </div>
                      <div>
                        <span className="font-medium">Username:</span>{" "}
                        {adminCreds.username}
                      </div>
                      <div>
                        <span className="font-medium">Password:</span>{" "}
                        {adminCreds.password}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
