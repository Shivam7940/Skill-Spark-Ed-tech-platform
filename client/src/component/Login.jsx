import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0B1120]">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0B1120] flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center text-[#0B1120] font-bold text-lg">
              ⚡
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">Skill Spark</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-serif text-white leading-tight mb-4">
            Welcome back. Your next skill is one lesson away.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Pick up right where you left off and keep building momentum.
          </p>
        </div>

        <div className="relative z-10 flex gap-8 text-slate-400 text-sm">
          <div>
            <p className="text-2xl font-semibold text-white">12k+</p>
            <p>Learners</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">180+</p>
            <p>Courses</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">4.8★</p>
            <p>Avg rating</p>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-950">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-[#0B1120] font-bold">
              ⚡
            </div>
            <span className="text-white font-semibold text-lg">Skill Spark</span>
          </div>

          <h2 className="text-2xl font-serif text-white mb-1">Log in to your account</h2>
          <p className="text-slate-400 text-sm mb-8">Good to see you again.</p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1.5">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-amber-400 text-[#0B1120] font-semibold hover:bg-amber-300 active:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="text-slate-400 text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;