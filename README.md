# 🌌 DotByte Systems // The Technology Creation Guild

Welcome to the official repository of **DotByte Systems**, a custom technology ecosystem designed to build premium, high-fidelity digital platforms and core electronics at highly affordable, student-friendly rates. 

Created, developed, and maintained entirely by **DOTDVN** (Founder, Lead Developer, and Owner), DotByte Systems bridges the gap between raw hardware engineering and elegant, glassmorphic software design.

---

## 🚀 Key Highlights & Offerings

We build custom projects tailored to academic submissions, student portfolios, and startup prototypes across four main dimensions:

*   **⚡ Custom IoT Code (Starts at ₹399+)** — ESP32, ESP8266, and Arduino firmware calibration, sensor mesh networks, and circuit connection schematics.
*   **🌐 Premium Web Systems (Starts at ₹1299)** — Modern glassmorphism UI/UX, responsive mobile layouts, smooth animations, and top-tier SEO optimizations.
*   **📱 App Development (Starts at ₹1699)** — Cross-platform, native-feel companion mobile applications with state persistence and admin control boards.
*   **🔌 Custom PCB Design (Starts at ₹499)** — High-fidelity 2-layer to multi-layer routing layouts, design rule checking (DRC), and manufacturing-ready Gerber/BOM files.

---

## 🛠️ The Tech Stack

This frontend showcase application is built with a highly responsive, modern engineering stack:

*   **Framework:** [React 19](https://react.dev/) + [Vite 6](https://vite.dev/) (for ultra-fast Hot Module Replacement)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (strictly typed codebases)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (modern CSS variables & custom themes)
*   **Animations:** [Motion](https://motion.dev/) (fluid, spring-based micro-interactions)
*   **Icons:** [Lucide React](https://lucide.dev/) (clean, minimalist vector iconography)
*   **AI Integration:** `@google/genai` (integration with Google Gemini models)

---

## 🎮 Interactive Features of the App

This repository contains the interactive portfolio dashboard where clients can explore services. It includes:

1.  **Interactive Hero Node Graph:** A customizable, animated connection lattice representing neural hardware pipelines.
2.  **Live Design Boards:**
    *   **Web Sandbox:** Real-time Lighthouse scoring, responsiveness checker, and compiler mockup.
    *   **PCB Routing Viewport:** Interactive layout traces, component positioning, and layer switches.
    *   **Mobile App Emulator:** Clickable wireframes showing state-aware configuration setups.
    *   **IoT Firmware Console:** Interactive IDE terminal showing microcontroller code compiles.
3.  **Dot AI Chatbot Assistant:** A floating chat system communicating directly with a Gemini-powered endpoint to advise users on custom projects.

---

## ⚙️ Running Locally

Follow these quick steps to get the project running on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Clone and Install
Clone this repository to your local drive and install package dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (you can copy `.env.example` as a template):
```bash
cp .env.example .env
```
Inside your `.env` file, populate your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the Dev Server
Fire up the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the host port listed in the console output).

### 5. Build for Production
To bundle and optimize the application for a hosting service:
```bash
npm run build
```

---

## 🛡️ License

This project is licensed under the **Apache-2.0 License**. See the header files for specific details.


## Portfolio-inspired redesign

The site uses a warm paper background, green interactive circuit hero, orange accents, and responsive service, project, pricing, and contact sections. The original design boards and estimator are available through **Open the workshop**. Project filters and specification dialogs retain their existing content.

The contact form prepares a WhatsApp message for the visitor to send. Plan inquiries use the existing FormSubmit endpoint and now report submission errors. Dot AI retains its existing Gemini configuration; external service delivery must be verified separately with the configured accounts.

Run `npm run dev` for a local preview, `npm run build` for production output in `dist`, and `npm run lint` for TypeScript checks.
