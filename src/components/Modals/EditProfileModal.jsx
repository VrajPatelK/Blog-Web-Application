"use client";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Button1 from "../Button/Button1";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Tooltip from "../Tooltip/Tooltip";

// caller
import { editUser } from "@/Helpers/callers";

const EditProfileModal = (props) => {
  //
  const { className, children, user } = props;

  const [displayModal, setDisplayModal] = useState(false);
  const [inputTag, setInputTag] = useState("");

  const router = useRouter();

  //
  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const data = {
      username: formdata.get("username"),
    };

    const result = await editUser(`/${user._id}`, data);
    if (result.status !== 200) {
      return toast.error(result.message);
    }

    setDisplayModal(false);
    toast.success(result.message);
    router.refresh();
  }

  //
  return (
    <>
      <Toaster />

      {/* caller btn */}
      <button className={className} onClick={() => setDisplayModal(true)}>
        {children}
      </button>

      {/* modal */}
      {displayModal && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-2 w-full max-w-lg max-h-full m-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-gray-900 rounded-lg shadow">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-white">
                  Edit User <EditOutlined className="ml-2" />
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-toggle="crud-modal"
                  onClick={() => setDisplayModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  {/* name */}
                  <div className="col-span-2">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type username"
                      defaultValue={user.username}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  {/* email */}
                  <div className="col-span-2">
                    <label
                      htmlFor="email"
                      className="mb-2 text-sm font-medium text-white  flex justify-start items-center gap-x-3"
                    >
                      email
                      <Tooltip
                        bg={"bg-gray-800"}
                        tc={"text-red-400"}
                        display="block"
                      >
                        not editable
                      </Tooltip>
                    </label>
                    <div
                      name="email"
                      id="email"
                      className="bg-gray-700 tracking-wide text-white opacity-80 font-semibold text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5"
                    >
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  {/* _id */}
                  <div className="col-span-2">
                    <label
                      htmlFor="_id"
                      className="mb-2 text-sm font-medium text-white flex justify-start items-center gap-x-3"
                    >
                      id
                      <Tooltip
                        bg={"bg-gray-800"}
                        tc={"text-red-400"}
                        display="block"
                      >
                        not editable
                      </Tooltip>
                    </label>
                    <div
                      name="_id"
                      id="_id"
                      className="bg-gray-700 tracking-wide text-white opacity-80 font-semibold text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5"
                    >
                      {user._id}
                    </div>
                  </div>
                </div>
                <button type="submit">
                  <Button1>
                    <EditOutlined className="mr-2" />
                    Edit User
                  </Button1>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
