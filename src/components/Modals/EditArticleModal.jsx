"use client";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Button1 from "../Button/Button1";
import { useState } from "react";
import { useRouter } from "next/navigation";
import YellowDismissBadge from "../Badge/YellowDismissBadge";
import toast, { Toaster } from "react-hot-toast";

// caller
import { editArticle } from "@/Helpers/callers";

const EditArticleModal = (props) => {
  //
  const { className, children, article } = props;

  const [displayModal, setDisplayModal] = useState(false);
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState(article.tags || []);

  const router = useRouter();

  //
  function handleAddTags() {
    setTags((prevTags) => {
      // check already added ?
      if (inputTag.trim().length === 0) {
        alert("Add appropriate tag name !");
        return prevTags;
      }

      // check already added ?
      if (prevTags.includes(inputTag)) {
        alert("Already added !");
        return prevTags;
      }

      // new []
      var newTags = [];
      newTags = newTags.concat(prevTags);
      newTags.push(inputTag);

      return newTags;
    });
    setInputTag("");
  }

  //
  function handleRemoveTag(tagName) {
    setTags((prevTags) => {
      const newTags = prevTags.filter((tag) => tag !== tagName);
      return newTags;
    });
  }

  //
  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const data = {
      title: formdata.get("title"),
      description: formdata.get("description"),
      privacy: formdata.get("privacy"),
      status: formdata.get("status"),
      tags,
    };

    const result = await editArticle("/" + article._id, data);
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
                  Edit Article <EditOutlined className="ml-2" />
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
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type article name"
                      defaultValue={article.title}
                      required
                    />
                  </div>

                  {/* privacy */}
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="privacy"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Privacy
                    </label>
                    <select
                      id="privacy"
                      name="privacy"
                      className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      defaultValue={article.privacy}
                      required
                    >
                      <option value="public">public</option>
                      <option value="private">private</option>
                    </select>
                  </div>

                  {/* status */}
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      defaultValue={article.status}
                      required
                    >
                      <option value="published">publish</option>
                      <option value="pending">pending</option>
                    </select>
                  </div>

                  {/* tags */}
                  <div className="w-full col-span-2 flex justify-between">
                    <input
                      id="tag"
                      className="block p-2.5 w-3/4 z-20 text-sm text-gray-900 font-semibold rounded-lg bg-gray-50"
                      placeholder="Tag Name"
                      value={inputTag}
                      onChange={(e) => setInputTag(e.target.value)}
                    />
                    <button
                      type="button"
                      className=" w-1/5"
                      onClick={() => handleAddTags()}
                    >
                      <Button1 className="bg-orange-700 text-white w-full py-2">
                        <PlusOutlined className="mr-2" />
                        Tag
                      </Button1>
                    </button>
                  </div>

                  {tags.length > 0 && (
                    <div className="text-gray-300 col-span-2 shadow p-2 rounded bg-gray-700 flex flex-wrap gap-2">
                      {tags.map((tag, index) => {
                        return (
                          <YellowDismissBadge
                            key={index}
                            onRemoveTag={(tagName) => handleRemoveTag(tagName)}
                          >
                            {tag}
                          </YellowDismissBadge>
                        );
                      })}
                    </div>
                  )}

                  {/* description */}
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Article Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 font-semibold bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write article description here"
                      defaultValue={article.description}
                      required
                    ></textarea>
                  </div>
                </div>
                <button type="submit">
                  <Button1>
                    <EditOutlined className="mr-2" />
                    Edit article
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

export default EditArticleModal;
