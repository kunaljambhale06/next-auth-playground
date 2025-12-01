import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';


connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)

        const user = await User.findOne({ verifyToken, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ status: 400 }, { message: "Invalid token" });

        }
        console.log(user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: "E-Mail verified successfully" }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ status: 500 }, { message: error.message });

    }
}