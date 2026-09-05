import type { ReactNode } from 'react'

export function GlassCard({
  children,
  className = '',
  deep = false,
}: {
  children: ReactNode
  className?: string
  deep?: boolean
}) {
  return (
    <div className={`${deep ? 'glass-deep' : 'glass'} rounded-3xl ${className}`}>
      {children}
    </div>
  )
}

const statusStyle: Record<string, string> = {
  good: 'bg-[#e6f7f1] text-[#1f8c6c]',
  mild: 'bg-[#fef3e2] text-[#b3760f]',
  watch: 'bg-[#fdeceb] text-[#c94a3f]',
}

export function StatusPill({ status, children }: { status: 'good' | 'mild' | 'watch'; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}