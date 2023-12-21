import HomeLeft from "@/components/HomeLeft/HomeLeft";
import Screen from "@/components/Screen/Screen";
import Container from "@/layouts/Container";
import CardContainer from "@/components/CardContainer/CardContainer";

// callers
import { getAllTags, getArticles } from "@/Helpers/callers";
import Toast from "@/components/Toast/Toast";

export default async function Home() {
  const articleData = await getArticles("/articles?type=all");

  const { message: message2, status: s2 } = await getAllTags();
  if (s2 !== 200) return <Toast message={message2} type="loading" />;

  //
  return (
    <>
      <Screen>
        <div className="text-white text-center font-bold text-3xl sm:text-4xl md:text-5xl tracking-widest">
          {/* Blogging */}
          || सेवक शिष्य ||
        </div>
        <div className="text-white text-center text-lg mt-3 capitalize tracking-widest">
          The edge of threads ...
        </div>
      </Screen>
      {/* <Divider /> */}
      <Container>
        <div className="mx-auto flex justify-between gap-x-4">
          <CardContainer articleData={articleData} />
          <HomeLeft
            className="hidden md:block bg-orange-50 shadow-lg border"
            badges={message2}
          />
        </div>
      </Container>
    </>
  );
}
