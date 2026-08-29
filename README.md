# 🧠 WebCraft — AI-Powered Website Builder

**WebCraft is an AI-powered website builder that transforms natural-language ideas into complete, customizable websites.**

Users can describe their website idea, generate a website using AI, preview and edit the result, manage projects, publish websites to the community, export projects to GitHub, and deploy them to Vercel.

---

## 🌐 Live Demo

* **Frontend:** `https://YOUR-FRONTEND.vercel.app`
* **Backend API:** `https://webcraft-server-gamma.vercel.app`

---

## 📌 About the Project

**WebCraft** is a full-stack AI-powered website builder built using the **MERN stack** and integrated with multiple third-party services.

The platform allows users to turn a simple natural-language description into a functional website without manually writing the initial code.

For example, a user can provide a prompt such as:

```text
Create a modern portfolio website for a full-stack developer
with a dark theme, projects section, skills section,
and a contact form.
```

WebCraft processes the prompt through its backend AI workflow and generates the website, which can then be previewed and modified by the user.

Once a project is ready, users can save it, publish it to the community, export it to GitHub, or deploy it directly to Vercel.

---

# ✨ Features

## 🤖 AI-Powered Website Generation

* Generate websites from natural-language prompts
* AI-generated HTML/CSS/JavaScript
* AI-assisted website creation and modification
* Support for Gemini and Groq
* Regenerate and refine generated websites
* Live preview of generated websites

## 🛠️ Project & Website Management

* Create website projects
* Save generated websites
* View and manage projects through a dashboard
* Preview generated websites
* Edit generated website content
* Manage project history

## 🔐 Authentication & Account Security

* User registration
* Email verification using OTP
* Login verification codes
* Password recovery using OTP
* JWT-based authentication
* Protected API routes
* Secure server-side credential management

## 📧 Email Verification & OTP

WebCraft uses **Brevo** as its transactional email service for authentication and account recovery.

The system supports:

* Email verification during registration
* Login verification codes
* Password recovery codes
* 10-minute OTP expiration
* Single-use OTP verification

## 🌎 Community

* Publish projects to the community
* Browse published websites
* Like community projects
* Discover websites created by other users

## 💳 Credits & Payments

* Credit-based AI generation system
* Multiple credit packages
* Stripe checkout
* Payment verification
* Credit management
* Payment/history tracking

## 🐙 GitHub Integration

* Export generated projects to GitHub
* Create GitHub repositories
* Push generated website files
* Automate project export through the GitHub API

## ▲ Vercel Deployment

* Deploy generated websites directly to Vercel
* Vercel API integration
* Automated deployment workflow
* Generate production deployments from WebCraft projects

## 🖼️ Image Integration

* Unsplash API integration
* Retrieve external images for generated websites

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| React        | Frontend user interface    |
| Vite         | Development and build tool |
| Tailwind CSS | UI styling                 |
| React Router | Client-side routing        |
| Axios        | API communication          |
| Lucide React | Icons and UI elements      |

## Backend

| Technology | Purpose                     |
| ---------- | --------------------------- |
| Node.js    | Runtime environment         |
| Express.js | Backend REST API            |
| MongoDB    | Database                    |
| Mongoose   | MongoDB ODM                 |
| JWT        | Authentication              |
| REST API   | Client-server communication |

## AI & External Services

| Service       | Purpose                      |
| ------------- | ---------------------------- |
| Google Gemini | AI website generation        |
| Groq          | AI-powered generation        |
| Brevo         | OTP and transactional emails |
| Stripe        | Payments and credit packages |
| GitHub API    | Project export               |
| Vercel API    | Website deployment           |
| Unsplash      | Image integration            |

## Deployment

| Platform      | Purpose                         |
| ------------- | ------------------------------- |
| Vercel        | Frontend and backend deployment |
| MongoDB Atlas | Cloud database                  |

---

# 🏗️ Project Architecture

```text
WebCraft/
│
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/                         # Express backend
│   ├── api/                        # Serverless entry point
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── configs/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🤖 AI Website Generation

AI website generation is the core functionality of WebCraft.

The generation workflow can be summarized as:

```text
User
 │
 ▼
Website Prompt
 │
 ▼
React Frontend
 │
 ▼
Express API
 │
 ▼
AI Provider
 ┌───────────────┐
 │               │
 ▼               ▼
Gemini          Groq
 │               │
 └───────┬───────┘
         ▼
Generated Website
         │
         ▼
    Live Preview
         │
    ┌────┴────┐
    ▼         ▼
   Edit      Save
              │
              ▼
           MongoDB
