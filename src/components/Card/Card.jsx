import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

const Card = (props) => {
  const { _id, title, description, tags, publisher, createdAt } = props.article;

  return (
    <div
      className={
        "py-4 sm:px-4 px-2 mb-5 rounded-lg w-full bg-orange-50 mx-auto flex flex-col"
      }
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}
    >
      <CardHeader article={props.article} />

      <CardBody articleid={_id} title={title} description={description} />
      <CardFooter tags={tags} article={props.article} />
    </div>
  );
};

export default Card;
