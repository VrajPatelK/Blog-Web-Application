import connectDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import likers_modal from "@/models/likers_modal";

export async function POST(request) {
  const body = await request.json();

  try {
    await connectDB();
    await likers_modal.create(body);
    return NextResponse.json({ message: "like !" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "likes post failure !" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const type = request.nextUrl.searchParams.get("type");
    const id = request.nextUrl.searchParams.get("id");

    var likes = [];

    if (type === "articleIds") {
      likes = await likers_modal.find({ article: id });
    } else if (type === "isLiked") {
      const id2 = request.nextUrl.searchParams.get("id2");
      likes = await likers_modal.find({ article: id, user: id2 });
    }

    return NextResponse.json({ message: likes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "likes fetching failure !" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  //
  const id1 = request.nextUrl.searchParams.get("id1");
  const id2 = request.nextUrl.searchParams.get("id2");

  try {
    await connectDB();

    const result = await likers_modal.deleteOne({
      article: id1,
      user: id2,
    });

    if (result)
      return NextResponse.json({ message: "dislike !" }, { status: 200 });
    return NextResponse.json(
      { message: "couldn't find like !" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json({ message: "dislike failure !" }, { status: 500 });
  }
}