```

The generated website can then be modified, published, exported to GitHub, or deployed to Vercel.

---

# 🔐 Authentication & Authorization

WebCraft uses **JWT-based authentication** to secure user accounts and protected backend operations.

The authentication system includes:

* User registration
* Login
* JWT authentication
* Protected routes
* Email verification
* Login verification
* Password recovery
* Server-side authentication middleware

The general authentication flow is:

```text
User
 │
 ▼
Authentication Request
 │
 ▼
Express API
 │
 ▼
Authentication Middleware
 │
 ▼
JWT Verification
 │
 ▼
Protected Controller
 │
 ▼
Database / Application Service
```

Only authenticated users can access protected project, community, payment, and deployment functionality where authorization is required.

---

# 📧 Email Verification & OTP System

WebCraft uses **Brevo** to send one-time password (OTP) codes to users through email.

Brevo is used for:

* ✉️ Email verification during registration
* 🔐 Login verification codes
* 🔑 Password recovery codes

When an OTP is requested, the backend generates the verification code and sends it to the user's registered email through the Brevo API.

### OTP Flow

```text
User
 │
 ▼
Authentication Action
 │
 ├── Registration
 ├── Login Verification
 └── Password Recovery
 │
 ▼
Backend
 │
 ▼
Generate OTP
 │
 ▼
Brevo API
 │
 ▼
User Email
 │
 ▼
User Enters OTP
 │
 ▼
Backend Verification
 │
 ├── Valid & Not Expired ──► Continue
 │
 └── Invalid / Expired ────► Reject
```

Each OTP:

* ⏱️ Expires after **10 minutes**
* 🔒 Can only be used **once**
* 📧 Is delivered through Brevo's transactional email API

Brevo credentials and sender information are stored securely as server-side environment variables and are never included directly in the source code.

---

# 💳 Credit & Payment System

WebCraft uses a credit-based system for AI website generation.

Users can purchase credit packages through Stripe.

### Payment Flow

```text
User
 │
 ▼
Select Credit Package
 │
 ▼
Stripe Checkout
 │
 ▼
Payment
 │
 ▼
Backend Verification
 │
 ▼
Credits Added
 │
 ▼
AI Website Generation
 │
 ▼
Credits Used
```

Stripe handles payment processing while the backend manages payment verification, transaction history, and user credits.

---

# 🐙 GitHub Integration

WebCraft integrates with the **GitHub API** to allow users to export generated projects.

### Export Flow

```text
Generated Project
       │
       ▼
GitHub Integration
       │
       ▼
Repository Creation
       │
       ▼
Generated Website Files
       │
       ▼
Commit / Push
       │
       ▼
GitHub Repository
```

This allows users to continue developing their AI-generated websites outside of WebCraft.

---

# ▲ Vercel Deployment

WebCraft integrates with the **Vercel API** to deploy generated websites.

### Deployment Flow

```text
WebCraft Project
       │
       ▼
Deployment Request
       │
       ▼
Vercel API
       │
       ▼
Build & Deployment
       │
       ▼
Production Website
```

This creates a direct workflow from:

**AI Generation → Preview → Save → Deploy**

---

# 🖼️ Unsplash Integration

WebCraft integrates with the **Unsplash API** to provide images that can be used within generated websites.

The image workflow is:

```text
Website Generation
       │
       ▼
Image Requirement
       │
       ▼
Unsplash API
       │
       ▼
Image Result
       │
       ▼
Generated Website
```

This allows generated websites to include relevant external imagery without requiring users to manually source every image.

---

# 🗄️ Database

WebCraft uses **MongoDB** with **Mongoose** for persistent application data.

The database is responsible for storing information related to:

* Users
* Website projects
* Generated websites
* Published projects
* Likes
* Credits
* Payments
* Project history

MongoDB Atlas can be used as the production database.

---

# 📡 Backend API

The WebCraft backend follows a REST API architecture.

Major API areas include:

| Area           | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| Authentication | Registration, login, verification and password recovery |
| Projects       | Create and manage website projects                      |
| AI             | Website generation and AI operations                    |
| Community      | Published projects and likes                            |
| Payments       | Credit packages and Stripe payments                     |
| GitHub         | Project export                                          |
| Vercel         | Website deployment                                      |

### Health Check

```text
GET /api/health
```

Example response:

```json
{
  "ok": true
}
```

The health endpoint can be used to verify that the deployed backend is running correctly.

---

# 🔄 Application Workflow

The complete WebCraft workflow can be summarized as:

```text
                         WebCraft
                            │
                            ▼
                    Register / Login
                            │
                            ▼
                        Dashboard
                            │
                            ▼
                      Create Project
                            │
                            ▼
                    Enter AI Prompt
                            │
                            ▼
                    AI Website Generation
                            │
                            ▼
                      Live Preview
                            │
                 ┌──────────┼──────────┐
                 ▼          ▼          ▼
               Edit       Save      Regenerate
                            │
                            ▼
                      Project Management
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
           Publish       GitHub        Vercel
              │           Export       Deploy
              ▼             │             │
         Community          ▼             ▼
                       GitHub Repo   Live Website
