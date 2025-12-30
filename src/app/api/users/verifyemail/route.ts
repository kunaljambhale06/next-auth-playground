import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    if (!token) return NextResponse.json({ message: 'Missing token' }, { status: 400 });

    await connectToDatabase();

    const filter = { verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } };
    const update = {
      $set: {
        isVerified: true,
        verifiedAt: new Date()
      },
      $unset: {
        verifyToken: "",
        verifyTokenExpiry: ""
      }
    };

    const user = await User.findOneAndUpdate(filter, update, { new: true });
    
    if (!user) return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
     console.log("Verified User:", user);
     
    return NextResponse.json({ message: 'E-Mail verified successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}