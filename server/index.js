const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');

let app = express();
const port = process.env.PORT || 8000;

mongoose.Promise = global.Promise;

const db = config.get('DATABASE');
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((database) => {
        console.log(`Connected to ${db}`);
    })
    .catch((err) => console.log('DB could not connect.'));

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({
            level: 'debug',
        }),
        new winston.transports.File({
            filename: './logs/combined.log',
            level: 'http',
            maxsize: '5m',
            maxFiles: 5,
            handleExceptions: true,
            colorize: true,
        }),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error',
            maxsize: '5m',
            maxFiles: 5,
            colorize: true,
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.http(message);
    },
};

// Middleware
app.use((req, res, done) => {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    done();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// Import routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/image');
const pingRoute = require('./routes/ping');

// Use routes middleware
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', imageRoute);
app.use('/api', pingRoute);

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});
