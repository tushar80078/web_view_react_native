import ResponsiveDialog from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { DownloadIcon, UploadIcon, CopyIcon, CheckIcon } from "lucide-react";
import React, { useState } from "react";
import UploadExcelForm from "../components/upload-excel-form";
import useExcelUpload from "@/hooks/useExcelUpload";
import ReactJson from "react-json-view";
import copy from "copy-to-clipboard"; // <--- NEW IMPORT
import ExcelDataHeader from "../components/excel-data-header";

const BulkUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false); // <--- NEW STATE
  const { data } = useExcelUpload();

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/NISM_Bulk_Upload_Template.csv";
    link.download = "NISM_Bulk_Upload_Template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyJSON = () => {
    copy(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2 sec
  };

  return (
    <div className="h-full w-full px-5 py-3">
      <div className="flex mt-4  ">
        <div className="lg:flex lg:flex-row lg:justify-between md:flex md:flex-row md:justify-between w-full flex flex-col justify-center  items-center">
          <div className="text-2xl w-full flex ">Bulk Upload</div>
          <div className="flex flex-col lg:flex-row md:flex-row gap-2 w-full lg:justify-end md:justify-end mt-2 lg:mt-0">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="md:w-auto w-full"
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Excel
            </Button>
            <Button
              onClick={handleDownloadTemplate}
              className="md:w-auto w-full"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>
        </div>
      </div>

      <div className="h-full mt-4 space-y-4">
        {data?.length > 0 && (
          <ExcelDataHeader handleCopyJSON={handleCopyJSON} copied={copied} />
        )}

        {data?.length > 0 && (
          <>
            {/* JSON Viewer */}
            <ReactJson
              src={data}
              name={false}
              enableClipboard={false}
              displayDataTypes={false}
              collapsed={false}
            />
          </>
        )}
      </div>

      <ResponsiveDialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        title="Bulk Upload"
        description="Upload excel file."
      >
        <UploadExcelForm onClose={() => setIsModalOpen(!isModalOpen)} />
      </ResponsiveDialog>
    </div>
  );
};

export default BulkUpload;
