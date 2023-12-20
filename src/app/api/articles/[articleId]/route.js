import connectDB from "@/libs/mongodb";
import article_model from "@/models/article_model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { articleId } = params;
  try {
    await connectDB();
    const article = await article_model.findById(articleId).populate({
      path: "publisher",
      select: "username",
    });

    if (article)
      return NextResponse.json({ message: article }, { status: 200 });

    return NextResponse.json(
      { message: "article couldn't find !" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "article fetching failure !" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { articleId } = params;

  try {
    await connectDB();
    const result = await article_model.findByIdAndDelete(articleId);
    if (result)
      return NextResponse.json(
        { message: "article deleted!" },
        { status: 200 }
      );
    return NextResponse.json(
      { message: "article couldn't find !" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "article deletion failure !" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { articleId } = params;
  const body = await request.json();

  try {
    await connectDB();
    const article = await article_model.findByIdAndUpdate(articleId, {
      ...body,
    });
    if (article)
      return NextResponse.json(
        { message: "article updated !" },
        { status: 200 }
      );
    return NextResponse.json(
      { message: "article couldn't find !" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "article updatetion failure !" },
      { status: 500 }
    );
  }
}
