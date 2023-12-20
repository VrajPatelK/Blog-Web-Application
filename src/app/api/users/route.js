import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import user_model from "@/models/user_model";
import connectDB from "@/libs/mongodb";

export async function POST(request) {
  //
  const { name: username, email, image: imgUrl, id } = await request.json();
  try {
    await connectDB();
    let user = await user_model.findOne({ email });
    //
    if (user) {
      return NextResponse.json(
        { message: "User already exist !" },
        { status: 409 }
      );
    }

    const hashPass = bcryptjs.hashSync(id);
    user = await user_model.create({
      username,
      email,
      imgUrl,
      password: hashPass,
    });

    // RES
    return NextResponse.json({
      message: "signin successfully !",
      body: user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "user signin failure !" },
      { status: 500 }
    );
  }
}
