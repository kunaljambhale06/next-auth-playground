import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId,
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
      )
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId,
        { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }

      )
    }
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
      port: Number(process.env.MAILTRAP_PORT) || 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Verify transporter configuration early so auth problems surface here
    try {
      await transporter.verify();
    } catch (verifyError: any) {
      throw new Error(`SMTP verification failed: ${verifyError.message}`);
    }

    const mailOptions = {
      from: 'kunal@gmail.com', //SENDER'S ADDRESS
      to: email, //RECIEVER'S ADDRESS
      subject: emailType === 'VERIFY' ? "Verify your Email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> Here</a> to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"} or copy paste the link below
      in your browser<br/> <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</br>
      </p>`,
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message)
  }
}