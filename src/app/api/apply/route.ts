import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, oneThhing, whenItHappens, triedBefore, howLong, resolved, _trap } = body;

  // Honeypot — bots fill this, humans don't see it
  if (_trap) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !oneThhing) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "The Gracie Glow <applications@send.thegracieglow.com>",
      to: "grace@rootsly.co",
      replyTo: email,
      subject: `New Application from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
          <h2 style="border-bottom: 1px solid #d3b8ae; padding-bottom: 12px;">New Application</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}

          <h3 style="margin-top: 28px; color: #d3b8ae;">What they want to change</h3>
          <p>${oneThhing}</p>

          <h3 style="margin-top: 28px; color: #d3b8ae;">When it happens most</h3>
          <p>${whenItHappens || "Not provided"}</p>

          <h3 style="margin-top: 28px; color: #d3b8ae;">What they've already tried</h3>
          <p>${triedBefore || "Not provided"}</p>

          <h3 style="margin-top: 28px; color: #d3b8ae;">How long it's been going on</h3>
          <p>${howLong || "Not provided"}</p>

          <h3 style="margin-top: 28px; color: #d3b8ae;">What resolution would look like</h3>
          <p>${resolved || "Not provided"}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
