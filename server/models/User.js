import mongoose from "mongoose"
import bcrypt from "bcrypt"

const STARTING_CREDITS = 20
const userSchema = new mongoose.Schema({
    name : {
        require : true,
        type : String,
        trim : true,
        maxlength : 32
    },
    email : {
        require : true,
        type : String,
        unique : true,
        lowercase : true,
        trim : true ,
        index : true
    },
    passwordHash :{
        type : String,
        require : true
    },
   credits : {
    type : Number,
    default : STARTING_CREDITS,
    min : 0
   },
   emailVerified : {
    type : Boolean,
    default : true 
   }
},{
    timestamps : true
})

// To return safe object to client (no pass)
userSchema.methods.toClient = function() {
   return {
    id : this._id.toString(),
    name : this.name,
    email : this.email,
    emailVerified : Boolean(this.emailVerified),
    credits : this.credits,
    createdAt : this.createdAt,
    updatedAt : this.updatedAt
   }
}

//hash
userSchema.statics.hashPassword = function (plain) {
    return  bcrypt.hash(plain , 10)
}
//verify
userSchema.methods.verifyPassword = function(plain , hash){
    return bcrypt.compare(plain , this.passwordHash)
}

userSchema.statics.STARTING_CREDITS = STARTING_CREDITS

const User = mongoose.model("User" , userSchema)
export { User }
export default User