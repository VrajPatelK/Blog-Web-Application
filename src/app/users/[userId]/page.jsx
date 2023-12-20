import Profile from "@/components/Profile/Profile";
import Toast from "@/components/Toast/Toast";
import { getArticlesByUser, getUser } from "@/Helpers/callers";

export default async function ProfilePage({ params }) {
  //
  var { message: message1, status: s1 } = await getArticlesByUser(
    "/" + params.userId + "/articles?type=all"
  );
  var { message: message2, status: s2 } = await getUser("/" + params.userId);

  //
  if (s1 !== 200) return <Toast message={message1} type="loading" />;
  if (s2 !== 200) return <Toast message={message2} type="loading" />;

  //
  return <Profile articles={message1} publisher={message2} s1={s1} s2={s2} />;
}
