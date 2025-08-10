"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Phone, Mail, Briefcase, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"

const professions = [
  "Albañil", "Carpintero", "Plomero", "Electricista", "Mecánico de autos",
  "Mecánico de motos", "Mecánico (general)", "Panadero", "Carnicero",
  "Pescador", "Soldador", "Herrero", "Gasista", "Cerrajero", "Pintor",
  "Tapicero", "Jardinero", "Chofer", "Camionero", "Estilista/Peluquero",
  "Sastre", "Modista", "Zapatero", "Fotógrafo", "Vidriero", "Cocinero",
  "Repostero", "Técnico electrónico", "Técnico en refrigeración",
  "Maquinista", "Tornero", "Operador de fábrica", "Montador de cristales y vidrios",
  "Instalador de alarmas", "Montador de paneles solares", "Auxiliar de limpieza",
  "Cadete", "Cajero", "Auxiliar administrativo", "Auxiliar contable",
  "Auxiliar de jardinería", "Sereno/Personal de seguridad",
  "Auxiliar de enfermería", "Auxiliar de cocina", "Operario logístico", 
  "Abogado", "Quesero", "Ganadero", "Gomero", "Depiladora",
  "Lavador de Autos a Domicilio", "Manicura", "Mantenimiento de Piletas",
  "Podador en Altura", "Guía Turístico de Montaña", "Alquiler de Caballos para Caminatas", "Escribano",
  "Gestor del Automotor"
]

const cordobaZones = [
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

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProfession, setSelectedProfession] = useState("")
  const [selectedZone, setSelectedZone] = useState("")
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulación de datos - en una aplicación real, esto vendría de la API
  useEffect(() => {
    const mockProfessionals: Professional[] = [
      {
        id: "1",
        name: "Juan Pérez",
        profession: "Electricista",
        description: "Especialista en instalaciones eléctricas residenciales y comerciales. Más de 10 años de experiencia.",
        experience: 10,
        location: "Córdoba Capital",
        zone: "city",
        phone: "3511234567",
        email: "juan.perez@email.com",
        available: true,
        rating: 4.8,
        reviewCount: 23
      },
      {
        id: "2",
        name: "María González",
        profession: "Plomero",
        description: "Experta en reparaciones de cañerías, instalaciones sanitarias y sistemas de calefacción.",
        experience: 8,
        location: "Villa Carlos Paz",
        zone: "city",
        phone: "3517654321",
        email: "maria.gonzalez@email.com",
        available: true,
        rating: 4.9,
        reviewCount: 31
      },
      {
        id: "3",
        name: "Carlos Rodríguez",
        profession: "Albañil",
        description: "Construcción y reparaciones en general. Especializado en trabajos de albañilería fina.",
        experience: 15,
        location: "Río Cuarto",
        zone: "city",
        phone: "3581123456",
        email: "carlos.rodriguez@email.com",
        available: false,
        rating: 4.7,
        reviewCount: 18
      },
      {
        id: "4",
        name: "Ana Martínez",
        profession: "Jardinero",
        description: "Diseño y mantenimiento de jardines. Paisajista con experiencia en jardinería orgánica.",
        experience: 6,
        location: "Alta Gracia",
        zone: "city",
        phone: "3519876543",
        email: "ana.martinez@email.com",
        available: true,
        rating: 4.6,
        reviewCount: 12
      },
      {
        id: "5",
        name: "Luis Sánchez",
        profession: "Mecánico de autos",
        description: "Mecánica automotriz integral. Especializado en diagnósticos electrónicos y reparaciones.",
        experience: 12,
        location: "Villa María",
        zone: "city",
        phone: "3531234567",
        email: "luis.sanchez@email.com",
        available: true,
        rating: 4.5,
        reviewCount: 27
      }
    ]
    
    setProfessionals(mockProfessionals)
    setFilteredProfessionals(mockProfessionals)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let filtered = professionals

    if (searchTerm) {
      filtered = filtered.filter(professional =>
        professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedProfession) {
      filtered = filtered.filter(professional =>
        professional.profession === selectedProfession
      )
    }

    if (selectedZone) {
      filtered = filtered.filter(professional =>
        professional.location === selectedZone
      )
    }

    setFilteredProfessionals(filtered)
  }, [searchTerm, selectedProfession, selectedZone, professionals])

  const handleContact = (professional: Professional) => {
    alert(`Contactar a ${professional.name}\nTel: ${professional.phone}\nEmail: ${professional.email}`)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando profesionales...</p>
        </div>
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
            <nav className="flex space-x-4">
              <Link href="/register/client">
                <Button variant="ghost">Registrarme</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Buscar Profesionales</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Nombre, profesión..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profesión</Label>
                <Select value={selectedProfession} onValueChange={setSelectedProfession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las profesiones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas las profesiones</SelectItem>
                    {professions.map(profession => (
                      <SelectItem key={profession} value={profession}>{profession}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zone">Zona</Label>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las zonas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas las zonas</SelectItem>
                    {cordobaZones.map(zone => (
                      <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedProfession("")
                    setSelectedZone("")
                  }}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Limpiar filtros
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredProfessionals.length} profesional{filteredProfessionals.length !== 1 ? 'es' : ''} encontrado{filteredProfessionals.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Professionals List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder-avatar-${professional.id}.jpg`} />
                    <AvatarFallback>
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{professional.name}</CardTitle>
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
                  <Badge variant={professional.available ? "default" : "secondary"}>
                    {professional.available ? "Disponible" : "Ocupado"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  {professional.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {professional.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-2" />
                    {professional.experience} años de experiencia
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContact(professional)}
                    disabled={!professional.available}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contactar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron profesionales
            </h3>
            <p className="text-gray-600">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  )
}