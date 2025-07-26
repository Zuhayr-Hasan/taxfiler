// app/api/send-whatsapp/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;

  const phone = "923311329191";
  const apiKey = process.env.CALLMEBOT_API_KEY;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(
    message
  )}&apikey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ status: "Message sent successfully!" });
}
