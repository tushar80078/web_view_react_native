import ResponsiveDialog from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { DownloadIcon, UploadIcon } from "lucide-react";
import React, { useState } from "react";
import UploadExcelForm from "../components/upload-excel-form";
const BulkUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full w-full px-5 py-3">
      <div className="flex  mt-4">
        <div className="lg:flex lg:justify-between lg:flex-row md:flex md:justify-between md:flex-row w-full  flex flex-col">
          <div className="text-2xl w-full  ">Bulk Upload</div>
          <div className="flex flex-col lg:flex-row md:flex-row gap-2 w-full lg:justify-end md:justify-end  lg:mt-0 mt-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              className={"md:w-auto w-full"}
            >
              <UploadIcon />
              Upload Excel
            </Button>
            <Button className={"md:w-auto w-full"}>
              <DownloadIcon />
              Download Template
            </Button>
          </div>
        </div>
      </div>
      <ResponsiveDialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        title={"Bulk Upload"}
        description={"Upload excel file."}
      >
        <UploadExcelForm onClose={() => setIsModalOpen(!isModalOpen)} />
      </ResponsiveDialog>
    </div>
  );
};

export default BulkUpload;
