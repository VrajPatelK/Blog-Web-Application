import connectDB from "@/libs/mongodb";
import article_model from "@/models/article_model";
import { NextResponse } from "next/server";

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

export async function GET(request, { params }) {
  const { userId: publisherId } = params;

  const query = request.nextUrl.searchParams.get("query");
  const articleType = request.nextUrl.searchParams.get("type");
  var status = request.nextUrl.searchParams.get("status");
  var privacy = request.nextUrl.searchParams.get("privacy");

  try {
    await connectDB();
    var articles = [];

    if (query) {
      articles = await findArticles(
        { publisher: publisherId, title: query },
        query
      );
    } else {
      //
      if (status && privacy) {
        articles = await findArticles(
          { publisher: publisherId, status, privacy },
          articleType
        );
      }

      //
      else if (privacy) {
        articles = await findArticles(
          { publisher: publisherId, privacy },
          articleType
        );
      }

      //
      else if (status) {
        articles = await findArticles(
          { publisher: publisherId, status },
          articleType
        );
      }

      //
      else {
        articles = await findArticles({ publisher: publisherId }, articleType);
      }

      //
      if (articleType && articleType != "recents" && articleType !== "all") {
        return NextResponse.json(
          { message: "articles couldn't find for you !" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ message: articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "articles fetching failure for you !" },
      { status: 500 }
    );
  }
}
