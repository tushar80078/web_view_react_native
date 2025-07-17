import ResponsiveDialog from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  UploadIcon,
  FileSpreadsheetIcon,
  FileJsonIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import UploadExcelForm from "../components/upload-excel-form";
import toast from "react-hot-toast";

const BulkUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parsedJSON, setParsedJSON] = useState(null);
  const [excelResponse, setExcelResponse] = useState(null);

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/NISM_Bulk_Upload_Template.csv";
    link.download = "NISM_Bulk_Upload_Template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Template Downloaded!");
  };

  const convertBlobToJSON = async () => {
    if (excelResponse instanceof Blob) {
      try {
        const text = await excelResponse.text();
        const json = JSON.parse(text);
        setParsedJSON(json);
      } catch (err) {
        console.error("Failed to parse blob as JSON:", err);
        toast.error("Invalid JSON file received.");
      }
    }
  };

  const donwloadJson = () => {
    const url = URL.createObjectURL(excelResponse);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certification_data.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("File Downloaded.");
  };

  useEffect(() => {
    convertBlobToJSON();
  }, [excelResponse]);

  return (
    <div className="h-full w-full px-5 py-3">
      <div className="flex mt-4  ">
        <div className="lg:flex lg:flex-row lg:justify-between md:flex md:flex-row md:justify-between w-full flex flex-col justify-center  items-center">
          <div className="text-2xl w-full flex outfit-bold ">Bulk Upload</div>
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

      <div className="h-full w-full mt-4 space-y-4">
        {excelResponse && (
          <div>
            <div className="outfit-bold text-xl mb-4 text-green-600">
              JSON File Ready To Download
            </div>
            <diV className="h-80 px-5 py-5  rounded-md flex justify-center bg-slate-800/10 items-center md:flex-row flex-col">
              <div className="border border-green-400 bg-green-100 text-green-600 rounded-md  h-65  text-sm w-full md:flex-col  flex justify-center items-center p-4  w-aut0 md:w-[50%]">
                <div className="bg-green-300/50 p-5 rounded-full ">
                  <FileJsonIcon className="size-20 text-emerald-600" />
                </div>
                <Button
                  className="mt-7"
                  onClick={() => donwloadJson()}
                  size={"lg"}
                >
                  <DownloadIcon className="mr-2" />
                  Download Certification JSON File
                </Button>
              </div>
              <div className="border border-yellow-400 bg-yellow-100 text-yellow-800 rounded-md  h-65 text-sm p-4 lg:ml-2 md:ml-2 mt-2 lg:mt-0 md:mt-0 w-auto lg:w-[50%] md:w-[50%]">
                <p className="outfit-bold text-xl text-black">
                  Response Summary :{" "}
                </p>

                <ul className="list-disc list-inside space-y-1 text-lg">
                  <li>
                    Total Records :{" "}
                    <strong>{parsedJSON?.data?.totalRecords}</strong>.
                  </li>
                  <li>
                    Successfully Fetched Records :{" "}
                    <strong>
                      {parsedJSON?.data?.certificationRecords?.matched?.length}
                    </strong>
                  </li>
                  <li>
                    Failed Certification Records :
                    <strong>
                      {parsedJSON?.data?.certificationRecords?.failed?.length}
                    </strong>
                  </li>
                  <li>Please donwload JSON file to check details.</li>
                </ul>
              </div>
            </diV>
          </div>
        )}

        {!excelResponse && (
          <diV className="h-92 rounded-md flex justify-center bg-slate-800/10 items-center flex-col">
            <FileSpreadsheetIcon className="text-slate-400 size-40" />
            <p className="mt-4 text-slate-700">
              Please upload Excel(.csv) to get your JSON response file.
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
          setExcelResponseData={(ele) => setExcelResponse(ele)}
        />
      </ResponsiveDialog>
    </div>
  );
};

export default BulkUpload;
