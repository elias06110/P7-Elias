const sharp = require('sharp');
const path = require('path');
const fs = require('fs');



// green code
module.exports = (req, res, next) => {
  if (!req.file) {
      next()
      return 
  }
  const { buffer, originalname } = req.file;
  const fileDatas = path.parse(originalname);
  const link = fileDatas.name.split(' ').join('_') + '_' + Date.now() + '.webp';

  fs.mkdir('./images', () => {
      
      sharp(buffer)
      //Optimisation de l'image
          .resize(450, 580)
          .webp({ quality: 20 })
          .toFile(`./images/${link}`, () => { 
              req.file.filename = link;
              next();
          });
  });

};