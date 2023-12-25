import connectDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import follows_modal from "@/models/follows_modal";

export async function POST(request) {
  const body = await request.json();

  try {
    await connectDB();
    await follows_modal.create(body);
    return NextResponse.json({ message: "follow !" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "follow post failure !" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const type = request.nextUrl.searchParams.get("type");
    const id = request.nextUrl.searchParams.get("id");

    if (type === "FollowersAndFollowing") {
      var followers = await follows_modal
        .find({ following: id })
        .populate("follower");

      var following = await follows_modal
        .find({ follower: id })
        .populate("following")
        .select({ following: 1 });

      return NextResponse.json(
        {
          message: { followers: followers, following: following },
        },
        { status: 200 }
      );
    }

    if (type === "isFollowing") {
      var follows = [];
      const id2 = request.nextUrl.searchParams.get("id2");
      follows = await follows_modal.find({ follower: id, following: id2 });
      return NextResponse.json({ message: follows }, { status: 200 });
    }
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { message: "follower fetching failure !" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  //
  const id1 = request.nextUrl.searchParams.get("id1");
  const id2 = request.nextUrl.searchParams.get("id2");
  const recordId = request.nextUrl.searchParams.get("recordId");

  try {
    await connectDB();

    var result = null;
    if (recordId) {
      result = await follows_modal.findByIdAndDelete(recordId);
    } else {
      result = await follows_modal.deleteOne({
        follower: id1,
        following: id2,
      });
    }

    if (result)
      return NextResponse.json({ message: "unfollow !" }, { status: 200 });
    return NextResponse.json(
      { message: "couldn't find follow !" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "unfollow failure !" },
      { status: 500 }
    );
  }
}
