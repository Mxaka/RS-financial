import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', idNumber: '', role: 'client' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}${endpoint}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      // Save session
      localStorage.setItem('rs_user', JSON.stringify(data.user));
      localStorage.setItem('rs_token', data.token);
      localStorage.setItem('policyNumber', data.user.policyNumber || 'RS-8849201-P');

      // Redirect by role
      if (data.user.role === 'admin' || data.user.role === 'employee') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    } catch (err) {
      // Fallback demo if no backend
      if (!isSignup && form.email === 'client@rs.com' && form.password === '123456') {
        const demoUser = { name: 'Unathi', email: form.email, role: 'client', policyNumber: 'RS-8849201-P' };
        localStorage.setItem('rs_user', JSON.stringify(demoUser));
        localStorage.setItem('policyNumber', demoUser.policyNumber);
        navigate('/client');
      } else if (!isSignup && form.email === 'admin@rs.com' && form.password === 'admin123') {
        const demoUser = { name: 'Thandi', email: form.email, role: 'admin', policyNumber: 'ADM-001' };
        localStorage.setItem('rs_user', JSON.stringify(demoUser));
        navigate('/admin');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>RS-Financial</h1>
        <p style={styles.sub}>Create & Preserve Wealth</p>

        <div style={styles.toggle}>
          <button onClick={() => setIsSignup(false)} style={{...styles.toggleBtn, ...( !isSignup ? styles.toggleActive : {})}}>Sign In</button>
          <button onClick={() => setIsSignup(true)} style={{...styles.toggleBtn, ...( isSignup ? styles.toggleActive : {})}}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignup && (
            <>
              <input style={styles.input} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
              <input style={styles.input} name="idNumber" placeholder="SA ID / Passport" value={form.idNumber} onChange={handleChange} required />
              <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
                <option value="client">Client</option>
                <option value="employee">Employee / Broker</option>
              </select>
            </>
          )}
          <input style={styles.input} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input style={styles.input} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.btn} type="submit">{isSignup ? 'Create Account' : 'Sign In'}</button>
        </form>

        <div style={styles.demoBox}>
          <small style={{color: '#71717a'}}>Demo logins:<br/>client@rs.com / 123456 → client dashboard<br/>admin@rs.com / admin123 → admin dashboard</small>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#050505', display: 'grid', placeItems: 'center', fontFamily: 'Inter, sans-serif' },
  card: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2.5rem', width: '380px', maxWidth: '90vw' },
  title: { margin: 0, color: '#fff', fontWeight: '800', fontSize: '1.8rem', textAlign: 'center' },
  sub: { color: '#FF6B00', textAlign: 'center', fontSize: '0.85rem', marginTop: '0.3rem', marginBottom: '1.2rem' },
  toggle: { display: 'flex', background: '#0A0A0A', borderRadius: '999px', padding: '4px', marginBottom: '1.2rem' },
  toggleBtn: { flex: 1, padding: '0.6rem', borderRadius: '999px', border: 'none', background: 'transparent', color: '#71717a', fontWeight: '700', cursor: 'pointer' },
  toggleActive: { background: '#FF6B00', color: '#000' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.9rem' },
  input: { padding: '0.9rem 1.1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: '#0A0A0A', color: '#fff', outline: 'none' },
  btn: { padding: '0.9rem', borderRadius: '999px', border: 'none', background: '#FF6B00', color: '#000', fontWeight: '800', cursor: 'pointer', marginTop: '0.4rem' },
  error: { color: '#ef4444', fontSize: '0.8rem', margin: 0, textAlign: 'center' },
  demoBox: { marginTop: '1rem', padding: '0.7rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', textAlign: 'center' }
};

export default Login;