import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'If an account with that email exists, a reset link has been sent.' },
        { status: 200 }
      );
    }

    await sendEmail({
      email: user.email,
      emailType: 'RESET',
      userId: user._id,
    });

    return NextResponse.json(
      { message: 'If an account with that email exists, a reset link has been sent.' },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}