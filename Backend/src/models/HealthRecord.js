import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        steps: {
            type: Number,
            default: 0,
        },

        water: {
            type: Number,
            default: 0,
        },

        calories: {
            type:Number,
            default: 0,
        },
    },
{timestamps: true});

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);

export default HealthRecord;