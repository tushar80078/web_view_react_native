import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  FileSpreadsheetIcon,
  TriangleAlertIcon,
  UploadIcon,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadBulkFile } from "@/redux/thunks/corporate.thunk";
import FormError from "@/molecules/form-error";

const UploadExcelForm = ({ onClose, setExcelResponseData }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [errorExcelFile, setErrorExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setError("");
      setErrorExcelFile(null);
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError("Please select a CSV file to upload.");
        return;
      }

      setLoading(true);
      setError("");
      setErrorExcelFile(null);

      const result = await dispatch(uploadBulkFile(file)).unwrap();

      if (result && result.errorFile) {
        setErrorExcelFile(result.errorFile);
        setError(
          "The uploaded Excel file contains validation errors. Please click the button below to view the detailed errors."
        );
        setExcelResponseData([]);
      } else if (result?.success) {
        setExcelResponseData(result?.data?.certificationRecords || []);
        onClose();
      } else {
        setExcelResponseData([]);
        setError("Unknown response from server.");
      }
    } catch (err) {
      setExcelResponseData([]);
      setError(typeof err === "string" ? err : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadErrorFile = () => {
    if (errorExcelFile) {
      const blob = new Blob([errorExcelFile], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "error_report.csv";
      a.click();
      URL.revokeObjectURL(url);
      onClose();
    }
  };

  return (
    <div className="w-full flex flex-col  overflow-auto">
      <div className=" w-[100%] lg:flex md:flex ">
        <div className="border border-green-400 bg-green-100 text-green-800 rounded-md   text-sm  p-4  w-aut0 lg:w-[50%] md:w-[50%]">
          <div className="flex justify-center">
            <div className="bg-green-300/50 p-3 rounded-full ">
              <UploadIcon className="size-6" />
            </div>
          </div>

          <div className="flex w-full flex-col justify-center items-center mt-3">
            {fileName && (
              <div className="flex w-full justify-center items-center">
                <FileSpreadsheetIcon className="size-5 mr-2" />

                <div className="truncate  text-black text-[17px]  ">
                  {fileName}
                </div>
              </div>
            )}

            <p>Click to choose your file from your system</p>
            {/* Hidden file input */}
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              className={"bg-emerald-600 hover:bg-emerald-700 mt-3"}
              onClick={handleChooseFileClick}
            >
              Choose File
            </Button>
          </div>
        </div>
        <div className="border border-yellow-400 bg-yellow-100 text-yellow-800 rounded-md  text-sm  p-4 lg:ml-2 md:ml-2 mt-2 lg:mt-0 md:mt-0 w-auto lg:w-[50%] md:w-[50%]">
          <p className="font-semibold">Instructions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              The file format must be <strong>.csv</strong>.
            </li>
            <li>
              Maximum of <strong>100 records</strong> per file.
            </li>
            <li>
              Ensure all required fields such as <strong>Enrollment No</strong>{" "}
              and <strong>PAN No</strong> are filled.
            </li>
            <li>
              If there are any validation errors, an Excel file with error
              details will be returned for correction.
            </li>
          </ul>
        </div>
      </div>

      {error && (
        <FormError error={error || "Something went wrong. Please try again"} />
      )}

      <div className="flex   w-[100%] mt-2">
        <div className={"w-[50%]"}>
          <Button
            variant={"outline"}
            className={"w-full"}
            onClick={() => {
              setFile(null);
              setFileName("");
              setError("");
              setErrorExcelFile(null);
            }}
          >
            Cancel
          </Button>
        </div>
        <div className={"w-[50%] pl-2"}>
          {errorExcelFile ? (
            <Button
              className={"w-full"}
              onClick={() => handleDownloadErrorFile()}
              variant={"destructive"}
            >
              <DownloadIcon className="mr-2" />
              Download Error Report
            </Button>
          ) : (
            <Button
              className={"w-full"}
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadExcelForm;
