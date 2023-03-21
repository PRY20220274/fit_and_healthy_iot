const FitConfig = require('../config/fit')

const getUrl = async () => {
    const permissionUrl = await FitConfig.getUrl();
    return permissionUrl;
}

const getAccess = async (code) => {
    const accessTokens = await FitConfig.getTokens(code);
    return accessTokens;
}

const refreshAccess = async (refresh_token) => {
    const { tokens } = await FitConfig.getNewTokens(refresh_token);
    return tokens;
}

const getFit = async (tokens) => {
    const fit = await FitConfig.getResponseFit(tokens);
    return fit;
}

module.exports = {
    getUrl,
    getAccess,
    refreshAccess,
    getFit
}