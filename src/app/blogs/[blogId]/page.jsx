import SpecificBlog from "@/components/SpecificBlog/SpecificBlog";
import { getArticleById } from "@/Helpers/callers";
import Toast from "@/components/Toast/Toast";

const BlogPage = async ({ params }) => {
  //
  const { message, status } = await getArticleById(params.blogId);

  if (status !== 200) return <Toast message={message} type="loading" />;

  //
  return <SpecificBlog article={message} />;
};

export default BlogPage;
