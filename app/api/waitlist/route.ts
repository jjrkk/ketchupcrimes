import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body as { email: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "data", "waitlist.json");

  let waitlist: Array<{ email: string; timestamp: string }> = [];

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    waitlist = JSON.parse(content);
  } catch {
    // File doesn't exist yet — start fresh
  }

  waitlist.push({ email, timestamp: new Date().toISOString() });

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(waitlist, null, 2));

  return NextResponse.json({ success: true });
}
