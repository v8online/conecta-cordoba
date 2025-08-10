"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, MapPin, Briefcase, Calendar, CheckCircle, ArrowLeft, MessageSquare } from "lucide-react"
import Link from "next/link"

interface Professional {
  id: string
  name: string
  profession: string
  location: string
  experience: number
  rating: number
  reviewCount: number
}

interface ServiceData {
  connectionId: string
  serviceDate: string
  serviceDescription: string
  professional: Professional
}

export default function ReviewPage() {
  // Simulación de datos (en una app real vendría de params o API)
  const serviceData: ServiceData = {
    connectionId: "123",
    serviceDate: "2024-01-15",
    serviceDescription: "Instalación eléctrica completa en domicilio",
    professional: {
      id: "1",
      name: "Juan Pérez",
      profession: "Electricista",
      location: "Córdoba Capital",
      experience: 10,
      rating: 4.8,
      reviewCount: 23
    }
  }

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert("Por favor selecciona una calificación")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulación de envío a la API
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          connectionId: serviceData.connectionId,
          rating,
          comment,
          professionalId: serviceData.professional.id,
          clientId: "client-id" // En una app real vendría de la sesión
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const error = await response.json()
        alert(error.message || "Error al enviar la reseña")
      }
    } catch (error) {
      alert("Error de conexión. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (currentRating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer transition-colors ${
          i < (interactive ? hoverRating : currentRating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        } ${interactive ? "hover:text-yellow-400" : ""}`}
        onClick={() => interactive && setRating(i + 1)}
        onMouseEnter={() => interactive && setHoverRating(i + 1)}
        onMouseLeave={() => interactive && setHoverRating(0)}
      />
    ))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">¡Reseña Enviada!</CardTitle>
            <CardDescription>
              Gracias por compartir tu experiencia con {serviceData.professional.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  Tu reseña ayudará a otros clientes a tomar decisiones informadas y 
                  a {serviceData.professional.name} a mejorar sus servicios.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {renderStars(rating)}
                </div>
                <p className="text-sm text-gray-600">
                  Calificación: {rating} de 5 estrellas
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Link href="/professionals" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Ver más profesionales
                  </Button>
                </Link>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Califica tu Experiencia</h1>
          <p className="text-lg text-gray-600">
            Comparte tu opinión sobre el servicio recibido
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`/placeholder-avatar-${serviceData.professional.id}.jpg`} />
                    <AvatarFallback>
                      {serviceData.professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{serviceData.professional.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {serviceData.professional.profession}
                    </CardDescription>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {renderStars(serviceData.professional.rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {serviceData.professional.rating} ({serviceData.professional.reviewCount} reseñas)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Servicio realizado</h4>
                    <p className="text-sm text-gray-600">{serviceData.serviceDescription}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {serviceData.professional.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-2" />
                      {serviceData.professional.experience} años de experiencia
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(serviceData.serviceDate).toLocaleDateString('es-AR')}
                    </div>
                  </div>

                  <Alert>
                    <MessageSquare className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Tu reseña es anónima y ayudará a mejorar la calidad de los servicios en la plataforma.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Deja tu Reseña</CardTitle>
                <CardDescription>
                  Tu opinión es muy importante para nosotros y para la comunidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Calificación general *</Label>
                    <div className="flex items-center space-x-1">
                      {renderStars(rating, true)}
                      <span className="ml-2 text-sm text-gray-600">
                        {rating > 0 ? `${rating} de 5 estrellas` : "Selecciona una calificación"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Comentario (opcional)</Label>
                    <Textarea
                      id="comment"
                      placeholder="Comparte tu experiencia con este profesional. ¿Qué te gustó del servicio? ¿Hay algo que pueda mejorar?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-500 text-right">
                      {comment.length}/500 caracteres
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Consejos para una buena reseña:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Sé específico sobre el servicio recibido</li>
                      <li>• Menciona la puntualidad y profesionalismo</li>
                      <li>• Describe la calidad del trabajo realizado</li>
                      <li>• Sé honesto y constructivo en tus comentarios</li>
                    </ul>
                  </div>

                  <Alert>
                    <MessageSquare className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Recuerda:</strong> Las reseñas falsas o malintencionadas pueden ser reportadas 
                      y resultar en la suspensión de tu cuenta.
                    </AlertDescription>
                  </Alert>

                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting || rating === 0}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Reseña"}
                    </Button>
                    <Link href="/professionals">
                      <Button type="button" variant="outline">
                        Cancelar
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}