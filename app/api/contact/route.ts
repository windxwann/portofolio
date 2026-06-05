import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        // Use Gmail App Password (not your regular password)
        // Generate at: https://myaccount.google.com/apppasswords
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      // Gmail requires 'from' to match the authenticated EMAIL_USER
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      // replyTo lets you reply directly to the visitor's email
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;background:#1a1a1a;color:#9bbc0f;padding:24px;border-radius:8px;">
          <h2 style="color:#cc0000;font-size:18px;margin-bottom:16px;">📨 New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#f5f5dc;font-weight:bold;width:80px;">Name:</td>
              <td style="padding:8px 0;color:#9bbc0f;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#f5f5dc;font-weight:bold;">Email:</td>
              <td style="padding:8px 0;color:#9bbc0f;"><a href="mailto:${email}" style="color:#9bbc0f;">${email}</a></td>
            </tr>
          </table>
          <hr style="border-color:#333;margin:16px 0;" />
          <p style="color:#f5f5dc;font-weight:bold;margin-bottom:8px;">Message:</p>
          <p style="color:#9bbc0f;line-height:1.6;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact API] Failed to send email:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}