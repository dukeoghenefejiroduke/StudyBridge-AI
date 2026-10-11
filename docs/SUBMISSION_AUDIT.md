# StudyBridge AI — Hackathon Track D Submission Audit

**Competition:** Multimodal AI Hackathon 2026  
**Track:** Track D: Personalized Tutoring & Adaptive Learning  
**Project:** StudyBridge AI (Privacy-First Local Personalized Tutoring & Adaptive Learning Web Application)

---

## 1. Track D Compliance Matrix

| Track D Requirement | Current Implementation Evidence | Status | Relevant File or Test | Remaining Work |
| :--- | :--- | :--- | :--- | :--- |
| **A. Multimodal Knowledge Base** | | | | |
| Lecture video ingestion | Video transcript notes, source, and timestamp metadata storage. | **Partial** | `app/ingestion.py` | Direct video file decoding and timestamp frame extraction. |
| Textbook ingestion | Ingestion of `.txt`, `.md`, and `.pdf` files with text extraction. | **Implemented** | `app/ingestion.py`, `tests/test_upload.py` | Advanced layout parsing for complex multi-column textbooks. |
| Slide ingestion | Ingestion of slide notes and slide page documents. | **Implemented** | `app/ingestion.py` | Direct PowerPoint (`.pptx`) file parser. |
| Topic & concept organization | Predefined topics across Multimodal AI, Learner Modeling, and Grounding & RAG. | **Partial** | `app/assessment.py`, `app/learner_model.py` | Automated topic classifier for unstructured notes. |
| Prerequisite relationships | Implicit topic structure; no explicit prerequisite graph. | **Missing** | N/A | Explicit prerequisite knowledge graph mapping. |
| Image & diagram understanding | Scanned PDFs and image-only files are flagged as containing no extractable text. | **Missing / Unsupported** | `app/ingestion.py`, `tests/test_upload.py` | Local OCR (e.g. Tesseract) and multimodal vision models. |
| Source-linked content locations | Preserves filenames, source titles, page numbers, and timestamps. | **Implemented** | `app/ingestion.py`, `app/retrieval.py` | Finer paragraph/line offset tracking. |
| **B. Source Grounding** | | | | |
| Retrieval of relevant material | Normalized keyword and token lexical retrieval engine. | **Implemented** | `app/retrieval.py`, `tests/test_grounding.py` | Semantic vector embedding search (e.g. SentenceTransformers). |
| Exact source/page/slide references | Citations reference exact source document titles, sources, and page metadata. | **Implemented** | `app/tutor.py`, `app/retrieval.py` | Precise bounding-box or span highlighting. |
| Unsupported-question handling | Explicit flagging of unsupported queries with honest refusal responses. | **Implemented** | `app/tutor.py`, `tests/test_core.py` | Expanded query intent classification. |
| Separation of outside knowledge | Responses explicitly distinguish retrieved course material from ungrounded queries. | **Implemented** | `app/tutor.py`, `tests/test_grounding.py` | Strict external knowledge gating. |
| **C. Adaptive Assessment** | | | | |
| Multiple Choice Questions (MCQs) | 12-question MCQ bank across three topics with difficulty metadata. | **Implemented** | `app/assessment.py`, `tests/test_adaptive_assessment.py` | Expansion of question bank to 50+ questions. |
| Short-answer questions | Not implemented. | **Missing** | N/A | NLP short-answer grading pipeline. |
| Numerical questions | Not implemented. | **Missing** | N/A | Numerical tolerance grading parser. |
| User-selected topic scope | Optional `?topic=` query parameter filters quiz selection. | **Implemented** | `app/assessment.py`, `app/main.py`, `tests/test_adaptive_assessment.py` | Multi-select topic scope UI checkboxes. |
| Difficulty metadata | Difficulty levels (`easy`, `medium`, `hard`) assigned to questions. | **Implemented** | `app/assessment.py` | Dynamic item response difficulty scaling. |
| Correctness checking | Secure server-side evaluation against question bank answer keys. | **Implemented** | `app/assessment.py`, `tests/test_assessment.py` | Additional partial-credit grading logic. |
| Avoidance of repeated questions | Prefers unseen questions; falls back to least recently seen. | **Implemented** | `app/assessment.py`, `tests/test_adaptive_assessment.py` | Advanced spaced repetition scheduling. |
| Source-cited feedback | Feedback includes explanations and source status (`unlinked` or cited). | **Implemented** | `app/assessment.py` | Linking assessment questions to uploaded materials. |
| Weak-topic recommendations | Identifies lowest-mastery topics and recommends targeted study actions. | **Implemented** | `app/main.py`, `tests/test_recommendations.py` | Automated re-quizzing on missed concepts. |
| **D. Learner Model** | | | | |
| Topic mastery | Per-topic mastery tracked on a 0.0–1.0 probability scale using EMA. | **Implemented** | `app/learner_model.py`, `tests/test_learner_model.py` | Bayesian Knowledge Tracing (BKT) probabilistic modeling. |
| Mastery updates after assessments | Quiz submissions update topic mastery and session counts. | **Implemented** | `app/learner_model.py`, `app/main.py` | Granular sub-concept mastery tracking. |
| Adaptation to individual state | Adaptive quiz selection prioritizes weak topics. | **Implemented** | `app/assessment.py` | Personalized study path generation. |
| Diagnostic intake | Default initial mastery heuristics; no onboarding quiz intake. | **Missing** | N/A | Initial diagnostic placement quiz. |
| Explicit learner model | Persistent local state tracking mastery, sessions, and status. | **Implemented** | `app/learner_model.py` | Multi-user encrypted learner database. |
| **E. Evaluation** | | | | |
| Defined test set | Predefined tutoring benchmark and personalization simulation profiles. | **Implemented** | `app/evaluation.py`, `app/personalization_evaluation.py` | Expanded benchmark test suite with 50+ queries. |
| Retrieval metrics | Accuracy percentage and grounding score reported. | **Implemented** | `app/evaluation.py` | Precision@k, Recall@k, and MRR metrics. |
| Grounding and refusal metrics | Supported response rate and unsupported refusal rate. | **Implemented** | `app/evaluation.py` | Automated refusal benchmark coverage. |
| Assessment evaluation | Automated unit tests covering quiz generation, scoring, and edge cases. | **Implemented** | `tests/test_assessment.py`, `tests/test_adaptive_assessment.py` | Psychometric item analysis. |
| Multi-session simulated profiles | Deterministic simulation across multiple student profiles and sessions. | **Implemented** | `app/personalization_evaluation.py`, `tests/test_personalization_evaluation.py` | Real student beta testing. |
| Reproducible results | 66 automated tests passing in ~3.8 seconds. | **Implemented** | `tests/` | CI/CD automated test pipeline. |
| Honest limitations | Documented limitations regarding lexical retrieval and simulation estimates. | **Implemented** | `docs/EVALUATION.md` | User study validation of learning gains. |
| **F. Deliverables** | | | | |
| Working prototype | Fully functional Flask application with responsive mobile UX. | **Implemented** | `app/main.py`, `app/templates/`, `app/static/` | Native mobile application wrapper (e.g. Capacitor). |
| Documentation | Comprehensive README, Architecture guide, and Evaluation document. | **Implemented** | `README.md`, `docs/` | Video demonstration recording. |
| Evaluation report | Documented benchmark and simulation results. | **Implemented** | `docs/EVALUATION.md` | Independent external audit. |
| Demonstration readiness | Step-by-step verification checklist available. | **Implemented** | `docs/SUBMISSION_AUDIT.md` | Live hosted public deployment (optional). |

---

## 2. Demonstration Checklist

1. **Launch the Application**: Run `python3 -m app.main` in Termux and open `http://127.0.0.1:5000`.
2. **View Dashboard**: Observe ingestion stats, average mastery, and evaluation summary.
3. **Upload Material**: Navigate to **Learning Materials**, upload a `.txt` or `.md` study notes file, and verify success status.
4. **Ask Tutor (Supported)**: Navigate to **Ask Your Tutor**, ask a question answered by the material, and verify grounded response with citations.
5. **Ask Tutor (Unsupported)**: Ask an ungrounded or out-of-scope question, and verify honest refusal response.
6. **Take Practice Quiz**: Navigate to **Practice Quiz** (optionally filtering by topic), answer questions, submit, and review score, feedback, and explanations.
7. **Review Learning Progress**: Navigate to **Learning Progress** to inspect per-topic mastery scores, proficiency status, session counts, and weak-topic study recommendations.
8. **Run Evaluation & Tests**: Execute `python3 -m pytest -q` to confirm all 66 automated tests pass successfully.
