import cv2
import mediapipe as mp

BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

MODEL_PATH = "models/pose_landmarker.task"

# Landmark indices (same numbering as the old API)
LEFT_SHOULDER, RIGHT_SHOULDER = 11, 12
LEFT_HIP, RIGHT_HIP = 23, 24
LEFT_EAR, RIGHT_EAR = 7, 8


def _get_landmarks(image_path: str):
    """Runs MediaPipe's PoseLandmarker (Tasks API) on an image and returns landmarks, or None."""
    image = cv2.imread(image_path)
    if image is None:
        return None

    h, w, _ = image.shape
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)

    options = PoseLandmarkerOptions(
    base_options=BaseOptions(
        model_asset_path=MODEL_PATH,
        delegate=BaseOptions.Delegate.CPU,
    ),
    running_mode=VisionRunningMode.IMAGE,
)

    with PoseLandmarker.create_from_options(options) as landmarker:
        result = landmarker.detect(mp_image)

    if not result.pose_landmarks:
        return None

    # result.pose_landmarks is a list of detected poses; take the first person found
    pose = result.pose_landmarks[0]
    landmarks = {}
    for idx, lm in enumerate(pose):
        landmarks[idx] = (lm.x * w, lm.y * h, lm.visibility)
    return landmarks


def analyze_front_view(image_path: str):
    landmarks = _get_landmarks(image_path)
    if landmarks is None:
        return {"error": "No person detected in front-view image"}

    l_sh = landmarks[LEFT_SHOULDER]
    r_sh = landmarks[RIGHT_SHOULDER]
    l_hip = landmarks[LEFT_HIP]
    r_hip = landmarks[RIGHT_HIP]

    shoulder_tilt = abs(l_sh[1] - r_sh[1])
    hip_tilt = abs(l_hip[1] - r_hip[1])
    shoulder_width = abs(l_sh[0] - r_sh[0]) or 1

    shoulder_tilt_ratio = shoulder_tilt / shoulder_width
    hip_tilt_ratio = hip_tilt / shoulder_width

    notes = []
    if shoulder_tilt_ratio > 0.06:
        notes.append("Noticeable shoulder height asymmetry")
    if hip_tilt_ratio > 0.06:
        notes.append("Noticeable hip height asymmetry")

    return {
        "shoulder_tilt_ratio": round(shoulder_tilt_ratio, 3),
        "hip_tilt_ratio": round(hip_tilt_ratio, 3),
        "notes": notes,
    }


def analyze_side_view(image_path: str):
    landmarks = _get_landmarks(image_path)
    if landmarks is None:
        return {"error": "No person detected in side-view image"}

    ear = landmarks[LEFT_EAR] if landmarks[LEFT_EAR][2] > landmarks[RIGHT_EAR][2] else landmarks[RIGHT_EAR]
    shoulder = landmarks[LEFT_SHOULDER] if landmarks[LEFT_SHOULDER][2] > landmarks[RIGHT_SHOULDER][2] else landmarks[RIGHT_SHOULDER]
    hip = landmarks[LEFT_HIP] if landmarks[LEFT_HIP][2] > landmarks[RIGHT_HIP][2] else landmarks[RIGHT_HIP]

    torso_length = ((shoulder[0] - hip[0]) ** 2 + (shoulder[1] - hip[1]) ** 2) ** 0.5 or 1
    forward_head_offset = abs(ear[0] - shoulder[0]) / torso_length

    notes = []
    if forward_head_offset > 0.25:
        notes.append("Forward head posture detected")
    elif forward_head_offset > 0.15:
        notes.append("Mild forward head posture")

    return {
        "forward_head_offset": round(forward_head_offset, 3),
        "notes": notes,
    }


def calculate_posture_score(front_result: dict, side_result: dict) -> tuple[float, str]:
    score = 100.0
    all_notes = []

    if "error" in front_result:
        all_notes.append(front_result["error"])
    else:
        score -= front_result["shoulder_tilt_ratio"] * 100
        score -= front_result["hip_tilt_ratio"] * 100
        all_notes.extend(front_result["notes"])

    if "error" in side_result:
        all_notes.append(side_result["error"])
    else:
        score -= max(0, (side_result["forward_head_offset"] - 0.1)) * 150
        all_notes.extend(side_result["notes"])

    score = max(0, min(100, round(score, 1)))
    notes_text = "; ".join(all_notes) if all_notes else "No significant posture issues detected"

    return score, notes_text