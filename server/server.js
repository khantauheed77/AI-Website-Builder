import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { connectDB } from './controllers/db.js'
import authRouter from './routes/authRoutes.js'
import projectRouter from './routes/projectRoutes.js'
import communityRouter from './routes/communityRoutes.js'
import paymentRouter from './routes/PaymentRoutes.js'

// Always load the backend's .env file, regardless of where `node` was started.
dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) })

const PORT = process.env.PORT || 4000
const app = express()

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
]);

// Middleware
app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials : true 
}))
app.use(express.json({ limit: "1mb" }))

app.use((req, _res, next) => {
  if (req.path.startsWith("/api/auth")) {
    console.log(`[auth] ${req.method} ${req.path}`);
  }
  next();
});

// Routes
app.use('/api/auth',authRouter)
app.use('/api/projects',projectRouter)
app.use('/api/community', communityRouter)
app.use('/api/payments', paymentRouter);

app.get('/', (req, res) => {
    res.send("API Running!")
})

// Starts server.
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

startServer();
