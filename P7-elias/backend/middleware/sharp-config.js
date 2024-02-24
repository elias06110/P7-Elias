const sharp = require('sharp');
const path = require('path');
const fs = require('fs');



// optimisation pour green code
module.exports = (req, res, next) => {
  if (!req.file) {
      next()
      return 
  }
  const { buffer, originalname } = req.file;
  const fileDatas = path.parse(originalname);
  const link = fileDatas.name.split(' ').join('_') + '_' + Date.now() + '.webp';

  fs.mkdir('./images', (err) => {
      if (err && err.code !== 'EEXIST') {
          console.error(err);
          return res.status(500).json({ error: 'Impossible de créer le dossier images.' });
      }
      sharp(buffer)
      //Optimisation de l'image
          .resize(450, 580)
          .webp({ quality: 20 })
          .toFile(`./images/${link}`, (error) => {
              if (error) {
                  console.error(error);
                  return res.status(500).json({ error: 'Impossible de sauvegarder.' });
              }  
              req.file.filename = link;
              
              next();
          });
  });

};