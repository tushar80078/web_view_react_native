import ResponsiveDialog from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  UploadIcon,
  CopyIcon,
  CheckIcon,
  FileSpreadsheetIcon,
} from "lucide-react";
import React, { useState } from "react";
import UploadExcelForm from "../components/upload-excel-form";
import ReactJson from "react-json-view";
import copy from "copy-to-clipboard";
import ExcelDataHeader from "../components/excel-data-header";
import JSONViewer from "../components/json-viewer";

const BulkUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [copied, setCopied] = useState(false);
  const [excelResponse, setExcelResponse] = useState([]);

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/NISM_Bulk_Upload_Template.csv";
    link.download = "NISM_Bulk_Upload_Template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyJSON = () => {
    copy(JSON.stringify(excelResponse, null, 2));
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
        {excelResponse?.length > 0 && (
          <div>
            <ExcelDataHeader handleCopyJSON={handleCopyJSON} copied={copied} />
            <JSONViewer data={excelResponse} />
          </div>
        )}

        {excelResponse?.length === 0 && (
          <diV className="h-90 rounded-md flex justify-center bg-slate-800/10 items-center flex-col">
            <FileSpreadsheetIcon className="text-slate-400 size-40" />
            <p className="mt-4 text-slate-700">
              Please upload Excel(.csv) to get your JSON response
            </p>
          </diV>
        )}
      </div>

      <ResponsiveDialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        title="Bulk Upload"
        description="Upload excel file."
      >
        <UploadExcelForm
          onClose={() => setIsModalOpen(!isModalOpen)}
          setExcelResponseData={(ele) => setExcelResponse([...ele])}
        />
      </ResponsiveDialog>
    </div>
  );
};

export default BulkUpload;
