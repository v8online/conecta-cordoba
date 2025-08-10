import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const createPaymentSchema = z.object({
  connectionId: z.string(),
  amount: z.number().positive("El monto debe ser positivo"),
  paymentMethod: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar los datos de entrada
    const validatedData = createPaymentSchema.parse(body)
    
    // Obtener la conexión
    const connection = await db.connection.findUnique({
      where: { id: validatedData.connectionId },
      include: {
        client: true,
        professional: true,
        payments: true
      }
    })
    
    if (!connection) {
      return NextResponse.json(
        { message: "Conexión no encontrada" },
        { status: 404 }
      )
    }
    
    // Verificar si ya existe un pago para esta conexión
    const existingPayment = connection.payments.find(p => p.status === "COMPLETED")
    if (existingPayment) {
      return NextResponse.json(
        { message: "Ya existe un pago completado para esta conexión" },
        { status: 400 }
      )
    }
    
    // Verificar si es la tercera conexión
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
    const expectedAmount = isThirdConnection ? 1500 : 0
    
    if (validatedData.amount !== expectedAmount) {
      return NextResponse.json(
        { message: `El monto del pago debe ser $${expectedAmount}` },
        { status: 400 }
      )
    }
    
    // Crear el registro de pago
    const payment = await db.payment.create({
      data: {
        connectionId: validatedData.connectionId,
        userId: connection.clientId,
        amount: validatedData.amount,
        status: "PENDING",
      }
    })
    
    // Simulación de integración con MercadoPago
    // En una implementación real, aquí usarías el SDK de MercadoPago
    const mercadopagoResponse = {
      preferenceId: "99113988-fe5d33a4-6159-44e6-bc3b-9b87d0e08c79",
      initPoint: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=99113988-fe5d33a4-6159-44e6-bc3b-9b87d0e08c79",
      sandboxInitPoint: "https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=99113988-fe5d33a4-6159-44e6-bc3b-9b87d0e08c79"
    }
    
    // Actualizar el pago con el ID de MercadoPago
    await db.payment.update({
      where: { id: payment.id },
      data: {
        mercadopagoId: mercadopagoResponse.preferenceId
      }
    })
    
    return NextResponse.json({
      message: "Pago iniciado exitosamente",
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        mercadopagoPreferenceId: mercadopagoResponse.preferenceId,
        initPoint: mercadopagoResponse.initPoint,
        sandboxInitPoint: mercadopagoResponse.sandboxInitPoint
      },
      connectionDetails: {
        clientName: connection.client.name,
        professionalName: connection.professional.name,
        profession: connection.professional.professionalProfile?.profession,
        isThirdConnection,
        commissionAmount: expectedAmount
      }
    })
    
  } catch (error) {
    console.error("Error al crear pago:", error)
    
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

// Webhook para recibir notificaciones de MercadoPago
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { payment_id, status } = body
    
    if (!payment_id || !status) {
      return NextResponse.json(
        { message: "Faltan datos requeridos" },
        { status: 400 }
      )
    }
    
    // Buscar el pago por el ID de MercadoPago
    const payment = await db.payment.findFirst({
      where: { mercadopagoId: payment_id.toString() },
      include: {
        connection: true
      }
    })
    
    if (!payment) {
      return NextResponse.json(
        { message: "Pago no encontrado" },
        { status: 404 }
      )
    }
    
    // Actualizar el estado del pago
    let paymentStatus: "COMPLETED" | "FAILED" = "FAILED"
    if (status === "approved") {
      paymentStatus = "COMPLETED"
    }
    
    const updatedPayment = await db.payment.update({
      where: { id: payment.id },
      data: {
        status: paymentStatus,
        paymentDate: paymentStatus === "COMPLETED" ? new Date() : null
      }
    })
    
    // Si el pago se completó, actualizar el estado de la conexión
    if (paymentStatus === "COMPLETED") {
      await db.connection.update({
        where: { id: payment.connectionId },
        data: {
          status: "ACCEPTED",
          acceptedDate: new Date()
        }
      })
      
      // Aquí podrías enviar notificaciones al cliente y profesional
      // Por ejemplo, emails o SMS notificando que el pago fue completado
      // y la conexión ha sido aceptada
    }
    
    return NextResponse.json({
      message: "Estado del pago actualizado",
      payment: updatedPayment
    })
    
  } catch (error) {
    console.error("Error al actualizar estado del pago:", error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}