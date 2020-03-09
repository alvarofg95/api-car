import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import brands from './utils/brands.json';
import models from './utils/models.json';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get('/cars/brands', (req, res) => {
  res.json(brands);
});

app.get('/cars/models/:brand', (req, res) => {
  const { params: { brand } } = req;
  if (brand) {
    const brandModelsIndex = models.findIndex(item => item.brand === brand);
    if (brandModelsIndex > -1) {
      const brandModels = models[brandModelsIndex].models;
      res.status(200).json(brandModels);
    } else {
      res.status(410).json('No existen modelos para esa marca de coches');
    }
  } else {
    res.status(411).json('No hemos recibido ninguna marca');
  }
});
