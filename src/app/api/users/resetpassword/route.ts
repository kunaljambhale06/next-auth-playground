import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Find user whose forgotPasswordToken matches AND hasn't expired
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update password and clear the reset token fields
    await User.findByIdAndUpdate(user._id, {
      $set: { password: hashedPassword },
      $unset: { forgotPasswordToken: '', forgotPasswordTokenExpiry: '' },
    });

    return NextResponse.json({ message: 'Password reset successfully. You can now log in.' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}