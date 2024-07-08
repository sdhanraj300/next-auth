import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      token,
      user,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err: any) {
    console.log(err.message);
    NextResponse.json({ error: err.message }, { status: 500 });
  }
}
