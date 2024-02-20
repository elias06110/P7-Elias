const mongoose = require("mongoose");

// Fonction de validation personnalisée pour vérifier si la chaîne n'est pas vide ou composée uniquement d'espaces
const nonEmptyStringValidator = function (value) {
  return typeof value === 'string' && value.trim().length > 0;
  
};

const nonEmptyNumberValidator = function (value) {
  return typeof value === 'Number' && value.trim().length > 0;
  
};

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true, validate: nonEmptyStringValidator },
  author: { type: String, required: true, validate: nonEmptyStringValidator },
  imageUrl: { type: String, required: true, validate: nonEmptyStringValidator },
  year: { type: Number, required: true , validate: nonEmptyNumberValidator},
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