const getFitData = async(fitness, dataTypeName) => {
  const startDate = Date.now() - 2 * 24 * 60 * 60 * 1000; // hace 1 día
  const endDate = Date.now(); // ahora

  const { data } = await fitness.users.dataset.aggregate({
    userId: 'me',
    requestBody: {
      aggregateBy: [
        {
          dataTypeName: dataTypeName
        }
      ],
      startTimeMillis: startDate,
      endTimeMillis: endDate
    }
  });
  const { bucket } = data; 
  const points = bucket[0].dataset[0].point;
  return points;
} 

const getCalories = async (fitness) => {
  /*
  fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: 'com.google.calories.expended'
          }
        ],
        startTimeMillis: startDate,
        endTimeMillis: endDate
      }
    }, (err, res) => {
      if (err) return console.error('Error al obtener los datos de calorías', err);
      console.log('Datos de calorías');
      const { bucket } = res.data;
      const points = bucket[0].dataset[0].point;
      points.forEach((point) => console.log(point.value));
  });
   */
  let dataTypeName = 'com.google.calories.expended';
  const points = await getFitData(fitness, dataTypeName);
  let calory = 0;
  if (points.length !== 0 ){
    points.forEach((point) => {
      value = point.value[0];
      calory = calory + value.fpVal;
    });
    calory = Number(calory.toFixed(0));
  }
  return calory;
}

const getSteps = async (fitness) => {
  let dataTypeName = 'com.google.step_count.delta';
  const points = await getFitData(fitness, dataTypeName);
  let steps = 0;
  if (points.length !== 0 ){
    points.forEach((point) => {
      value = point.value[0];
      steps = steps + value.intVal;
    });
  }
  return steps;
}

const getKilometersTraveled = async (fitness) => {
  let dataTypeName = 'com.google.distance.delta';
  const points = await getFitData(fitness, dataTypeName);
  let kilometersTraveled = 0;
  if (points.length !== 0 ){
    points.forEach((point) => {
      value = point.value[0];
      kilometersTraveled = kilometersTraveled + value.fpVal;
    });
    kilometersTraveled = Number(kilometersTraveled.toFixed(0));
  }
  return kilometersTraveled;
}

const getCardioPoints = async (fitness) => {
  let dataTypeName = 'com.google.heart_minutes';
  const points = await getFitData(fitness, dataTypeName);
  let cardioPoints = 0;
  if (points.length !== 0 ){
    points.forEach((point) => {
      value = point.value[0];
      cardioPoints = cardioPoints + value.fpVal;
    });
    cardioPoints = Number(cardioPoints.toFixed(0));
  }
  return cardioPoints;
}

const getHeartRate = async (fitness) => {
  let dataTypeName = 'com.google.heart_rate.bpm';
  const points = await getFitData(fitness, dataTypeName);
  let heartRate = 0;
  if (points.length !== 0 ){
    points.forEach((point) => {
      value = point.value[0];
      heartRate = heartRate + value.fpVal;
    });
    heartRate = heartRate / points.length;
    heartRate = Number(heartRate.toFixed(0));
  }
  return heartRate;
}

const getBreathingRate = async (fitness) => {
  let dataTypeName = 'com.google.oxygen_saturation';
  const points = await getFitData(fitness, dataTypeName);
  let breathingRate = 0;
  if (points.length !== 0 ){
    points.forEach((point) => {
      value = point.value[0];
      console.log(value);
      breathingRate = breathingRate + value.fpVal;
    });
    breathingRate = Number(breathingRate.toFixed(0));
  }
  return breathingRate;
}

const getWidth = async (fitness) => {
  let dataTypeName = 'com.google.weight';
  const points = await getFitData(fitness, dataTypeName);
  let width = 0;
  if (points.length !== 0 ){
    points.forEach((point) => {
      value = point.value[0];
      width = width + value.fpVal;
    });
    width = Number(width);
  }
  return width;
}

const getHeight = async (fitness) => {
  let dataTypeName = 'com.google.height';
  const points = await getFitData(fitness, dataTypeName);
  let height = 0;
  if (points.length !== 0 ){
    points.forEach((point) => {
      value = point.value[0];
      height = height + value.fpVal;
    });
    height = Number(height.toFixed(2));
  }
  return height;
}

module.exports = {
  getCalories,
  getSteps,
  getKilometersTraveled,
  getCardioPoints,
  getHeartRate,
  getBreathingRate,
  getWidth,
  getHeight
}