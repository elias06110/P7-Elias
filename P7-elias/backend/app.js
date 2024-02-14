//Importation du module Express et création d'une instance d'application
const express = require("express");
const app = express();
require('dotenv').config()

//permet  la gestion des données au format JSON dans les requêtes.
app.use(express.json());


const userRoutes = require('./routes/user')
const booksRoutes = require('./routes/books')

//connexion mongodb

const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${process.env.LOGIN_DB}:${process.env.PASSWORD_DB}@cluster0.eydssau.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//headers pour CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const cors = require("cors");

app.use(cors()); // Ce middleware autorise toutes les origines par défaut

app.use('/api/books',booksRoutes)
app.use('/api/auth',userRoutes)
app.use('/images',express.static('images'))


module.exports = app;
