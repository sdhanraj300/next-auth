import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(req: NextRequest) {
  try {
    const id = await getDataFromToken(req);
    const user = await User.findById({ _id: id }).select("-password");
    const response = NextResponse.json({
      message: "Information Extracted",
      user,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
