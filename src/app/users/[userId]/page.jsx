import Profile from "@/components/Profile/Profile";

export default async function ProfilePage({ params }) {
  const publisherId = params?.userId;

  //
  return (
    <Profile
      apiEndPoint={`/users/${publisherId}/articles?type=all&status=published&privacy=public`}
      publisherId={publisherId}
    />
  );
}
