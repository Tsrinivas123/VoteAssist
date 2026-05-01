# 🗳️ VoteAssist: AI-Powered Election Assistant

VoteAssist is a modern, gamified, and highly interactive web application designed to help Indian citizens navigate the electoral process with confidence. It serves as a comprehensive guide for voter registration, polling booth location, and understanding the voting process, all while combating misinformation.

---

## 🌟 Key Features

- **Smart Eligibility Checker**: API-powered form that dynamically calculates voting eligibility based on user age and citizenship, providing instant next-step recommendations.
- **Personalized Citizen Dashboard**: A dynamic portal where users generate their own digital Elector's Photo Identity Card (EPIC) by inputting their details, alongside real-time application tracking and gamified "Readiness Scores."
- **Enhanced EVM Voting Simulation**: A highly realistic 5-step interactive simulation of the Indian voting process, featuring ID verification, indelible ink application, working candidate buttons, and VVPAT printing animations.
- **Context-Aware AI Chatbot**: An intelligent floating assistant equipped with quick-reply suggestions, auto-scrolling, and intelligent keyword matching to guide users through registration and voting FAQs.
- **Gamified Learning (Masterclass)**: Engage with highly interactive, animated flashcards and quizzes to learn about the Indian Constitution.
- **Indian Electoral Timeline**: Explore a beautiful historical timeline documenting the journey of the world's largest democracy.
- **Multilingual Support**: Seamlessly switch between English and Hindi for maximum accessibility.
- **Fake News Shield**: Educational module teaching citizens how to spot and verify misinformation circulating on WhatsApp and social media.

---

## 🏗️ Architecture & Flow Diagram

The application is built on a modern React SPA architecture with a responsive, glassmorphism UI powered by Tailwind CSS v4.

```mermaid
graph TD
    User([Voter / Citizen])
    
    %% Main Application Layer
    subgraph WebApp [VoteAssist React App]
        Nav[Navbar & Routing]
        Lang[Language Context EN/HI]
        
        %% Features
        subgraph Features
            Dash[Citizen Dashboard]
            Reg[Voter Registration Guide]
            Sim[EVM Simulation]
            Booth[Polling Booth Finder]
            Learn[Flashcards & Quizzes]
            Fake[Fake News Awareness]
        end
        
        Bot[AI Chatbot Assistant]
    end
    
    %% Cloud & Infrastructure Layer
    subgraph Infrastructure [Google Cloud Platform]
        CloudRun[GCP Cloud Run]
        Docker[Docker Container / Nginx]
    end
    
    %% Firebase Layer
    subgraph BackendServices [Firebase]
        Auth[Firebase Auth]
        DB[(Firestore)]
        Msg[Firebase Messaging]
    end

    %% Connections
    User <-->|Interacts| Nav
    Nav --> Lang
    Nav --> Features
    User <-->|Asks Questions| Bot
    
    Features -.->|Client-side Data| DB
    Features -.->|User Authentication| Auth
    
    WebApp ==>|Deployed via| Docker
    Docker ==>|Hosted on| CloudRun
    
    %% Styling
    classDef primary fill:#4F46E5,stroke:#fff,stroke-width:2px,color:#fff;
    classDef secondary fill:#06B6D4,stroke:#fff,stroke-width:2px,color:#fff;
    classDef accent fill:#8B5CF6,stroke:#fff,stroke-width:2px,color:#fff;
    
    class User primary;
    class WebApp secondary;
    class Infrastructure accent;
```

---

## 💻 Technology Stack

- **Frontend Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (with custom glassmorphism variants)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **Backend / BaaS**: Firebase (Firestore, Auth, Messaging)
- **Deployment & Hosting**: Google Cloud Run + Docker + Nginx

---

## 🚀 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tsrinivas123/VoteAssist.git
   cd VoteAssist
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   Open `src/firebase.js` and replace the placeholder configuration with your active Firebase project credentials.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## ☁️ Deployment (Google Cloud Run)

This repository includes a multi-stage `Dockerfile` and an `nginx.conf` designed for Cloud Run. 

To deploy directly to your Google Cloud Project:
```bash
# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Deploy
gcloud run deploy vote-assist \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🔧 Secure Node.js Backend

A newly added secure backend powered by Node.js, Express, and Zod handles API routing and logic.

### Local Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Jest unit test suite:
   ```bash
   npm test
   ```
4. Start the server (runs on `http://localhost:8080`):
   ```bash
   node src/index.js
   ```

### 🌐 Live URLs
- **Frontend (Citizen Portal)**: [https://vote-assist-143983638275.asia-south1.run.app](https://vote-assist-143983638275.asia-south1.run.app)
- **Backend (Secure API)**: [https://backend-vote-assist-143983638275.asia-south1.run.app/api/eligibility](https://backend-vote-assist-143983638275.asia-south1.run.app/api/eligibility)
