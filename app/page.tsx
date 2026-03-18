"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, Filter, ChevronRight, Check, ArrowRight, CreditCard, Truck, Phone, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/app/footer"
import { motorcycles } from "@/data/motorcycles"
import { AnimatedCard } from "@/components/animated-card"
import { ScrollIndicator } from "@/components/scroll-indicator"

// Tipos de motos para filtrar
const motorcycleTypes = ["Todas", "Deportiva", "Cruiser", "Touring", "Scooter", "Enduro"]

// Pasos del proceso de compra
const purchaseSteps = [
  {
    title: "Elige tu Moto",
    description:
      "Explora nuestro catálogo y encuentra la motocicleta perfecta para ti. Filtra por tipo, compara modelos y visualiza todas las especificaciones.",
    icon: <ChevronRight className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Personaliza tu Experiencia",
    description:
      "Selecciona accesorios, colores y opciones adicionales para hacer tu moto única. Nuestros expertos te asesorarán en todo el proceso.",
    icon: <Check className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Financia tu Compra",
    description:
      "Ofrecemos múltiples opciones de financiamiento adaptadas a tus necesidades. Aprobación rápida y cuotas flexibles para hacer tu sueño realidad.",
    icon: <CreditCard className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Recibe tu Moto",
    description:
      "Entrega a domicilio o recogida en concesionario. Incluimos una sesión de orientación completa para que conozcas todas las características de tu nueva moto.",
    icon: <Truck className="h-10 w-10 text-red-600" />,
  },
]

// Efecto de desplazamiento suave entre secciones
const smoothScroll = (ref) => {
  if (ref.current) {
    window.scrollTo({
      top: ref.current.offsetTop - 80,
      behavior: "smooth",
    })
  }
}

