import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any) => {
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(),10)

      if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userId,
          {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
        )
      }else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,
          {forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000}

        )
      }
      const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
            pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD"
        },
      });

        const mailOptions = {
            from: 'kunal@gmail.com', //SENDER'S ADDRESS
            to: email, //RECIEVER'S ADDRESS
            subject: emailType === 'VERIFY' ? "Verify your Email" : "Reset your password"
            html: "<b>Hello World</b>",
        }

        const mailResponce = await transporter.sendEmail(mailOptions)
        return mailResponce;
    } catch (error:any) {
        
        throw new Error(error.message)
    }