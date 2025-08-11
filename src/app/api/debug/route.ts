import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({ 
      status: "OK",
      message: "Debug endpoint working",
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        dbUrlPreview: process.env.DATABASE_URL?.substring(0, 20) + "..."
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error("Debug error:", error)
    
    return NextResponse.json({
      status: "ERROR", 
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}