import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision'

let landmarkerPromise: Promise<PoseLandmarker> | null = null

// Loads the MediaPipe Pose Landmarker once and reuses it for every image.
// Runs entirely in the browser - no backend round trip for the CV step.
function getLandmarker() {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      )
      return PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
          delegate: 'GPU',
        },
        runningMode: 'IMAGE',
        numPoses: 1,
      })
    })()
  }
  return landmarkerPromise
}

export type MovementReadings = {
  trunkAngleDeg: number
  hipAlignmentPct: number
  symmetryPct: number
}

// Landmark indices per the MediaPipe Pose model (33-point BlazePose topology).
const L = {
  leftShoulder: 11,
  rightShoulder: 12,
  leftHip: 23,
  rightHip: 24,
  leftKnee: 25,
  rightKnee: 26,
}

function angleFromVertical(ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax
  const dy = by - ay
  const radians = Math.atan2(dx, -dy)
  return Math.abs((radians * 180) / Math.PI)
}

export async function analyzeImage(image: HTMLImageElement): Promise<MovementReadings> {
  const landmarker = await getLandmarker()
  const result = landmarker.detect(image)
  const points = result.landmarks?.[0]

  if (!points) {
    // No pose detected - caller falls back to a neutral reading.
    return { trunkAngleDeg: 0, hipAlignmentPct: 0, symmetryPct: 0 }
  }

  const midShoulderX = (points[L.leftShoulder].x + points[L.rightShoulder].x) / 2
  const midShoulderY = (points[L.leftShoulder].y + points[L.rightShoulder].y) / 2
  const midHipX = (points[L.leftHip].x + points[L.rightHip].x) / 2
  const midHipY = (points[L.leftHip].y + points[L.rightHip].y) / 2

  const trunkAngleDeg = angleFromVertical(midHipX, midHipY, midShoulderX, midShoulderY)

  const hipTilt = Math.abs(points[L.leftHip].y - points[L.rightHip].y)
  const hipAlignmentPct = Math.max(0, 100 - hipTilt * 400)

  const leftSide = Math.hypot(
    points[L.leftShoulder].x - points[L.leftHip].x,
    points[L.leftShoulder].y - points[L.leftHip].y
  )
  const rightSide = Math.hypot(
    points[L.rightShoulder].x - points[L.rightHip].x,
    points[L.rightShoulder].y - points[L.rightHip].y
  )
  const symmetryPct = 100 - (Math.abs(leftSide - rightSide) / Math.max(leftSide, rightSide)) * 100

  return {
    trunkAngleDeg: Math.round(trunkAngleDeg),
    hipAlignmentPct: Math.round(hipAlignmentPct),
    symmetryPct: Math.round(symmetryPct),
  }
}