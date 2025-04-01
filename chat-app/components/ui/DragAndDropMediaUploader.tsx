import React, { forwardRef } from "react";
import { XIcon } from "lucide-react";
import CloudUpIcon from "../svg/CloudUpIcon";

interface DragAndDropMediaUploaderProps {
  name?: string;
  handleImageFileChange?: (
    event: React.ChangeEvent<HTMLInputElement> | FileList
  ) => void;
  // closeMedia?: (event: any) => void;
  closeMedia?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const DragAndDropMediaUploader = forwardRef<
  HTMLInputElement,
  DragAndDropMediaUploaderProps
>(({ name, handleImageFileChange, closeMedia }, ref) => {
  // Handle Drag Over
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior
    event.dataTransfer.dropEffect = "copy"; // Show copy cursor
  };

  // Handle Drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior

    const files = event.dataTransfer.files;
    if (files.length > 0 && handleImageFileChange) {
      handleImageFileChange(files);
    }
  };
  return (
    <div
      onClick={() =>
        (ref as React.RefObject<HTMLInputElement>).current?.click()
      } // Trigger input click on div click
      onDragOver={handleDragOver} // Handle drag over event
      onDrop={handleDrop} // Handle drop event
      className="relative w-full h-full flex flex-col items-center justify-center gap-3 border-[1.5px] p-6 rounded-md border-primary border-dashed cursor-pointer"
    >
      {closeMedia && (
        <XIcon
          onClick={(event) => closeMedia(event)}
          className="absolute top-2 right-2 size-[20px] text-on-surface hover:text-on-surface-variant transition-colors duration-300 cursor-pointer"
        />
      )}

      <input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        ref={ref}
        className="hidden"
        multiple
        onChange={handleImageFileChange}
      />

      <CloudUpIcon />

      <div className="w-full flex flex-col justify-center items-center gap-1">
        <p className="text-14 text-on-surface-variant">
          <span className="text-14 text-primary-600 font-semibold">
            Click to upload{" "}
          </span>
          or drag and drop
        </p>
        <p className="text-12 text-on-surface-variant">
          PNG or JPG (max. 800x400px)
        </p>
      </div>
    </div>
  );
});

DragAndDropMediaUploader.displayName = "DragAndDropMediaUploader";
export default DragAndDropMediaUploader;
