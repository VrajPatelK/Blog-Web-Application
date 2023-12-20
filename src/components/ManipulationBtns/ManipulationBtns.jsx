"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Button1 from "../Button/Button1";
import { useRouter } from "next/navigation";
import EditArticleModal from "../Modals/EditArticleModal";
import toast, { Toaster } from "react-hot-toast";

// caller
import { deleteArticleById } from "@/Helpers/callers";

const ManipulationBtns = ({ article }) => {
  const router = useRouter();

  //
  async function handleDelete() {
    const result = await deleteArticleById("/" + article._id);

    if (result.status !== 200) {
      return toast.error(result.message);
    }

    router.refresh();
    toast.success(result.message);
  }

  return (
    <>
      <Toaster />

      <div className="grid grid-cols-2 gap-x-2 justify-start sm:w-32 w-full mt-5">
        <EditArticleModal className="col-span-1" article={article}>
          <Button1 className="w-full text-white bg-orange-500 hover:bg-orange-50 hover:text-orange-500">
            <EditOutlined />
          </Button1>
        </EditArticleModal>
        <button type="button" onClick={handleDelete} className="col-span-1">
          <Button1 className="w-full border border-red-500 text-red-500 bg-red-50 hover:bg-red-500 hover:text-red-50">
            <DeleteOutlined />
          </Button1>
        </button>
      </div>
    </>
  );
};

export default ManipulationBtns;
