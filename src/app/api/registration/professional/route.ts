import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  googleId: z.string().min(1),
  phone: z.string().optional(),
  profession: z.string().min(1),
  experience: z.string().min(1),
  description: z.string().min(10),
  location: z.string().min(1),
  zone: z.string().min(1),
  address: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    // Upsert: crea o actualiza el usuario por email
    const user = await db.user.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        phone: data.phone,
        googleId: data.googleId,
        userType: "PROFESSIONAL",
        role: "PROFESSIONAL",
      },
      create: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        googleId: data.googleId,
        userType: "PROFESSIONAL",
        role: "PROFESSIONAL",
      }
    })

    // Upsert del perfil profesional
    const profile = await db.professionalProfile.upsert({
      where: { userId: user.id },
      update: {
        profession: data.profession,
        description: data.description,
        experience: parseInt(data.experience),
        location: data.location,
        zone: data.zone,
        available: true,
      },
      create: {
        userId: user.id,
        profession: data.profession,
        description: data.description,
        experience: parseInt(data.experience),
        location: data.location,
        zone: data.zone,
        available: true,
      }
    })

    return NextResponse.json({
      message: "Profesional registrado exitosamente",
      userId: user.id,
      profileId: profile.id
    })
  } catch (error) {
    console.error("Error registro profesional:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Datos inválidos: " + error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: "Error interno del servidor. Intentá de nuevo." },
      { status: 500 }
    )
  }
}
