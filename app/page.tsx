import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import Method from "@/components/Method";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Defensa Propiedad - Abogados Expropiación Chile",
  description:
    "Abogados especialistas en defensa ante expropiación de propiedades en Chile. Reclamación de justa indemnización, impugnación del acto expropiatorio y representación legal.",
  telephone: "+56934592571",
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  serviceType: [
    "Defensa ante expropiación",
    "Reclamación de indemnización",
    "Impugnación de acto expropiatorio",
    "Asesoría en servidumbres",
    "Negociación de compensación",
    "Representación en juicio de expropiación",
  ],
  priceRange: "Evaluación inicial gratuita",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es la expropiación de propiedades en Chile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La expropiación es un acto mediante el cual el Estado obliga a un propietario a ceder su propiedad por causa de utilidad pública, a cambio de una indemnización. Está regulada por el Decreto Ley 2186 y la Constitución garantiza el derecho a una justa compensación.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tengo para reclamar una expropiación?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El plazo para reclamar el monto de la indemnización es de 30 días hábiles desde la publicación del acto expropiatorio en el Diario Oficial. Es fundamental actuar rápidamente para no perder este derecho.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo impugnar una expropiación en Chile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, puedes impugnar tanto la legalidad del acto expropiatorio como el monto de la indemnización ofrecida. Un abogado especialista puede evaluar si existen vicios en el procedimiento o si la compensación es injusta.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo se determina la indemnización por expropiación?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La indemnización debe cubrir el daño patrimonial efectivamente causado. Incluye el valor comercial del inmueble, el daño emergente y, en algunos casos, el lucro cesante. Si consideras que el monto ofrecido es insuficiente, puedes reclamar ante los tribunales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta contratar un abogado de expropiación?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ofrecemos una evaluación inicial gratuita de tu caso. Los honorarios dependen de la complejidad y pueden estructurarse de distintas formas, incluyendo honorarios de éxito vinculados al resultado obtenido.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si ya firmé un acuerdo de expropiación?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dependiendo de las circunstancias, aún podría haber opciones legales disponibles. Es importante que un abogado revise los términos del acuerdo y las condiciones en que fue firmado para determinar si procede alguna acción.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Method />
        <Stats />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
