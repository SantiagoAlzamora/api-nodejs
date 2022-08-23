const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(403).json({error:"Acceso denegado"})
    }
    try {
        const verified = jwt.verify(token,process.env.SECRET_TOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({error:"El token no es valido"})
    }
}

module.exports = verifyToken;