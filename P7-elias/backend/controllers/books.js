const Book = require('../models/books');
const fs = require('fs');

//fonction pour ajouter un livre
exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  book.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
  
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id
  }).then(
    (book) => {
      res.status(200).json(book);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.updateBook = (req, res, next) => {
  const bookObject = req.file ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  } : { ...req.body };
  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
      .then((book) => {
          if (book.userId != req.auth.userId) {
              res.status(403).json({ message: '403: unauthorized request' });
          } else if (req.file) {
              const filename = book.imageUrl.split('/images')[1];
              fs.unlink(`images/${filename}`, () => { });
          }
          Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
              .then(res.status(200).json({ message: 'Livre modifié! ' }))
              .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(400).json({ error }));
};


exports.deleteBook = (req, res, next) => {
  Book.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllBooks = (req, res, next) => {
  Book.find().then(
    (books) => {
      res.status(200).json(books);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.bestRating = (req, res, next) => {
  Book.find()
    .then((books) => {
      var topValues = books.sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);
      console.log(topValues);
      res.status(200).json(topValues);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};


exports.rating = (req, res, next) => {
  const user = req.body.userId;
  if (user !== req.auth.userId) {
      res.status(401).json({ message: 'Non autorisé' })
  } else {
      Book.findOne({ _id: req.params.id })
          .then(book => {
            //Cherche si  l'utilisateur a deja noté le livre
              if (book.ratings.find(rating => rating.userId === user)) {
                  res.status(401).json({ message: 'Livre déjà noté' })
              } else {

                  const newRating = {
                      userId: user,
                      grade: req.body.rating,
                      _id: req.body._id
                  };
                  const updatedRatings = [
                      ...book.ratings,
                      newRating
                  ];

                  //calcule la nouvelle note moyenne
                  function calcAverageRating(ratings) {
                      const sumRatings = ratings.reduce((total, rate) => total + rate.grade, 0);
                      const average = sumRatings / ratings.length;
                      return parseFloat(average.toFixed(2));
                  };
                  //met a jour la note moyenne
                  const updateAverageRating = calcAverageRating(updatedRatings);
                  Book.findOneAndUpdate(
                      { _id: req.params.id, 'ratings.userId': { $ne: user } },
                      { $push: { ratings: newRating }, averageRating: updateAverageRating },
                      { new: true }
                  )
                      .then(updatedBook => res.status(201).json(updatedBook))
                      .catch(error => res.status(401).json({ error }));
              };
          })
          .catch(error => res.status(401).json({ error }));
  }
};