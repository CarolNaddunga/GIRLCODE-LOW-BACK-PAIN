import { ImagePlus } from 'lucide-react'

// Honest placeholder for a real photo/illustration that hasn't been dropped
// in yet — swap the className/label per spot, or replace with a real
// <img src="..."> once assets exist.
export function ImagePlaceholder({
  label,
  className = '',
  compact = false,
}: {
  label: string
  className?: string
  compact?: boolean
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-violet/35 bg-violet-tint text-center ${
        compact ? 'p-4' : 'p-8'
      } ${className}`}
    >
      <ImagePlus size={compact ? 18 : 22} className="text-violet-deep/60" strokeWidth={1.75} />
      <span className={`font-medium text-violet-deep/60 leading-snug ${compact ? 'text-[11px]' : 'text-xs max-w-[200px]'}`}>
        {label}
      </span>
    </div>
  )
}