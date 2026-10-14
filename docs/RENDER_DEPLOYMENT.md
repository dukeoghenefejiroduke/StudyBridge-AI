# Hosting StudyBridge AI Live on Render

StudyBridge AI is fully configured for effortless cloud deployment on [Render](https://render.com).

## 1. Prerequisites
- A GitHub, GitLab, or Bitbucket account with your `StudyBridge-AI` repository pushed.
- A free account on [Render.com](https://render.com).

---

## 2. Deployment Steps

### Method A: Using the Render Blueprint (`render.yaml`) — Recommended
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New** -> **Blueprint**.
3. Connect your `StudyBridge-AI` repository.
4. Render will automatically detect the `render.yaml` configuration file, set up the Python environment, install dependencies (`gunicorn`, `flask`, `pypdf`), and start the application using:
   ```bash
   gunicorn app.main:app
   ```
5. Click **Apply**. Render will build and deploy your web application live with a public URL (e.g., `https://studybridge-ai.onrender.com`).

### Method B: Manual Web Service Setup
If creating a Web Service manually in the Render dashboard:
- **Name**: `studybridge-ai`
- **Environment**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app.main:app`
- **Instance Type**: Free / Starter

---

## 3. Verifying Live Deployment
Once Render completes the build and displays a live URL:
1. Open the URL in your browser.
2. Verify the **Study Dashboard**, ingest sample `.txt`, `.md`, `.pdf`, or `.pptx` files, test **Ask Your Tutor**, take a **Practice Quiz**, and inspect **Learning Progress** with historical sparklines.
