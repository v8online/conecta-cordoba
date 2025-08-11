import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    // Test database connection
    await db.$connect()
    
    // Test if tables exist
    const userCount = await db.user.count()
    
    return NextResponse.json({ 
      status: "OK",
      database: "Connected",
      userCount,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error("Database error:", error)
    
    return NextResponse.json({
      status: "ERROR", 
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await db.$disconnect()
  }
}