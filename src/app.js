import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import passport from 'passport';
import initiatePassport from './middlewares/passport.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit'
import cors from 'cors'; // Import cors

dotenv.config(); // Ensure environment variables are loaded
const app = express();

app.use(cors({
  origin: '*', // Allow requests from any origin
  credentials: false, // Credentials are not supported with `origin: '*'`
}));

app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', 
	legacyHeaders: false,
})

app.use(limiter)

app.use(passport.initialize());
app.use(passport.session());
initiatePassport(); // Ensure the correct function is called

app.use(router);

export default app;
