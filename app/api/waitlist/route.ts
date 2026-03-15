import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body as { email: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc = process.env.MAILCHIMP_DC;

  if (!apiKey || !audienceId || !dc) {
    console.error("Mailchimp environment variables are not configured.");
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  const response = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, status: "subscribed" }),
    }
  );

  if (response.ok) {
    return NextResponse.json({ success: true });
  }

  const data = await response.json();

  // Mailchimp returns 400 with title "Member Exists" for duplicate emails
  if (response.status === 400 && data.title === "Member Exists") {
    return NextResponse.json({ success: true });
  }

  console.error("Mailchimp error:", data);
  return NextResponse.json({ error: "Could not file your report. Please try again." }, { status: 500 });
}
