"""
Tutor module for StudyBridge AI.
Answers student questions using retrieval results and traceable citations,
flagging unsupported questions honestly.
"""

class TutorEngine:
    def __init__(self, retrieval_engine):
        self.retrieval_engine = retrieval_engine

    def answer_question(self, query):
        if not query or not isinstance(query, str) or not query.strip():
            return {
                "answer": "I could not find sufficiently grounded information in the ingested course materials to answer this question reliably.",
                "supported": False,
                "citations": []
            }

        results = self.retrieval_engine.search(query, top_k=2)

        if not results or results[0]["score"] < 0.5:
            return {
                "answer": "I could not find sufficiently grounded information in the ingested course materials to answer this question reliably.",
                "supported": False,
                "citations": []
            }

        top_match = results[0]
        citations = [{
            "title": top_match["title"],
            "source": top_match["source"],
            "timestamp": top_match["timestamp"]
        }]

        answer_text = (
            f"Based on your course materials ({top_match['title']}, {top_match['source']}): "
            f"{top_match['content']}"
        )

        return {
            "answer": answer_text,
            "supported": True,
            "citations": citations
        }
