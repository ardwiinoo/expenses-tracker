import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export async function sendVerificationCode(email: string, code: string) {
    await transporter.sendMail({
        from: `"Expenses App" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Your verification code',
        html: `<p>Your verification code is: <b>${code}</b></p>`,
    })
}
