import express from 'express'
import { changePassword, deleteAccount, Login, me, register, resendRegister, updateProfile, verifyRegister, contribution } from '../controllers/authController.js'
import { requireAuth } from '../middlewares/auth.js'
import forgotRoutes from '../routes/authForgot.js'

const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.post('/register/verify',verifyRegister)
authRouter.post('/register/resend',resendRegister)
authRouter.post('/login',Login)


// to access this routes user must be logged in 
authRouter.get('/me',requireAuth,me)
authRouter.get('/me/contributions',requireAuth , contribution)

authRouter.patch('/me', requireAuth, updateProfile)
authRouter.patch('/me/password',requireAuth,changePassword)
authRouter.delete('/me',requireAuth,deleteAccount)

// forgot password nd reset 
authRouter.use('/forgot',forgotRoutes)




export default authRouter