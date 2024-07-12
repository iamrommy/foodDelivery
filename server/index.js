const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const connectPassport = require('./utils/Provider.js').connectPassport;
const passport = require('passport');
const errorMiddleware = require("./middlewares/errorMiddleware").errorMiddleware;
const session = require('express-session');

require('dotenv').config();
const PORT = process.env.PORT || 4000;


const connectToDB = require('./config/database');
connectToDB();

app.use(cookieParser());
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        cookie: {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none",
        },
    })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.use(errorMiddleware);
app.enable('trust proxy') 
    
connectPassport();

// Set Access-Control-Allow-Credentials header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

//routes 
app.use('/api/v1/auth', userRoutes);
app.use(
    "/api/v1/login",
    passport.authenticate("google", {
      successRedirect: process.env.FRONTEND_URL + "/login",
    })
    // passport.authenticate('google'),
    // (req,res)=>{
    //     res.send('logged in')
    // }
);

app.get('/', (req, res)=>{
    return res.json({
        success:true,
        message:'Your server is up and running...'
    });
});

app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`);
})