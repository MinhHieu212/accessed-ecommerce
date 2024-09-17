import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDropzone, DropzoneState } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/productSlice";
import PopupImages from "./PopupImages";

const ProdImages = () => {
  const useDispatch = useAppDispatch();
  const images = useAppSelector((state) => state.product.images);
  const primaryImage = useAppSelector((state) => state.product.primaryImage);
  const haveVariants = useAppSelector((state) => state.product.haveVariants);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  function updateField(field: string, value: any) {
    useDispatch(updateProductField({ field, value }));
  }

  const onDrop = (acceptedFiles: File[]) => {
    const maxFiles = 10;
    const totalFiles = images.length + acceptedFiles.length;
    if (totalFiles > maxFiles) {
      const filesToAdd = maxFiles - images.length;
      acceptedFiles = acceptedFiles.slice(0, filesToAdd);
    }
    const newFiles = acceptedFiles.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));
    const prev_images = images;
    updateField("images", [...prev_images, ...newFiles]);
    updateField("primaryImage", prev_images[0]);
  };

  const { getRootProps, getInputProps, isDragActive }: DropzoneState =
    useDropzone({
      onDrop,
    });

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    updateField("images", updatedImages);
  };

  const handleReplaceImage = (index: number, file: File) => {
    const updatedImages = images.map((img, i) =>
      i === index ? { file: file, url: URL.createObjectURL(file) } : img
    );
    updateField("images", updatedImages);
  };

  const handleReplaceClick = (index: number) => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = (event) => {
      if (event.target && (event.target as HTMLInputElement).files) {
        const file = (event.target as HTMLInputElement).files![0];
        handleReplaceImage(index, file);
      }
    };
    inputElement.click();
  };

  return (
    <div className={`w-full rounded-lg mb-2 p-3`}>
      <div className="flex items-center justify-between">
        <p className="font-medium text-lg">
          Product images <span className="text-red-600"> * </span>
          <span className="text-blue-700 text-sm">
            [{images.length} / 10 files]
          </span>
        </p>
        <PopupImages openModal={openModal} setOpenModal={setOpenModal} />
      </div>
      <div className="flex w-full items-center p-2 px-5 rounded-lg border-2 h-[325px] border-solid border-gray-200 gap-3 relative">
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 bg-slate-100 cursor-not-allowed ${
            haveVariants ? "opacity-80" : "hidden"
          }`}
        ></div>
        <div
          {...getRootProps()}
          className={`${
            images.length === 0
              ? "w-full"
              : images.length === 10
              ? "hidden"
              : "w-1/3"
          } ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-slate-100"
          } h-[calc(100%-14px)] my-2 flex items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
            images.length >= 10 ? "hidden" : ""
          }`}
        >
          <input {...getInputProps()} ref={imageInputRef} />
          <p className="text-sm font-medium text-blue-400">
            Upload or Drag Image
          </p>
        </div>
        <div
          className={`${
            images.length >= 10
              ? "w-full"
              : images.length > 0
              ? "w-2/3"
              : "hidden"
          } h-full flex items-center justify-center`}
        >
          <div
            className={`${
              images.length === 1 ? "w-full" : "w-1/2"
            } h-[calc(100%-14px)] flex items-center justify-center px-2 relative group`}
          >
            <img
              src={primaryImage?.url || images[0]?.url}
              alt={`Image file ${
                primaryImage?.file.name || images[0]?.file.name
              }`}
              className="w-full h-full object-cover rounded-lg"
            />
            <div
              className={`w-[calc(100%-14px)] mx-2 h-full flex items-center justify-center bg-opacity-80 absolute bg-slate-600 top-0 left-0 text-lg font-semibold rounded-lg text-white
      opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col gap-5`}
            >
              <Button
                className="text-white"
                variant="contained"
                onClick={() => handleReplaceClick(0)}
              >
                Replace
              </Button>
              <Button
                className="text-white"
                variant="contained"
                onClick={() => handleRemoveImage(0)}
              >
                Remove
              </Button>
            </div>
          </div>

          <div
            className={`${
              images.length === 1 ? "hidden" : "w-1/2"
            } h-[calc(100%-14px)] flex flex-col items-evenly justify-start py-2 gap-2`}
          >
            {images.slice(1, 3).map((item, index) => {
              return (
                <div className="w-full h-1/2 relative">
                  <img
                    src={item.url}
                    alt={`Image file ${item.file.name}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    className={`w-full h-full flex items-center justify-center bg-opacity-80 absolute bg-slate-600 top-0 left-0 text-lg font-semibold rounded-lg text-white ${
                      index === 1 && images.length > 3 ? "" : "hidden"
                    }`}
                    onClick={() => setOpenModal(true)}
                  >
                    <span className="text-white opacity-1">
                      + {images.length - 3}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdImages;
