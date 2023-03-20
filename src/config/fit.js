const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '1015848921868-m4h45guf7krok80c8vkee9saedqnoh8m.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'http://localhost:4040/api/url';

const oAuth2Client = new OAuth2Client( CLIENT_ID, CLIENT_SECRET, REDIRECT_URL );

const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.blood_glucose.read',
    'https://www.googleapis.com/auth/fitness.blood_pressure.read',
    'https://www.googleapis.com/auth/fitness.body.read',
    'https://www.googleapis.com/auth/fitness.heart_rate.read',
    'https://www.googleapis.com/auth/fitness.body_temperature.read',
    'https://www.googleapis.com/auth/fitness.location.read',
    'https://www.googleapis.com/auth/fitness.nutrition.read',
    'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',
    'https://www.googleapis.com/auth/fitness.reproductive_health.read'
];

const getUrl = async () => {
    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    return url;
}

const getTokens = async (code) => {
    const { tokens } = await oAuth2Client.getToken(code);
    return tokens;
}

const getNewTokens = async (refresh_token) => {
    const newTokens = await oAuth2Client.refreshToken(refresh_token);
    return newTokens;
}

const getResponseFit = async (access) => {
    oAuth2Client.setCredentials(access);

    const startDate = Date.now() - 7 * 24 * 60 * 60 * 1000; // hace 7 días
    const endDate = Date.now(); // ahora
    

    const fitness = google.fitness({
        version: 'v1',
        auth: oAuth2Client,
    });

    fitness.users.dataSources.list({
      userId: 'me'
    }, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res.data);
    });

    /*const calories = await fitness.users.dataSources.datasets.get({
      userId: 'me',
      dataSourceId: 'derived:com.google.calories.bmr:com.google.android.gms:merged',
      datasetId: `${startDate}-${endDate}`,
    }, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res.data);
      const point = res.data.point[0];
      console.log(point);
      return res.data;
    });*/

    console.log(calories);

    /*fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          "aggregateBy": [
            {
              "dataTypeName": "com.google.oxygen_saturation.summary",
              "dataSourceId": "derived:com.google.oxygen_saturation:com.google.android.gms:from_data_source"
            }
          ],
          "bucketByTime": { "durationMillis": 86400000 },
          "startTimeMillis": startDate,
          "endTimeMillis": endDate
        },
      }, (err, res) => {
        if (err) {
          console.error('Error al obtener datos de Google Fit:', err);
          return;
        }
        console.log('Datos de calorías de Google Fit:', res.data);
      }
    );*/
}

module.exports = {
    getUrl,
    getTokens,
    getNewTokens,
    getResponseFit
}