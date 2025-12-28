const express = require('express');
const mongoose = require('mongoose');
const { mongoDBURL } = require('./config');
const { booksRoute } = require('./routes/booksRoute');
const cors = require('cors');

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS POLICY
app.use(cors());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome to home page!");
});

app.use('/books', booksRoute);

const PORT = 5555;
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to database");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });