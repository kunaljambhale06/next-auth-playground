import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === 'VERIFY') {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000 // 1 hour
        }
      })
      console.log("Updated User token details:", updatedUser);

    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
        }
      })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
      port: Number(process.env.MAILTRAP_PORT) || 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    try {
      await transporter.verify();
    } catch (verifyError: any) {
      throw new Error(`SMTP verification failed: ${verifyError.message}`);
    }

    //  FIX: Reset email now points to /reset-password, not /verifyemail
    const actionLink =
      emailType === 'VERIFY'
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/reset-password?token=${hashedToken}`;

    const mailOptions = {
      from: 'kunal@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? "Verify your Email" : "Reset your password",
      html: `<p>Click <a href="${actionLink}">Here</a> to ${
        emailType === 'VERIFY' ? "verify your email" : "reset your password"
      } or copy paste the link below in your browser<br/><br>${actionLink}</p>`,
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message)
  }
}