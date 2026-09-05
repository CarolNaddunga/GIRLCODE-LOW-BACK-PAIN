import { useNavigate } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[880px] grid md:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] glass-deep">
        <div className="p-10 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-violet flex items-center justify-center">
              <Activity size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="display font-semibold text-lg">BakPose</span>
          </div>

          <h1 className="display text-3xl font-semibold mb-2">Welcome back</h1>
          <p className="text-ink-soft text-sm mb-8">Sign in to check in on your movement and pain trends.</p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink-soft">Email</span>
              <input
                type="email"
                defaultValue="carol@example.com"
                className="rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet/40"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink-soft">Password</span>
              <input
                type="password"
                defaultValue="••••••••"
                className="rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet/40"
              />
            </label>
            <button
              type="submit"
              className="mt-2 rounded-xl bg-violet text-white font-semibold py-3 text-sm shadow-[0_8px_20px_rgba(109,93,251,0.35)] hover:bg-violet-deep transition-colors"
            >
              Sign in
            </button>
          </form>
          <p className="text-xs text-ink-soft mt-6">This is a hackathon demo login — any details work.</p>
        </div>

        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-sky to-lav p-10">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6), transparent 55%)',
          }} />
          <div className="relative animate-breathe">
            <svg width="220" height="300" viewBox="0 0 220 300" fill="none">
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B7CFB" />
                  <stop offset="100%" stopColor="#6D5DFB" />
                </linearGradient>
              </defs>
              <ellipse cx="110" cy="45" rx="30" ry="34" fill="url(#bodyGrad)" opacity="0.9" />
              <rect x="80" y="80" width="60" height="110" rx="28" fill="url(#bodyGrad)" opacity="0.85" />
              <rect x="55" y="90" width="24" height="90" rx="12" fill="url(#bodyGrad)" opacity="0.7" />
              <rect x="141" y="90" width="24" height="90" rx="12" fill="url(#bodyGrad)" opacity="0.7" />
              <rect x="85" y="185" width="22" height="100" rx="11" fill="url(#bodyGrad)" opacity="0.75" />
              <rect x="113" y="185" width="22" height="100" rx="11" fill="url(#bodyGrad)" opacity="0.75" />
            </svg>
          </div>
          <p className="absolute bottom-8 left-10 right-10 text-center text-sm text-ink-soft">
            Understand your movement, not just your pain.
          </p>
        </div>
      </div>
    </div>
  )
}