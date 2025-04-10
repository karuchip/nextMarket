import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request){
  const reqBody = await request.json()
  try {
    await connectDB()
    const saveUserData = await UserModel.findOne({email: reqBody.email})
    if (saveUserData){
      // ユーザーデータが存在する場合の処理

      if (reqBody.password === saveUserData.password) {
        // パスワードが正しい場合の処理

        const secretKey = new TextEncoder().encode("next-market-app-book")
        const payload = {
          email: reqBody.email,
        }
        const token = await new SignJWT(payload)
                                .setProtectedHeader({alg: "HS256"})
                                .setExpirationTime("1d")
                                .sign(secretKey)

        return NextResponse.json({message: "ログイン成功", token: token})
      } else {
        return NextResponse.json({message: "ログイン失敗：パスワードが間違っています"})
      }
    } else {
      // ユーザーデータが存在しない場合の処理
      return NextResponse.json({message: "ログイン失敗：ユーザー登録をしてください"})
    }
  }catch (err){
    return NextResponse.json({message: "ログイン失敗"})
  }
}
