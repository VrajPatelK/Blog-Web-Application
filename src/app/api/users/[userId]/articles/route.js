import connectDB from "@/libs/mongodb";
import article_model from "@/models/article_model";
import { NextResponse } from "next/server";

async function findArticles(conditions, articleType = "all") {
  //
  if (articleType === "recents") {
    return await article_model
      .find(conditions)
      .populate("publisher")
      .sort({ createdAt: -1 })
      .limit(10);
  }

  //if (articleType === "all")
  return await article_model.find(conditions).populate("publisher");
}

export async function GET(request, { params }) {
  const { userId } = params;
  const articleType = request.nextUrl.searchParams.get("type");
  var status = request.nextUrl.searchParams.get("status");
  var privacy = request.nextUrl.searchParams.get("privacy");

  try {
    await connectDB();
    var articles = [];

    //
    if (status && privacy) {
      articles = await findArticles(
        { publisher: userId, status, privacy },
        articleType
      );
    }

    //
    else if (privacy) {
      articles = await findArticles(
        { publisher: userId, privacy },
        articleType
      );
    }

    //
    else if (status) {
      articles = await findArticles({ publisher: userId, status }, articleType);
    }

    //
    else {
      articles = await findArticles({ publisher: userId }, articleType);
    }

    //
    if (articleType != "recents" && articleType !== "all") {
      return NextResponse.json(
        { message: "articles couldn't find for you !" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "articles fetching failure for you !" },
      { status: 500 }
    );
  }
}
