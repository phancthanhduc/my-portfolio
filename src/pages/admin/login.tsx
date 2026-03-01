import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('admin_token', data.token);
      navigate('/admin/settings');
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2a2a2a]">
      <div className="w-full max-w-md p-8 bg-[#333333] border border-[#525252] rounded-lg">
        <h1 className="text-2xl font-bold text-[#fafafa] mb-6 text-center">Admin Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#a1a1aa] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#525252] rounded text-[#fafafa] focus:outline-none focus:border-[#fbbf24]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#a1a1aa] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#525252] rounded text-[#fafafa] focus:outline-none focus:border-[#fbbf24]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#fbbf24] text-[#1a1a1a] font-medium rounded hover:bg-[#fbbf24]/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-[#a1a1aa] hover:text-[#fbbf24]">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
