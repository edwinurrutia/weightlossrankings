import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_INBOX = "hello@weightlossrankings.org";
// Sender must use a verified domain in Resend. weightlossrankings.org is
// verified at resend.com/domains, so we send from the brand inbox directly
// and visitors see a clean "from" line in their reply chain.
const FROM_ADDRESS = "WeightLossRankings <hello@weightlossrankings.org>";

const VALID_SUBJECTS = new Set([
  "General inquiry",
  "Provider Correction",
  "Press",
  "Partnership",
  "Privacy Request",
  "Other",
]);

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact route: RESEND_API_KEY missing");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject =
      typeof body.subject === "string" ? body.subject.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    // Honeypot — bots fill hidden fields. Real users leave this empty.
    const honeypot = typeof body.company === "string" ? body.company : "";

    if (honeypot) {
      // Pretend success so the bot doesn't retry.
      return NextResponse.json({ success: true });
    }

    if (!name || name.length > 200) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 320) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 },
      );
    }
    if (!VALID_SUBJECTS.has(subject)) {
      return NextResponse.json(
        { error: "Invalid subject." },
        { status: 400 },
      );
    }
    if (!message || message.length < 5 || message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be between 5 and 5000 characters." },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px;">
        <h2 style="color: #1e1b4b; margin-bottom: 16px;">New contact form submission</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 6px 12px 6px 0; color: #64748b; vertical-align: top;"><strong>From</strong></td><td style="padding: 6px 0;">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</td></tr>
          <tr><td style="padding: 6px 12px 6px 0; color: #64748b; vertical-align: top;"><strong>Subject</strong></td><td style="padding: 6px 0;">${escapeHtml(subject)}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.6; color: #1e1b4b;">${escapeHtml(message)}</p>
      </div>
    `;

    const text = `New contact form submission

From: ${name} <${email}>
Subject: ${subject}

${message}
`;

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [CONTACT_INBOX],
      replyTo: email,
      subject: `[Contact] ${subject} — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
