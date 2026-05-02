# 🗳️ VoteAssist: AI-Powered Election Assistant

VoteAssist is a production-ready, secure, and highly interactive educational platform designed to empower Indian citizens. It simplifies the electoral process through gamification, AI assistance, and rigorous data validation, helping users navigate registration, verification, and voting with 100% data privacy.

---

## 💎 Production-Grade Features

- **🛡️ Secure EPIC Validation**: Robust client-side validation logic using advanced regex patterns (`^[A-Z]{3}[0-9]{7}$`) to guide users towards official verification sources without storing PII.
- **📊 Dynamic Readiness Score**: A real-time 0–100% calculation metric on the Citizen Dashboard that guides users through essential next steps based on their current status.
- **🤖 Context-Aware AI Chatbot**: An intelligent assistant with dedicated quick-replies ("Am I eligible?", "Find my booth") and deep-link awareness to guide users through FAQs.
- **🗳️ Interactive EVM Simulation**: A realistic 5-step interactive simulator of the Indian voting process, featuring candidate selection, VVPAT printing animations, and indelible ink verification.
- **📱 Privacy-First Dashboard**: Users generate a "Digital Voter Profile (Demo)" with strict inline validation (Age 18+, mandatory fields) and clear demo-only labeling.
- **🔗 Official Redirection**: Direct deep-linking to the [Official ECI Portal](https://electoralsearch.eci.gov.in) for real polling booth verification and voter search.

---

## 🏗️ Architecture & Technical Excellence

### 💻 Technology Stack
- **Frontend**: React 19 + Vite + Tailwind CSS v4
- **State Management**: React Context (Language, Theme)
- **Animations**: Framer Motion (Optimized for 60FPS)
- **Validation**: Zod (Backend) & Custom Validators (Frontend)
- **Testing**: Vitest (Frontend) & Jest (Backend)
- **BaaS / Infra**: Node.js + Express + Google Cloud Run (Dockerized)

---

## 🧪 Testing & Code Quality

VoteAssist is built with a test-driven mindset to ensure 100% reliability of core electoral logic.

### 1. Frontend Unit Tests (Vitest)
Tests core utilities in `src/utils/`:
- **EPIC Validation**: 5+ test cases for various formats.
- **Eligibility Logic**: Boundary testing for age (17 vs 18) and citizenship.
- **Quiz Scoring**: Verification of point calculation logic.
```bash
npx vitest run
```

### 2. Backend Unit Tests (Jest)
Tests the secure eligibility API endpoints:
```bash
cd backend && npm test
```

### 3. Linting & Accessibility
- **ESLint**: Zero-warning codebase with optimized imports and variable usage.
- **A11y**: Full ARIA support (`aria-invalid`, `aria-live`, `aria-describedby`) for screen readers and keyboard navigation.

---

## 🚀 Installation & Local Setup

1. **Clone & Install:**
   ```bash
   git clone https://github.com/Tsrinivas123/VoteAssist.git
   cd VoteAssist
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   VITE_ECI_PORTAL_URL=https://electoralsearch.eci.gov.in
   PORT=8080
   ```

3. **Start Development:**
   ```bash
   # Run Frontend
   npm run dev

   # Run Backend
   cd backend && npm install && node src/index.js
   ```

---

## ☁️ Cloud Deployment (GCP)

This project is fully containerized and ready for Google Cloud Run (Port 8080).

```bash
# Deploy to Cloud Run
gcloud run deploy vote-assist --source . --allow-unauthenticated
```

### 🌐 Live Portal
- **Citizen Portal**: [https://vote-assist-143983638275.asia-south1.run.app](https://vote-assist-143983638275.asia-south1.run.app)
- **Validation API**: [https://backend-vote-assist-143983638275.asia-south1.run.app/api/eligibility](https://backend-vote-assist-143983638275.asia-south1.run.app/api/eligibility)

---
*Disclaimer: This is a demo system intended for educational purposes. All real voter data verification must be performed on the official Election Commission of India portals.*
