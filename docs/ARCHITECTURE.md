# StudyBridge AI - Architecture & Implementation Status

## Overview
StudyBridge AI is designed for **Multimodal AI Hackathon 2026, Track D: Personalized Tutoring & Adaptive Learning**. It provides a lightweight, local, privacy-first web application optimized for Android / Termux, empowering students to ingest lecture materials, ask grounded questions with source citations, practice adaptive quizzes, listen to audio tutor explanations, and track topic mastery with historical sparklines across sessions.

---

## Implemented Features
1. **Flask Web Application (`app/main.py`)**:
   - Lightweight Python backend serving API endpoints and frontend dashboard.
2. **Student Dashboard & UI (`app/templates/index.html`, `app/static/style.css`, `app/static/app.js`)**:
   - Modern, responsive single-page application with tabs for Dashboard, Learning Materials, Ask Your Tutor, Practice Quiz, and Learning Progress, featuring Dark/Light theme toggle and Web Speech API audio read-aloud.
3. **Document Ingestion & Source Tracking (`app/ingestion.py`)**:
   - Ingests lecture slides (`.pptx`), textbooks (`.pdf`), notes (`.txt`, `.md`) while preserving source locations (page numbers, slide numbers, video timestamps), automatically parsing PowerPoint slide XML structures without external dependencies.
4. **Retrieval & Grounded Q&A Tutor (`app/retrieval.py`, `app/tutor.py`)**:
   - Keyword and content retrieval engine providing verifiable source citations and explicitly flagging unsupported/ungrounded questions.
5. **Practice Quiz & Dynamic Assessment (`app/assessment.py`)**:
   - Interactive MCQ quiz generation and evaluation with immediate evidence-based feedback, spaced repetition scheduling, and automatic dynamic MCQ generation from uploaded study documents.
6. **Adaptive Learner Modeling (`app/learner_model.py`)**:
   - Tracks per-topic mastery probability across sessions, updating status (Proficient, Developing, Needs Review) and maintaining historical progression arrays for SVG sparkline charts.
7. **System Evaluation (`app/evaluation.py`)**:
   - Runs a three-question tutoring benchmark that checks supported-response flags and expected phrases.
8. **Automated Unit Tests (`tests/`)**:
   - Pytest test suites (**69 tests passing**) covering assessment evaluation, topic scope filtering, learner mastery updates, history tracking, grounding/retrieval accuracy, and secure file uploads.
9. **Termux & Mobile Documentation (`README.md`, `docs/ARCHITECTURE.md`)**:
   - Clear installation, dependency setup, and startup commands.

---

## Future Enhancements
- **Advanced OCR & Vision Models**: Direct ingestion of scanned PDF textbooks and raw lecture video frames using local OCR (e.g. Tesseract).
- **Vector Embeddings & Semantic Search**: Integration of lightweight local embedding models (e.g., SentenceTransformers) for semantic retrieval.
