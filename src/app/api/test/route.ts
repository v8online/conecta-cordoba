import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "OK",
    message: "Test endpoint working",
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasDbUrl: !!process.env.DATABASE_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET
    }
  });
}