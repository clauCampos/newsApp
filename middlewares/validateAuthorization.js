import jsonwebtoken from 'jsonwebtoken'
import {generateError} from "../helpers/generateError.js";

export const validateAuthorization = async (request, response, next)=>{
    try{
        const {authorization} = request.headers;
        if(!authorization){
            throw generateError("Missing token", 400);
        }

        const [tokenType, token] = authorization.split(" ");
        if (tokenType !== "Bearer" || !token) {
            throw generateError("Invalid token format", 400);
        }

        const tokenInfo = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        request.auth = tokenInfo;

        next()
    }catch (error){
        next(error)
    }
}