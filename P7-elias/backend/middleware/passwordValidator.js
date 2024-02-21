const PasswordValidator = require("../models/modelPassword");

module.exports = (req, res, next) => {
  const password = req.body.password;
  if (req.body.password === "") {
    return res.status(400).json({ message: "mot de passe obligatoire" });
  }
  if (PasswordValidator.validate(password)) {
    next();
  } else {
    return res
      .status(400)
      .json({
        message:
          "votre mot de passe doit faire entre 8 et 20 caractères et contenir au moins, 1 minuscule, 1 majuscule, 2 chiffres",
      });
  }
};
