document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    loadDashboardData();
    loadMaterials();
    loadProgress();
    setupUploadForm();
    setupFileUploadForm();
    setupTutorForm();
});

function setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            switchTab(targetId);
        });
    });
}

function switchTab(targetId) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-section").forEach(s => s.classList.remove("active"));

    const activeBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
    const activeSection = document.getElementById(targetId);

    if (activeBtn) activeBtn.classList.add("active");
    if (activeSection) activeSection.classList.add("active");

    const titles = {
        "dashboard-section": "Study Dashboard",
        "materials-section": "Learning Materials Library",
        "tutor-section": "Ask Your AI Tutor",
        "quiz-section": "Practice Quiz & Assessment",
        "progress-section": "Learning Progress & Analytics"
    };
    document.getElementById("page-title").textContent = titles[targetId] || "StudyBridge AI";

    if (targetId === "progress-section") {
        loadProgress();
    }
}

async function loadDashboardData() {
    try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        document.getElementById("stat-docs").textContent = data.document_count;

        const progressValues = Object.values(data.progress || {});
        if (progressValues.length > 0) {
            const avg = Math.round(progressValues.reduce((acc, curr) => acc + curr.mastery, 0) / progressValues.length * 100);
            document.getElementById("stat-mastery").textContent = `${avg}%`;
        }

        if (data.evaluation_summary && typeof data.evaluation_summary.accuracy_percentage === "number") {
            document.getElementById("stat-grounding").textContent = `${data.evaluation_summary.accuracy_percentage}%`;
        }
    } catch (e) {
        console.error("Failed to load dashboard data", e);
    }
}

async function loadMaterials() {
    try {
        const res = await fetch("/api/materials");
        const data = await res.json();
        const listContainer = document.getElementById("materials-list");
        listContainer.innerHTML = "";

        data.documents.forEach(doc => {
            const item = document.createElement("div");
            item.className = "material-item";

            const infoDiv = document.createElement("div");
            infoDiv.className = "material-info";

            const h4 = document.createElement("h4");
            h4.textContent = `${doc.title} (${doc.type ? doc.type.toUpperCase() : 'NOTES'})`;

            const p = document.createElement("p");
            p.textContent = `Source: ${doc.source || 'N/A'}${doc.timestamp ? ' | Timestamp: ' + doc.timestamp : ''}`;

            const small = document.createElement("small");
            const snippet = doc.content ? doc.content.substring(0, 100) : "";
            small.textContent = `${snippet}...`;

            infoDiv.appendChild(h4);
            infoDiv.appendChild(p);
            infoDiv.appendChild(small);
            item.appendChild(infoDiv);
            listContainer.appendChild(item);
        });
    } catch (e) {
        console.error("Failed to load materials", e);
    }
}

function setupUploadForm() {
    const form = document.getElementById("upload-form");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const payload = {
            title: document.getElementById("doc-title").value,
            type: document.getElementById("doc-type").value,
            source: document.getElementById("doc-source").value,
            timestamp: document.getElementById("doc-timestamp").value,
            content: document.getElementById("doc-content").value
        };

        try {
            const res = await fetch("/api/materials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                form.reset();
                loadMaterials();
                loadDashboardData();
                alert("Document successfully ingested and indexed!");
            }
        } catch (err) {
            console.error("Upload failed", err);
            alert("Failed to ingest document.");
        }
    });
}

function setupFileUploadForm() {
    const form = document.getElementById("file-upload-form");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("upload-file");
        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        formData.append("title", document.getElementById("file-doc-title").value);
        formData.append("type", document.getElementById("file-doc-type").value);
        formData.append("source", document.getElementById("file-doc-source").value);
        formData.append("timestamp", document.getElementById("file-doc-timestamp").value);

        try {
            const res = await fetch("/api/materials/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (res.ok && data.success) {
                form.reset();
                loadMaterials();
                loadDashboardData();
                const countMsg = data.count ? ` (${data.count} pages indexed)` : "";
                alert(`File successfully uploaded and indexed${countMsg}!`);
            } else {
                alert(`Upload failed: ${data.error || "Unknown error"}`);
            }
        } catch (err) {
            console.error("File upload failed", err);
            alert("Failed to upload file due to network or server error.");
        }
    });
}

