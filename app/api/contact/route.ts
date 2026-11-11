import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "@/lib/zod-lite";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ message: "Please fill in all fields before sending." }, { status: 400 });
  }

  const { name, email, message } = result.data;

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["hasnanenawaz@gmail.com"],
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;background:#f8faf4;border-radius:12px;">
          <h2 style="color:#16623e;margin-top:0;">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #dde8d4;color:#555;width:80px;font-weight:600;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #dde8d4;color:#1a1a1a;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #dde8d4;color:#555;font-weight:600;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #dde8d4;"><a href="mailto:${email}" style="color:#16623e;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#555;font-weight:600;vertical-align:top;padding-top:14px;">Message</td>
              <td style="padding:10px 0;color:#1a1a1a;white-space:pre-wrap;padding-top:14px;">${message}</td>
            </tr>
          </table>
          <p style="margin-top:28px;font-size:12px;color:#888;">Sent from hasnanenawaz.in portfolio contact form. Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent! I'll be in touch soon." });
  } catch {
    return NextResponse.json({ message: "Something went wrong. Please try again or email directly." }, { status: 500 });
  }
}
