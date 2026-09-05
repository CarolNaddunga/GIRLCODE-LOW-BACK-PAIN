import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, Image as ImageIcon } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { AssessmentProgress } from '../components/Layout'

export default function Upload() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  function onFile(file: File | undefined) {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  function onContinue() {
    navigate('/assessment/analyzing', { state: { imageUrl: preview } })
  }

  return (
    <div className="max-w-[720px]">
      <AssessmentProgress step={1} />
      <h1 className="display text-2xl font-semibold mb-1">Upload a photo</h1>
      <p className="text-ink-soft text-sm mb-8">
        A side-on, standing photo works best — we only use it to measure posture landmarks, nothing is stored beyond this session.
      </p>

      <GlassCard className="p-7">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />

        {!preview ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full rounded-2xl border-2 border-dashed border-violet/30 bg-white/40 py-16 flex flex-col items-center gap-3 hover:bg-white/60 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-violet/10 flex items-center justify-center">
              <UploadCloud size={24} className="text-violet-deep" />
            </div>
            <p className="text-sm font-medium">Click to choose a photo</p>
            <p className="text-xs text-ink-soft">JPG or PNG, standing side profile</p>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <img src={preview} alt="Upload preview" className="max-h-[360px] rounded-2xl object-contain" />
            <button onClick={() => inputRef.current?.click()} className="text-xs font-semibold text-violet-deep flex items-center gap-1.5">
              <ImageIcon size={14} /> Choose a different photo
            </button>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <button
            disabled={!preview}
            onClick={onContinue}
            className="rounded-xl bg-violet text-white font-semibold px-6 py-3 text-sm shadow-[0_8px_20px_rgba(109,93,251,0.35)] hover:bg-violet-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Analyze photo
          </button>
        </div>
      </GlassCard>
    </div>
  )
}