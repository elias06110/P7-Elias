const mongoose = require("mongoose");

// Fonction de validation personnalisée pour vérifier si la chaîne n'est pas vide ou composée uniquement d'espaces
const nonEmptyStringValidator = function (value) {
  return typeof value === 'string' && value.trim().length > 0;
  
};

//vérifie si la valeur est un nombre entier et si elle est dans une plage plausible pour représenter une année 
const validYearValidator = function (value) {
  const currentYear = new Date().getFullYear();
  return Number.isInteger(value) && value >= 1000 && value <= currentYear;
};



const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true, validate: nonEmptyStringValidator },
  author: { type: String, required: true, validate: nonEmptyStringValidator },
  imageUrl: { type: String, required: true, validate: nonEmptyStringValidator },
  year: { type: Number, required: true, validate: [validYearValidator, "Please enter a valid year"]  },
  genre: { type: String, required: true, validate: nonEmptyStringValidator },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true },
    },
  ],
  averageRating: { type: Number, required: true },
});

module.exports = mongoose.model("Book", bookSchema);