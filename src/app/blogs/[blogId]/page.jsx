import SpecificBlog from "@/components/SpecificBlog/SpecificBlog";
import { getArticles } from "@/Helpers/callers";
import Toast from "@/components/Toast/Toast";

const BlogPage = async ({ params }) => {
  //
  const { message, status } = await getArticles(`/articles/${params.blogId}`);

  if (status !== 200) return <Toast message={message} type="loading" />;

  //
  return <SpecificBlog article={message} />;
};

export default BlogPage;
