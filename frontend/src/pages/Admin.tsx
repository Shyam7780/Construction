import { useState } from 'react';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // हमारे Node.js बैकएंड (Port 5000) पर डेटा भेज रहे हैं
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: title, 
          description: description, 
          budget: Number(budget) 
        }),
      });

      if (response.ok) {
        alert('🎉 कंस्ट्रक्शन प्रोजेक्ट सफलतापूर्वक MongoDB में सेव हो गया!');
        // फॉर्म को वापस खाली करने के लिए
        setTitle('');
        setDescription('');
        setBudget('');
      } else {
        alert('❌ डेटा सेव करने में कोई दिक्कत आई।');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ सर्वर से कनेक्ट नहीं हो पा रहा है।');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add New Construction Project</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <input 
          type="text" 
          placeholder="Project Title (e.g., 2-BHK House Construction)" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ padding: '0.5rem' }}
        />
        
        <textarea 
          placeholder="Project Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ padding: '0.5rem', minHeight: '100px' }}
        />
        
        <input 
          type="number" 
          placeholder="Estimated Budget (₹)" 
          value={budget} 
          onChange={(e) => setBudget(e.target.value)} 
          style={{ padding: '0.5rem' }}
        />
        
        <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Save Project to Database
        </button>

      </form>
    </div>
  );
}