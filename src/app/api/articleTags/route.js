import connectDB from "@/libs/mongodb";
import article_model from "@/models/article_model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const data = await article_model.find({}).select({
      tags: 1,
      _id: 0,
    });

    // Extract tags from the 'body' array
    const tags = data.flatMap((article) => article.tags);

    // Remove duplicates by converting to Set and back to Array
    const uniqueTags = Array.from(new Set(tags));

    // Create a map with counts for each element in the array
    let tagCountMap = tags.reduce((map, element) => {
      map.set(element, (map.get(element) || 0) + 1);
      return map;
    }, new Map());
    tagCountMap = Object.fromEntries(tagCountMap);

    return NextResponse.json(
      {
        message: {
          tags,
          uniqueTags,
          tagCountMap,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "article tags fetching failure !" },
      { status: 500 }
    );
  }
}
