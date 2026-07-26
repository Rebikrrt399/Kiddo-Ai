import OpenAI from "openai";

// Server-only. Never import this file from a client component.
// Requires OPENAI_API_KEY in your environment (see .env.example).
let client: OpenAI | null = null;

export function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}
