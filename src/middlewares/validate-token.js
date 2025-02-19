import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

export const validateJWT = async (req, res, next) => {

    try{
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Token not found"
            })
        };

        token = token.replace(/^Bearer\s+/, "");

        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const user = await User.findById(uid);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "The user doesn't exist in te databse"
            }) 
        }

        if(user.status === false){
            return res.status(400).json({
                success: false,
                message: "User desactivated previously"
            })
        }

        req.usuario = user
        next()


    }catch(error){
        return res.status(500).json({
            success: false,
            message : "Error at validate token",
            error: error.message
        })
    }

}