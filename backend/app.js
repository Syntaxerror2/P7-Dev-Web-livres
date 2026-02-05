const express = require('express');
const mongoose = require('mongoose');

const app = express();
/*
mongoose.connect(
  //'mongodb+srv://syntaxerror1:mongo6785@cluster1.5iezpx7.mongodb.net/books?appName=Cluster1'
  'mongodb+srv://syntaxerror1:mongo12345@cluster1.5iezpx7.mongodb.net/?appName=Cluster1'
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.error(err));

*/

mongoose
  .connect(
    "mongodb+srv://niolwebshop:yhxXNcIYZ7vX8F7z@p7.rjb8efq.mongodb.net/?appName=test"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => {console.error(err)}, console.log("Connexion à MongoDB échouée !"));




app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/books', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
  next();
});

app.get('/api/books', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});

//modules zerzerzerzr


module.exports = app;