import type { ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 md:px-10 py-8 max-w-[1280px] mx-auto w-full">{children}</main>
    </div>
  )
}

const steps = ['Tell us', 'Upload', 'Analyzing', 'Results', 'Plan']

export function AssessmentProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1">
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-1.5 rounded-full overflow-hidden bg-canvas">
              <div
                className="h-full rounded-full bg-violet transition-all duration-700"
                style={{ width: i <= step ? '100%' : '0%' }}
              />
            </div>
            <span className={`text-[11px] font-medium ${i <= step ? 'text-violet-deep' : 'text-ink-soft'}`}>{s}</span>
          </div>
        </div>
      ))}
    </div>
  )
}