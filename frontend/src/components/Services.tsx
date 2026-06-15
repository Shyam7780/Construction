import { HardHat, Package, Hammer } from 'lucide-react';

const services = [
  {
    icon: HardHat,
    title: "Labor Only",
    subtitle: "Structure & Plastering",
    desc: "Expert craftsmanship focused strictly on preparing the structure and professional plastering.",
    color: "bg-amber-100 text-amber-700"
  },
  {
    icon: Package,
    title: "With Material",
    subtitle: "Full Turnkey Construction",
    desc: "Complete construction including premium materials. Choose from Basic, Standard, or Premium packages.",
    color: "bg-blue-100 text-blue-700"
  },
  {
    icon: Hammer,
    title: "Remodeling",
    subtitle: "Renovation & Upgrades",
    desc: "Transform existing spaces with full renovation services, modern finishes, and quality craftsmanship.",
    color: "bg-emerald-100 text-emerald-700"
  }
];

export default function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <div className="text-[#f59e0b] text-sm tracking-[3px] font-medium mb-3">WHAT WE OFFER</div>
        <h2 className="text-5xl font-semibold tracking-tight text-[#1e3a5f]">Expert Construction Services</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="card-hover bg-white border p-9 rounded-3xl group">
            <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8`}>
              <service.icon size={32} />
            </div>
            <h3 className="text-3xl font-semibold tracking-tight mb-1 text-[#1e3a5f]">{service.title}</h3>
            <p className="text-[#f59e0b] font-medium mb-4">{service.subtitle}</p>
            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
