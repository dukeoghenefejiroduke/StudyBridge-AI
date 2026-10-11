# StudyBridge AI - Architecture & Implementation Status

## Overview
StudyBridge AI is designed for **Multimodal AI Hackathon 2026, Track D: Personalized Tutoring & Adaptive Learning**. It provides a lightweight, local, privacy-first web application optimized for Android / Termux, empowering students to ingest lecture materials, ask grounded questions with source citations, practice adaptive quizzes, and track topic mastery across sessions.

---

## Implemented Features (Stage 1)
1. **Flask Web Application (`app/main.py`)**:
   - Lightweight Python backend serving API endpoints and frontend dashboard.
2. **Student Dashboard & UI (`app/templates/index.html`, `app/static/style.css`, `app/static/app.js`)**:
   - Modern, responsive single-page application with tabs for Dashboard, Learning Materials, Ask Your Tutor, Practice Quiz, and Learning Progress.
3. **Document Ingestion & Source Tracking (`app/ingestion.py`)**:
   - Ingests lecture slides, textbooks, and notes while preserving source locations (page numbers, slide numbers, video timestamps).
4. **Retrieval & Grounded Q&A Tutor (`app/retrieval.py`, `app/tutor.py`)**:
   - Keyword and content retrieval engine providing verifiable source citations and explicitly flagging unsupported/ungrounded questions.
5. **Practice Quiz & Assessment (`app/assessment.py`)**:
   - Interactive MCQ quiz generation and evaluation with immediate evidence-based feedback and explanations.
6. **Adaptive Learner Modeling (`app/learner_model.py`)**:
   - Tracks per-topic mastery probability across sessions, updating status (Proficient, Developing, Needs Review).
7. **System Evaluation (`app/evaluation.py`)**:
   - Runs a three-question tutoring benchmark that checks supported-response flags and expected phrases. This is a small implementation-specific benchmark, not a comprehensive measurement of retrieval precision, recall, or factual accuracy.
8. **Automated Unit Tests (`tests/`)**:
   - Pytest test suites covering assessment evaluation, learner mastery updates, and grounding/retrieval accuracy.
9. **Termux & Mobile Documentation (`README.md`, `docs/ARCHITECTURE.md`)**:
   - Clear installation, dependency setup, and startup commands.

---

## Pending / Future Enhancements
- **Advanced OCR & Vision Models**: Direct ingestion of scanned PDF textbooks and raw lecture video frames using local OCR (e.g. Tesseract).
- **Vector Embeddings & Semantic Search**: Integration of lightweight local embedding models (e.g., SentenceTransformers) for semantic retrieval.
- **Advanced Bayesian Knowledge Tracing (BKT)**: Fine-grained probabilistic modeling of individual knowledge components over time.
