// import nodemailer from "nodemailer";
// import User from "@/models/user.model";
// import bcryptjs from "bcryptjs";

// export const sendMail = async ({ email, emailType, userId }: any) => {
//   try {
//     //create a hashed token
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);
//     await User.findByIdAndUpdate(
//       userId,
//       {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: Date.now() + 3600000,
//       },
//       { new: true }
//     );
//   } catch (error) {
//     throw error;
//   }
// };