// Componente de partículas para efectos visuales
const Particles = ({ className = "", quantity = 20 }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: quantity }).map((_, index) => (
        <div
          key={index}
          className="absolute h-2 w-2 rounded-full bg-red-500"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [selectedMoto, setSelectedMoto] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("Todas")
  const [showMotorcycle, setShowMotorcycle] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Referencias para scroll
  const heroRef = useRef(null)
  const catalogRef = useRef(null)
  const processRef = useRef(null)
  const aboutRef = useRef(null)
  const motorcycleRef = useRef(null)

  // Efecto para mostrar la moto con retraso
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMotorcycle(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Filtrar motos por tipo
  const filteredMotorcycles =
    selectedType === "Todas" ? motorcycles : motorcycles.filter((moto) => moto.type === selectedType)

  // Abrir modal con detalles de la moto
  const openMotoDetails = (moto) => {
    setSelectedMoto(moto)
    setIsModalOpen(true)
    setActiveImageIndex(0)
  }

  // Animaciones de scroll para la sección de proceso
  const { scrollYProgress, scrollY } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  // Animaciones para elementos que aparecen al hacer scroll
  const isProcessInView = useInView(processRef, { once: true, amount: 0.2 })
  const isCatalogInView = useInView(catalogRef, { once: true, amount: 0.1 })
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 })

  // Efecto de parallax para la moto y la imagen de about
  const motorcycleY = useTransform(scrollY, [0, 500], [0, 150])
  const motorcycleRotate = useTransform(scrollY, [0, 500], [0, 5])
  const aboutImgY = useTransform(scrollY, [0, 1000], [0, -50])

  // Imágenes de muestra para el modal (normalmente vendrían del backend)
  const sampleImages = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600&text=Vista+Lateral",
    "/placeholder.svg?height=400&width=600&text=Vista+Trasera",
    "/placeholder.svg?height=400&width=600&text=Vista+Detalle",
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <ScrollIndicator />

      <Navbar
        sections={[
          { name: "Inicio", ref: heroRef },
          { name: "Catálogo", ref: catalogRef },
          { name: "Proceso de Compra", ref: processRef },
          { name: "Nosotros", ref: aboutRef },
        ]}
      />

      {/* Hero Section mejorada con moto roja destacada */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
      >
        {/* Efecto de partículas */}
        <Particles quantity={30} />

        {/* Efecto de luz radial */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-3xl" />

        {/* Líneas de velocidad */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-full bg-white"
              style={{
                top: `${i * 5 + Math.random() * 5}%`,
                left: 0,
                transform: "rotate(-5deg)",
                opacity: Math.random() * 0.5 + 0.2,
                animation: `moveLines ${Math.random() * 3 + 2}s linear infinite`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 flex h-full flex-col items-start justify-center px-4 text-white">
          <div className="flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-2 rounded-full bg-red-600 px-4 py-1 text-sm font-medium uppercase tracking-wider"
              >
                Descubre la libertad
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              >
                POTENCIA <span className="text-red-600">&</span> PASIÓN
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8 max-w-xl text-xl text-gray-200 md:text-2xl"
              >
                Experimenta la adrenalina de conducir las motocicletas más exclusivas del mercado, diseñadas para
                quienes buscan rendimiento y estilo sin compromisos.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <Button
                  size="lg"
                  className="bg-red-600 text-lg hover:bg-red-700"
                  onClick={() => smoothScroll(catalogRef)}
                >
                  Explorar Modelos
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Agendar Prueba
                </Button>
              </motion.div>
            </div>

            {/* Moto roja destacada con animación */}
            <AnimatePresence>
              {showMotorcycle && (
                <motion.div
                  ref={motorcycleRef}
                  initial={{ opacity: 0, x: 200, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: 200 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 1.2,
                  }}
                  style={{
                    y: motorcycleY,
                    rotate: motorcycleRotate,
                  }}
                  className="relative mt-10 hidden h-[500px] w-[600px] lg:block"
                >
                  {/* 
                    IMPORTANTE: Reemplazar con una imagen real de moto roja sin fondo
                    Ejemplo: src="/images/red-motorcycle.png" 
                  */}
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Motocicleta deportiva roja"
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Efecto de resplandor detrás de la moto */}
                  <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/30 blur-3xl" />

                  {/* Efecto de sombra debajo de la moto */}
                  <div className="absolute bottom-0 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-full bg-black/40 blur-md" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Sección de Catálogo con tarjetas animadas mejoradas */}
      <section ref={catalogRef} className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCatalogInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
          >
            <div>
              <h2 className="text-center text-4xl font-bold sm:text-left sm:text-5xl">Nuestra Colección</h2>
              <p className="mt-2 max-w-2xl text-gray-600">
                Descubre nuestra selección de motocicletas premium para cada tipo de piloto
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrar por: {selectedType}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {motorcycleTypes.map((type) => (
                  <DropdownMenuItem key={type} onClick={() => setSelectedType(type)}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {/* Grid de Motocicletas con tarjetas animadas mejoradas */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMotorcycles.map((moto, index) => (
              <AnimatedCard
                key={moto.id}
                title={moto.name}
                image={moto.image || "/placeholder.svg?height=400&width=600"}
                description={moto.shortDescription}
                badge={moto.type}
                price={moto.price}
                specs={[
                  { label: "Motor", value: moto.engine },
                  { label: "Potencia", value: moto.power },
                ]}
                onClick={() => openMotoDetails(moto)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Proceso de Compra con animaciones mejoradas */}
      <section ref={processRef} className="bg-gray-50 py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold sm:text-5xl">Cómo Comprar Tu Moto</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Un proceso simple y transparente para que disfrutes de tu nueva motocicleta en tiempo récord
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {purchaseSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateY: 30 }}
                animate={isProcessInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  backgroundColor: "rgba(254, 242, 242, 0.2)", // Sutil tono rojo al hover
                }}
                className="relative rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 transition-all group-hover:bg-red-200">
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-red-300 lg:block">
                  <ArrowRight className="h-8 w-8" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <Button
              size="lg"
              className="bg-red-600 text-lg hover:bg-red-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="mr-2 h-4 w-4" /> Contactar Asesor
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sección Sobre Nosotros con efectos de parallax */}
      <section ref={aboutRef} className="py-20">
        <div className="container px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-bold sm:text-5xl">Pasión por las Dos Ruedas</h2>
              <p className="mb-6 text-lg text-gray-600">
                Con más de 15 años de experiencia en el mercado, nos hemos consolidado como líderes en la venta de
                motocicletas de alta gama. Nuestra pasión por las dos ruedas nos impulsa a ofrecer solo lo mejor a
                nuestros clientes.
              </p>
              <p className="mb-8 text-lg text-gray-600">
                Contamos con un equipo de expertos apasionados por el mundo de las motocicletas, listos para asesorarte
                y ayudarte a encontrar la moto perfecta que se adapte a tu estilo de vida y necesidades.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-red-600" />
                  <span>Garantía extendida en todos nuestros modelos</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-red-600" />
                  <span>Servicio técnico especializado</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-red-600" />
                  <span>Comunidad exclusiva de propietarios</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-red-600" />
                  <span>Eventos y rutas organizadas mensualmente</span>
                </li>
              </ul>
              <Button className="bg-red-600 hover:bg-red-700">Conoce Nuestra Historia</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] overflow-hidden rounded-xl lg:h-[500px]"
            >
              <motion.div className="absolute inset-0" style={{ y: aboutImgY }}>
                <Image src="/placeholder.svg?height=500&width=600" alt="Nuestro equipo" fill className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal de Detalles Mejorado */}
      <AnimatePresence>
        {isModalOpen && selectedMoto && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl overflow-hidden p-0 sm:rounded-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="relative"
              >
                {/* Botón de cierre personalizado */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-red-600"
                >
                  <X size={18} />
                </button>

                <div className="grid md:grid-cols-2">
                  {/* Sección de imágenes */}
                  <div className="relative flex h-full flex-col bg-black">
                    {/* Imagen principal */}
                    <div className="relative h-64 overflow-hidden md:h-[400px]">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-full"
                      >
                        <Image
                          src={sampleImages[activeImageIndex] || "/placeholder.svg"}
                          alt={selectedMoto.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>

                      {/* Overlay con gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Título superpuesto */}
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <motion.h2
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-3xl font-bold text-white"
                        >
                          {selectedMoto.name}
                        </motion.h2>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-2 flex items-center"
                        >
                          <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
                            {selectedMoto.type}
                          </span>
                          <span className="ml-3 text-xl font-bold text-red-400">
                            ${selectedMoto.price.toLocaleString()}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Miniaturas */}
                    <div className="flex gap-2 bg-black p-4">
                      {sampleImages.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className={`relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border-2 transition-all ${
                            activeImageIndex === index ? "border-red-600" : "border-transparent"
                          }`}
                          onClick={() => setActiveImageIndex(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Vista ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Sección de detalles */}
                  <div className="flex flex-col p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-semibold">Especificaciones</h3>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <span className="text-gray-600">Motor:</span>
                          <span className="font-medium">{selectedMoto.engine}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <span className="text-gray-600">Potencia:</span>
                          <span className="font-medium">{selectedMoto.power}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <span className="text-gray-600">Peso:</span>
                          <span className="font-medium">{selectedMoto.weight}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <span className="text-gray-600">Capacidad:</span>
                          <span className="font-medium">{selectedMoto.capacity}</span>
                        </div>
                        <div className="flex items-center justify-between pb-2">
                          <span className="text-gray-600">Velocidad Máxima:</span>
                          <span className="font-medium">{selectedMoto.maxSpeed}</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 text-gray-700"
                    >
                      {selectedMoto.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-auto pt-6"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Solicitar Información
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Agendar Prueba
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Estilos para animaciones */}
      <style jsx global>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes moveLines {
          0% {
            transform: translateX(100%) rotate(-5deg);
          }
          100% {
            transform: translateX(-100%) rotate(-5deg);
          }
        }
      `}</style>

      <Footer />
    </main>
  )
}
