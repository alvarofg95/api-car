import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
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
  const {
    params: { brand }
  } = req;
  if (brand) {
    const brandModels = models
      .filter(item => item.brand_id === brand)
      .map(item => ({ name: item.name, id: item.id, slug: item.slug }));
    if (brandModels && brandModels.length > 0) {
      res.status(200).json(brandModels);
    } else {
      res.status(410).json('No existen modelos para esa marca de coches');
    }
  } else {
    res.status(411).json('No hemos recibido ninguna marca');
  }
});

app.get('/media/:brand', (req, res) => {
  // const { params: { brand } } = req;
  const brand = 'abarth.png';
  if (brand) {
    fs.readFile(`./media/${brand}`, 'base64', (err, base64Image) => {
      const dataURL = `data:image/png;base64, ${base64Image}`;
      return res.send(`<img src="${dataURL}`);
    });
  }
});
