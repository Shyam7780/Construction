import { useEffect, useState } from 'react';

interface Project {
  id: number; title: string; description: string; image_url: string; location: string; completion_date: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(setProjects);
  }, []);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="text-[#f59e0b] text-sm tracking-[3px]">FEATURED WORK</div>
          <h2 className="text-5xl font-semibold tracking-tight text-[#1e3a5f]">Signature Projects</h2>
        </div>
        <a href="#contact" className="hidden md:block text-sm font-medium underline">View all projects →</a>
      </div>

      <div className="grid md:grid-cols-3 gap-7">
        {projects.map(p => (
          <div key={p.id} className="card-hover group overflow-hidden rounded-3xl border bg-white">
            <div className="relative h-80 overflow-hidden">
              <img 
                src={p.image_url} 
                alt={p.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-white text-sm font-medium tracking-wider">{p.location}</div>
              </div>
              <div className="absolute top-4 right-4 px-4 py-1 bg-white/95 text-[#1e3a5f] text-xs font-semibold tracking-widest rounded">
                {p.completion_date}
              </div>
            </div>
            
            <div className="p-7">
              <div className="font-semibold text-[21px] tracking-[-0.4px] text-[#1e3a5f] leading-tight mb-3">{p.title}</div>
              <p className="text-gray-600 text-[15px] leading-snug mb-5 line-clamp-3">{p.description}</p>
              
              <div className="flex items-center justify-between text-sm pt-4 border-t">
                <div>
                  <span className="font-medium text-[#f59e0b]">4,200</span> 
                  <span className="text-gray-400 ml-1">sq ft</span>
                </div>
                <div className="text-[#1e3a5f] font-medium">View Details →</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
