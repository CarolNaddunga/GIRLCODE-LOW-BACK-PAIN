// Mirrors schemas.py — keep these in sync if the backend changes

export interface UserOut {
  id: number;
  email: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface QuestionnaireCreate {
  pain_level: number;
  pain_location: string;
  pain_duration: string;
  sitting_hours_per_day: number;
  exercise_frequency: string;
  occupation_type: string;
}

export interface AssessmentOut {
  id: number;
  pain_level: number;
  pain_location: string;
  pain_duration: string;
  sitting_hours_per_day: number;
  exercise_frequency: string;
  occupation_type: string;
  front_image_path: string | null;
  side_image_path: string | null;
  posture_score: number | null;
  posture_notes: string | null;
  recommendation: string | null;
}