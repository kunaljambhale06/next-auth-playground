import { connectToDatabase } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectToDatabase();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 400 })
        }
        console.log("User exists:", user);
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ message: 'Check your credentials' }, { status: 400 })
        }

        //GENERATING JWT TOKEN
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, { expiresIn: '1d' })

        const responce = NextResponse.json({
            message: "Logged in successfully",
            success: true,
        })
        responce.cookies.set('token', token, {
            httpOnly: true,
            path: '/',        // 🔥 REQUIRED
            sameSite: 'lax',  // good practice
        })
        return responce;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}