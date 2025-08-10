import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const createReviewSchema = z.object({
  connectionId: z.string(),
  professionalId: z.string(),
  clientId: z.string(),
  rating: z.number().min(1, "La calificación debe ser al menos 1").max(5, "La calificación máxima es 5"),
  comment: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar los datos de entrada
    const validatedData = createReviewSchema.parse(body)
    
    // Verificar si la conexión existe y está completada
    const connection = await db.connection.findUnique({
      where: { 
        id: validatedData.connectionId,
        clientId: validatedData.clientId,
        professionalId: validatedData.professionalId,
        status: "COMPLETED"
      }
    })
    
    if (!connection) {
      return NextResponse.json(
        { message: "La conexión no existe o no está completada" },
        { status: 404 }
      )
    }
    
    // Verificar si ya existe una reseña para esta conexión
    const existingReview = await db.review.findUnique({
      where: { connectionId: validatedData.connectionId }
    })
    
    if (existingReview) {
      return NextResponse.json(
        { message: "Ya existe una reseña para esta conexión" },
        { status: 400 }
      )
    }
    
    // Crear la reseña
    const review = await db.review.create({
      data: {
        connectionId: validatedData.connectionId,
        clientId: validatedData.clientId,
        professionalId: validatedData.professionalId,
        rating: validatedData.rating,
        comment: validatedData.comment || null,
      },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        },
        professional: {
          select: {
            id: true,
            name: true,
            professionalProfile: {
              select: {
                profession: true
              }
            }
          }
        }
      }
    })
    
    return NextResponse.json({
      message: "Reseña creada exitosamente",
      review: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        client: review.client,
        professional: review.professional
      }
    })
    
  } catch (error) {
    console.error("Error al crear reseña:", error)
    
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
    const professionalId = searchParams.get("professionalId")
    const clientId = searchParams.get("clientId")

    if (!professionalId && !clientId) {
      return NextResponse.json(
        { message: "Se requiere professionalId o clientId" },
        { status: 400 }
      )
    }

    // Construir la consulta según el parámetro proporcionado
    let whereClause: any = {}

    if (professionalId) {
      whereClause.professionalId = professionalId
    } else if (clientId) {
      whereClause.clientId = clientId
    }

    const reviews = await db.review.findMany({
      where: whereClause,
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        },
        professional: {
          select: {
            id: true,
            name: true,
            professionalProfile: {
              select: {
                profession: true
              }
            }
          }
        },
        connection: {
          select: {
            description: true,
            completedDate: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    // Calcular estadísticas
    const totalReviews = reviews.length
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0

    // Distribución de calificaciones
    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(r => r.rating === rating).length,
      percentage: totalReviews > 0 ? (reviews.filter(r => r.rating === rating).length / totalReviews) * 100 : 0
    }))

    return NextResponse.json({
      reviews,
      stats: {
        totalReviews,
        averageRating: parseFloat(averageRating.toFixed(1)),
        ratingDistribution
      }
    })

  } catch (error) {
    console.error("Error al obtener reseñas:", error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}