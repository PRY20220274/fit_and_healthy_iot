const axios = require("axios");

const url = 'https://www.googleapis.com/fitness/v1/users/me/dataSources';

const getAxios = async () => {
    const data = await axios.get(url);
    console.log(data);
    return data
}

module.exports = {
    getAxios
}