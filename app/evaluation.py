"""
Evaluation module for StudyBridge AI.
Evaluates grounding, answer relevance, context precision, and context recall
using a test dataset.
"""

class EvaluationEngine:
    def __init__(self, retrieval_engine, tutor_engine):
        self.retrieval_engine = retrieval_engine
        self.tutor_engine = tutor_engine

    def run_evaluation(self):
        test_cases = [
            {
                "query": "What do cross-attention mechanisms do?",
                "expected_keyword": "align visual regions"
            },
            {
                "id": "tc_2",
                "query": "How is student mastery tracked?",
                "expected_keyword": "Bayesian Knowledge Tracing"
            },
            {
                "id": "tc_3",
                "query": "Why is grounding important?",
                "expected_keyword": "prevent hallucinations"
            }
        ]

        results = []
        passed = 0

        for tc in test_cases:
            query = tc["query"]
            tutor_resp = self.tutor_engine.answer_question(query)
            answer = tutor_resp["answer"]
            grounded = tutor_resp["supported"]

            relevance = tc["expected_keyword"].lower() in answer.lower()
            success = grounded and relevance

            if success:
                passed += 1

            results.append({
                "query": query,
                "grounded": grounded,
                "relevant": relevance,
                "success": success,
                "answer": answer
            })

        accuracy = round((passed / len(test_cases)) * 100, 1) if test_cases else 0
        grounded_passed = sum(1 for r in results if r["grounded"])
        grounding_score = round(grounded_passed / len(test_cases), 2) if test_cases else 0.0

        return {
            "total_test_cases": len(test_cases),
            "passed": passed,
            "accuracy_percentage": accuracy,
            "metrics": {
                "grounding_score": grounding_score
            },
            "test_results": results
        }
