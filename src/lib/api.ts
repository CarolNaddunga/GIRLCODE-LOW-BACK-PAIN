import { API_URL } from "./config";
import type { UserOut, Token, QuestionnaireCreate, AssessmentOut } from "./types";

const TOKEN_KEY = "posture_ai_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// Generic helper so every call doesn't repeat error handling
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, options);

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(errorBody.detail || "Request failed");
  }

  return res.json();
}

export async function register(email: string, password: string): Promise<UserOut> {
  return request<UserOut>("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email: string, password: string): Promise<Token> {
  const body = new URLSearchParams({ username: email, password });
  const data = await request<Token>("/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  setToken(data.access_token);
  return data;
}

export async function getCurrentUser(): Promise<UserOut> {
  return request<UserOut>("/me", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}

export async function submitQuestionnaire(data: QuestionnaireCreate): Promise<AssessmentOut> {
  return request<AssessmentOut>("/questionnaire", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
}

export async function listAssessments(): Promise<AssessmentOut[]> {
  return request<AssessmentOut[]>("/assessments", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}