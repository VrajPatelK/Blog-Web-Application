import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  return (
    <div>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  );
}
