import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface Testimonial { id: number; name: string; email?: string; rating: number; feedback: string; }

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({ name: '', email: '', rating: 5, feedback: '' });
  const [submitted, setSubmitted] = useState(false);

  const fetchTestimonials = () => fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);

  useEffect(() => { fetchTestimonials(); }, []);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSubmitted(true);
    setForm({ name: '', email: '', rating: 5, feedback: '' });
    setTimeout(() => { setSubmitted(false); fetchTestimonials(); }, 1400);
  };

  return (
    <section id="testimonials" className="bg-[#f8f9fb] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-[#f59e0b] text-sm tracking-[3px]">CLIENT VOICES</div>
          <h2 className="text-5xl font-semibold tracking-tight mt-2">Real Stories. Real Results.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white p-9 rounded-3xl border">
              <div className="flex gap-1 mb-5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="fill-[#f59e0b] text-[#f59e0b]" size={19} />)}</div>
              <p className="text-xl leading-snug">"{t.feedback}"</p>
              <div className="mt-8 text-sm font-medium">— {t.name}</div>
            </div>
          ))}
        </div>

        <div className="max-w-lg mx-auto">
          <div className="text-center mb-5 font-medium">Share Your Experience</div>
          {submitted ? <div className="text-center py-8 text-emerald-600 font-medium">Thank you for your review!</div> : (
            <form onSubmit={submitReview} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required value={form.name} placeholder="Your Name" onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-5 py-3.5 border rounded-2xl" />
                <input required type="email" value={form.email} placeholder="Your Email" onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-5 py-3.5 border rounded-2xl" />
              </div>
              <select value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} className="w-full px-5 py-3.5 border rounded-2xl">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
              <textarea required placeholder="Your feedback..." value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} rows={3} className="w-full px-5 py-3.5 border rounded-2xl" />
              <button type="submit" className="w-full py-4 bg-[#1e3a5f] text-white font-semibold rounded-2xl">Submit Review</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
