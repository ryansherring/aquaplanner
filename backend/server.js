const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

const db = require('./models');
const routes = require('./routes');

require('dotenv').config();

const PORT = process.env.PORT || 4000

// MIDDLEWARE:

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyparser.json());

app.use(
    session({
        store: new MongoStore({ url: process.env.MONGO_URI }),
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
);

// API ROUTES:

app.use('api/v1/auth', routes.auth);
app.use('api/v1/users', routes.users);
app.use('api/v1/gardens', routes.gardens);
app.use('api/v1/plants', routes.plants);


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
  