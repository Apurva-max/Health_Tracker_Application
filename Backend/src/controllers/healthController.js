// Creating Health Entry API

import HealthRecord from "../models/HealthRecord.js"
import User from "../models/User.js";

export const createHealthRecord = async (req, res) => {
    try {

        const { date, steps, water, calories } = req.body;

        if(date == null || steps == null || water == null || calories == null){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if(steps < 0 || water < 0 || calories < 0) {
            return res.status(400).json({
                message: "Invalid Value"
            })
        }

        // Logged in User

        const userId = req.user;

        // Check duplicate date
        const existingRecord = await HealthRecord.findOne({
            userId,
            date,
        });

        if(existingRecord) {
            return res.status(400).json({
                message: "Record already exists for this date"
            });
        }

        const record = await HealthRecord.create({
            userId,
            date,
            steps,
            water,
            calories
        });

        res.status(201).json({
            message: "Health Record Created Successfully",
            record,
        });
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}

// Get User Health History

export const getHealthHistory = async (req, res) => {
    try{

        const records = await HealthRecord.find({
            userId: req.user
        }).sort({ date: -1 });

        res.status(200).json(records);
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

// Getting Today's Record

export const getTodayRecord = async (req, res) => {

    try{

        // const today = new Date().toISOString().split("T")[0];
        const today = new Date()
        // today.setHours(0,0,0,0);
        .toISOString()
        .split("T")[0];

        // date:{
        //     $gte: today
        // }

        const record = await HealthRecord.findOne({
            userId: req.user,
            date: today,
        })

        if(!record) {
            return res.status(404).json({
                message: "No record found for today",
            })
        }

        res.status(200).json(record);
    } catch (error) {

        res.status(500).json({
            message: error.message,
        })
    }
}

// Updating Record API (History.jsx kae edit button kae liyae)

export const updateHealthHistory = async (req, res) => {

    try{

        const { id } = req.params;

        const { steps, water, calories } = req.body;

        if (steps == null || water == null || calories == null) {
            return res.status(400).json({
            message: "All fields required"
        });
    }

        const record = await HealthRecord.findOne({
            _id: id,
            userId: req.user,
        })

        if(!record) {
            return res.status(404).json({
                message: "Record Not found "
            })
        }

        record.steps = steps;
        record.water = water;
        record.calories = calories;

        await record.save();

        res.status(200).json({
            message: "Record updates successfully ",
            record,
        })

    } catch(error){

        res.status(500).json({
            message: error.message
        })
    }
}

// Deleting the Record (Delete Record API)

export const deleteHealthRecord = async (req, res) => {

    try{

        const { id } = req.params;

        const record = await HealthRecord.findOne({
            _id: id,
            userId: req.user
        });

        if(!record) {

            return res.status(404).json({
                message: "Record Not found"
            })
        }

        await HealthRecord.findByIdAndDelete(id);

        res.status(200).json({
            message: "Record Deleted Successfully",
        });
    } catch (error){

        res.status(500).json({
            message: error.message,
        })
    }
}

// Get-Logged In User Profile

export const getProfile = async (req, res) => {

    try{

        const user = await User.findById(req.user).select("-password");

        res.status(200).json(user);
    } catch(error){

        res.status(500).json({
            message: error.message
        })
    }
}

// Streak calculation

export const calculateStreak = async (req, res) => {

    try{
         const records = await HealthRecord.find({
            userId: req.user}).sort({ date: -1 })

        if(records.length === 0){
            return res.status(404).json({
                streak: 0,
            })
        }

        let streak = 1;

        for(let i = records.length-1; i > 0; i--){
            const current = new Date(records[i].date);

            const previous = new Date(records[i-1].date);

            const diff = (current - previous) / (1000 * 60 * 60 *24);

            if(diff === 1){
                streak++;
            } else {
                break
            }
        }

        res.status(200).json({
            streak
        });
    } catch(error){

        res.status(500).json({
            message: error.message
        })
    }

}
