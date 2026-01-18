import mongoose from "mongoose";

const dbConnect = async () => {
    const uri = process.env.MONGO_URI!
    try {
        await mongoose.connect(uri)
        console.log("DB Connected")

    } catch (error: any) {
        console.log(`MongoDB connection  failed ${error}`)
        throw new Error(error)
    }
}

export default dbConnect  