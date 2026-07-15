# NewsBoard

An AI-powered news dashboard built with React + Express. Browse real-time headlines, read full articles, and get instant 3-bullet AI summaries powered by Google Gemini — all in one place.

---

## How to Use

### 1. Browse News
- Open the app — you'll see today's top headlines on the **Home** page
- Switch categories using the tabs (General, Technology, Sports, Business, etc.)

### 2. Read Full Articles
- Click any news card to open the full article view
- The app automatically fetches and displays the complete article text inside the app — no redirects

### 3. Get an AI Summary
- On the article page, click the **✨ Summarise** button at the top
- Gemini AI generates a clean 3-bullet point summary in seconds
- The summary appears right below the button

### 4. Save Summaries (Guest)
- Summarized articles are automatically saved to your **My Summaries** tab
- As a guest, they're stored in your browser's local storage and persist across refreshes

### 5. Create an Account (Optional)
- Click **Login** in the navbar → **Sign up**
- Once logged in, your summaries sync to the cloud (MongoDB) — so they're available from any device

### 6. Manage Your Summaries
- Go to **My Summaries** in the navbar
- View, re-read, or remove any saved summary

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — category tabs, live news cards |
| `/article` | Full article view — scraped text, AI summary, save |
| `/my-summaries` | All your saved AI summaries |
| `/login` | Login with email and password |
| `/register` | Create a new account |

---

## Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Vanilla CSS (dark mode, mobile-first)

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication (bcryptjs)

**APIs**
- Google Gemini 3.5 Flash — AI summarization
- NewsAPI.org — real-time headlines
- Cheerio — full article scraping

---

## Running Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)
- NewsAPI.org API key (free)
- Google AI Studio API key (free)

### Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret
GEMINI_API_KEY=your_gemini_api_key
NEWS_API_KEY=your_newsapi_key
PORT=5000
```

```bash
node index.js
```

### Frontend
```bash
cd client
npm install
npm run dev
```

Opens on `http://localhost:5173`

---

## Project Structure

```
news-dashboard/
├── client/                   # React frontend
│   └── src/
│       ├── components/       # Navbar, NewsCard, Spinner
│       ├── context/          # AuthContext, SummariesContext
│       ├── pages/            # Home, ArticleDetail, MySummaries, Login, Register
│       ├── services/         # newsApi.js, geminiApi.js
│       └── utils/            # formatDate.js
│
└── server/                   # Express backend
    ├── config/               # MongoDB connection
    ├── controllers/          # auth, news, scraper, summarizer, summary
    ├── middleware/            # JWT protect
    ├── models/               # User, SavedArticle
    └── routes/               # All API routes
```

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/api/news/top-headlines` | No | Top headlines by category |
| GET | `/api/news/everything` | No | Search news |
| GET | `/api/scrape` | No | Extract full article text |
| POST | `/api/summarize` | No | Generate AI summary |
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/summaries` | Yes (JWT) | Get user's saved summaries |
| POST | `/api/summaries` | Yes (JWT) | Save a summary |
| DELETE | `/api/summaries/:id` | Yes (JWT) | Delete a summary |

---

Made by **Aditya Raj** — [github.com/adityaraj250806-jpg](https://github.com/adityaraj250806-jpg)
