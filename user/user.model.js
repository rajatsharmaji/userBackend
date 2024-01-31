import mongoose from "mongoose"

const User = mongoose.Schema(
    {
        Name:{
            type: String,
            required: true,
        },
        Email:{
            type: String,
            required: true,
            unique: true,
        },
        Password:{
            type: String,
            required:true,
        },
        DOB:{
            type: Date,
            required: true
        },
        UUID:{
            type: String,
            required: true
        }
    },{
        timestamp: true
    }
)

export default mongoose.model("User",User);