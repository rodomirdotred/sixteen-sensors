require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.get('/sensors', async (req, res) => {
  const secret = process.env.SECRET;
  if (!req.headers.auth || req.headers.auth !== secret) {
    return res.status(403).json({
      statusCode: 403,
      statusText: "You don't have permission!",
      data: null,
      message: 'Have a good day dear visitor',
    });
  }
  const sensors = [];
  sensors.length = 15;
  const sensorIndex = Math.floor(Math.random() * 15);
  sensors[sensorIndex] = Math.floor(Math.random() * 9) / 10;
  for (let i = (sensorIndex - 1) % 15; i >= 0; i -= 1) {
    let temp = sensors[i + 1];
    while (temp >= sensors[i + 1]) {
      temp = Math.random();
    }
    sensors[i] = temp;
  }

  for (let i = (sensorIndex + 1) % 15; i < 16; i += 1) {
    let temp = sensors[i - 1];
    while (temp >= sensors[i - 1]) {
      temp = Math.random();
    }
    sensors[i] = temp;
  }
  const optimizedSensors = sensors.map((value) => Math.round(value * 10000) / 10000);
  return res.status(200).json({
    statusCode: 200,
    statusText: 'everything going well :)',
    data: optimizedSensors,
    message: 'Have a good day dear Mr. M.J.O.N.',
  });
});
// eslint-disable-next-line no-console
app.listen(8080, () => console.log('`app runnig on port 8080 `'));