function setupTutorForm() {
    const form = document.getElementById("tutor-form");
    const chatContainer = document.getElementById("chat-messages");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const queryInput = document.getElementById("tutor-query");
        const query = queryInput.value.trim();
        if (!query) return;

        // Append user message safely
        const userMsg = document.createElement("div");
        userMsg.className = "message user-message";
        userMsg.textContent = query;
        chatContainer.appendChild(userMsg);
        queryInput.value = "";
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Fetch tutor answer
        try {
            const res = await fetch("/api/tutor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });
            const data = await res.json();

            const tutorMsg = document.createElement("div");
            tutorMsg.className = "message tutor-message";

            const answerDiv = document.createElement("div");
            answerDiv.textContent = data.answer;
            tutorMsg.appendChild(answerDiv);

            if (data.citations && data.citations.length > 0) {
                const c = data.citations[0];
                const citationBox = document.createElement("div");
                citationBox.className = "citation-box";
                citationBox.textContent = `📌 Source: ${c.title} (${c.source}${c.timestamp ? ', ' + c.timestamp : ''})`;
                tutorMsg.appendChild(citationBox);
            }

            chatContainer.appendChild(tutorMsg);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (err) {
            console.error("Tutor request failed", err);
        }
    });
}

async function loadQuiz() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = "<p>Loading quiz questions...</p>";

    try {
        const res = await fetch("/api/quiz");
        const data = await res.json();

        let html = `<form id="quiz-form" onsubmit="submitQuiz(event)">`;
        data.questions.forEach((q, idx) => {
            html += `
                <div class="card" style="margin-bottom: 15px;">
                    <h4>Q${idx + 1}: [${q.topic}] ${q.prompt}</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
            `;
            q.options.forEach(opt => {
                const optLetter = opt.charAt(0);
                html += `
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="radio" name="${q.id}" value="${optLetter}" required>
                        ${opt}
                    </label>
                `;
            });
            html += `</div></div>`;
        });
        html += `<button type="submit" class="primary-btn">Submit Quiz</button></form>`;
        container.innerHTML = html;
    } catch (e) {
        console.error("Failed to load quiz", e);
        container.innerHTML = "<p>Failed to load quiz questions.</p>";
    }
}

async function submitQuiz(e) {
    e.preventDefault();
    const form = document.getElementById("quiz-form");
    const formData = new FormData(form);
    const answers = {};
    for (let [key, val] of formData.entries()) {
        answers[key] = val;
    }

    try {
        const res = await fetch("/api/quiz/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers })
        });
        const data = await res.json();

        let html = `
            <div class="card" style="background-color: #f8fafc;">
                <h3>Quiz Results: ${data.score} / ${data.total} (${data.percentage}%)</h3>
                <p>Your mastery scores have been updated successfully!</p>
            </div>
        `;

        data.feedback.forEach((item, idx) => {
            const statusColor = item.correct ? "var(--success)" : "var(--danger)";
            html += `
                <div class="card" style="border-left: 5px solid ${statusColor}; margin-top: 10px;">
                    <h4>Question ${idx + 1} (${item.topic}): ${item.correct ? "✅ Correct" : "❌ Incorrect"}</h4>
                    <p>Your answer: <strong>${item.user_answer}</strong> | Correct answer: <strong>${item.correct_answer}</strong></p>
                    <p><em>Explanation:</em> ${item.explanation}</p>
                </div>
            `;
        });
        html += `<button class="primary-btn" onclick="loadQuiz()" style="margin-top: 15px;">Retake Quiz</button>`;
        document.getElementById("quiz-container").innerHTML = html;
        loadProgress();
        loadDashboardData();
    } catch (err) {
        console.error("Quiz submission failed", err);
        alert("Failed to submit quiz.");
    }
}

