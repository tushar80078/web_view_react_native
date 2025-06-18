import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserForm, updateUserForm } from "../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectComponent from "@/molecules/select";
import { useCreateUserMutation, useUpdateUserMutation } from "../api/users.api";
import { useGetAllRolesQuery } from "@/pages/Modules/RoleManagement/api/role.api";
import { useGetAllEnterprisesQuery } from "@/pages/Modules/EnterPriseManagement/api/enterprise.api";
import toast from "react-hot-toast";

const UserForm = ({ initialValues, onCancel }) => {
  const [addUserFn, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUserFn, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Fetch roles and enterprises for dropdowns
  const { data: rolesData } = useGetAllRolesQuery();
  const { data: enterprisesData } = useGetAllEnterprisesQuery();

  const isEdit = !!initialValues?.id;
  const schema = isEdit ? updateUserForm : addUserForm;

  console.log("initialValues", initialValues);
  console.log("rolesData", rolesData);
  console.log("enterprisesData", enterprisesData);

  // Find role and enterprise IDs based on names for edit mode
  const getRoleIdByName = (roleName) => {
    const role = rolesData?.data?.find((r) => r.name === roleName);
    console.log("Finding role ID for:", roleName, "Found:", role);
    return role?.id;
  };

  console.log("enterprisesData?.data?.", enterprisesData?.data);

  const getEnterpriseIdByName = (enterpriseName) => {
    const enterprise = enterprisesData?.data?.find(
      (e) => e.name === enterpriseName
    );
    console.log(
      "Finding enterprise ID for:",
      enterpriseName,
      "Found:",
      enterprise
    );
    return enterprise?.id;
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: initialValues?.username ?? "",
      email: initialValues?.email ?? "",
      password: "",
      roleId: undefined,
      enterpriseId: undefined,
      status: initialValues?.status ?? "active",
    },
  });

  // Reset form when data loads or initialValues change
  useEffect(() => {
    if (isEdit && initialValues && rolesData?.data && enterprisesData?.data) {
      const roleId = getRoleIdByName(initialValues.role_name);
      const enterpriseId = getEnterpriseIdByName(initialValues.enterprise_name);

      console.log("Resetting form with:", {
        roleId,
        enterpriseId,
        roleName: initialValues.role_name,
        enterpriseName: initialValues.enterprise_name,
      });

      form.reset({
        username: initialValues.username || "",
        email: initialValues.email || "",
        password: "",
        roleId: roleId,
        enterpriseId: enterpriseId,
        status: initialValues.status || "active",
      });
    }
  }, [isEdit, initialValues, rolesData?.data, enterprisesData?.data, form]);

  const isLoading = isCreating || isUpdating;

  // Transform data for select components
  const roleOptions =
    rolesData?.data?.map((role) => ({
      value: role.id.toString(),
      label: role.name,
    })) || [];

  const enterpriseOptions =
    enterprisesData?.data?.map((enterprise) => ({
      value: enterprise.id.toString(),
      label: enterprise.name,
    })) || [];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const onSubmit = async (formData) => {
    try {
      if (isEdit) {
        const data = await updateUserFn({
          id: initialValues.id,
          data: formData,
        });
        if (data) {
          toast.success("User updated successfully!");
          onCancel();
        }
      } else {
        const data = await addUserFn(formData);
        if (data) {
          toast.success("User created successfully!");
          onCancel();
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Enter email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isEdit && (
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="roleId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <SelectComponent
                    options={roleOptions}
                    placeholder="Select a role"
                    className="w-full"
                    onChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    value={field.value?.toString()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="enterpriseId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enterprise</FormLabel>
                <FormControl>
                  <SelectComponent
                    options={enterpriseOptions}
                    placeholder="Select an enterprise"
                    className="w-full"
                    onChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    value={field.value?.toString()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <SelectComponent
                    options={statusOptions}
                    placeholder="Select status"
                    className="w-full"
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant={"ghost"}
                disabled={isLoading}
                onClick={() => onCancel()}
                type="button"
              >
                Cancel
              </Button>
            )}
            <Button disabled={isLoading} type="submit">
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UserForm;
