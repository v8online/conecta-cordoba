"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditCard, AlertTriangle, CheckCircle, ArrowLeft, Clock, Users, Star } from "lucide-react"
import Link from "next/link"
import Script from "next/script"

interface PaymentData {
  connectionId: string
  clientName: string
  professionalName: string
  profession: string
  previousConnections: number
  commissionAmount: number
  serviceDescription: string
}

export default function PaymentPage() {
  // Simulación de datos (en una app real vendría de params o API)
  const paymentData: PaymentData = {
    connectionId: "123",
    clientName: "María González",
    professionalName: "Juan Pérez",
    profession: "Electricista",
    previousConnections: 2,
    commissionAmount: 1500,
    serviceDescription: "Instalación eléctrica en domicilio"
  }

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    try {
      // Simulación de llamada a la API para crear pago
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          connectionId: paymentData.connectionId,
          amount: paymentData.commissionAmount,
          paymentMethod: "mercadopago"
        }),
      })

      if (response.ok) {
        const paymentResponse = await response.json()
        
        // Redirigir a MercadoPago
        if (paymentResponse.payment.initPoint) {
          window.location.href = paymentResponse.payment.initPoint
        }
      } else {
        const error = await response.json()
        alert(error.message || "Error al procesar el pago")
      }
    } catch (error) {
      alert("Error de conexión. Por favor intenta nuevamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">¡Pago Completado!</CardTitle>
            <CardDescription>
              Tu pago de ${paymentData.commissionAmount} ha sido procesado exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  Ahora puedes contactar directamente a {paymentData.professionalName} para coordinar el servicio.
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Recibirás un correo electrónico con el comprobante de pago.
                </p>
                <p className="text-sm text-gray-600">
                  {paymentData.professionalName} también será notificado sobre la confirmación del servicio.
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Link href="/" className="flex-1">
                  <Button className="w-full">
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-xl font-bold">ConectaCórdoba</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pago de Comisión</h1>
          <p className="text-lg text-gray-600">
            Esta es tu tercera conexión con este profesional
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Detalles del Pago
                </CardTitle>
                <CardDescription>
                  Pago de comisión por servicio de plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Importante:</strong> Este es el pago de comisión a la plataforma por tu tercera conexión 
                      con este profesional. Los pagos por el servicio se realizan directamente con el profesional.
                    </AlertDescription>
                  </Alert>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Resumen de la conexión</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p><strong>Cliente:</strong> {paymentData.clientName}</p>
                      <p><strong>Profesional:</strong> {paymentData.professionalName}</p>
                      <p><strong>Profesión:</strong> {paymentData.profession}</p>
                      <p><strong>Servicio:</strong> {paymentData.serviceDescription}</p>
                      <p><strong>Conexiones anteriores:</strong> {paymentData.previousConnections}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Comisión de plataforma</span>
                      <span className="font-semibold">${paymentData.commissionAmount}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total a pagar</span>
                      <span className="text-blue-600">${paymentData.commissionAmount}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Método de pago</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="payment" className="text-blue-600" defaultChecked />
                        <span className="text-sm">MercadoPago</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="payment" className="text-blue-600" />
                        <span className="text-sm">Transferencia bancaria</span>
                      </label>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePayment}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isProcessing}
                    size="lg"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Procesando pago...
                      </div>
                    ) : (
                      `Pagar $${paymentData.commissionAmount}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connection History */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Historial de Conexiones
                </CardTitle>
                <CardDescription>
                  Tu historial con este profesional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Conexiones anteriores simuladas */}
                  {[1, 2].map((conn) => (
                    <div key={conn} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Completada</Badge>
                        <span className="text-xs text-gray-500">Hace {conn} meses</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Servicio de {paymentData.profession.toLowerCase()} #{conn}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Sin comisión de plataforma
                      </div>
                    </div>
                  ))}

                  {/* Conexión actual */}
                  <div className="border-2 border-blue-500 rounded-lg p-3 bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="default">Pendiente de pago</Badge>
                      <span className="text-xs text-blue-600">Ahora</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 font-medium">
                      {paymentData.serviceDescription}
                    </p>
                    <div className="flex items-center text-xs text-blue-600 font-medium">
                      <CreditCard className="h-3 w-3 mr-1" />
                      Comisión de plataforma: ${paymentData.commissionAmount}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-1 text-sm">
                      Política de comisiones
                    </h4>
                    <p className="text-xs text-yellow-800">
                      Las primeras dos conexiones con el mismo profesional son gratuitas. 
                      A partir de la tercera conexión, se aplica una comisión fija de $1500.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para el script de MercadoPago
function MercadoPagoButton() {
  return (
    <Script 
      src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
      strategy="afterInteractive"
      data-preference-id="99113988-fe5d33a4-6159-44e6-bc3b-9b87d0e08c79" 
      data-source="button"
    />
  )
}