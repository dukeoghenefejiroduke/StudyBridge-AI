"""
Unit tests for Learner Model in StudyBridge AI.
"""

import pytest
from app.learner_model import LearnerModel

def test_learner_model_progress():
    model = LearnerModel(data_dir="data/test_processed")
    progress = model.get_progress()
    assert "Multimodal AI" in progress
    assert "mastery" in progress["Multimodal AI"]
    assert "status" in progress["Multimodal AI"]

def test_learner_model_update():
    model = LearnerModel(data_dir="data/test_processed")
    quiz_results = {
        "feedback": [
            {"topic": "Multimodal AI", "correct": True},
            {"topic": "Multimodal AI", "correct": True}
        ]
    }
    updated = model.update_mastery("Multimodal AI", quiz_results)
    assert updated["mastery"] > 0.0
