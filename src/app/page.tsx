"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Handshake, Star, Search, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [activeTab, setActiveTab] = useState("clientes")

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

  const featuredCities = [
    "Córdoba Capital", "Villa Carlos Paz", "Río Cuarto", "Villa María",
    "Alta Gracia", "Jesús María", "Cosquín", "La Falda", "Mina Clavero"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ConectaCórdoba</h1>
            </div>
            <nav className="flex space-x-4">
              <Button variant="ghost">Inicio</Button>
              <Button variant="ghost">Cómo funciona</Button>
              <Button variant="ghost">Contacto</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Conecta con Profesionales Locales en Córdoba
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La plataforma que conecta clientes con profesionales de confianza en todas las zonas de Córdoba. 
            Registro GRATIS para ambos. Encuentra el servicio que necesitas o ofrece tus habilidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/client">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Users className="mr-2 h-5 w-5" />
                Soy Cliente
              </Button>
            </Link>
            <Link href="/register/professional">
              <Button size="lg" variant="outline">
                <Handshake className="mr-2 h-5 w-5" />
                Soy Profesional
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir ConectaCórdoba?</h2>
            <p className="text-lg text-gray-600">La forma más segura y eficiente de conectar con profesionales locales</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Zonas Específicas</CardTitle>
                <CardDescription>
                  Operamos exclusivamente en las ciudades y municipios de Córdoba que listamos, 
                  asegurando servicio local de calidad.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Registro GRATIS</CardTitle>
                <CardDescription>
                  Tanto clientes como profesionales pueden registrarse sin costo. 
                  Solo pagas una comisión fija en la tercera conexión.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Pagos Seguros</CardTitle>
                <CardDescription>
                  Sistema de comisiones transparente con MercadoPago. 
                  Pagos directos entre cliente y profesional.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Professions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Oficios Disponibles</h2>
            <p className="text-lg text-gray-600">Más de 50 profesiones diferentes para elegir</p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {professions.map((profession, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                {profession}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-lg text-gray-600">Proceso sencillo en 3 pasos</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="clientes">Para Clientes</TabsTrigger>
              <TabsTrigger value="profesionales">Para Profesionales</TabsTrigger>
            </TabsList>
            
            <TabsContent value="clientes" className="mt-8">
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <CardTitle>Regístrate GRATIS</CardTitle>
                    <CardDescription>
                      Crea tu cuenta como cliente, indica tu ubicación dentro de las zonas permitidas.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">2</span>
                    </div>
                    <CardTitle>Busca y Contacta</CardTitle>
                    <CardDescription>
                      Encuentra profesionales por oficio y zona, contacta directamente y coordina el servicio.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">3</span>
                    </div>
                    <CardTitle>Paga y Califica</CardTitle>
                    <CardDescription>
                      Paga directamente al profesional. En la tercera conexión, paga la comisión de $1500.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="profesionales" className="mt-8">
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">1</span>
                    </div>
                    <CardTitle>Regístrate GRATIS</CardTitle>
                    <CardDescription>
                      Crea tu perfil profesional, indica tu oficio, experiencia y zona de cobertura.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">2</span>
                    </div>
                    <CardTitle>Recibe Solicitudes</CardTitle>
                    <CardDescription>
                      Los clientes te contactarán directamente. Acepta los trabajos que te interesen.
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">3</span>
                    </div>
                    <CardTitle>Cobra y Crece</CardTitle>
                    <CardDescription>
                      Cobra directamente a tus clientes. La plataforma solo cobra $1500 en la tercera conexión.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ciudades Destacadas</h2>
            <p className="text-lg text-gray-600">Algunas de las zonas donde operamos</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {featuredCities.map((city, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium">{city}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/zones">
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Ver todas las zonas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de clientes y profesionales que ya confían en ConectaCórdoba
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/client">
              <Button size="lg" variant="secondary">
                <Users className="mr-2 h-5 w-5" />
                Registrarme como Cliente
              </Button>
            </Link>
            <Link href="/register/professional">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Handshake className="mr-2 h-5 w-5" />
                Registrarme como Profesional
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ConectaCórdoba</h3>
              <p className="text-gray-400">
                Conectando clientes con profesionales locales en toda la provincia de Córdoba.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-white">Zonas de cobertura</a></li>
                <li><a href="#" className="hover:text-white">Oficios disponibles</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-white">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-white">Comisiones</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@conectacordoba.com</li>
                <li>Tel: (351) 123-4567</li>
                <li>Horario: Lun-Vie 9-18hs</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ConectaCórdoba. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}