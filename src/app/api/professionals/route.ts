import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const profession = searchParams.get("profession")
    const location = searchParams.get("location")
    const zone = searchParams.get("zone")
    const search = searchParams.get("search")

    // Construir la consulta base
    let whereClause: any = {
      available: true,
      user: {
        // Excluir usuarios bloqueados o inactivos si es necesario
      }
    }

    // Aplicar filtros
    if (profession) {
      whereClause.profession = {
        contains: profession,
        mode: "insensitive"
      }
    }

    if (location) {
      whereClause.location = {
        contains: location,
        mode: "insensitive"
      }
    }

    if (zone) {
      whereClause.zone = zone
    }

    if (search) {
      whereClause.OR = [
        {
          profession: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          user: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      ]
    }

    // Obtener profesionales con sus perfiles y estadísticas
    const professionals = await db.professionalProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true
          }
        },
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: [
        {
          reviews: {
            _count: "desc"
          }
        },
        {
          experience: "desc"
        }
      ]
    })

    // Calcular rating promedio y contar reseñas
    const professionalsWithStats = professionals.map(professional => {
      const reviews = professional.reviews
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0
      const reviewCount = reviews.length

      return {
        id: professional.id,
        name: professional.user.name,
        email: professional.user.email,
        phone: professional.user.phone,
        profession: professional.profession,
        description: professional.description,
        experience: professional.experience,
        location: professional.location,
        zone: professional.zone,
        available: professional.available,
        rating: parseFloat(averageRating.toFixed(1)),
        reviewCount,
        createdAt: professional.user.createdAt
      }
    })

    return NextResponse.json({
      professionals: professionalsWithStats,
      total: professionalsWithStats.length
    })

  } catch (error) {
    console.error("Error al obtener profesionales:", error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}