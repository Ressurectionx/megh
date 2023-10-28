const userService = require('./../service/user_service');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const response = await userService.loginService(username, password);
    res.json(response);
}

exports.getScheme = async (req, res) => {
    const { username } = req.body;
    const response = await userService.getSchemeService(username);
    res.json(response);
}





