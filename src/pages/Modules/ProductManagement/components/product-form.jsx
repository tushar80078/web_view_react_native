import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductForm, updateProductForm } from "../schema";
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
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../api/product.api";
import { useGetAllEnterprisesQuery } from "@/pages/Modules/EnterPriseManagement/api/enterprise.api";
import { useGetAllEmployeesQuery } from "@/pages/Modules/EmployeeManagement/api/employee.api";
import toast from "react-hot-toast";

const ProductForm = ({ initialValues, onCancel }) => {
  const [addProductFn, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProductFn, { isLoading: isUpdating }] =
    useUpdateProductMutation();

  // Fetch enterprises and employees for dropdowns
  const { data: enterprisesData } = useGetAllEnterprisesQuery();
  const { data: employeesData } = useGetAllEmployeesQuery();

  const isEdit = !!initialValues?.id;
  const schema = isEdit ? updateProductForm : addProductForm;

  console.log("initialValues", initialValues);
  console.log("enterprisesData", enterprisesData);
  console.log("employeesData", employeesData);

  // Find enterprise and employee IDs based on names for edit mode
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

  const getEmployeeIdByName = (employeeName) => {
    console.log(
      "Looking for employee name:",
      employeeName,
      "Type:",
      typeof employeeName
    );
    if (!employeeName) {
      console.log("Employee name is null/undefined, returning undefined");
      return undefined;
    }
    const employee = employeesData?.data?.find((e) => e.name === employeeName);
    console.log("Finding employee ID for:", employeeName, "Found:", employee);
    return employee?.id;
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues?.name ?? "",
      sku: initialValues?.sku ?? "",
      price: initialValues?.price ? Number(initialValues.price) : undefined,
      category: initialValues?.category ?? "",
      enterpriseId: undefined,
      employeeId: undefined,
      status: initialValues?.status ?? "active",
    },
  });

  // Reset form when data loads or initialValues change
  useEffect(() => {
    if (
      isEdit &&
      initialValues &&
      enterprisesData?.data &&
      employeesData?.data
    ) {
      console.log("useEffect triggered with:", {
        initialValues,
        enterprisesDataLength: enterprisesData?.data?.length,
        employeesDataLength: employeesData?.data?.length,
      });

      const enterpriseId = getEnterpriseIdByName(initialValues.enterprise_name);
      const employeeId = getEmployeeIdByName(initialValues.employee_name);

      console.log("Resetting form with:", {
        enterpriseId,
        employeeId,
        enterpriseName: initialValues.enterprise_name,
        employeeName: initialValues.employee_name,
      });

      form.reset({
        name: initialValues.name || "",
        sku: initialValues.sku || "",
        price: initialValues.price ? Number(initialValues.price) : undefined,
        category: initialValues.category || "",
        enterpriseId: enterpriseId,
        employeeId: employeeId,
        status: initialValues.status || "active",
      });
    }
  }, [isEdit, initialValues, enterprisesData?.data, employeesData?.data, form]);

  const isLoading = isCreating || isUpdating;

  // Transform data for select components
  const enterpriseOptions =
    enterprisesData?.data?.map((enterprise) => ({
      value: enterprise.id.toString(),
      label: enterprise.name,
    })) || [];

  const employeeOptions =
    employeesData?.data?.map((employee) => ({
      value: employee.id.toString(),
      label: employee.name,
    })) || [];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const onSubmit = async (formData) => {
    try {
      // Convert string values to numbers for enterpriseId and employeeId
      const processedData = {
        ...formData,
        enterpriseId: formData.enterpriseId
          ? Number(formData.enterpriseId)
          : undefined,
        employeeId: formData.employeeId
          ? Number(formData.employeeId)
          : undefined,
      };

      if (isEdit) {
        const data = await updateProductFn({
          id: initialValues.id,
          data: processedData,
        });
        if (data) {
          toast.success("Product updated successfully!");
          onCancel();
        }
      } else {
        const data = await addProductFn(processedData);
        if (data) {
          toast.success("Product created successfully!");
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
                  <Input {...field} placeholder="Enter product name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="sku"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter SKU (optional)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter price (optional)"
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
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter category (optional)" />
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
            name="employeeId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Employee</FormLabel>
                <FormControl>
                  <SelectComponent
                    options={employeeOptions}
                    placeholder="Select an employee (optional)"
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

export default ProductForm;