```

---

# 📁 Environment Variables

WebCraft requires environment variables for its database, authentication, AI providers, email service, payments, and deployment integrations.

## Server Environment

Create:

```text
server/.env
```

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_long_random_secret

BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_NAME=AI_Web_Builder
BREVO_SENDER_EMAIL=your_sender_email

VERCEL_TOKEN=your_vercel_token
GITHUB_TOKEN=your_github_token

GEMINI_API_KEY=your_gemini_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
GROQ_API_KEY=your_groq_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key

CLIENT_URL=http://localhost:5173
```

## Client Environment

Create:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:4000/api
```

> **Never commit `.env` files or secret credentials to GitHub.**

For production, configure environment variables through the Vercel project settings.

---

# 🚀 Getting Started

## Requirements

Before running WebCraft locally, make sure you have:

* Node.js 18 or newer
* npm
* MongoDB / MongoDB Atlas
* Required API credentials

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Website-Builder.git

cd AI-Website-Builder
```

---

## 2. Install Backend Dependencies

```bash
cd server

npm install
```

---

## 3. Install Frontend Dependencies

Open another terminal or return to the project root:

```bash
cd client

npm install
```

---

## 4. Configure Environment Variables

Create the required `.env` files using the configuration described in the **Environment Variables** section.

---

## 5. Start the Backend

```bash
cd server

npm start
```

For development with automatic reload:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:4000
```

---

## 6. Start the Frontend

Open another terminal:

```bash
cd client

npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# 📜 Available Scripts

## Client

```bash
npm run dev       # Start the Vite development server
npm run build     # Build the production frontend
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## Server

```bash
npm start         # Start the Express API
npm run dev       # Start the API with automatic reload
```

---

# ☁️ Deployment

WebCraft can be deployed as separate frontend and backend projects using **Vercel**.

## Backend Deployment

Create a Vercel project with:

```text
Root Directory: server
Framework Preset: Other
Build Command: empty
Output Directory: empty
```

The backend uses:

```text
server/api/index.js
```

as its serverless entry point.

Configure the required backend environment variables in Vercel.

After deployment, test:

```text
https://YOUR-BACKEND.vercel.app/api/health
```

Expected response:

```json
{
  "ok": true
}
```

---

## Frontend Deployment

Create a separate Vercel project with:

```text
Root Directory: client
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Configure:

```env
VITE_API_URL=https://YOUR-BACKEND.vercel.app/api
```

in the frontend environment variables.

Configure the backend with:

```env
CLIENT_URL=https://YOUR-FRONTEND.vercel.app
```

After modifying environment variables, redeploy the affected project.

---

# 🔒 Security

WebCraft keeps sensitive credentials outside the source code.

Never commit:

* `.env` files
* MongoDB credentials
* JWT secrets
* Stripe secret keys
* GitHub access tokens
* Vercel tokens
* Gemini API keys
* Groq API keys
* Brevo credentials
* Unsplash credentials

Use `.env.example` to document required variable names without exposing actual credentials.

If a secret is accidentally exposed, revoke it immediately and generate a replacement.

---

# 🎯 Project Goals

WebCraft was developed to demonstrate the implementation of a modern AI-powered full-stack application involving:

* AI-assisted website generation
* MERN stack architecture
* REST API development
* JWT authentication
* OTP-based email verification
* Password recovery
* MongoDB database design
* Credit-based systems
* Stripe payment integration
* Transactional email services
* Third-party API integration
* GitHub automation
* Vercel deployment automation
* Community-based project sharing
* Full-stack cloud deployment

---

# 🔮 Future Improvements

Potential future enhancements include:

* 🎨 Visual drag-and-drop website editing
* 🧩 Component-level AI editing
* 🕐 Project version history
* 🌐 Custom domain support
* 🤝 Collaborative website editing
* 🧠 Support for additional AI models
* 📦 Reusable website templates
* 📊 Advanced usage analytics
* 🔍 Improved community discovery
* 🚀 Additional deployment providers

---

# 👨‍💻 Author

**Mohammad Tauheed Khan**

Full-Stack Developer | Computer Science & Engineering Student

### Connect

* GitHub: `https://github.com/khantauheed77`

---

# 📄 License

This project is currently intended for **educational and portfolio purposes**.

---

# ⭐ Support

If you find WebCraft interesting, consider giving the repository a ⭐ on GitHub.

---

**Built with ❤️ using React, Node.js, Express, MongoDB and AI technologies.**
