import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 className="h1" style={{ color: 'var(--brand)', marginBottom: '8px' }}>SAFAR</h1>
          <p className="body">Welcome back, traveler</p>
        </div>

        {error && (
          <div className="error-box">
            {error}
            <button onClick={clearError} className="material-icons" style={{ fontSize: '14px', marginLeft: '8px' }}>close</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com"
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="premium-btn" disabled={isLoading} style={{ width: '100%', marginTop: '12px' }}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p className="body" style={{ fontSize: '14px' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--brand)', fontWeight: 700 }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
