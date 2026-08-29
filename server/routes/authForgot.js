import { Router } from 'express'
import { User } from '../models/User.js'
import { generateOtp, saveOtp, sendOtpEmail, verifyOtp, peekOtp } from '../utils/service.js'

const router = Router()

//Forgot Password
router.post("/request",async(req,res,next)=>{
    try {
        const email = (req.body.email || "").trim().toLowerCase()
        if(!email){
            return res.json({
                error : 'Email is Required'
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error : 'No Account Found with that email'
            })
        }
        if(!user.emailVerified) {
            return res.json({
                error : 'Please Verify your email first'
            })
        }
        const code = generateOtp()
        saveOtp(email,code)
        await sendOtpEmail({to:email,name:user.name,code,purpose:'forgot'})
        res.json({ok:true,email})
    } catch (error) {
        next(error)
    }

})

// step 2 to verify the code 
router.post('/verify-code', async (req,res,next) =>{
    try {
        const email = (req.body.email || "").trim().toLowerCase()
        const code = (req.body.code || "").trim()

        if (!email || ! code){
            return res.json({
                error : 'Email and Code are Required'
            })
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                error : "No account Found"
            })
        }
       // Keep the code available for the final reset request. The reset
       // endpoint consumes it after the new password has been saved.
       const result = peekOtp(email,code)
       if(!result.ok) {
        return res.json({
            error : result.reason
        })
       }
       return res.json({ ok: true })
    } catch (error) {
        next(error)
    }
})
 
// stp 3 To Change the Password

router.post('/reset-password', async (req,res,next)=>{
    try {
         const email = (req.body.email || "").trim().toLowerCase()
         const code = (req.body.code || "").trim()
         const { newPassword } = req.body
         if (!email || ! code){
            return res.json({
                error : 'Email and Code are Required'
            })
         }
         if (!newPassword || newPassword.length < 6){
            return res.json({
                error : 'Password must be atleast of 6 characters'
            })
         }
         const user = await User.findOne({email})
         if(!user){
            return res.json({
                error : 'No Account Found'
            })
         }
         const result = await verifyOtp(email,code)
         if(!result.ok) {
            return res.json({
                error : result.reason
            })
         }
         user.passwordHash = await User.hashPassword(newPassword)
         user.emailVerified = true
         await user.save()
         return res.json({ok:true})
         
    } catch (error) {
        next(error)
    }
})


export default router
