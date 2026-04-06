"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const cordobaCities = [
  "Alta Gracia", "Bell Ville", "Colonia Caroya", "Cosquín", "Cruz del Eje",
  "Jesús María", "Laboulaye", "Marcos Juárez", "Mina Clavero", "Río Cuarto",
  "Río Tercero", "San Francisco", "Santa Rosa de Calamuchita", "Villa Carlos Paz",
  "Villa Dolores", "Villa General Belgrano", "Villa María", "Villa del Rosario",
  "Córdoba Capital"
]

export default function RegisterClient() {
  const router = useRouter()
  const [step, setStep] = useState<"login" | "profile">("login")
  const [googleUser, setGoogleUser] = useState<{email: string, name: string, googleId: string} | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    zone: "city",
    address: ""
  })

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/register/client?step=profile`
        }
      })
      if (error) throw error
    } catch (error: any) {
      toast.error("Error al conectar con Google. Intentá de nuevo.")
      setIsLoading(false)
    }
  }

  // Effect to handle redirect back from Google
  useState(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setGoogleUser({
          email: session.user.email || "",
          name: session.user.user_metadata.full_name || "",
          googleId: session.user.id
        })
        setStep("profile")
      }
    }
    checkUser()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!googleUser) {
      toast.error("Primero iniciá sesión con Google")
      return
    }
    if (!formData.location) {
      toast.error("Por favor seleccioná tu ubicación")
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/registration/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.googleId,
          phone: formData.phone,
          location: formData.location,
          zone: formData.zone,
          address: formData.address
        })
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("¡Registro exitoso! Ya podés buscar profesionales.")
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">Registro de Cliente</CardTitle>
            <CardDescription>Encontrá profesionales de confianza en tu zona. ¡Es GRATIS!</CardDescription>
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
                <div className="mt-4 p-4 bg-blue-50 rounded-lg w-full">
                  <h4 className="font-semibold text-blue-900 mb-2">¿Por qué registrarte?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Acceso a cientos de profesionales verificados</li>
                    <li>• Contacto directo y seguro</li>
                    <li>• Reseñas reales de otros clientes</li>
                    <li>• Completamente GRATIS para clientes</li>
                  </ul>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <p className="font-medium text-blue-800">{googleUser?.name}</p>
                    <p className="text-sm text-blue-600">{googleUser?.email}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-700">Paso 2: Completá tu perfil</h3>
                <div className="space-y-2">
                  <Label>Ubicación *</Label>
                  <Select value={formData.location} onValueChange={(v) => setFormData(p => ({...p, location: v}))}>
                    <SelectTrigger><SelectValue placeholder="Seleccioná tu ciudad" /></SelectTrigger>
                    <SelectContent>{cordobaCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Teléfono (opcional)</Label>
                  <Input placeholder="3514123456" value={formData.phone} onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))} />
                </div>
                <div className="space-y-2">
                  <Label>Dirección (opcional)</Label>
                  <Input placeholder="Calle, número, barrio..." value={formData.address} onChange={(e) => setFormData(p => ({...p, address: e.target.value}))} />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base" disabled={isLoading}>
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
