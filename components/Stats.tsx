const stats = [
  { number: "200+", label: "Casos de expropiación" },
  { number: "95%", label: "Clientes satisfechos" },
  { number: "15+", label: "Años de experiencia" },
  { number: "48h", label: "Primera respuesta" },
];

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-200/70 text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
