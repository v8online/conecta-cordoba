import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const registerClientSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 caracteres"),
  location: z.string().min(1, "La ubicación es requerida"),
  zone: z.string().min(1, "El tipo de zona es requerido"),
  address: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar los datos de entrada
    const validatedData = registerClientSchema.parse(body)
    
    // Verificar si el email ya existe
    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { message: "El email ya está registrado" },
        { status: 400 }
      )
    }
    
    // Crear el usuario
    const user = await db.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        userType: "CLIENT",
      }
    })
    
    // Crear el perfil del cliente
    const clientProfile = await db.clientProfile.create({
      data: {
        userId: user.id,
        location: validatedData.location,
        zone: validatedData.zone,
      }
    })
    
    return NextResponse.json({
      message: "Cliente registrado exitosamente",
      userId: user.id,
      clientProfileId: clientProfile.id
    })
    
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