import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Lista COMPLETA de ciudades de Córdoba con departamento, región y población estimada
const cities = [
  // Departamento Calamuchita
  { name: 'Santa Rosa de Calamuchita', department: 'Calamuchita', region: 'Sierras Chicas', population: 11000 },
  { name: 'Villa General Belgrano', department: 'Calamuchita', region: 'Sierras Chicas', population: 9000 },
  { name: 'Villa Berna', department: 'Calamuchita', region: 'Sierras Chicas', population: 1500 },
  { name: 'Villa Rumipal', department: 'Calamuchita', region: 'Sierras Chicas', population: 3000 },
  { name: 'La Cumbrecita', department: 'Calamuchita', region: 'Sierras Chicas', population: 500 },
  { name: 'Los Reartes', department: 'Calamuchita', region: 'Sierras Chicas', population: 2000 },
  { name: 'Santa Mónica', department: 'Calamuchita', region: 'Sierras Chicas', population: 500 },
  { name: 'Yacanto', department: 'Calamuchita', region: 'Sierras Chicas', population: 800 },
  
  // Departamento Capital
  { name: 'Córdoba', department: 'Capital', region: 'Centro', population: 1400000 },
  
  // Departamento Colón
  { name: 'Jesús María', department: 'Colón', region: 'Norte', population: 30000 },
  { name: 'Colonia Caroya', department: 'Colón', region: 'Norte', population: 18000 },
  { name: 'Sinsacate', department: 'Colón', region: 'Norte', population: 4000 },
  { name: 'La Granja', department: 'Colón', region: 'Norte', population: 1500 },
  { name: 'Estación Juárez Celman', department: 'Colón', region: 'Norte', population: 800 },
  
  // Departamento Cruz del Eje
  { name: 'Cruz del Eje', department: 'Cruz del Eje', region: 'Noroeste', population: 30000 },
  { name: 'Los Cocos', department: 'Cruz del Eje', region: 'Noroeste', population: 3000 },
  { name: 'Villa de Soto', department: 'Cruz del Eje', region: 'Noroeste', population: 8000 },
  { name: 'San Marcos Sierras', department: 'Cruz del Eje', region: 'Noroeste', population: 4000 },
  
  // Departamento General San Martín
  { name: 'Villa María', department: 'General San Martín', region: 'Este', population: 80000 },
  { name: 'Arroyo Algodón', department: 'General San Martín', region: 'Este', population: 1000 },
  { name: 'Villa Nueva', department: 'General San Martín', region: 'Este', population: 15000 },
  { name: 'Ballesteros', department: 'General San Martín', region: 'Este', population: 5000 },
  
  // Departamento Ischilín
  { name: 'Deán Funes', department: 'Ischilín', region: 'Norte', population: 25000 },
  { name: 'Villa Gutiérrez', department: 'Ischilín', region: 'Norte', population: 2000 },
  { name: 'Los Pozos', department: 'Ischilín', region: 'Norte', population: 500 },
  
  // Departamento Juarez Celman
  { name: 'Laboulaye', department: 'Juárez Celman', region: 'Sur', population: 22000 },
  { name: 'Leguizamon', department: 'Juárez Celman', region: 'Sur', population: 800 },
  { name: 'Serrano', department: 'Juárez Celman', region: 'Sur', population: 1200 },
  
  // Departamento Marcos Juárez
  { name: 'Marcos Juárez', department: 'Marcos Juárez', region: 'Sureste', population: 28000 },
  { name: 'Inriarte', department: 'Marcos Juárez', region: 'Sureste', population: 1500 },
  { name: 'Leones', department: 'Marcos Juárez', region: 'Sureste', population: 10000 },
  { name: 'Saira', department: 'Marcos Juárez', region: 'Sureste', population: 1200 },
  
  // Departamento Minas
  { name: 'San Carlos Minas', department: 'Minas', region: 'Oeste', population: 2000 },
  
  // Departamento Pocho
  { name: 'Salsacate', department: 'Pocho', region: 'Oeste', population: 3000 },
  { name: 'Chancaní', department: 'Pocho', region: 'Oeste', population: 1500 },
  
  // Departamento Punilla
  { name: 'Villa Carlos Paz', department: 'Punilla', region: 'Sierras', population: 70000 },
  { name: 'Cosquín', department: 'Punilla', region: 'Sierras', population: 22000 },
  { name: 'La Falda', department: 'Punilla', region: 'Sierras', population: 17000 },
  { name: 'Tanti', department: 'Punilla', region: 'Sierras', population: 5000 },
  { name: 'Bialet Massé', department: 'Punilla', region: 'Sierras', population: 6000 },
  { name: 'Santa María de Punilla', department: 'Punilla', region: 'Sierras', population: 8000 },
  { name: 'Valle Hermoso', department: 'Punilla', region: 'Sierras', population: 6000 },
  { name: 'Villa Giardino', department: 'Punilla', region: 'Sierras', population: 3000 },
  { name: 'Capilla del Monte', department: 'Punilla', region: 'Sierras', population: 12000 },
  { name: 'Casa Grande', department: 'Punilla', region: 'Sierras', population: 1500 },
  { name: 'Huerta Grande', department: 'Punilla', region: 'Sierras', population: 7000 },
  { name: 'La Cumbre', department: 'Punilla', region: 'Sierras', population: 8000 },
  { name: 'Los Cocos', department: 'Punilla', region: 'Sierras', population: 1500 },
  { name: 'Mayu Sumaj', department: 'Punilla', region: 'Sierras', population: 2000 },
  
  // Departamento Río Cuarto
  { name: 'Río Cuarto', department: 'Río Cuarto', region: 'Sur', population: 160000 },
  { name: 'Las Higueras', department: 'Río Cuarto', region: 'Sur', population: 4000 },
  { name: 'Berrotaran', department: 'Río Cuarto', region: 'Sur', population: 1500 },
  { name: 'Achiras', department: 'Río Cuarto', region: 'Sur', population: 4000 },
  { name: 'Elena', department: 'Río Cuarto', region: 'Sur', population: 1000 },
  { name: 'Vicuña Mackenna', department: 'Río Cuarto', region: 'Sur', population: 7000 },
  
  // Departamento Río Primero
  { name: 'Villa del Rosario', department: 'Río Primero', region: 'Este', population: 15000 },
  { name: 'Santa Rosa de Río Primero', department: 'Río Primero', region: 'Este', population: 7000 },
  { name: 'Atahona', department: 'Río Primero', region: 'Este', population: 1200 },
  
  // Departamento Río Segundo
  { name: 'Río Segundo', department: 'Río Segundo', region: 'Este', population: 19000 },
  { name: 'Pilar', department: 'Río Segundo', region: 'Este', population: 8000 },
  { name: 'Oncativo', department: 'Río Segundo', region: 'Este', population: 10000 },
  { name: 'Laguna Larga', department: 'Río Segundo', region: 'Este', population: 6000 },
  { name: 'Calchines', department: 'Río Segundo', region: 'Este', population: 500 },
  
  // Departamento Río Tercero
  { name: 'Almafuerte', department: 'Tercero Arriba', region: 'Este', population: 10000 },
  { name: 'Hernando', department: 'Tercero Arriba', region: 'Este', population: 12000 },
  { name: 'Villa Ascasubi', department: 'Tercero Arriba', region: 'Este', population: 2000 },
  { name: 'James Craik', department: 'Tercero Arriba', region: 'Este', population: 3000 },
  { name: 'Oliva', department: 'Tercero Arriba', region: 'Este', population: 12000 },
  
  // Departamento San Alberto
  { name: 'Villa Cura Brochero', department: 'San Alberto', region: 'Oeste', population: 6000 },
  { name: 'Nono', department: 'San Alberto', region: 'Oeste', population: 2500 },
  { name: 'Mina Clavero', department: 'San Alberto', region: 'Oeste', population: 11000 },
  { name: 'Villa Dolores', department: 'San Alberto', region: 'Oeste', population: 32000 },
  { name: 'San Javier', department: 'San Alberto', region: 'Oeste', population: 6000 },
  { name: 'Los Hornillos', department: 'San Alberto', region: 'Oeste', population: 2000 },
  { name: 'Yacanto de San Javier', department: 'San Alberto', region: 'Oeste', population: 1000 },
  { name: 'Las Rosas', department: 'San Alberto', region: 'Oeste', population: 1800 },
  
  // Departamento San Justo
  { name: 'San Francisco', department: 'San Justo', region: 'Este', population: 63000 },
  { name: 'Frontera', department: 'San Justo', region: 'Este', population: 4000 },
  { name: 'Freyre', department: 'San Justo', region: 'Este', population: 5000 },
  { name: 'Arroyito', department: 'San Justo', region: 'Este', population: 21000 },
  { name: 'Brinkmann', department: 'San Justo', region: 'Este', population: 12000 },
  { name: 'Devoto', department: 'San Justo', region: 'Este', population: 4000 },
  { name: 'Morteros', department: 'San Justo', region: 'Este', population: 16000 },
  { name: 'Alicia', department: 'San Justo', region: 'Este', population: 3000 },
  { name: 'Balnearia', department: 'San Justo', region: 'Este', population: 3500 },
  { name: 'Luxardo', department: 'San Justo', region: 'Este', population: 1000 },
  
  // Departamento Santa María
  { name: 'Alta Gracia', department: 'Santa María', region: 'Sierras Chicas', population: 47000 },
  { name: 'Anisacate', department: 'Santa María', region: 'Sierras Chicas', population: 3000 },
  { name: 'Villa La Bolsa', department: 'Santa María', region: 'Sierras Chicas', population: 3000 },
  { name: 'Potrero de Garay', department: 'Santa María', region: 'Sierras Chicas', population: 3000 },
  { name: 'Falda del Cármen', department: 'Santa María', region: 'Sierras Chicas', population: 5000 },
  { name: 'Río Ceballos', department: 'Colón', region: 'Sierras Chicas', population: 20000 },
  { name: 'Unquillo', department: 'Colón', region: 'Sierras Chicas', population: 20000 },
  { name: 'Mendiolaza', department: 'Colón', region: 'Sierras Chicas', population: 10000 },
  { name: 'Saldán', department: 'Colón', region: 'Sierras Chicas', population: 10000 },
  { name: 'Villa Allende', department: 'Colón', region: 'Sierras Chicas', population: 25000 },
]

