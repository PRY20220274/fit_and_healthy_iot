const { getAxios } = require('../config/fit')

const getFit = async (data) => {
    console.log(data);
    const axios = await getAxios();
    console.log(axios);
    return {'message': 'The fit was retrieved'};
}

module.exports = {
    getFit
}