function renderRecommendations(recommendations) {
    const container = document.getElementById("recommendations-container");
    if (!container) return;

    container.replaceChildren();

    if (!recommendations.length) {
        const message = document.createElement("p");
        message.textContent = "Complete a quiz to build your personalized study plan.";
        container.appendChild(message);
        return;
    }

    for (const item of recommendations) {
        const card = document.createElement("article");
        card.className = "recommendation-card";

        const heading = document.createElement("h4");
        heading.textContent = `${item.priority} Priority: ${item.topic}`;

        const mastery = document.createElement("p");
        mastery.textContent = `Current mastery: ${item.mastery_percentage}%`;

        const reason = document.createElement("p");
        reason.textContent = item.reason;

        const action = document.createElement("p");
        action.textContent = `📘 Study action: ${item.action}`;

        const practice = document.createElement("p");
        practice.textContent = `✍️ Practice: ${item.practice}`;

        card.append(heading, mastery, reason, action, practice);

        const materialsHeading = document.createElement("strong");
        materialsHeading.textContent = "Relevant materials";
        card.appendChild(materialsHeading);

        if (item.materials && item.materials.length) {
            const list = document.createElement("ul");

            for (const material of item.materials) {
                const entry = document.createElement("li");
                let label = `${material.title} — ${material.source}`;
                if (material.timestamp) label += ` (${material.timestamp})`;
                entry.textContent = label;
                list.appendChild(entry);
            }

            card.appendChild(list);
        } else {
            const noMaterials = document.createElement("p");
            noMaterials.textContent =
                "No clearly matching material was found in your current library. Add relevant notes or lecture files to improve these recommendations.";
            card.appendChild(noMaterials);
        }

        container.appendChild(card);
    }
}


async function loadProgress() {
    try {
        const res = await fetch("/api/progress");
        const data = await res.json();
        const container = document.getElementById("progress-container");
        container.innerHTML = "";

        for (const [topic, info] of Object.entries(data.progress || {})) {
            const percentage = Math.max(
                0, Math.min(100, Math.round(Number(info.mastery || 0) * 100))
            );
            const card = document.createElement("div");
            card.className = "progress-card";

            const heading = document.createElement("h4");
            heading.textContent = topic;

            const status = document.createElement("p");
            status.textContent = `Status: ${info.status} (${percentage}% Mastery)`;

            const barBackground = document.createElement("div");
            barBackground.className = "progress-bar-bg";

            const barFill = document.createElement("div");
            barFill.className = "progress-bar-fill";
            barFill.style.width = `${percentage}%`;
            barFill.setAttribute("role", "progressbar");
            barFill.setAttribute("aria-valuenow", String(percentage));
            barFill.setAttribute("aria-valuemin", "0");
            barFill.setAttribute("aria-valuemax", "100");
            barBackground.appendChild(barFill);

            const sessions = document.createElement("small");
            sessions.textContent = `Sessions: ${info.sessions}`;

            card.append(heading, status, barBackground, sessions);
            container.appendChild(card);
        }

        renderRecommendations(data.recommendations || []);

        const evalRes = await fetch("/api/evaluation");
        const evalData = await evalRes.json();
        const evalContainer = document.getElementById("evaluation-container");
        if (evalContainer) {
            evalContainer.innerHTML = `
                <p>Evaluation Test Set Accuracy: <strong>${evalData.accuracy_percentage}%</strong> (${evalData.passed}/${evalData.total_test_cases} passed)</p>
                <p>Grounding Score: ${evalData.metrics.grounding_score}</p>
            `;
        }
    } catch (e) {
        console.error("Failed to load progress", e);
    }
}
