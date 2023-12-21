import SpecificBlog from "@/components/SpecificBlog/SpecificBlog";
import { getArticles } from "@/Helpers/callers";
import Toast from "@/components/Toast/Toast";
import { openGraphImage } from "@/app/shared-metadata";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.blogId;
  const { message: article } = await getArticles(`/articles/${id}`);

  var description = openGraphImage.description;
  description = description.concat(article.tags);
  description = description.concat([
    article.description,
    article.title,
    article.publisher.username,
    article.publish_date,
    article.createdAt,
    article.updatedAt,
  ]);

  return {
    title: `${article.title} - ${openGraphImage.title}`,
    description: description,
  };
}

const BlogPage = async ({ params }) => {
  //
  const { message, status } = await getArticles(`/articles/${params.blogId}`);

  if (status !== 200) return <Toast message={message} type="loading" />;

  //
  return <SpecificBlog article={message} />;
};

export default BlogPage;
