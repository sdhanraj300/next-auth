import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ err: "User already exists" }, { status: 400 });
    } else {
      //hashed password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      console.log(savedUser);
      return NextResponse.json(savedUser, { status: 201 });
    }
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
