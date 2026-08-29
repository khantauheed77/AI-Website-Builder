# 🚀 WebCraft — AI-Powered SaaS Website Builder

**WebCraft is an AI-powered SaaS platform that transforms natural-language ideas into complete, customizable websites.**

Users can create an account, generate websites using AI, preview and edit their projects, manage credit-based usage, publish projects to the community, export them to GitHub, and deploy them to Vercel.

---

## 🌐 Live Demo

* **Frontend:** `https://webcraft-client.vercel.app`
* **Backend API:** `https://webcraft-server-gamma.vercel.app`

---

## 📌 About the Project

**WebCraft** is a full-stack **SaaS (Software as a Service) application** built with the **MERN stack** and integrated with AI services and multiple third-party APIs.

The platform provides users with an end-to-end workflow for creating websites without starting from a blank codebase.

Users can describe their requirements using natural language, for example:

```text
Create a modern SaaS landing page for an AI productivity
platform with a hero section, pricing cards, features,
testimonials, and a responsive design.
```

WebCraft processes the request through its AI-powered backend and generates the website, which users can preview and refine.

After generating a website, users can:

* Save and manage their projects
* Edit and regenerate websites
* Publish projects to the community
* Like other users' projects
* Export projects to GitHub
* Deploy websites to Vercel

The platform follows a SaaS-based model where AI generation is managed through **user credits and paid credit packages**.

---

# ✨ Features

## 🤖 AI-Powered Website Generation

* Generate websites from natural-language prompts
* AI-generated HTML/CSS/JavaScript
* AI-assisted website creation and modification
* Gemini and Groq integration
* Regenerate and refine generated websites
* Support for different website types, including SaaS-style websites
* Live preview of generated websites

## 👤 User Accounts & Authentication

* User registration
* JWT-based authentication
* Email verification
* Login verification
* Password recovery
* Protected API routes
* User-specific projects and credits

## 📧 Email Verification & OTP

WebCraft uses **Brevo** as its transactional email service for authentication and account recovery.

The system provides:

* ✉️ Email verification during registration
* 🔐 Login verification codes
* 🔑 Password recovery codes
* ⏱️ 10-minute OTP expiration
* 🔒 Single-use OTP verification

## 📊 SaaS Dashboard & Project Management

* User dashboard
* Create and manage website projects
* Save generated websites
* View project history
* Preview generated websites
* Edit and regenerate projects
* Manage user-specific resources

## 🌎 Community Platform

* Publish projects to the community
* Browse published websites
* Like community projects
* Discover websites created by other users

## 💳 Credit-Based SaaS Model

* Credit-based AI generation
* Multiple credit packages
* Stripe checkout integration
* Payment verification
* Credit management
* Payment/history tracking
* Usage-based AI generation

## 🐙 GitHub Integration

* Export generated projects to GitHub
* Create repositories through the GitHub API
* Push generated website files
* Automate project export

## ▲ Vercel Deployment

* Deploy generated websites directly to Vercel
* Vercel API integration
* Automated deployment workflow
* Production deployment of generated websites

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

## Infrastructure & Deployment

| Platform      | Purpose                                  |
| ------------- | ---------------------------------------- |
| Vercel        | Frontend, backend and website deployment |
| MongoDB Atlas | Cloud database                           |

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

# 🤖 AI Website Generation Flow

AI website generation is the core functionality of WebCraft.

```text
                         User
                           │
                           ▼
                    Natural-Language Prompt
                           │
                           ▼
                    React Frontend
                           │
                           ▼
                      Express API
                           │
                  ┌────────┴────────┐
                  │                 │
                  ▼                 ▼
               Gemini             Groq
                  │                 │
                  └────────┬────────┘
                           ▼
                   Generated Website
                           │
                           ▼
                      Live Preview
                           │
                 ┌─────────┼─────────┐
                 ▼         ▼         ▼
               Edit       Save    Regenerate
                           │
                           ▼
                        MongoDB
```

AI generation is integrated into the SaaS credit system, allowing the platform to control and manage AI usage per user.

---

# 💰 SaaS Credit & Payment Architecture

WebCraft follows a credit-based SaaS model.

Users receive credits that can be consumed when generating websites through the AI system.

```text
User
 │
 ▼
Credit Balance
 │
 ├── Sufficient Credits ──► AI Generation
 │                              │
 │                              ▼
 │                         Credits Used
 │
 └── Insufficient Credits
             │
             ▼
       Credit Packages
             │
             ▼
      Stripe Checkout
             │
             ▼
          Payment
             │
             ▼
      Payment Verification
             │
             ▼
       Credits Added
```

This provides a usage-based model for managing AI generation costs within the SaaS platform.

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
* Authentication middleware

### Authentication Flow

```text
User
 │
 ▼
Registration / Login
 │
 ▼
OTP Verification
 │
 ▼
Authentication
 │
 ▼
JWT Token
 │
 ▼
Protected API Request
 │
 ▼
Authentication Middleware
 │
 ▼
Authorized Controller
```

User-specific resources such as projects and credits are associated with authenticated accounts.

---

# 📧 Email Verification & OTP System

WebCraft uses **Brevo** to send one-time password (OTP) codes through email.

Brevo is used for:

