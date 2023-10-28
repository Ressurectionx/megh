const express = require('express');
const app = express();
const router = require('./app/routes/routes');
const config = require('config');
const bodyParser = require('body-parser');
const PORT = config.get('app').get('port');

// adding additional routes for api
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use('/api/v1/meghplat', router);

const start = async () => {
    await app.listen(PORT, console.log(`Server running on ${PORT}`));
}

//starting the server on port 5001
start();