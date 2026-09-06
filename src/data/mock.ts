export const user = {
  name: 'Carol',
  firstName: 'Carol',
  occupation: 'Data Entry Clerk',
  streakDays: 6,
}

export const vitals = {
  trunkAngle: { label: 'Trunk angle', value: 14, unit: '°', status: 'mild', note: 'Slight forward lean on sitting' },
  hipAlignment: { label: 'Hip alignment', value: 92, unit: '%', status: 'good', note: 'Within normal symmetry range' },
  symmetry: { label: 'Body symmetry', value: 88, unit: '%', status: 'good', note: 'Minor left-right shift' },
  muscleTension: { label: 'Muscle tension', value: 61, unit: '%', status: 'watch', note: 'Reported tightness, lower right' },
}

export const painTrend = [
  { day: 'Mon', pain: 6 },
  { day: 'Tue', pain: 5 },
  { day: 'Wed', pain: 5 },
  { day: 'Thu', pain: 4 },
  { day: 'Fri', pain: 4 },
  { day: 'Sat', pain: 3 },
  { day: 'Sun', pain: 3 },
]

export const recentScans = [
  { id: 1, date: 'Today, 8:12 AM', concern: 'Forward trunk lean', severity: 'mild' },
  { id: 2, date: 'Yesterday', concern: 'Hip asymmetry, minor', severity: 'good' },
  { id: 3, date: '3 days ago', concern: 'Lower right tightness', severity: 'watch' },
]

export const insights = [
  'Your trunk angle has improved 3° since last week — keep it up.',
  'Sitting for long stretches still seems to trigger your reported pain.',
  'Try the desk-break routine before your next long meeting.',
]

export const symptomChips = [
  'Lower back', 'Upper back', 'Left side', 'Right side', 'Radiates to leg',
  'Worse sitting', 'Worse standing', 'Worse bending', 'Morning stiffness', 'Recent lifting',
]

export const recommendations = [
  {
    id: 'r1',
    tier: 'exercise',
    title: 'Pelvic Tilt',
    reason: 'Targets your forward trunk lean and eases lower-back load.',
    duration: '3 sets x 12 reps',
    difficulty: 'Beginner',
  },
  {
    id: 'r2',
    tier: 'exercise',
    title: 'Cat-Cow Stretch',
    reason: 'Improves spinal mobility given your reported morning stiffness.',
    duration: '2 min flow',
    difficulty: 'Beginner',
  },
  {
    id: 'r3',
    tier: 'exercise',
    title: 'Knee to Chest',
    reason: 'Relieves lower right tightness picked up in your scan.',
    duration: '3 sets x 10 reps',
    difficulty: 'Beginner',
  },
  {
    id: 'r4',
    tier: 'guidance',
    title: 'Desk break routine',
    reason: 'Prolonged sitting is your most consistent pain trigger.',
    duration: 'Every 45 min',
    difficulty: 'Habit',
  },
  {
    id: 'r5',
    tier: 'referral',
    title: 'Physiotherapy check-in',
    reason: 'Recommended if pain persists past 2 weeks despite exercises.',
    duration: 'As needed',
    difficulty: 'Professional',
  },
]

export const exerciseInstructions: Record<string, string> = {
  'Pelvic Tilt':
    'Lie on your back, knees bent. Gently flatten your lower back against the floor by tightening your stomach muscles, hold 5 seconds, then release.',
  'Cat-Cow Stretch':
    'Start on hands and knees. Inhale, drop your belly and lift your chest and tailbone (cow). Exhale, round your spine toward the ceiling, tucking chin and tailbone (cat). Move slowly between the two.',
  'Knee to Chest':
    'Lie on your back with both knees bent. Pull one knee toward your chest with both hands, holding gently for a few seconds, keeping your lower back flat on the floor, then switch legs.',
  'Desk break routine':
    'Stand up, place your hands on your lower back, and gently lean backward for a few seconds. Follow with a couple of side-to-side torso stretches before sitting back down.',
}