* ✉️ Email verification during registration
* 🔐 Login verification codes
* 🔑 Password recovery codes

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

* Expires after **10 minutes**
* Can only be used **once**
* Is delivered through Brevo's transactional email API

Brevo credentials and sender information are stored securely as server-side environment variables and are never included directly in the source code.

---

# 🌎 Community & Publishing

WebCraft includes a community layer where users can share generated projects.

```text
User Project
     │
     ▼
Publish Project
     │
     ▼
Community
     │
 ┌───┴────┐
 ▼        ▼
Browse   Like
Projects Projects
```

Published projects can be discovered and liked by other users.

---

# 🐙 GitHub Integration

WebCraft integrates with the **GitHub API** to export generated websites.

### Export Flow

```text
WebCraft Project
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

This allows users to continue developing their generated websites outside the WebCraft platform.

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

The workflow allows users to move from:

**Prompt → AI Generation → Preview → Edit → Deploy**

without manually configuring a deployment pipeline.

---

# 🖼️ Unsplash Integration

WebCraft integrates with the **Unsplash API** to provide images that can be used within generated websites.

```text
AI / Website Requirement
          │
          ▼
    Image Search
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

---

# 🗄️ Database

WebCraft uses **MongoDB** with **Mongoose** for persistent application data.

The database stores application information such as:

* Users
* Website projects
* Generated websites
* Published projects
* Likes
* Credits
* Payments
* Project history
* OTP/authentication-related data

MongoDB Atlas can be used for production database hosting.

---

# 📡 Backend API

The backend follows a REST API architecture.

Major API areas include:

| Area           | Purpose                                                     |
| -------------- | ----------------------------------------------------------- |
| Authentication | Registration, login, OTP verification and password recovery |
| Projects       | Create and manage website projects                          |
| AI             | Website generation and AI operations                        |
| Community      | Published projects and likes                                |
| Payments       | Credit packages and Stripe payments                         |
| GitHub         | Project export                                              |
| Vercel         | Website deployment                                          |

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

---

# 🔄 Complete Application Flow

```text
                         WebCraft SaaS
                              │
                              ▼
                     Register / Login
                              │
                              ▼
                       Email / OTP
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
                      Check Credits
                              │
                    ┌─────────┴─────────┐
                    │                   │
              Credits Available     No Credits
                    │                   │
                    ▼                   ▼
              AI Generation       Buy Credits
                    │                   │
                    │                Stripe
                    │                   │
                    │                   ▼
                    │              Add Credits
                    │                   │
                    └─────────┬─────────┘
                              ▼
                       Generated Website
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
                │           Export        Deploy
                ▼             │             │
            Community         ▼             ▼
                         GitHub Repo   Live Website
```

---

# ⚙️ Environment Variables

## Server

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

## Client

Create:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:4000/api
```

> **Never commit `.env` files or secret credentials to GitHub.**

For production deployments, configure environment variables through Vercel.

---

# 🚀 Getting Started

## Requirements

Before running WebCraft locally, make sure you have:

* Node.js 18 or newer
* npm
* MongoDB / MongoDB Atlas
* Required AI API credentials
* Stripe credentials
* Brevo credentials
* GitHub credentials
* Vercel credentials

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

```bash
cd ../client

npm install
```

---

## 4. Configure Environment Variables

Create the required `.env` files using the configuration described above.

---

## 5. Start the Backend

```bash
cd server

npm start
```

For development:

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
npm run dev       # Start Vite development server
npm run build     # Build production frontend
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Server

```bash
npm start         # Start Express API
npm run dev       # Start API with automatic reload
```

---

# ☁️ Deployment

WebCraft can be deployed using **Vercel** with the frontend and backend configured as separate projects.

## Backend

Configure the Vercel project:

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

Configure all required backend environment variables in the Vercel project.

After deployment, verify the backend:

```text
https://YOUR-BACKEND.vercel.app/api/health
```

Expected response:

```json
{
  "ok": true
}
```

## Frontend

Create a separate Vercel project:

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

For the backend:

```env
CLIENT_URL=https://YOUR-FRONTEND.vercel.app
```

Redeploy the affected project after changing environment variables.

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

Use `.env.example` to document required environment variable names without exposing actual credentials.

If a secret is accidentally exposed, revoke it immediately and generate a replacement.

---

# 🎯 Project Goals

WebCraft was developed to demonstrate the implementation of a production-oriented AI SaaS application involving:

* AI-assisted website generation
* SaaS application architecture
* MERN stack development
* REST API design
* JWT authentication
* OTP-based email verification
* Password recovery
* MongoDB database design
* Credit-based usage management
* Stripe payment integration
* Transactional email services
* Multiple AI provider integration
* GitHub API automation
* Vercel deployment automation
* Community-based project publishing
* Third-party API integration
* Full-stack cloud deployment

---

# 🔮 Future Improvements

Potential future enhancements include:

* 🎨 Visual drag-and-drop website editing
* 🧩 Component-level AI editing
* 🕐 Project version history
* 🌐 Custom domain support
* 🤝 Collaborative website editing
* 🧠 Additional AI model providers
* 📦 Reusable website templates
* 📊 Advanced SaaS usage analytics
* 📈 Subscription-based plans
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
