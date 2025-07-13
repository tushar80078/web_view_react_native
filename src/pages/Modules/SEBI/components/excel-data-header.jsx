import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, FileSpreadsheetIcon } from "lucide-react";
import React from "react";

const ExcelDataHeader = ({ copied, handleCopyJSON }) => {
  return (
    <div className="flex justify-between items-center">
      <div
        className="text-lg text-green-600 flex justify-between items-center"
        style={{ fontWeight: "500" }}
      >
        <CheckIcon className="size-5 mr-1 " />
        Excel Data Fetched
      </div>
      <Button
        variant="outline"
        onClick={handleCopyJSON}
        className="flex items-center gap-2"
      >
        {copied ? (
          <>
            <CheckIcon className="h-4 w-4 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <CopyIcon className="h-4 w-4" />
            Copy JSON
          </>
        )}
      </Button>
    </div>
  );
};

export default ExcelDataHeader;
