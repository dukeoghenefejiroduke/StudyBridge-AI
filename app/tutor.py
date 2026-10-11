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

        # Thoroughly search every single document in the entire Ingested Library
        all_docs = self.retrieval_engine.ingestion_manager.get_all_documents()
        top_k = max(len(all_docs), 10) if all_docs else 10

        results = self.retrieval_engine.search(query, top_k=top_k)

        # Include all relevant matches meeting the threshold across the entire library
        relevant_matches = [r for r in results if r.get("score", 0.0) >= 0.4]

        if not relevant_matches:
            return {
                "answer": "I could not find sufficiently grounded information in the ingested course materials to answer this question reliably.",
                "supported": False,
                "citations": []
            }

        citations = []
        synthesized_parts = []
        seen_citations = set()

        for match in relevant_matches:
            citation_key = (match.get("title"), match.get("source"))
            if citation_key not in seen_citations:
                seen_citations.add(citation_key)
                citations.append({
                    "title": match.get("title", "Untitled material"),
                    "source": match.get("source", "N/A"),
                    "timestamp": match.get("timestamp")
                })
            synthesized_parts.append(
                f"From {match.get('title', 'Material')} ({match.get('source', 'N/A')}): {match.get('content', '')}"
            )

        answer_text = "Based on a thorough, exhaustive search of your entire Ingested Library:\n\n" + "\n\n".join(synthesized_parts)

        return {
            "answer": answer_text,
            "supported": True,
            "citations": citations
        }
