const config = require('config').get('app');

const verifyAuthKey = (req, res, next) => {

    const xApiKey = req.headers['x-api-key'];
    if (!xApiKey) {
        return res
            .status(400)
            .json({
                error: "X-API-KEY is missing. Please provide an API key",
            });
    }
    if (xApiKey === config.x_api_key) { next(); }
    else {
        res.status(403).json({ error: "Invalid API key" });
    }

};

module.exports = {
    verifyAuthKey,
};
