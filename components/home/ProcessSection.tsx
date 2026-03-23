"use client";

import { motion } from "framer-motion";
import { ChevronRight, Check, CreditCard, Truck } from "lucide-react";

const purchaseSteps = [
  {
    title: "Elige tu Moto",
    description:
      "Explora nuestro catálogo y encuentra la motocicleta perfecta para ti.",
    icon: <ChevronRight className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Personaliza tu Experiencia",
    description: "Selecciona accesorios y opciones para hacer tu moto única.",
    icon: <Check className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Financia tu Compra",
    description: "Múltiples opciones de financiamiento con aprobación rápida.",
    icon: <CreditCard className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Recibe tu Moto",
    description:
      "Entrega a domicilio o recogida en concesionario con orientación completa.",
    icon: <Truck className="h-10 w-10 text-red-600" />,
  },
];

interface ProcessSectionProps {
  isInView?: boolean;
  onContact?: () => void;
}

/**
 * Sección del proceso de compra
 */
export function ProcessSection({
  isInView = false,
  onContact,
}: ProcessSectionProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">
              Cómo Comprar Tu Moto
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Un proceso simple y transparente para que disfrutes de tu nueva
              motocicleta en tiempo récord
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {purchaseSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                type: "spring",
                stiffness: 80,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="relative rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 5,
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="mt-12 flex justify-center">
            <button
              onClick={onContact}
              className="rounded-lg bg-red-600 px-8 py-3 text-lg font-semibold text-white hover:bg-red-700 transition-colors hover:scale-105 active:scale-95"
            >
              Contactar Asesor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
