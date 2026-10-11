# StudyBridge AI

**Multimodal AI Hackathon 2026 — Track D: Personalized Tutoring & Adaptive Learning**

StudyBridge AI is a privacy-first, lightweight personalized tutoring and adaptive learning web application optimized for Android and Termux. It empowers students to ingest lecture materials, ask grounded questions with traceable citations, take practice quizzes, and track per-topic mastery across sessions.

---

## Features Implemented
- **Study Dashboard:** Overview of ingested materials, average mastery, and grounding accuracy.
- **Learning Materials Library:** Ingestion manager supporting file uploads (`.txt`, `.md`, `.pdf`) and text pasting, preserving source page numbers and metadata.
- **Ask Your Tutor:** Grounded Q&A engine with traceable source citations and explicit handling of unsupported queries.
- **Practice Quiz:** Interactive multiple-choice quiz with automated evaluation and evidence-based feedback.
- **Learning Progress:** Real-time per-topic mastery tracking and evaluation metrics.
- **Automated Tests:** Comprehensive test suite covering assessment, learner model, retrieval grounding, and file uploads.

---

## Supported File Formats & Upload Limits
- **Plain Text (`.txt`)**: UTF-8 decoded text documents.
- **Markdown (`.md`)**: Structured markdown notes and documentation.
- **PDF Documents (`.pdf`)**: Automatically parsed page-by-page using `pypdf`, creating searchable chunks with accurate page number citations.
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
