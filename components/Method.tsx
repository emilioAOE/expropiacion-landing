const steps = [
  {
    number: "01",
    title: "Completa el Formulario",
    description:
      "Cuéntanos tu caso completando el formulario o escríbenos por WhatsApp. Necesitamos conocer los detalles básicos de tu situación.",
  },
  {
    number: "02",
    title: "Evaluación Gratuita",
    description:
      "Nuestros abogados analizan tu caso sin costo. Revisamos la notificación, plazos y la legislación aplicable a tu expropiación.",
  },
  {
    number: "03",
    title: "Estrategia Legal Personalizada",
    description:
      "Diseñamos un plan de acción a tu medida. Te explicamos las opciones, costos y plazos de forma clara y transparente.",
  },
  {
    number: "04",
    title: "Defensa de Tu Propiedad",
    description:
      "Ejecutamos la estrategia legal: negociación, reclamación o juicio. Te acompañamos hasta obtener la mejor compensación posible.",
  },
];

export default function Method() {
  return (
    <section id="proceso" className="py-16 sm:py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Cómo Trabajamos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            Cómo Funciona Nuestro Proceso
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Un proceso claro y transparente para defender tu propiedad paso a
            paso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-accent to-accent/20 -translate-x-4" />
              )}
              <div className="text-5xl font-black text-accent/20 mb-3">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#formulario"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white text-lg font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-primary/30"
          >
            Comienza Tu Evaluación Gratis
          </a>
        </div>
      </div>
    </section>
  );
}
