import connectDB from "@/libs/mongodb";
import article_model from "@/models/article_model";
import user_model from "@/models/user_model";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  try {
    await connectDB();

    //
    if (Array.isArray(body)) await article_model.insertMany(body);
    else await article_model.create(body);

    //
    return NextResponse.json({ message: "article created !" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "article creation failed !" },
      { status: 500 }
    );
  }
}

async function findArticles(conditions, q = "all") {
  //
  if (q === "recents") {
    return await article_model
      .find(conditions)
      .populate("publisher")
      .sort({ createdAt: -1 })
      .limit(10);
  }

  //if (q === "all")
  return await article_model.find(conditions).populate("publisher");
}

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  const articleType = request.nextUrl.searchParams.get("type") || "recents";
  var status = request.nextUrl.searchParams.get("status") || "published";
  var privacy = request.nextUrl.searchParams.get("privacy") || "public";

  try {
    await connectDB();
    var articles = [];

    if (query) {
      articles = await findArticles(
        {
          status: status,
          privacy: privacy,
          $text: { $search: query },
        },
        articleType
      );
    } else {
      articles = await findArticles(
        { status: status, privacy: privacy },
        articleType
      );
    }

    return NextResponse.json({ message: articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "article fetching failure !" },
      { status: 500 }
    );
  }
}
