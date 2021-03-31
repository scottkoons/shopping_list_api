const express = require('express');
const itemsRoutes = require('./routes/itemsRoutes');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRoutes);


app.get("/", function (req, res) {
    res.send('Shopping List');
});

/** 404 handler */
app.use(function (req, res, next) {
    return new ExpressError("Not found", 404);
});


/** general error handler */
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    });
});

module.exports = app;