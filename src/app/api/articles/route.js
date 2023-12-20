import connectDB from "@/libs/mongodb";
import article_model from "@/models/article_model";
import user_model from "@/models/user_model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    await article_model.create({
      ...body,
      publish_date: new Date(Date.now()),
    });
    return NextResponse.json({ message: "article created !" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "article creation failed !" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const articleType = request.nextUrl.searchParams.get("type");
    var articles = [];
    if (articleType === "all") {
      articles = await article_model.find().populate("publisher");
    } else {
      return NextResponse.json(
        { message: "articles could not find !" },
        { status: 404 }
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
