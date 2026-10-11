"""
Unit tests for Grounding and Retrieval in StudyBridge AI.
"""

import pytest
from app.ingestion import IngestionManager
from app.retrieval import RetrievalEngine
from app.tutor import TutorEngine

def test_retrieval_and_tutor():
    ingestion = IngestionManager(data_dir="data/test_processed")
    retrieval = RetrievalEngine(ingestion)
    tutor = TutorEngine(retrieval)

    response = tutor.answer_question("cross-attention mechanisms")
    assert response["supported"] == True
    assert len(response["citations"]) > 0

    unsupported = tutor.answer_question("quantum gravity warp drive rocket")
    assert unsupported["supported"] == False
