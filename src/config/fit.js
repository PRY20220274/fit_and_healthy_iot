const axios = require("axios");
const {google} = require('googleapis');

const auth = new google.auth.GoogleAuth({
    // Llave de autenticación en JSON descargada desde la consola de Google Cloud.
    keyFile: './path/to/credentials.json', 
    // Ámbito de la API de Google Fit.
    scopes: [
      'https://www.googleapis.com/auth/fitness.activity.read',
      'https://www.googleapis.com/auth/fitness.body.read',
    ],
  }
);

// Crea un cliente de la API de Google Fit.
const fitness = google.fitness({
    version: 'v1',
    auth: auth,
  }
);
  
fitness.users.dataSources.datasets.get({
    userId: 'me',
    dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
    datasetId: `${startDate}-${endDate}`,
  }, (err, res) => {
    if (err) throw err;
    console.log(res.data);
  }
);

const url = 'https://www.googleapis.com/fitness/v1/users/me/dataSources';

const getAxios = async () => {
    const data = await axios.get(url);
    console.log(data);
    return data
}

module.exports = {
    getAxios
}