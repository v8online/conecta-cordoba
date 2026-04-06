import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  googleId: z.string().min(1),
  phone: z.string().optional(),
  location: z.string().optional(),
  zone: z.string().optional(),
  address: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = schema.parse(body)

    // Upsert user by email
    const user = await db.user.upsert({
      where: { email: validatedData.email },
      update: {
        name: validatedData.name,
        googleId: validatedData.googleId,
      },
      create: {
        name: validatedData.name,
        email: validatedData.email,
        googleId: validatedData.googleId,
        userType: "CLIENT",
        role: "CLIENT",
      },
    })

    // Upsert client profile
    const profile = await db.clientProfile.upsert({
      where: { userId: user.id },
      update: {
        phone: validatedData.phone,
        location: validatedData.location,
        zone: validatedData.zone,
        address: validatedData.address,
      },
      create: {
        userId: user.id,
        phone: validatedData.phone,
        location: validatedData.location,
        zone: validatedData.zone,
        address: validatedData.address,
      },
    })

    return NextResponse.json(
      {
        message: "Perfil de cliente creado exitosamente",
        userId: user.id,
        profileId: profile.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error en registro de cliente:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
