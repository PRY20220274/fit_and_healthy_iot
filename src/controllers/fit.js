const FitService = require("../services/fit");

const getUrl = async (req, res) => {
    try {
        const url = await FitService.getUrl();
        return res.status(200).send({ 'url' : url });
    } catch (err) {
        if(err.status) {
            return res.status(err.status).json({
                message: err.message,
            })
        }
        return res.status(500).json({
            message: 'Error on server'
        })
    }
}

const getAccess = async (req, res) => {
    const data = req.body;
    const { code } = data;
    try {
        const access = await FitService.getAccess(code);
        return res.status(200).send(access);
    } catch (err) {
        if(err.status) {
            return res.status(err.status).json({
                message: err.message,
            })
        }
        return res.status(500).json({
            message: 'Error on server'
        })
    }
}

const refreshAccess = async (req, res) => {
    const data = req.body;
    const { refresh_token } = data;
    try {
        const refresh = await FitService.refreshAccess(refresh_token);
        return res.status(200).send(refresh);
    } catch (err) {
        if(err.status) {
            return res.status(err.status).json({
                message: err.message,
            })
        }
        return res.status(500).json({
            message: 'Error on server'
        })
    }
}

const getFit = async (req, res) => {
    const tokens = req.body;
    try {
        const url = await FitService.getFit(tokens);
        return res.status(201).send({ 'url' : url });
    } catch (err) {
        console.log(err);
        if(err.status) {
            return res.status(err.status).json({
                message: err.message,
            })
        }
        return res.status(500).json({
            message: 'Error on server'
        })
    }
}

module.exports = {
    getUrl,
    getAccess,
    refreshAccess,
    getFit
}