"use client";

import { useState } from "react";

const faqs = [
  {
    question: "¿Qué es la expropiación de propiedades en Chile?",
    answer:
      "La expropiación es un acto mediante el cual el Estado obliga a un propietario a ceder su propiedad por causa de utilidad pública, a cambio de una indemnización. Está regulada por el Decreto Ley 2186 y la Constitución garantiza el derecho a una justa compensación.",
  },
  {
    question: "¿Cuánto tiempo tengo para reclamar una expropiación?",
    answer:
      "El plazo para reclamar el monto de la indemnización es de 30 días hábiles desde la publicación del acto expropiatorio en el Diario Oficial. Es fundamental actuar rápidamente para no perder este derecho.",
  },
  {
    question: "¿Puedo impugnar una expropiación en Chile?",
    answer:
      "Sí, puedes impugnar tanto la legalidad del acto expropiatorio como el monto de la indemnización ofrecida. Un abogado especialista puede evaluar si existen vicios en el procedimiento o si la compensación es injusta.",
  },
  {
    question: "¿Cómo se determina la indemnización por expropiación?",
    answer:
      "La indemnización debe cubrir el daño patrimonial efectivamente causado. Incluye el valor comercial del inmueble, el daño emergente y, en algunos casos, el lucro cesante. Si consideras que el monto ofrecido es insuficiente, puedes reclamar ante los tribunales.",
  },
  {
    question: "¿Cuánto cuesta contratar un abogado de expropiación?",
    answer:
      "Ofrecemos una evaluación inicial gratuita de tu caso. Los honorarios dependen de la complejidad y pueden estructurarse de distintas formas, incluyendo honorarios de éxito vinculados al resultado obtenido.",
  },
  {
    question: "¿Qué pasa si ya firmé un acuerdo de expropiación?",
    answer:
      "Dependiendo de las circunstancias, aún podría haber opciones legales disponibles. Es importante que un abogado revise los términos del acuerdo y las condiciones en que fue firmado para determinar si procede alguna acción.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="preguntas" className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Preguntas Frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            Preguntas Frecuentes sobre Expropiación en Chile
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre el proceso de expropiación
            y tus derechos.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-bg-alt rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                aria-expanded={openIndex === index}
              >
                <span className="text-base sm:text-lg font-semibold text-primary pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-accent shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
