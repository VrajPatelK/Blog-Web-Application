"use client";
import React, { useEffect, useState } from "react";
import { storage } from "@/libs/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import toast from "react-hot-toast";
import Loader from "../Loaders/Loader";

const ImageUpload = (props) => {
  const [newImage, setNewImage] = useState({ url: undefined, name: undefined });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // use-effect is important otherwise when we remove the image, this client sode component will not get re-rendering frequently!
    // console.log("new url is changed!");
  }, [newImage.url, newImage]);

  const uploadOnFirebase = async (upload) => {
    const newName = `${props?.userId}-${Date.now()}.png`;
    const imageRef = ref(storage, `image/${newName}`);
    setLoader(true);

    uploadBytes(imageRef, upload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            //
            setNewImage({ url: url, name: newName });
            props.onImageUpload(url);
            //
            setTimeout(() => {
              setLoader(false);
              toast.success("image uploaded!");
            }, 1000);
          })
          .catch((error) => {
            toast.error("error getting the image url!");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const removeImage = async () => {
    const desertRef = ref(storage, `image/${newImage.name}`);
    setLoader(true);

    deleteObject(desertRef)
      .then(() => {
        setNewImage({ url: undefined, name: undefined });
        props.onImageRemove();
        //
        setTimeout(() => {
          setLoader(false);
          toast.success("image removed!");
        }, 1000);
      })
      .catch((error) => {
        toast.error("error in the image deletion!");
      });
  };

  //
  function handleImageChange(e) {
    const upload = e.target.files[0];
    uploadOnFirebase(upload);
  }

  //
  var cutborder = newImage.url ? "border-2 border-dashed" : "";

  return (
    <div className="">
      <div className="grid grid-cols-3 w-full h-32 mb-5 sm:p-2 p-1 bg-gray-800 rounded-lg shadow-lg relative">
        {/* new image */}
        <div className="flex justify-center items-center">
          <img
            width={50}
            height={50}
            className={"sm:w-24 sm:h-24 w-16 h-16 rounded-full"}
            src={props?.imgUrl || process.env.PROFILE_URL}
            alt={"profileImg"}
          />
        </div>

        {/* arrows */}
        <div className="flex justify-center items-center">
          {!loader && (
            <>
              <svg
                className="sm:w-6 sm:h-6 w-4 h-4 text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.153 15 19 8l-4.847-7H1l4.848 7L1 15h13.153Z"
                />
              </svg>

              <svg
                className="sm:w-6 sm:h-6 w-4 h-4 text-orange-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m19.822 7.431-4.846-7A1 1 0 0 0 14.153 0H1a1 1 0 0 0-.822 1.569L4.63 8 .178 14.431A1 1 0 0 0 1 16h13.153a1.001 1.001 0 0 0 .823-.431l4.846-7a1 1 0 0 0 0-1.138Z" />
              </svg>
              <svg
                className="sm:w-6 sm:h-6 w-4 h-4 text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.153 15 19 8l-4.847-7H1l4.848 7L1 15h13.153Z"
                />
              </svg>
            </>
          )}
          {loader && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>

        {/* upload new image */}
        <div
          className={
            "rounded-lg shadow-xl flex justify-center items-center relative " +
            cutborder
          }
        >
          {/* remove button */}
          {newImage.url && (
            <button
              type="button"
              className="text-red-400 bg-gray-700 rounded-lg shadow-xl sm:p-2 p-1.5 z-20 h-fit w-fit absolute top-0 right-0"
              onClick={removeImage}
            >
              <svg
                className="w-4 h-4 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                />
              </svg>
            </button>
          )}

          <label
            htmlFor="dropzone-file"
            className={
              "flex flex-col items-center justify-center cursor-pointer rounded-lg"
            }
          >
            {/* here img */}
            {newImage.url && (
              <img
                width={50}
                height={50}
                className={"sm:w-24 sm:h-24 w-16 h-16 rounded-full shadow-lg"}
                src={newImage.url || process.env.NEXT_PUBLIC_PROFILE_URL}
                alt={"profileImg"}
              />
            )}
            {!newImage.url && (
              <div className="flex flex-col items-center justify-center p-2 rounded-lg  border-dashed shadow-2xl bg-gray-700">
                <svg
                  className="sm:w-6 sm:h-6 w-5 h-5 mb-4 text-orange-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-xs text-gray-400 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-400 flex flex-wrap max-w-full uppercase">
                  (png, jpg)
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              name="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
