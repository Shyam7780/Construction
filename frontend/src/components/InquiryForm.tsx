import { useState } from 'react';

export default function InquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service_type: 'with_material', area: 2500, message: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const generatedOtp = '482917'; // Simulated fixed OTP for demo

  const sendOtp = () => {
    if (!form.phone) return alert('Please enter phone number');
    setOtpSent(true);
    setOtp(generatedOtp);
    alert('OTP sent! Use code: ' + generatedOtp);
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setVerified(true);
      alert('Phone number verified successfully!');
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verified) return alert('Please verify your phone number first');
    
    setLoading(true);
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', service_type: 'with_material', area: 2500, message: '' });
      setOtpSent(false); setOtp(''); setEnteredOtp(''); setVerified(false);
    } else {
      alert('Submission failed');
    }
  };

  if (submitted) {
    return <div className="max-w-lg mx-auto text-center py-16"><div className="text-6xl mb-4">✓</div><h3 className="text-3xl font-semibold">Thank you!</h3><p className="mt-2 text-gray-600">Your inquiry has been received. Our team will contact you shortly.</p></div>;
  }

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <div className="text-[#f59e0b] text-sm tracking-[3px]">GET IN TOUCH</div>
        <h2 className="text-5xl font-semibold tracking-tight mt-2 text-[#1e3a5f]">Start Your Project Today</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border shadow-xl p-10 md:p-14 rounded-3xl space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border rounded-xl px-5 py-3.5" />
          <input required placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="border rounded-xl px-5 py-3.5" />
        </div>

        <div className="flex gap-3">
          <input required placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="flex-1 border rounded-xl px-5 py-3.5" />
          {!otpSent && <button type="button" onClick={sendOtp} className="px-8 bg-[#1e3a5f] text-white rounded-xl font-medium">Send OTP</button>}
        </div>

        {otpSent && !verified && (
          <div className="flex gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <input placeholder="Enter 6-digit OTP" value={enteredOtp} onChange={e => setEnteredOtp(e.target.value)} className="flex-1 border px-5 py-3 rounded-xl" />
            <button type="button" onClick={verifyOtp} className="px-9 bg-[#f59e0b] text-[#1e3a5f] font-semibold rounded-xl">Verify</button>
          </div>
        )}
        {verified && <div className="text-emerald-600 text-sm font-medium">✓ Phone verified successfully</div>}

        <div className="grid grid-cols-2 gap-6">
          <select value={form.service_type} onChange={e => setForm({ ...form, service_type: e.target.value })} className="border px-5 py-3.5 rounded-xl">
            <option value="labor_only">Labor Only</option>
            <option value="with_material">With Material</option>
            <option value="remodeling">Remodeling</option>
          </select>
          <input type="number" value={form.area} onChange={e => setForm({ ...form, area: parseInt(e.target.value) })} className="border px-5 py-3.5 rounded-xl" placeholder="Area (sq ft)" />
        </div>

        <textarea required placeholder="Tell us about your project..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full border rounded-2xl px-5 py-4" />

        <button disabled={!verified || loading} type="submit" className="w-full py-4 bg-[#1e3a5f] disabled:bg-gray-300 text-white font-semibold text-lg rounded-2xl transition">
          {loading ? 'Submitting...' : 'SUBMIT INQUIRY'}
        </button>
        <p className="text-center text-xs text-gray-500">OTP verification ensures we only receive legitimate inquiries.</p>
      </form>
    </section>
  );
}
