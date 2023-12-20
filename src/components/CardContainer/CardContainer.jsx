import Card from "../Card/Card";

const CardContainer = (props) => {
  //
  const { articles } = props;
  //
  return (
    <>
      {/* <div className="shadow overflow-auto px-3 border rounded-xl py-3 mb-10 mt-5 md:w-10/12 mx-auto flex justify-between items-center">
        NavBar
      </div> */}
      <div className="w-full px-0.5 sm:px-0 mx-auto mt-5">
        {articles.map((article, index) => (
          <Card key={index} article={article} />
        ))}
      </div>
    </>
  );
};

export default CardContainer;
