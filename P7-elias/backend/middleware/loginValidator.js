var validator = require("email-validator");

module.exports = (req, res, next) => {
    const email = req.body.email
        if(!email){
            return res.status(400).json({message:'email obligatoire'})
        }
        if(validator.validate(email)=== false){
            return res.status(400).json({message:'email invalide'})
        }
        if(req.body.password === ""){
            return res.status(400).json({message:'mot de passe obligatoire'})
        }
 };