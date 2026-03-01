import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Settings {
  gemini_api_key?: string;
}

export function AdminSettings() {
  const [, setSettings] = useState<Settings>({});
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const res = await fetch('/api/admin/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
        return;
      }

      const data = await res.json();
      setSettings(data);
      if (data.gemini_api_key) {
        setApiKey(data.gemini_api_key);
      }
    } catch {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string, value: string) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key, value })
      });

      if (res.ok) {
        setMessage('Saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save');
      }
    } catch {
      setMessage('Error saving');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2a2a2a]">
        <div className="text-[#a1a1aa]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      {/* Header */}
      <header className="bg-[#333333] border-b border-[#525252] px-8 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#fafafa]">Admin Settings</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-[#a1a1aa] hover:text-[#fbbf24] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-8">
        <div className="space-y-6">
          {/* Gemini API Key */}
          <div className="bg-[#333333] border border-[#525252] rounded-lg p-6">
            <h2 className="text-lg font-medium text-[#fafafa] mb-2">Gemini API Key</h2>
            <p className="text-sm text-[#a1a1aa] mb-4">
              Enter your Google Gemini API key. Get it from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fbbf24] hover:underline"
              >
                Google AI Studio
              </a>
            </p>

            <div className="flex gap-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key..."
                className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-[#525252] rounded text-[#fafafa] placeholder-[#71717a] focus:outline-none focus:border-[#fbbf24]"
              />
              <button
                onClick={() => handleSave('gemini_api_key', apiKey)}
                disabled={saving}
                className="px-6 py-2 bg-[#fbbf24] text-[#1a1a1a] font-medium rounded hover:bg-[#fbbf24]/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>

            {message && (
              <p className={`mt-2 text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-[#333333] border border-[#525252] rounded-lg p-6">
            <h2 className="text-lg font-medium text-[#fafafa] mb-2">Quick Links</h2>
            <div className="flex gap-4">
              <a
                href="/"
                className="text-[#fbbf24] hover:underline"
              >
                View Portfolio →
              </a>
              <a
                href="/admin/login"
                className="text-[#fbbf24] hover:underline"
              >
                Login Page →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminSettings;
