import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import backPainImg from '../assets/Back-Pain.jpg'

export default function Login() {
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[880px] grid md:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] border border-line">
        <div className="p-10 md:p-12 flex flex-col justify-center bg-paper">
          <div className="mb-10">
            <Logo />
          </div>

          <h1 className="display text-3xl font-semibold mb-2">Welcome back</h1>
          <p className="text-ink-soft text-sm mb-8">Sign in to check in on your movement and pain trends.</p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink-soft">Email</span>
              <input
                type="email"
                defaultValue="carol@example.com"
                className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet/40 focus:bg-paper"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink-soft">Password</span>
              <input
                type="password"
                defaultValue="password123"
                className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet/40 focus:bg-paper"
              />
            </label>
            <button
              type="submit"
              className="mt-2 rounded-xl bg-violet text-white font-semibold py-3 text-sm shadow-[0_8px_20px_rgba(109,93,251,0.35)] hover:bg-violet-deep transition-colors"
            >
              Sign in
            </button>
          </form>
          <p className="text-xs text-ink-soft mt-6">Forgot your password? .</p>
        </div>

        <div className="hidden md:flex flex-col gap-5 items-center justify-center bg-canvas p-10">
          <img
  src={backPainImg}
  alt="Illustration highlighting the lower spine, where back pain is felt"
  className="w-full aspect-[4/5] object-cover rounded-2xl"
/>
          <p className="text-sm text-ink-soft text-center max-w-[260px]">
            Understand your movement, not just your pain.
          </p>
        </div>
      </div>
    </div>
  )
}