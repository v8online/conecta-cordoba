"use client"
import { useState } from "react"
import { useStackApp } from "@stackframe/stack"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Briefcase, Star, ArrowLeft, Chrome } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const professions = [
  "Albañil", "Carpintero", "Plomero", "Electricista", "Mecánico de autos",
  "Mecánico de motos", "Mecánico (general)", "Panadero", "Carnicero", "Soldador",
  "Herrero", "Gasista", "Cerrajero", "Pintor", "Tapicero", "Jardinero", "Chofer",
  "Estilista/Peluquero", "Fotógrafo", "Técnico electrónico", "Técnico en refrigeración",
  "Montador de paneles solares", "Instalador de alarmas", "Abogado", "Escribano",
  "Gestor del Automotor", "Auxiliar de limpieza", "Auxiliar de enfermería",
  "Cocinero", "Repostero", "Gomero", "Depiladora", "Manicura",
  "Mantenimiento de Piletas", "Lavador de Autos a Domicilio"
]

const cordobaCities = [
  "Alta Gracia", "Bell Ville", "Colonia Caroya", "Cosquín", "Cruz del Eje",
  "Jesús María", "Laboulaye", "Marcos Juárez", "Mina Clavero", "Río Cuarto",
  "Río Tercero", "San Francisco", "Santa Rosa de Calamuchita", "Villa Carlos Paz",
  "Villa Dolores", "Villa General Belgrano", "Villa María", "Villa del Rosario",
  "Córdoba Capital"
]

export default function RegisterProfessional() {
  const app = useStackApp()
  const router = useRouter()
  const [step, setStep] = useState<"login" | "profile">("login")
  const [googleUser, setGoogleUser] = useState<{email: string, name: string, googleId: string} | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    profession: "",
    experience: "",
    description: "",
    location: "",
    zone: "city",
    address: ""
  })

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const result = await app.signInWithOAuth("google")
      if (result && result.user) {
        setGoogleUser({
          email: result.user.primaryEmail || "",
          name: result.user.displayName || "",
          googleId: result.user.id
        })
        setStep("profile")
        toast.success("¡Google conectado! Completá tu perfil profesional.")
      }
    } catch (error: any) {
      toast.error("Error al conectar con Google. Intentá de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!googleUser) {
      toast.error("Primero iniciá sesión con Google")
      return
    }
    if (!formData.profession || !formData.experience || !formData.location || !formData.description) {
      toast.error("Por favor completá todos los campos obligatorios")
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/registration/professional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.googleId,
          phone: formData.phone,
          profession: formData.profession,
          experience: formData.experience,
          description: formData.description,
          location: formData.location,
          zone: formData.zone,
          address: formData.address
        })
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("¡Registro exitoso! Ya sos parte de ConectaCórdoba.")
        setTimeout(() => router.push("/professionals"), 2000)
      } else {
        toast.error(data.message || "Error en el registro. Intentá de nuevo.")
      }
    } catch (error) {
      toast.error("Error de conexión. Verificá tu internet e intentá de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Registro de Profesional</CardTitle>
            <CardDescription>Ofrece tus servicios a miles de clientes en tu zona. Registro GRATIS</CardDescription>
          </CardHeader>
          <CardContent>
            {step === "login" ? (
              <div className="flex flex-col items-center gap-6 py-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Paso 1: Ingresá con Google</h3>
                  <p className="text-gray-500 text-sm">Usamos Google para verificar tu identidad de forma segura y rápida.</p>
                </div>
                <Button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full max-w-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-3 h-12 text-base"
                  variant="outline"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isLoading ? "Conectando..." : "Continuar con Google"}
                </Button>
                <div className="mt-4 p-4 bg-green-50 rounded-lg w-full">
                  <h4 className="font-semibold text-green-900 mb-2">Beneficios de registrarte:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Registro completamente GRATIS</li>
                    <li>• Contacto directo con clientes</li>
                    <li>• Sin comisiones en las primeras 2 conexiones</li>
                    <li>• Solo pagás $1500 en la tercera conexión</li>
                  </ul>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <p className="font-medium text-green-800">{googleUser?.name}</p>
                    <p className="text-sm text-green-600">{googleUser?.email}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-700">Paso 2: Completá tu perfil profesional</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input placeholder="3514123456" value={formData.phone} onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Profesión *</Label>
                    <Select value={formData.profession} onValueChange={(v) => setFormData(p => ({...p, profession: v}))}>
                      <SelectTrigger><SelectValue placeholder="Seleccioná tu profesión" /></SelectTrigger>
                      <SelectContent>{professions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Años de experiencia *</Label>
                    <Select value={formData.experience} onValueChange={(v) => setFormData(p => ({...p, experience: v}))}>
                      <SelectTrigger><SelectValue placeholder="Experiencia" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Menos de 1 año</SelectItem>
                        <SelectItem value="1">1 año</SelectItem>
                        <SelectItem value="2">2 años</SelectItem>
                        <SelectItem value="3">3 años</SelectItem>
                        <SelectItem value="5">5 años</SelectItem>
                        <SelectItem value="10">Más de 5 años</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ubicación *</Label>
                    <Select value={formData.location} onValueChange={(v) => setFormData(p => ({...p, location: v}))}>
                      <SelectTrigger><SelectValue placeholder="Seleccioná tu ciudad" /></SelectTrigger>
                      <SelectContent>{cordobaCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Descripción de servicios *</Label>
                  <Textarea placeholder="Describí los servicios que ofrecés, tu especialidad y experiencia..." value={formData.description} onChange={(e) => setFormData(p => ({...p, description: e.target.value}))} rows={3} required />
                </div>
                <div className="space-y-2">
                  <Label>Dirección (opcional)</Label>
                  <Input placeholder="Calle, número, barrio..." value={formData.address} onChange={(e) => setFormData(p => ({...p, address: e.target.value}))} />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12 text-base" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Completar Registro GRATIS"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
