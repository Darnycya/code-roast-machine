# 🔥 Code Roaster Machine

<img alt="screenshot" src="/public/screenshot.png">

An AI-powered code roasting app that analyzes your code, roasts it based on your chosen intensity, and gives you **actual actionable advice** — not just vibes.

Built with:
- ⚛️ React + TypeScript + Vite (frontend)
- 🟢 Express + Node.js (backend)
- 🤖 OpenAI API (structured JSON responses)

---

## ✨ Features

- 🧠 **AI Code Analysis** — Understands what your code is doing
- 🌍 **Language Awareness** — Detects if you selected the wrong language and roasts you for it
- 🔥 **Multiple Roast Modes**
  - **Gentle Mentor** – supportive, light roast
  - **Blunt Senior** – honest, no-nonsense feedback
  - **Tech Lead on Deadline** – you asked for chaos, you get chaos
- 📊 **Severity Score (1–10)** — how bad is it *really*
- 🧩 **Structured JSON Responses** — no string parsing hacks
- 🎨 **Animated UI** — roast points fade in with style

---

## 🧪 Roast Modes Explained

| Mode | Tone | Severity Range |
|----|----|----|
| Gentle Mentor | Encouraging, playful | 1–4 |
| Blunt Senior | Direct, sarcastic | 4–7 |
| Tech Lead on Deadline | Aggressive, impatient | 7–10 |

---

## 📦 API Request & Response

### Request (`POST /api/roast`)

```json
{
  "code": "const x = 1;",
  "language": "javascript",
  "roastMode": "mentor"
}
