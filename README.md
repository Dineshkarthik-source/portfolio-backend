# Deploying your portfolio (with real message storage)

You have two pieces:
1. **Backend** (this folder) — Express + MongoDB. Saves contact form messages and checks your password.
2. **Frontend** (`portfolio.html`) — your actual site. Talks to the backend over the internet.

Do these in order.

## 1. Create your database (MongoDB Atlas — free)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a free (M0) cluster.
3. Under **Database Access**, create a database user with a username and password (save these).
4. Under **Network Access**, click **Add IP Address** → **Allow access from anywhere** (0.0.0.0/0) — fine for a small project like this.
5. Click **Connect** on your cluster → **Drivers** → copy the connection string. It looks like:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   Add `portfolio` as the database name right before the `?`, e.g. `.../portfolio?retryWrites...`

## 2. Set your admin password

In this folder, run:
```
npm install
node generate-password-hash.js "yourNewSecretPassword"
```
It'll print an `ADMIN_PASSWORD_HASH` value — copy it.

## 3. Fill in your .env file

Copy `.env.example` to `.env` and fill in:
- `MONGO_URI` — from step 1
- `JWT_SECRET` — make up any long random string
- `ADMIN_PASSWORD_HASH` — from step 2
- Leave `ALLOWED_ORIGIN` as `*` for now

## 4. Deploy the backend (Render — free)

1. Push this `portfolio-backend` folder to a new GitHub repo.
2. Go to https://render.com, sign up, click **New +** → **Web Service**.
3. Connect your GitHub repo.
4. Build command: `npm install` — Start command: `npm start`.
5. Under **Environment**, add the same variables from your `.env` file (MONGO_URI, JWT_SECRET, ADMIN_PASSWORD_HASH, ALLOWED_ORIGIN, PORT).
6. Deploy. You'll get a URL like `https://dhinesh-portfolio-backend.onrender.com`.

Note: Render's free tier sleeps after inactivity — the first request after a while can take ~30 seconds to wake up. That's normal.

## 5. Point your frontend at the backend

Open `portfolio.html`, find this line near the bottom:
```js
const API_BASE = 'PASTE_YOUR_BACKEND_URL_HERE';
```
Replace it with your real Render URL, e.g:
```js
const API_BASE = 'https://dhinesh-portfolio-backend.onrender.com';
```

## 6. Deploy the frontend (Netlify — free, easiest)

1. Go to https://app.netlify.com/drop
2. Drag and drop `portfolio.html` (rename it to `index.html` first) onto the page.
3. Netlify gives you a live link instantly, e.g. `https://dhinesh-portfolio.netlify.app`.
4. Optional: in Netlify's site settings, change the site name to something cleaner.

That link is what you post on Instagram, LinkedIn, etc.

## 7. Lock down CORS (optional but recommended)

Once you have your real Netlify URL, go back to Render's environment variables and set:
```
ALLOWED_ORIGIN=https://dhinesh-portfolio.netlify.app
```
This stops other websites from calling your backend directly.

## Viewing your messages

On your live site, click the ✉ icon bottom-right, enter the password you set in step 2, and you'll see every message — pulled live from your MongoDB database.
