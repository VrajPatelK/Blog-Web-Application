import { NextResponse } from "next/server";
import user_model from "@/models/user_model";
import connectDB from "@/libs/mongodb";

export async function GET(request, { params }) {
  try {
    await connectDB();
    // userId maybe used-id or user-email
    const isEmail = params.userId.includes("@");

    var user = {};
    user = isEmail
      ? await user_model.findOne({ email: params.userId })
      : await user_model.findById(params.userId);

    return NextResponse.json({ message: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "user fetching failure !" },
      { status: 500 }
    );
  }
}
