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
import { MapPin, Star, Phone, Mail, Briefcase, Calendar, Clock, AlertTriangle, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Professional {
  id: string
  name: string
  profession: string
  description: string
  experience: number
  location: string
  zone: string
  phone: string
  email: string
  available: boolean
  rating: number
  reviewCount: number
}

interface ConnectionRequest {
  description: string
  urgency: string
  estimatedDate: string
  budget: string
}

export default function ConnectPage() {
  // Simulación de datos del profesional (en una app real vendría de params o API)
  const professional: Professional = {
    id: "1",
    name: "Juan Pérez",
    profession: "Electricista",
    description: "Especialista en instalaciones eléctricas residenciales y comerciales. Más de 10 años de experiencia en el sector.",
    experience: 10,
    location: "Córdoba Capital",
    zone: "city",
    phone: "3511234567",
    email: "juan.perez@email.com",
    available: true,
    rating: 4.8,
    reviewCount: 23
  }

  const [connectionRequest, setConnectionRequest] = useState<ConnectionRequest>({
    description: "",
    urgency: "",
    estimatedDate: "",
    budget: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulación de envío a la API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
    } catch (error) {
      alert("Error al enviar la solicitud. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ConnectionRequest, value: string) => {
    setConnectionRequest(prev => ({ ...prev, [field]: value }))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
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
            <CardTitle className="text-2xl">¡Solicitud Enviada!</CardTitle>
            <CardDescription>
              Tu solicitud ha sido enviada exitosamente a {professional.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {professional.name} recibirá tu solicitud y te contactará pronto para coordinar los detalles.
                </AlertDescription>
              </Alert>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Podrás comunicarte directamente con el profesional para acordar los términos del servicio.
                </p>
                <p className="text-sm text-gray-600">
                  Recuerda que los pagos se realizan directamente entre tú y el profesional.
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
              <Link href="/professionals" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-xl font-bold">ConectaCórdoba</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Professional Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`/placeholder-avatar-${professional.id}.jpg`} />
                    <AvatarFallback>
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{professional.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {professional.profession}
                    </CardDescription>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {renderStars(professional.rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {professional.rating} ({professional.reviewCount} reseñas)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Sobre mí</h4>
                    <p className="text-sm text-gray-600">{professional.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {professional.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-2" />
                      {professional.experience} años de experiencia
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {professional.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {professional.email}
                    </div>
                  </div>

                  <Badge variant={professional.available ? "default" : "secondary"}>
                    {professional.available ? "Disponible" : "Ocupado"}
                  </Badge>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Este es un servicio de conexión. Los pagos y acuerdos se realizan directamente entre tú y el profesional.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connection Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Solicitar Servicio</CardTitle>
                <CardDescription>
                  Describe el servicio que necesitas y {professional.name} se pondrá en contacto contigo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción del servicio *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe detalladamente el servicio que necesitas, incluyendo el tipo de trabajo, ubicación específica, y cualquier requisito especial..."
                      value={connectionRequest.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgencia</Label>
                      <select
                        id="urgency"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={connectionRequest.urgency}
                        onChange={(e) => handleInputChange("urgency", e.target.value)}
                      >
                        <option value="">Selecciona urgencia</option>
                        <option value="low">Baja - Cuando pueda</option>
                        <option value="medium">Media - Esta semana</option>
                        <option value="high">Alta - Urgente</option>
                        <option value="emergency">Emergencia - Lo antes posible</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedDate">Fecha estimada</Label>
                      <Input
                        id="estimatedDate"
                        type="date"
                        value={connectionRequest.estimatedDate}
                        onChange={(e) => handleInputChange("estimatedDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto estimado (opcional)</Label>
                    <Input
                      id="budget"
                      type="text"
                      placeholder="Ej: $5000 - $10000"
                      value={connectionRequest.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                    />
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Importante:</strong> Al enviar esta solicitud, aceptas que los pagos se realizan directamente con el profesional. 
                      La plataforma solo cobra una comisión de $1500 en la tercera conexión con el mismo profesional.
                    </AlertDescription>
                  </Alert>

                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting || !professional.available}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
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