import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connec = await mongoose.connect(
            process.env.MONGO_URI
        )

        console.log(`Mongoose Connected: ${connec.connection.host}`)
        console.log(`Database: ${connec.connection.name}`);
    } catch (error) {
        // console.log("MongoDB Connection Error", error.message)
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;