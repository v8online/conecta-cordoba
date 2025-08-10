import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const createConnectionSchema = z.object({
  clientId: z.string(),
  professionalId: z.string(),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  urgency: z.string().optional(),
  estimatedDate: z.string().optional(),
  budget: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar los datos de entrada
    const validatedData = createConnectionSchema.parse(body)
    
    // Verificar si ya existe una conexión pendiente entre estos usuarios
    const existingConnection = await db.connection.findFirst({
      where: {
        clientId: validatedData.clientId,
        professionalId: validatedData.professionalId,
        status: "PENDING"
      }
    })
    
    if (existingConnection) {
      return NextResponse.json(
        { message: "Ya existe una solicitud pendiente con este profesional" },
        { status: 400 }
      )
    }
    
    // Verificar si es la tercera conexión para calcular comisión
    const previousConnections = await db.connection.count({
      where: {
        clientId: validatedData.clientId,
        professionalId: validatedData.professionalId,
        status: "COMPLETED"
      }
    })
    
    const isThirdConnection = previousConnections >= 2
    
    // Crear la conexión
    const connection = await db.connection.create({
      data: {
        clientId: validatedData.clientId,
        professionalId: validatedData.professionalId,
        description: validatedData.description,
        status: "PENDING",
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        professional: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profession: true
          }
        }
      }
    })
    
    // Aquí podrías enviar notificaciones por email o SMS
    // Por ejemplo, notificar al profesional sobre la nueva solicitud
    
    return NextResponse.json({
      message: "Solicitud enviada exitosamente",
      connection: {
        id: connection.id,
        description: connection.description,
        status: connection.status,
        requestDate: connection.requestDate,
        client: connection.client,
        professional: connection.professional,
        isThirdConnection,
        commissionAmount: isThirdConnection ? 1500 : 0
      }
    })
    
  } catch (error) {
    console.error("Error al crear conexión:", error)
    
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const userType = searchParams.get("userType") // "CLIENT" o "PROFESSIONAL"
    const status = searchParams.get("status")

    if (!userId || !userType) {
      return NextResponse.json(
        { message: "Se requieren userId y userType" },
        { status: 400 }
      )
    }

    // Construir la consulta según el tipo de usuario
    let whereClause: any = {}

    if (userType === "CLIENT") {
      whereClause.clientId = userId
    } else if (userType === "PROFESSIONAL") {
      whereClause.professionalId = userId
    }

    if (status) {
      whereClause.status = status
    }

    const connections = await db.connection.findMany({
      where: whereClause,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            clientProfile: {
              select: {
                location: true,
                zone: true
              }
            }
          }
        },
        professional: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            professionalProfile: {
              select: {
                profession: true,
                experience: true,
                location: true,
                zone: true
              }
            }
          }
        },
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            paymentDate: true
          }
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        requestDate: "desc"
      }
    })

    // Para cada conexión, verificar si es la tercera para calcular comisión
    const connectionsWithCommission = await Promise.all(
      connections.map(async (connection) => {
        const previousConnections = await db.connection.count({
          where: {
            clientId: connection.clientId,
            professionalId: connection.professionalId,
            status: "COMPLETED",
            id: {
              not: connection.id
            }
          }
        })

        const isThirdConnection = previousConnections >= 2
        const commissionAmount = isThirdConnection ? 1500 : 0

        return {
          ...connection,
          isThirdConnection,
          commissionAmount
        }
      })
    )

    return NextResponse.json({
      connections: connectionsWithCommission,
      total: connectionsWithCommission.length
    })

  } catch (error) {
    console.error("Error al obtener conexiones:", error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}