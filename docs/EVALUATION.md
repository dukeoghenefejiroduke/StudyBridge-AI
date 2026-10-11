# StudyBridge AI — Evaluation

## 1. Purpose

StudyBridge AI is evaluated for functional correctness, retrieval-grounded tutoring, assessment reliability, learner-progress tracking, and personalized study recommendations.

The current evaluation combines automated software tests with a small, predefined tutoring benchmark.

## 2. Automated software tests

Run the test suite from the repository root:

    python3 -m pytest -q

The current baseline is 29 passing tests. Rerun the suite after code changes and update this document if the results change.

The tests cover:
- Core application behavior and API routes.
- Quiz scoring, answer normalization, and invalid inputs.
- Retrieval grounding and unsupported questions.
- Learner mastery updates.
- Text and document uploads.
- Study recommendation priorities and matching materials.

Passing tests establishes correctness only for the cases exercised. It does not prove that every possible input or real-world learning scenario works correctly.

## 3. Tutoring benchmark

The evaluation module currently contains three predefined questions covering:

1. Cross-attention in multimodal AI.
2. Student mastery tracking.
3. Grounding and hallucination reduction.

For each question, the evaluator records whether the tutor marks its response as supported and whether the answer contains a predefined expected phrase.

A case passes when both checks succeed.

Benchmark accuracy is the percentage of cases passing both checks. The grounding score is the fraction of benchmark responses marked as supported by the tutoring engine.

These are small, implementation-specific measurements. They are not independent assessments of factual correctness, comprehensive retrieval-quality measures, or evidence of general model accuracy.

Keyword matching may reject correct answers that use different wording. It may also accept an answer containing the expected phrase without explaining it correctly.

## 4. Learner modeling and recommendations

Learner progress is tracked by topic using quiz results and a persistent local progress file. Recommendations prioritize topics according to recorded mastery and can include matching indexed study materials.

Automated tests check representative mastery updates, recommendation ordering, priority labels, matching materials, empty retrieval results, and bounded mastery percentages.

These tests verify selected software behaviors. They do not establish that mastery estimates accurately measure a student's understanding or that recommendations improve learning outcomes.

## 5. Grounding and unsupported questions

The tutoring engine uses locally indexed course materials to retrieve evidence for answers. When sufficiently relevant evidence is unavailable, the intended behavior is to acknowledge that the available materials do not support a reliable answer rather than invent a source.

Grounding tests exercise representative supported and unsupported queries. They do not guarantee that every answer is correct or that every unsupported question will be detected.

## 6. Current limitations

- The tutoring benchmark contains only three predefined questions.
- Expected-phrase matching is a limited measure of answer relevance.
- Retrieval uses local lexical matching rather than semantic embeddings.
- Scanned PDFs and image-only documents are not interpreted using OCR.
- Mastery scores are application estimates, not validated educational measurements.
- No controlled user study has established improvements in learning outcomes.
- Results depend on the quality and coverage of indexed materials.

## 7. Future evaluation improvements

Future work should include:
- A larger benchmark with independently reviewed expected answers.
- Relevant, irrelevant, and unsupported questions across multiple topics.
- Checks that citations correspond to retrieved evidence.
- Retrieval precision and recall measurements on a labeled dataset.
- Tests for malformed requests, empty documents, and unusual file inputs.
- User testing focused on mobile usability and learning workflows.
