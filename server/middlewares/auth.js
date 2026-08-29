import jwt from 'jsonwebtoken'

import { User } from "../models/User.js";

// to create a jwt token valid for 30 days

// Signs token.
export function signToken(userid){
    const secret = process.env.JWT_SECRET
    if(!secret) throw new Error("JWT Secret missing")

    return jwt.sign({
        id : userid.toString()
    } , 
    secret, {
        expiresIn : "30d"
    })
}

// to check and validate user is logged in or not 

// Requires auth.
export async function requireAuth(req,res,next){
    try {
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : (header.startsWith("Bearer") ? header.slice(6).trim() : null);
        if (!token){
            return res.status(401).json({
                error : "No Token provided"
            })
        }
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        const userId = payload.id || payload.sub;
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                error : "User not found"
            })
        }
        req.user = user
        next()
    } catch (error) {
       return res.status(401).json({
        error : "Invalid or Expired Token"
       })
    }
}

// if token found attach the token else make it anonymous
export async function optionalAuth(req,res,next){
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : (header.startsWith("Bearer") ? header.slice(6).trim() : null);
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      const userId = payload.id || payload.sub;
      const user = await User.findById(userId)
      if (user) req.user = user 
    }
  } catch (error) {
    //invalid token and ignore the error 
  }
  next()
}

export const attachToken = optionalAuth; 
