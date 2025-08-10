# 🏠 ConectaCórdoba - Plataforma de Conexión entre Clientes y Profesionales

Una plataforma web moderna que conecta clientes con profesionales locales en diferentes zonas de Córdoba, Argentina. Desarrollada con Next.js, TypeScript y las mejores prácticas de desarrollo web.

## 🌟 Características Principales

### 📋 Funcionalidades
- **Registro Dual GRATIS** para clientes y profesionales
- **Catálogo de 50+ oficios** disponibles con búsqueda y filtrado
- **Sistema de comisiones** ($1500 solo en la tercera conexión)
- **Integración con MercadoPago** para procesamiento de pagos
- **Sistema de valoraciones y reseñas** entre clientes y profesionales
- **Geolocalización** de zonas de cobertura en Córdoba
- **Diseño responsive** y accesible

### 🎯 Oficios Disponibles
- Electricista, Plomero, Gasista, Albañil, Pintor
- Carpintero, Mecánico, Técnico en Refrigeración, Jardinero
- Lavador de Autos a Domicilio, Manicura, Mantenimiento de Piletas
- Podador en Altura, Guía Turístico de Montaña, Alquiler de Caballos
- Escribano, Gestor del Automotor, y muchos más...

## 🛠️ Tecnología Utilizada

### Core Framework
- **⚡ Next.js 15** - Framework React con App Router
- **📘 TypeScript 5** - JavaScript con tipado seguro
- **🎨 Tailwind CSS 4** - Framework CSS utility-first
- **🧩 shadcn/ui** - Componentes accesibles basados en Radix UI

### Backend & Database
- **🗄️ Prisma** - ORM para Node.js y TypeScript
- **💾 SQLite** - Base de datos ligera y eficiente
- **🔐 NextAuth.js** - Sistema de autenticación
- **🌐 API Routes** - Endpoints RESTful

### Pagos & Servicios Externos
- **💳 MercadoPago** - Procesamiento de pagos
- **🤖 Z-AI SDK** - Integración con IA para funcionalidades avanzadas

## 🚀 Configuración Rápida

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crear un archivo `.env.local` con las siguientes variables:

```env
# Database
DATABASE_URL="file:./db/custom.db"

# NextAuth.js
NEXTAUTH_SECRET="tu_secreto_aqui_genera_uno_seguro"
NEXTAUTH_URL="http://localhost:3000"

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN="TEST-1234567890123456-123456-abcdef1234567890abcdef1234567890-123456789"
MERCADOPAGO_PUBLIC_KEY="TEST-abcdef1234567890"

# Z-AI SDK
ZAI_API_KEY="tu_zai_api_key_aqui"
```

### 3. Generar Base de Datos
```bash
npm run db:push
npm run db:generate
```

### 4. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📁 Estructura del Proyecto

```
src/
├── app/                          # Páginas Next.js App Router
│   ├── page.tsx                  # Página principal
│   ├── register/
│   │   ├── client/page.tsx       # Registro de clientes
│   │   └── professional/page.tsx # Registro de profesionales
│   ├── professionals/page.tsx    # Catálogo de profesionales
│   ├── connect/page.tsx          # Sistema de conexiones
│   ├── payment/page.tsx          # Procesamiento de pagos
│   ├── review/page.tsx           # Sistema de reseñas
│   ├── zones/page.tsx            # Zonas de cobertura
│   └── api/                      # API Routes
├── components/
│   └── ui/                       # Componentes shadcn/ui
├── hooks/                        # Hooks personalizados
└── lib/                          # Utilidades y configuraciones
```

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)
1. **Subir el proyecto a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/conecta-cordoba.git
   git push -u origin main
   ```

2. **Conectar con Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Hacer clic en "New Project"
   - Seleccionar el repositorio de GitHub
   - Configurar las variables de entorno en Vercel:
     - `DATABASE_URL`: `file:./db/custom.db`
     - `NEXTAUTH_SECRET`: Generar un secreto seguro
     - `NEXTAUTH_URL`: `https://tu-app.vercel.app`
     - `MERCADOPAGO_ACCESS_TOKEN`: Tu token de MercadoPago
     - `MERCADOPAGO_PUBLIC_KEY`: Tu clave pública de MercadoPago
     - `ZAI_API_KEY`: Tu API key de Z-AI

3. **Desplegar**
   - Hacer clic en "Deploy"

### Opción 2: Directamente desde Vercel
1. **Comprimir el proyecto** en formato ZIP
2. **Ir a Vercel** y hacer clic en "New Project"
3. **Arrastrar y soltar** el archivo ZIP
4. **Configurar variables de entorno** (mismo paso que opción 1)
5. **Hacer clic en Deploy**

## 💡 Notas Importantes

### Base de Datos
- El proyecto utiliza **SQLite** que funciona perfectamente en Vercel
- **No necesitas Supabase** ni ninguna otra base de datos externa
- La base de datos se guarda en `db/custom.db`

### MercadoPago
- Configura las credenciales de **MercadoPago en modo prueba** para desarrollo
- Para producción, obtén credenciales reales en [mercadopago.com](https://mercadopago.com)

### Zonas de Córdoba
El sistema cubre las siguientes zonas:
- Centro, Nueva Córdoba, Güemes, Alberdi, General Paz
- Ciudad Universitaria, Argüello, Saldán, Villa Allende
- Y muchas más zonas de la provincia de Córdoba

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run lint         # Verificar calidad del código

# Base de Datos
npm run db:push      # Sincronizar schema con la base de datos
npm run db:generate  # Generar cliente Prisma
npm run db:migrate   # Ejecutar migraciones
npm run db:reset     # Resetear base de datos

# Producción
npm run build        # Construir para producción
npm start            # Iniciar servidor de producción
```

## 🤝 Contribuir

1. Fork del proyecto
2. Crear una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de los cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

Desarrollado con ❤️ para la comunidad de Córdoba. Conectando profesionales con clientes de manera eficiente y segura.