const trades = [
  { name: 'Albañil', category: 'Construcción', description: 'Construcción y reparaciones generales' },
  { name: 'Carpintero', category: 'Construcción', description: 'Trabajos en madera' },
  { name: 'Plomero', category: 'Hogar', description: 'Reparación de cañerías y sanitarios' },
  { name: 'Electricista', category: 'Hogar', description: 'Instalaciones y reparaciones eléctricas' },
  { name: 'Mecánico de autos', category: 'Automotor', description: 'Reparación de vehículos livianos' },
  { name: 'Mecánico de motos', category: 'Automotor', description: 'Reparación de motocicletas' },
  { name: 'Mecánico (general)', category: 'Industrial', description: 'Mecánica industrial y máquinas' },
  { name: 'Panadero', category: 'Gastronomía', description: 'Elaboración de pan y facturas' },
  { name: 'Carnicero', category: 'Gastronomía', description: 'Corte y venta de carnes' },
  { name: 'Pescador', category: 'Oficios Varios', description: 'Pesca artesanal y comercial' },
  { name: 'Soldador', category: 'Industrial', description: 'Soldadura de metales' },
  { name: 'Herrero', category: 'Construcción', description: 'Trabajos en hierro y forja' },
  { name: 'Gasista', category: 'Hogar', description: 'Instalaciones de gas matriculadas' },
  { name: 'Cerrajero', category: 'Seguridad', description: 'Apertura y reparación de cerraduras' },
  { name: 'Pintor', category: 'Construcción', description: 'Pintura de interiores y exteriores' },
  { name: 'Tapicero', category: 'Hogar', description: 'Tapizado de muebles y vehículos' },
  { name: 'Jardinero', category: 'Hogar', description: 'Mantenimiento de jardines y parques' },
  { name: 'Chofer', category: 'Transporte', description: 'Conducción de vehículos particulares' },
  { name: 'Camionero', category: 'Transporte', description: 'Transporte de carga pesada' },
  { name: 'Estilista/Peluquero', category: 'Estética', description: 'Corte y peinado' },
  { name: 'Sastre', category: 'Textil', description: 'Confección de ropa a medida' },
  { name: 'Modista', category: 'Textil', description: 'Arreglos y confección de ropa' },
  { name: 'Zapatero', category: 'Oficios Varios', description: 'Reparación de calzado' },
  { name: 'Fotógrafo', category: 'Servicios Profesionales', description: 'Fotografía para eventos y comercial' },
  { name: 'Vidriero', category: 'Construcción', description: 'Colocación de vidrios y cristales' },
  { name: 'Cocinero', category: 'Gastronomía', description: 'Preparación de comidas' },
  { name: 'Repostero', category: 'Gastronomía', description: 'Pastelería y repostería' },
  { name: 'Técnico electrónico', category: 'Tecnología', description: 'Reparación de equipos electrónicos' },
  { name: 'Técnico en refrigeración', category: 'Hogar', description: 'Aire acondicionado y heladeras' },
  { name: 'Maquinista', category: 'Industrial', description: 'Operación de maquinaria pesada' },
  { name: 'Tornero', category: 'Industrial', description: 'Trabajos en torno y fresadora' },
  { name: 'Operador de fábrica', category: 'Industrial', description: 'Operario de línea de producción' },
  { name: 'Montador de cristales y vidrios', category: 'Construcción', description: 'Instalación de aberturas' },
  { name: 'Instalador de alarmas', category: 'Seguridad', description: 'Seguridad electrónica' },
  { name: 'Montador de paneles solares', category: 'Energía', description: 'Energías renovables' },
  { name: 'Auxiliar de limpieza', category: 'Hogar', description: 'Limpieza de casas y oficinas' },
  { name: 'Cadete', category: 'Servicios Varios', description: 'Trámites y mensajería' },
  { name: 'Cajero', category: 'Comercio', description: 'Atención al público y caja' },
  { name: 'Auxiliar administrativo', category: 'Servicios Profesionales', description: 'Tareas de oficina' },
  { name: 'Auxiliar contable', category: 'Servicios Profesionales', description: 'Asistencia en contabilidad' },
  { name: 'Auxiliar de jardinería', category: 'Hogar', description: 'Asistente de jardinero' },
  { name: 'Sereno/Personal de seguridad', category: 'Seguridad', description: 'Vigilancia y custodia' },
  { name: 'Auxiliar de enfermería', category: 'Salud', description: 'Cuidado de pacientes' },
  { name: 'Auxiliar de cocina', category: 'Gastronomía', description: 'Asistente de cocinero' },
  { name: 'Operario logístico', category: 'Transporte', description: 'Depósito y despacho' },
  { name: 'Abogado', category: 'Servicios Profesionales', description: 'Asesoría legal' },
  { name: 'Quesero', category: 'Gastronomía', description: 'Producción de quesos' },
  { name: 'Ganadero', category: 'Campo', description: 'Cría de animales' },
  { name: 'Gomero', category: 'Automotor', description: 'Reparación de neumáticos' },
  { name: 'Depiladora', category: 'Estética', description: 'Tratamientos de belleza' },
  { name: 'Lavador de Autos a Domicilio', category: 'Automotor', description: 'Limpieza de vehículos' },
  { name: 'Manicura', category: 'Estética', description: 'Cuidado de uñas' },
  { name: 'Mantenimiento de Piletas', category: 'Hogar', description: 'Limpieza y químicos para piscinas' },
  { name: 'Podador en Altura', category: 'Hogar', description: 'Poda de árboles grandes' },
  { name: 'Guía Turístico de Montaña', category: 'Turismo', description: 'Excursiones y trekking' },
  { name: 'Alquiler de Caballos para Caminatas', category: 'Turismo', description: 'Cabalgatas guiadas' },
  { name: 'Escribano', category: 'Servicios Profesionales', description: 'Actos públicos y escrituras' },
  { name: 'Gestor del Automotor', category: 'Servicios Profesionales', description: 'Trámites de vehículos' },
]

async function main() {
  console.log('Iniciando seed...')

  // Ciudades
  for (const city of cities) {
    await prisma.city.upsert({
      where: { name: city.name },
      update: {},
      create: city,
    })
  }
  console.log(`${cities.length} ciudades creadas.`)

  // Oficios
  for (const trade of trades) {
    await prisma.trade.upsert({
      where: { name: trade.name },
      update: {},
      create: trade,
    })
  }
  console.log(`${trades.length} oficios creados.`)

  console.log('Seed completado exitosamente.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
