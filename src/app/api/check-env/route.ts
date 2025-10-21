import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasProjectId: !!process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
    hasPublishableKey: !!process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    hasSecretKey: !!process.env.STACK_SECRET_SERVER_KEY,
    projectIdLength: process.env.NEXT_PUBLIC_STACK_PROJECT_ID?.length || 0,
  });
}
