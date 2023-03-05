const FitService = require("../services/fit");

const getFit = async (req, res) => {
    const data = req.body;
    try {
        const message = await FitService.getFit(data);
        return res.status(201).send(message);
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
    getFit
}