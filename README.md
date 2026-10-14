# StudyBridge AI

**Multimodal AI Hackathon 2026 — Track D: Personalized Tutoring & Adaptive Learning**

StudyBridge AI is a privacy-first, lightweight personalized tutoring and adaptive learning web application optimized for Android and Termux. It empowers students to ingest lecture materials (Text, Markdown, PDFs, and PowerPoint slides), ask grounded questions with traceable citations, take dynamic adaptive practice quizzes, listen to audio tutor explanations, and track per-topic mastery with historical sparklines across sessions.

---

## Features Implemented
- **Study Dashboard:** Overview of ingested materials, average mastery, grounding accuracy, and dark/light theme toggle.
- **Learning Materials Library:** Ingestion manager supporting file uploads (`.txt`, `.md`, `.pdf`, `.pptx`) and text pasting, preserving source page, slide numbers, and metadata.
- **Ask Your Tutor:** Grounded Q&A engine with traceable source citations, explicit handling of unsupported queries, and Web Speech API text-to-speech audio read-aloud (`🔊 Listen`).
- **Practice Quiz & Dynamic MCQ Generation:** Interactive multiple-choice quiz with automated evaluation, spaced repetition scheduling, and automatic MCQ generation from uploaded study materials.
- **Learning Progress & Analytics:** Real-time per-topic mastery tracking, proficiency status, historical mastery trend sparklines, and weak-topic study recommendations.
- **Automated Tests:** Comprehensive test suite covering assessment, learner model, history tracking, retrieval grounding, and secure file uploads (**69 tests passing**).

---

## Supported File Formats & Upload Limits
- **Plain Text (`.txt`)**: UTF-8 decoded text documents.
- **Markdown (`.md`)**: Structured markdown notes and documentation.
- **PDF Documents (`.pdf`)**: Automatically parsed page-by-page using `pypdf`, creating searchable chunks with accurate page number citations.
- **PowerPoint Presentations (`.pptx`)**: Automatically parsed slide-by-slide using native XML and archive inspection, creating slide citations without external binary dependencies.
- **Upload Size Limit**: Maximum 5 MB per file.

---

## Known Limitations
- **Scanned PDFs & Images**: Scanned PDFs, images, charts, and diagrams without selectable text layers cannot be automatically extracted and will be flagged as containing no extractable text.
- **Local Lexical Retrieval**: Retrieval relies on robust local keyword and substantive token matching rather than cloud LLM embeddings.

---

## Installation & Startup on Termux (Android)

Follow these exact commands in Termux to install dependencies and run StudyBridge AI:

```bash
# 1. Update packages and install Python & pip (if not already installed)
pkg update && pkg install python git -y

# 2. Navigate to the project directory
cd ~/StudyBridge-AI

# 3. Install Python requirements (Flask, Pytest, pypdf)
pip install -r requirements.txt

# 4. Run the Flask web application
python3 -m app.main
```

Open your mobile browser and navigate to:
`http://127.0.0.1:5000`

---

## Running Tests

To run the automated test suite:

```bash
python3 -m pytest
```

## AI Assistance Disclosure

ChatGPT was used as an AI coding assistant during development to help
review code, troubleshoot errors, improve tests, and refine documentation.
The project author is responsible for reviewing, testing, and understanding
the submitted implementation.

The current application uses local Python logic for document retrieval,
tutoring responses, quiz evaluation, and learner-progress tracking. It does
not currently call a hosted generative-AI model API at runtime.
