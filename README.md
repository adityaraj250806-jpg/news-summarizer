# 📰 NewsBoard – News Dashboard with AI Summarizer

A full-stack news web application built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend), featuring real-time news fetching via NewsAPI and AI-powered article summarization using Google Gemini Pro.

Built as part of Assignment 4 – KSHITIJ Web Development and AI Workshop 2025.

---

## Features

- **Fixed Navbar** with navigation links and search
- **Category Tabs** – Business, Technology, Sports, Health, Entertainment, Science
- **Responsive Article Grid** with hover effects
- **Article Detail View** – title, image, source, author, date
- **Read Full Article** button linking to the original source
- **AI Summarizer** – Gemini Pro generates 3 bullet-point summaries
- **My Summaries** page – saved summaries persist via sessionStorage
- **SessionStorage Caching** – avoids redundant NewsAPI calls
- **Backend (Bonus)** – Express + MongoDB for user auth and persistent summary storage

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router v6, Axios |
| Styling | Plain CSS with CSS Custom Properties |
| AI | Google Gemini Pro API |
| News Data | NewsAPI.org |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |

---

## Project Structure

```
news-dashboard/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── CategoryTabs.jsx
│   │   │   ├── ArticleCard.jsx
│   │   │   ├── ArticleGrid.jsx
│   │   │   ├── NoArticles.jsx
│   │   │   └── Spinner.jsx
│   │   ├── pages/        # Full pages (routes)
│   │   │   ├── Home.jsx
│   │   │   ├── ArticleDetail.jsx
│   │   │   └── MySummaries.jsx
│   │   ├── services/     # API call logic (separated from UI)
│   │   │   ├── newsApi.js
│   │   │   └── geminiApi.js
│   │   ├── context/      # React Context for global state
│   │   │   └── SummariesContext.jsx
│   │   ├── utils/        # Helper functions
│   │   │   ├── formatDate.js
│   │   │   └── cache.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.local.example
│   ├── index.html
│   └── vite.config.js
│
└── server/               # Node.js + Express backend (Bonus)
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── summary.controller.js
    │   └── summarizer.controller.js
    ├── middleware/
    │   └── auth.middleware.js
    ├── models/
    │   ├── user.model.js
    │   └── savedArticle.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── summary.routes.js
    │   └── summarizer.routes.js
    ├── .env.example
    └── index.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- A [NewsAPI](https://newsapi.org) key (free)
- A [Google Gemini](https://ai.google.dev) API key (free tier available)
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas)) *(for backend only)*

---

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file (copy from `.env.local.example`):

```env
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Start the dev server:

```bash
npm run dev
```

The app will run at `http://localhost:3000`.

---

### Backend Setup (Bonus)

```bash
cd server
npm install
```

Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/news-dashboard
JWT_SECRET=your_strong_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the backend:

```bash
npm run dev
```

The API will run at `http://localhost:5000`.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |
| GET | `/api/summaries` | Get user's saved summaries | Yes |
| POST | `/api/summaries` | Save a new summary | Yes |
| DELETE | `/api/summaries/:id` | Delete a summary | Yes |
| POST | `/api/summarize` | Proxy Gemini summarization | No |
| GET | `/api/health` | Health check | No |

---

## Architecture Decisions

**Why React Router?**  
Enables client-side navigation between Home, Article Detail, and My Summaries without full page reloads – essential for a SPA feel.

**Why Axios?**  
Cleaner API than native fetch for setting default headers/params. The shared axios instance in `newsApi.js` avoids repeating the API key on every call.

**Why separate services/?**  
Components shouldn't contain API logic. Putting all API calls in `services/` makes them easy to test, reuse, and swap (e.g., switching from direct Gemini calls to the backend proxy).

**Why sessionStorage caching?**  
NewsAPI has a rate limit. Caching by category avoids re-fetching the same data when the user switches tabs back and forth in the same session.

**Why Context for summaries?**  
The Article Detail page saves summaries; My Summaries page reads them. Lifting this state to Context avoids prop-drilling across multiple components.

**Why backend proxy for Gemini?**  
Browser DevTools expose any API key in frontend code. The backend proxy keeps the Gemini key server-side, which is much more secure for production.

---

## Notes on NewsAPI Free Tier

> **Important:** NewsAPI's free developer tier only allows requests from `localhost`. If you deploy the frontend, you'll need a paid plan or a backend proxy to forward the news fetch requests server-side too.

---

## License

MIT – built for educational purposes.
