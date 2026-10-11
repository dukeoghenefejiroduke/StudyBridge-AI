# StudyBridge AI — 5-Minute Demonstration Script

**Competition:** Multimodal AI Hackathon 2026  
**Track:** Track D: Personalized Tutoring & Adaptive Learning  

---

## Overview & Timing (4m 45s total)

| Step | Section | Time | What to Show on Screen | What to Say | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Introduction | 0:00 - 0:30 | Title slide / Termux terminal | "Welcome to StudyBridge AI, a privacy-first, local personalized tutoring and adaptive learning web application optimized for Android and Termux in Multimodal AI Hackathon Track D." | Clear project overview and mobile optimization goals. |
| **2** | Dashboard | 0:30 - 1:00 | Study Dashboard tab | "Here is the Student Dashboard showing ingested study artifacts, average mastery, and grounding accuracy metrics in real-time." | Stats populate correctly from backend API. |
| **3** | Material Upload | 1:00 - 1:45 | Learning Materials tab | "Students can ingest lecture slides, textbooks, and notes via file upload (`.txt`, `.md`, `.pdf`) or text pasting, preserving page numbers and source metadata securely." | Server confirms successful ingestion and indexes document. |
| **4** | Grounded Q&A | 1:45 - 2:30 | Ask Your Tutor tab | "When a student asks a course-related question, the lexical retrieval engine searches indexed materials and provides a verifiable citation." | Tutor returns grounded answer with title and source citations. |
| **5** | Unsupported Refusal | 2:30 - 3:00 | Ask Your Tutor tab | "If a student asks an out-of-scope question, StudyBridge AI honestly flags it as unsupported rather than hallucinating an answer." | Tutor returns supported: false and polite refusal. |
| **6** | Adaptive Quiz | 3:00 - 3:45 | Practice Quiz tab | "Students take practice quizzes generated adaptively based on topic mastery, supporting optional topic scoping." | 3 valid MCQ questions are served without exposing answers. |
| **7** | Quiz Feedback | 3:45 - 4:10 | Quiz results view | "Upon submission, instant scoring, correctness feedback, explanations, and unlinked source status are displayed." | Score, percentage, and detailed feedback appear. |
| **8** | Learning Progress | 4:10 - 4:45 | Learning Progress tab | "The learner model updates topic mastery via exponential moving average, identifying weak areas and recommending study actions." | Per-topic mastery bars, proficiency status, and recommendations. |
| **9** | Evaluation & Wrap | 4:45 - 5:00 | Termux terminal (`pytest`) | "Running `python3 -m pytest -q` executes 66 automated tests successfully. Thank you!" | 66 passed in ~3.8s. |

---

## Troubleshooting During Demonstration
- **If server doesn't respond**: Verify Flask is running with `python3 -m app.main` and browse to `http://127.0.0.1:5000`.
- **If upload fails**: Ensure file size is under 5MB and extension is `.txt`, `.md`, or `.pdf`.
