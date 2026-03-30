"use client";

import { useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/56934592571?text=Hola%2C%20necesito%20asesor%C3%ADa%20legal%20por%20expropiaci%C3%B3n%20de%20mi%20propiedad";

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  comuna: string;
  tipoPropiedad: string;
  etapaProceso: string;
  descripcion: string;
}

const initialForm: FormData = {
  nombre: "",
  telefono: "",
  email: "",
  comuna: "",
  tipoPropiedad: "",
  etapaProceso: "",
  descripcion: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (form.nombre.trim().length < 2) {
      newErrors.nombre = "Ingresa tu nombre completo";
    }
    if (!/^(\+?56)?[0-9]{8,9}$/.test(form.telefono.replace(/\s/g, ""))) {
      newErrors.telefono = "Ingresa un teléfono válido";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Ingresa un email válido";
    }
    if (form.comuna.trim().length < 2) {
      newErrors.comuna = "Ingresa tu comuna o ciudad";
    }
    if (!form.tipoPropiedad) {
      newErrors.tipoPropiedad = "Selecciona un tipo de propiedad";
    }
    if (!form.etapaProceso) {
      newErrors.etapaProceso = "Selecciona la etapa del proceso";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Fire-and-forget to Google Sheets
    fetch(
      "https://script.google.com/macros/s/AKfycbzyUkJeHXdgFZ62_3luzUoD2fkZjJZMewKiLT_R-sF2M20vDeWT1-ox5Y0vLltw-wM8Ug/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          proyecto: "expropiacion",
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email,
          comuna: form.comuna,
          tipoPropiedad: form.tipoPropiedad,
          etapaProceso: form.etapaProceso,
          descripcion: form.descripcion,
        }),
      }
    ).catch(() => {});

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setIsSuccess(true);
        setForm(initialForm);
      }
    } catch {
      // silently fail, user can try WhatsApp
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  if (isSuccess) {
    return (
      <section id="formulario" className="py-16 sm:py-24 bg-bg-alt">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Recibimos Tu Caso
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Nuestros abogados revisarán tu información y te contactarán dentro
            de las próximas 24 horas con una evaluación inicial.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white text-lg font-bold px-8 py-4 rounded-full transition-all hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            O escríbenos por WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-16 sm:py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column: persuasive text */}
          <div className="lg:pt-8">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Contacto
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-6">
              Cuéntanos Tu Caso
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Completa el formulario y un abogado especialista evaluará tu
              situación sin costo. Mientras más detalles nos entregues, mejor
              podremos orientarte.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Evaluación inicial gratuita y sin compromiso",
                "Respuesta en menos de 24 horas",
                "Confidencialidad absoluta de tu información",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <p className="text-gray-600 text-sm mb-3">
                ¿Prefieres hablar directamente?
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escríbenos por WhatsApp
              </a>
              <p className="text-gray-500 text-xs mt-2">+56 9 3459 2571</p>
            </div>
          </div>

          {/* Right column: form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-danger text-sm mt-1">{errors.nombre}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.telefono && <p className="text-danger text-sm mt-1">{errors.telefono}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="text-danger text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="comuna" className="block text-sm font-medium text-gray-700 mb-1">
                  Comuna o ciudad *
                </label>
                <input
                  type="text"
                  id="comuna"
                  name="comuna"
                  value={form.comuna}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  placeholder="Ej: Santiago, Valparaíso"
                />
                {errors.comuna && <p className="text-danger text-sm mt-1">{errors.comuna}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="tipoPropiedad" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de propiedad *
                  </label>
                  <select
                    id="tipoPropiedad"
                    name="tipoPropiedad"
                    value={form.tipoPropiedad}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors bg-white"
                  >
                    <option value="">Selecciona</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="local">Local comercial</option>
                    <option value="parcela">Parcela / Terreno agrícola</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.tipoPropiedad && <p className="text-danger text-sm mt-1">{errors.tipoPropiedad}</p>}
                </div>

                <div>
                  <label htmlFor="etapaProceso" className="block text-sm font-medium text-gray-700 mb-1">
                    Etapa del proceso *
                  </label>
                  <select
                    id="etapaProceso"
                    name="etapaProceso"
                    value={form.etapaProceso}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors bg-white"
                  >
                    <option value="">Selecciona</option>
                    <option value="notificado">Recién notificado</option>
                    <option value="negociacion">En proceso de negociación</option>
                    <option value="acuerdo">Ya firmaron acuerdo</option>
                    <option value="recurso">Recurso pendiente</option>
                    <option value="no_seguro">No estoy seguro</option>
                  </select>
                  {errors.etapaProceso && <p className="text-danger text-sm mt-1">{errors.etapaProceso}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción breve del caso (opcional)
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
                  placeholder="Cuéntanos brevemente tu situación..."
                />
                <p className="text-gray-400 text-xs mt-1 text-right">
                  {form.descripcion.length}/500
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 rounded-full transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-primary/20"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mi Caso para Evaluación"}
              </button>

              <p className="text-gray-400 text-xs text-center">
                Tu información es confidencial y solo será utilizada para
                evaluar tu caso.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
