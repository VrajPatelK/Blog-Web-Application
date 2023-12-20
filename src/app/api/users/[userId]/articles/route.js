import connectDB from "@/libs/mongodb";
import article_model from "@/models/article_model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = params;
  const articleType = request.nextUrl.searchParams.get("type");
  try {
    await connectDB();
    var articles = [];

    if (articleType === "all") {
      articles = await article_model
        .find({ publisher: userId })
        .populate("publisher");
    } else {
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
