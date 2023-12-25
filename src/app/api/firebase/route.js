import { NextResponse } from "next/server";

export async function GET() {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
      appId: process.env.FIREBASE_APPID,
      measurementId: process.env.FIREBASE_MEASUREMENTID,
    };

    //
    return NextResponse.json(
      { message: "firebaseConfig sent !", firebaseConfig },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "firebaseConfig sending failed !" },
      { status: 500 }
    );
  }
}
