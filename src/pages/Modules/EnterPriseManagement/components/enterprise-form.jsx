import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEnterpriseForm } from "../schema";
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
import {
  useCreateEnterpriseMutation,
  useUpdateEnterpriseMutation,
} from "../api/enterprise.api";
import toast from "react-hot-toast";

const AddEnterpriseForm = ({ initialValues, onCancel }) => {
  const [addEntFn, { isLoading: isCreating }] = useCreateEnterpriseMutation();
  const [updateEntFn, { isLoading: isUpdating }] =
    useUpdateEnterpriseMutation();

  console.log("initialValues", initialValues);

  const form = useForm({
    resolver: zodResolver(addEnterpriseForm),
    defaultValues: {
      name: initialValues?.name ?? "",
      location: initialValues?.location ?? "",
      contactInfo: initialValues?.contact_info ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isLoading = isCreating || isUpdating;

  const onSubmit = async (formData) => {
    try {
      if (isEdit) {
        const data = await updateEntFn({
          id: initialValues.id,
          data: formData,
        });
        if (data) {
          toast.success("Enterprise updated successfully!");
          onCancel();
        }
      } else {
        const data = await addEntFn(formData);
        if (data) {
          toast.success("Enterprise created successfully!");
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
                  <Input {...field} placeholder="Amazon " />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Sydeny" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="contactInfo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Info</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Something extra about your contact."
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

export default AddEnterpriseForm;
