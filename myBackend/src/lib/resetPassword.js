import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const oAuth2Client = new google.auth.OAuth2(
    process.env.SENDER_CLIENT_ID,
    process.env.SENDER_CLIENT_SECRET,
    REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: process.env.SENDER_REFRESH_TOKEN })

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export const sendResetEmail = async (userEmail) => {
    try {
        const verifyCode = generateString(6)
        const accessToken = await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Gmail Host
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.SENDER_EMAIL,
                clientId: process.env.SENDER_CLIENT_ID,
                clientSecret: process.env.SENDER_CLIENT_SECRET,
                accessToken: accessToken,
                refreshToken: process.env.SENDER_REFRESH_TOKEN,
            },
        });
        const info = await transporter.sendMail({
            from: `ExceptionKMITL <${process.env.SENDER_EMAIL}>`,
            to: userEmail,
            subject: "[ExceptionKMITL] Password Reset Request",
            //text: "Hello world?", // plain text body
            html: `<div style="width: 40%"><h2>Reset your password?</h2><hr />
            If you requested a password reset for ${userEmail}, use the confirmation code below to complete the process.
            If you didn't make this request, ignore this email.</div>
            <div style="margin-top: 30px">
                <b>${verifyCode}</b>
            </div>
            `
        });

        // console.log("Message sent: %s", info.messageId);
        return ["Complete", verifyCode, `Confirmation Code has been sent to ${info.accepted[0]}`]
    } catch (err) {
        return err
    }



}