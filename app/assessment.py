"""
Assessment module for StudyBridge AI.
Generates practice questions (MCQ, short-answer) and evaluates responses
with evidence-based feedback.
"""

class AssessmentEngine:
    def __init__(self):
        self.questions = [
            {
                "id": "q1",
                "topic": "Multimodal AI",
                "type": "mcq",
                "prompt": "What role do cross-attention mechanisms play in Multimodal AI?",
                "options": [
                    "A) They compress video frames into audio streams.",
                    "B) They allow models to align visual regions with descriptive tokens.",
                    "C) They eliminate the need for training data.",
                    "D) They convert text directly to bytecode."
                ],
                "correct_answer": "B",
                "explanation": "Cross-attention mechanisms align visual regions with descriptive tokens in shared latent spaces."
            },
            {
                "id": "q2",
                "topic": "Learner Modeling",
                "type": "mcq",
                "prompt": "How is student mastery probability commonly tracked across sessions?",
                "options": [
                    "A) Random number generation",
                    "B) Bayesian Knowledge Tracing (BKT) or Item Response Theory (IRT)",
                    "C) Disk storage size calculation",
                    "D) Network ping latency"
                ],
                "correct_answer": "B",
                "explanation": "Learner modeling tracks mastery probability using frameworks like Bayesian Knowledge Tracing (BKT) or Item Response Theory (IRT)."
            },
            {
                "id": "q3",
                "topic": "Grounding & RAG",
                "type": "mcq",
                "prompt": "Why is grounding critical in educational retrieval-augmented generation?",
                "options": [
                    "A) To make responses longer",
                    "B) To ensure answers rely exclusively on retrieved context and prevent hallucinations",
                    "C) To increase server CPU usage",
                    "D) To encrypt student passwords"
                ],
                "correct_answer": "B",
                "explanation": "Grounding ensures generated answers rely exclusively on retrieved source chunks, preventing AI hallucinations."
            }
        ]

    def get_questions(self):
        # Return questions without correct answers for the client quiz interface
        return [{
            "id": q["id"],
            "topic": q["topic"],
            "type": q["type"],
            "prompt": q["prompt"],
            "options": q["options"]
        } for q in self.questions]

    def evaluate_quiz(self, user_answers):
        """
        Evaluate answers keyed by question ID.

        Missing, invalid, and non-string answers are treated as unanswered
        rather than causing an exception.
        """
        if not isinstance(user_answers, dict):
            raise ValueError("Answers must be a dictionary.")

        score = 0
        total = len(self.questions)
        feedback = []

        for q in self.questions:
            qid = q["id"]
            raw_answer = user_answers.get(qid, "")

            # Only accept a single option letter, A-D.
            if isinstance(raw_answer, str):
                user_ans = raw_answer.strip().upper()
                if len(user_ans) != 1 or user_ans not in "ABCD":
                    user_ans = ""
            else:
                user_ans = ""

            correct = user_ans == q["correct_answer"]

            if correct:
                score += 1

            feedback.append({
                "question_id": qid,
                "topic": q["topic"],
                "correct": correct,
                "user_answer": user_ans,
                "correct_answer": q["correct_answer"],
                "explanation": q["explanation"]
            })

        percentage = round((score / total) * 100, 1) if total else 0.0

        return {
            "score": score,
            "total": total,
            "percentage": percentage,
            "feedback": feedback
        }
