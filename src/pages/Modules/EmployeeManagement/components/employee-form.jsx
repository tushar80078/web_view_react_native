import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEmployeeForm, updateEmployeeForm } from "../schema";
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
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../api/employee.api";
import { useGetAllEnterprisesQuery } from "@/pages/Modules/EnterPriseManagement/api/enterprise.api";
import toast from "react-hot-toast";

const EmployeeForm = ({ initialValues, onCancel }) => {
  const [addEmployeeFn, { isLoading: isCreating }] =
    useCreateEmployeeMutation();
  const [updateEmployeeFn, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();

  // Fetch enterprises for dropdown
  const { data: enterprisesData } = useGetAllEnterprisesQuery();

  const isEdit = !!initialValues?.id;
  const schema = isEdit ? updateEmployeeForm : addEmployeeForm;

  console.log("initialValues", initialValues);
  console.log("enterprisesData", enterprisesData);

  // Find enterprise ID based on name for edit mode
  const getEnterpriseIdByName = (enterpriseName) => {
    console.log(
      "Looking for enterprise name:",
      enterpriseName,
      "Type:",
      typeof enterpriseName
    );
    if (!enterpriseName) {
      console.log("Enterprise name is null/undefined, returning undefined");
      return undefined;
    }
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
      name: initialValues?.name ?? "",
      department: initialValues?.department ?? "",
      role: initialValues?.role ?? "",
      salary: initialValues?.salary ? Number(initialValues.salary) : undefined,
      enterpriseId: undefined,
      status: initialValues?.status ?? "active",
    },
  });

  // Reset form when data loads or initialValues change
  useEffect(() => {
    if (isEdit && initialValues && enterprisesData?.data) {
      console.log("useEffect triggered with:", {
        initialValues,
        enterprisesDataLength: enterprisesData?.data?.length,
      });

      const enterpriseId = getEnterpriseIdByName(initialValues.enterprise_name);

      console.log("Resetting form with:", {
        enterpriseId,
        enterpriseName: initialValues.enterprise_name,
      });

      form.reset({
        name: initialValues.name || "",
        department: initialValues.department || "",
        role: initialValues.role || "",
        salary: initialValues.salary ? Number(initialValues.salary) : undefined,
        enterpriseId: enterpriseId,
        status: initialValues.status || "active",
      });
    }
  }, [isEdit, initialValues, enterprisesData?.data, form]);

  const isLoading = isCreating || isUpdating;

  // Transform data for select components
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
      // Convert string values to numbers for enterpriseId
      const processedData = {
        ...formData,
        enterpriseId: formData.enterpriseId
          ? Number(formData.enterpriseId)
          : undefined,
      };

      if (isEdit) {
        const data = await updateEmployeeFn({
          id: initialValues.id,
          data: processedData,
        });
        if (data) {
          toast.success("Employee updated successfully!");
          onCancel();
        }
      } else {
        const data = await addEmployeeFn(processedData);
        if (data) {
          toast.success("Employee created successfully!");
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
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter employee name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="department"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter department" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter role" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="salary"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter salary"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
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

export default EmployeeForm;
