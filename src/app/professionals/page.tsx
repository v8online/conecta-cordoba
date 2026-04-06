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

interface Professional {
  id: string
  user: {
    name: string
    email: string
    phone: string
  }
  profession: string
  location: string
  description: string
  experience: number
  available: boolean
}

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTrade, setSelectedTrade] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfessionals = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('q', searchTerm)
      if (selectedTrade !== 'all') params.append('trade', selectedTrade)
      if (selectedCity !== 'all') params.append('city', selectedCity)

      const response = await fetch(`/api/professionals?${params.toString()}`)
      const data = await response.json()
      setProfessionals(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching professionals:", error)
      setProfessionals([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessionals()
  }, [selectedTrade, selectedCity])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProfessionals()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <ArrowLeft className="w-5 h-5" />
            ConectaCórdoba
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/register/client">Registrarme</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Buscar Profesionales</h1>
          <p className="text-muted-foreground">Encuentra expertos locales en toda la provincia de Córdoba</p>
        </div>

        {/* Filters Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="search" 
                    placeholder="Nombre o descripción..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Oficio</Label>
                <Select value={selectedTrade} onValueChange={setSelectedTrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los oficios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los oficios</SelectItem>
                    <SelectItem value="Electricista">Electricista</SelectItem>
                    <SelectItem value="Plomero">Plomero</SelectItem>
                    <SelectItem value="Albañil">Albañil</SelectItem>
                    <SelectItem value="Mecánico de motos">Mecánico de motos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ciudad</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las ciudades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ciudades</SelectItem>
                    <SelectItem value="Córdoba">Córdoba Capital</SelectItem>
                    <SelectItem value="Villa Carlos Paz">Villa Carlos Paz</SelectItem>
                    <SelectItem value="Río Cuarto">Río Cuarto</SelectItem>
                    <SelectItem value="Villa Dolores">Villa Dolores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Buscar ahora
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <p className="text-lg text-muted-foreground">Cargando profesionales...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((pro) => (
              <Card key={pro.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{pro.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{pro.user.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {pro.profession}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3 mb-4 min-h-[3rem]">
                    {pro.description || "Sin descripción disponible."}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {pro.location}
                    </Badge>
                    <Badge variant="outline">
                      {pro.experience} años exp.
                    </Badge>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/professionals/${pro.id}`}>Ver Perfil y Contactar</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
            {professionals.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-lg border">
                <p className="text-xl text-muted-foreground mb-4">No se encontraron profesionales.</p>
                <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedTrade("all"); setSelectedCity("all"); }}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
