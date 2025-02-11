import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Upload, Camera, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ReceiptUploaderProps {
  onUpload?: (file: File) => void;
  isUploading?: boolean;
  uploadProgress?: number;
  isOpen?: boolean;
}

const ReceiptUploader = ({
  onUpload = () => {},
  isUploading = false,
  uploadProgress = 0,
  isOpen = true,
}: ReceiptUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
        </DialogHeader>

        <Card
          className={`w-full h-[400px] flex flex-col items-center justify-center p-6 border-2 border-dashed transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Uploading receipt...
                </span>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">
                Drag and drop your bank balance here
              </p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <div className="flex gap-4">
                <Button
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    // Camera functionality would go here
                  }}
                >
                  <Camera className="h-4 w-4" />
                  Take Photo
                </Button>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
              />
              <p className="text-xs text-gray-400 mt-4">
                Supported formats: PNG, JPG, PDF (max. 10MB)
              </p>
            </>
          )}
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptUploader;
