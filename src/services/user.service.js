const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    return res.json(users)
}

exports.getUserById = async (req, res) => {
    const idUser = req.params.id
    const user = await User.findById(idUser);
    return res.json(user)
}

exports.registerUser = async (req, res) => {

    const { email, password } = req.body

    let errors = await userValidator(email, password);
    if (Object.keys(errors).length === 0) {
        const salt = await bcrypt.genSalt(10);
        const cryptedPassword = await bcrypt.hash(password, salt)
        try {
            const user = new User({ email, password: cryptedPassword })
            const registeredUser = await user.save();
            return res.json(registeredUser)
        } catch (error) {
            return res.status(500).json({error:"Hubo un problema al intentar guardar el usuario en la base de datos"})
        }

    }

    return res.status(400).json(errors)
}
exports.loginUser = async (req, res) => {
    const {email,password}=req.body;
    const user = await getUserByEmail(email);
    if(!user){
        return res.status(400).json({error:"Usuario no encontrado"})
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.status(400).json({error:"Contraseña invalida"})
    }

    const token = jwt.sign({
        email:user.email,
        id:user._id
    }, process.env.SECRET_TOKEN)
    return res.header("auth-token",token).json({token})
}
exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users)
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email })
    return user
}

async function userValidator(email, password) {
    const errors = {}

    if (!email) {
        errors.emailComplete = false
    } else {
        let user = await getUserByEmail(email)
        if (user) {
            errors.emailExists = true;
        }
    }


    if (!password) {
        errors.passwordComplete = false
    } else if (password.length < 6) {
        errors.passwordShort = true
    }

    return errors

}
