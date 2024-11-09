import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import passport from 'passport';
import initiatePassport from './middlewares/passport.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

dotenv.config(); // Ensure environment variables are loaded
const app = express();

app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser())
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
initiatePassport(); // Ensure the correct function is called

app.use(router);

export default app;