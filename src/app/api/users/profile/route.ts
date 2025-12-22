import { connectToDatabase } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connectToDatabase();
export async function POST(request: NextRequest) {
    //EXTRACTING THE DATA FROM HELPER FOLDER WHICH RETURNS decodedToken

    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password") 

    //BY USING THIS SELECT METHOOD ABLE TO HIDE THE PASSWORD GETTING WHILE USING THE POSTMAN!!!
    //ANYTHING WE USE AFTER - LIKE -username THEN WE'LL NOT GET THE username BY USING -

    if(!user){
        return NextResponse.json({
            message: "OOPS! User Not Found",
            status: 400
        })
    }

    return NextResponse.json({
        message: "User Found SuccessFully",
        data: user
    })

}