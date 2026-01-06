# 🧠 Assistive Social Cue Companion
A tool designed to help users practice recognizing facial expressions and interpreting potential sarcasm in written messages.

The Assistive Social Cue Companion is an interactive React-based application that provides real-time feedback on emotional cues. It is designed primarily to support individuals who may struggle with interpreting non-literal communication, such as sarcasm or subtle facial expressions. The goal of this project is to create a tool that can eventually be adapted for AR glasses and other accessibility platforms.

# 🚀 Features
## 🎥 Real-Time Emotion Panel

Uses the user’s webcam to display a live video feed.

Includes a mock “Emotion Analyzer” that simulates:

Detected emotion (Happy, Neutral, Sad, etc.)

Confidence percentage with animated bar

Organized panel layout with responsive styling.

Future upgrade: integrate an actual face-emotion detection model or backend API.

## 💬 Sarcasm Analyzer Panel

Users can type any message into a text box.

The analyzer returns:

A mock sarcasm likelihood percentage

A descriptive label (e.g., “Possibly sarcastic”)

Built with clean UI sections for input, results, and actions.

Future upgrade: replace mock logic with an LLM-powered sarcasm classifier.

# 🛠 Tech Stack
## Frontend

React (Vite) — component-based UI and fast dev environment

CSS — custom modern styling with panel-based layout

Webcam API — browser-based camera access

State Management — React hooks (useState, useEffect, useRef)

## Future Backend (planned)

Node.js + Express server

Emotion/Sarcasm classification via ML model or OpenAI API

REST API endpoints returning JSON predictions

📁 Project Structure
/client
  /src
    /components
      EmotionPanel.jsx
      SarcasmPanel.jsx
    App.jsx
    styles.css


Each panel is isolated in its own component for readability, testing, and future scalability.

# 🔧 Setup & Running the Project
1. Install dependencies
npm install

2. Run the dev server
npm run dev

3. Open in browser

The app is typically served at:

http://localhost:5173

# 🎯 Roadmap (What’s Coming Next)

🔍 Real-time facial emotion detection model (browser-based or backend)

🧠 LLM-powered sarcasm classifier

🎨 UI refinements + accessibility improvements

🕶️ Future adaptation for AR glasses

📊 Analytics to track progress for practicing users

🧪 Validation studies with student groups and accessibility-focused clubs

# 🤝 Purpose

This project aims to support individuals—especially those on the autism spectrum—who want help recognizing social cues. While currently in early development, the long-term vision is to build a practical and reliable assistive companion tool.

# 📌 Status

🟦 In Development · Active Project
Core interface is functional. Detectors currently use mock logic during early prototyping.
