import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  // "सुरक्षा गार्ड": पेज खुलते ही चेक करेगा कि आप लॉगिन हैं या नहीं
  useEffect(() => {
    const token = localStorage.getItem('token'); // लॉगिन के समय जो टोकन आपने सेव किया था
    if (!token) {
      alert('⚠️ आप लॉगिन नहीं हैं! पहले लॉगिन करें।');
      navigate('/login'); // अगर टोकन नहीं है, तो लॉगिन पेज पर भेज दो
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // ध्यान दें: यहाँ localhost के बजाय अब हम VITE_API_URL का उपयोग करेंगे
      const apiBaseUrl = import.meta.env.VITE_API_URL; 
      
      const response = await fetch(`${apiBaseUrl}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // सुरक्षा: टोकन साथ भेज रहे हैं
        },
        body: JSON.stringify({ 
          title, 
          description, 
          budget: Number(budget) 
        }),
      });

      if (response.ok) {
        alert('🎉 प्रोजेक्ट सेव हो गया!');
        setTitle('');
        setDescription('');
        setBudget('');
      } else {
        alert('❌ सेव करने में दिक्कत आई (शायद टोकन एक्सपायर हो गया है)।');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ सर्वर से कनेक्ट नहीं हो पा रहा है।');
    }
  };

  // बाकी का फॉर्म वाला कोड वैसा ही रहेगा...
  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add New Construction Project</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '0.5rem' }} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '0.5rem', minHeight: '100px' }} />
        <input type="number" placeholder="Budget (₹)" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ padding: '0.5rem' }} />
        <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Save Project to Database
        </button>
      </form>
    </div>
  );
}