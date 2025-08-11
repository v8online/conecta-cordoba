"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, User, Mail, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

const cordobaCities = [
  "Achiras", "Adelia María", "Agua de Oro", "Alta Gracia", "Altos de Chipión",
  "Anisacate", "Arroyito", "Bell Ville", "Colonia Caroya", "Cosquín",
  "Cruz del Eje", "Deán Funes", "Estación Juárez Celman", "General Cabrera",
  "General Deheza", "Jesús María", "Laboulaye", "Las Varillas", "Leones",
  "Malagueño", "Malvinas Argentinas", "Marcos Juárez", "Mendiolaza", "Mina Clavero",
  "Montecristo", "Morteros", "Oliva", "Oncativo", "Pilar", "Río Ceballos",
  "Río Cuarto", "Río Primero", "Río Segundo", "Río Tercero", "Saldán",
  "San Francisco", "Santa María de Punilla", "Santa Rosa de Calamuchita", "Tanti",
  "Unquillo", "Vicuña Mackenna", "Villa Allende", "Villa Carlos Paz", "Villa Dolores",
  "Villa General Belgrano", "Villa María", "Villa Nueva", "Villa de Soto",
  "Villa del Rosario", "Villa del Totoral"
]

const cordobaMunicipalities = [
  "Achiras", "Adelia María", "Agua de Oro", "Altos de Chipión", "Anisacate",
  "Arias", "Arroyo Cabral", "Bialet Massé", "Calchín", "Camilo Aldao", "Carnerillo",
  "Cruz Alta", "Del Campillo", "Despeñaderos", "Devoto", "El Brete", "El Tío",
  "Etruria", "Falda del Carmen", "General Baldissera", "General Roca", "Guatimozín",
  "Huinca Renancó", "Laguna Larga", "Las Acequias", "Las Peñas", "Las Tapias",
  "Los Cerrillos", "Los Cóndores", "Los Surgentes", "Luyaba", "Mayu Sumaj",
  "Mi Granja", "Morteros", "Nicolás Bruzzone", "Noetinger", "Nono", "Obispo Trejo",
  "Ordóñez", "Pascanas", "Porteña", "Potrero de Garay", "Pozo del Molle", "Quilino",
  "Río Primero", "Sacanta", "Salsacate", "Salsipuedes", "San Carlos Minas",
  "San José", "San José de la Dormida", "San Lorenzo", "San Marcos Sierra",
  "San Marcos Sud", "San Pedro", "San Roque", "Santa Catalina Holmberg",
  "Santa Eufemia", "Saturnino María Laspiur", "Sebastián Elcano", "Serrezuela",
  "Sinsacate", "Tancacha", "Ticino", "Toledo", "Tránsito", "Ucacha",
  "Valle de Anisacate", "Valle Hermoso", "Viamonte", "Villa Allende",
  "Villa Ascasubi", "Villa Candelaria Norte", "Villa Cura Brochero", "Villa Giardino",
  "Villa Huidobro", "Villa Parque Santa Ana", "Villa Parque Síquiman",
  "Villa Rumipal", "Villa Río Icho Cruz", "Villa Santa Cruz del Lago", "Villa Sarmiento",
  "Villa Valeria", "Villa Yacanto", "Villa de las Rosas", "Villa del Dique",
  "Villa del Prado"
]

export default function RegisterClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    zone: "",
    address: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/registration/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("¡Registro exitoso! Por favor verifica tu email.")
        // Redirigir al login o dashboard
      } else {
        const error = await response.json()
        alert(error.message || "Error en el registro")
      }
    } catch (error) {
      alert("Error de conexión. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Registro de Cliente</CardTitle>
            <CardDescription>
              Únete a ConectaCórdoba y encuentra profesionales de confianza en tu zona
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="3511234567"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zone">Tipo de zona</Label>
                <Select value={formData.zone} onValueChange={(value) => handleInputChange("zone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo de zona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city">Ciudad</SelectItem>
                    <SelectItem value="municipality">Municipio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Selecciona tu ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.zone === "city" 
                        ? cordobaCities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))
                        : cordobaMunicipalities.map(municipality => (
                            <SelectItem key={municipality} value={municipality}>{municipality}</SelectItem>
                          ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección (opcional)</Label>
                <Textarea
                  id="address"
                  placeholder="Calle, número, barrio..."
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={2}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrarse GRATIS"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Beneficios de registrarte:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Acceso a profesionales verificados</li>
                <li>• Contacto directo sin intermediarios</li>
                <li>• Pagos seguros con MercadoPago</li>
                <li>• Sistema de valoraciones</li>
                <li>• Soporte 24/7</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}