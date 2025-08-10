"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, Building, Home, ArrowLeft, Filter } from "lucide-react"
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

export default function ZonesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("cities")

  const filteredCities = cordobaCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredMunicipalities = cordobaMunicipalities.filter(municipality =>
    municipality.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleZoneClick = (zone: string, type: "city" | "municipality") => {
    // Redirigir a la página de profesionales con el filtro aplicado
    window.location.href = `/professionals?location=${encodeURIComponent(zone)}&zone=${type}`
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Zonas de Cobertura</h1>
          <p className="text-lg text-gray-600">
            ConectaCórdoba opera en todas estas ciudades y municipios de la provincia de Córdoba
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar zona..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{cordobaCities.length}</p>
                  <p className="text-sm text-gray-600">Ciudades cubiertas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{cordobaMunicipalities.length}</p>
                  <p className="text-sm text-gray-600">Municipios cubiertos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zones List */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cities">
              <Building className="mr-2 h-4 w-4" />
              Ciudades ({filteredCities.length})
            </TabsTrigger>
            <TabsTrigger value="municipalities">
              <Home className="mr-2 h-4 w-4" />
              Municipios ({filteredMunicipalities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Ciudades de Córdoba</CardTitle>
                <CardDescription>
                  Haz clic en una ciudad para ver los profesionales disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredCities.map((city) => (
                    <Button
                      key={city}
                      variant="outline"
                      className="h-auto p-3 text-left justify-start hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => handleZoneClick(city, "city")}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm">{city}</span>
                      </div>
                    </Button>
                  ))}
                </div>
                
                {filteredCities.length === 0 && (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron ciudades que coincidan con tu búsqueda</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="municipalities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Municipios de Córdoba</CardTitle>
                <CardDescription>
                  Haz clic en un municipio para ver los profesionales disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredMunicipalities.map((municipality) => (
                    <Button
                      key={municipality}
                      variant="outline"
                      className="h-auto p-3 text-left justify-start hover:bg-green-50 hover:border-green-300"
                      onClick={() => handleZoneClick(municipality, "municipality")}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{municipality}</span>
                      </div>
                    </Button>
                  ))}
                </div>
                
                {filteredMunicipalities.length === 0 && (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron municipios que coincidan con tu búsqueda</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>¿Cómo funciona la geolocalización?</CardTitle>
              <CardDescription>
                Nuestro sistema te ayuda a encontrar profesionales cerca de ti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Selecciona tu zona</h3>
                  <p className="text-sm text-gray-600">
                    Elige tu ciudad o municipio de nuestra lista de zonas cubiertas
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Filtra por ubicación</h3>
                  <p className="text-sm text-gray-600">
                    Nuestro sistema muestra solo profesionales de tu zona seleccionada
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Conecta localmente</h3>
                  <p className="text-sm text-gray-600">
                    Encuentra profesionales de confianza en tu comunidad
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}