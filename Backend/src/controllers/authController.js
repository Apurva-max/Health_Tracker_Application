import User from '../models/User.js';
import bcrypt from "bcrypt" // hash password
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    try {
        const { name , email , password } = req.body;

        if(!name || !email || !password )  {
            return res.status(404).json({
                message: "All fields are required"
            })
        }

        if(password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Checking user alredy exist

        const userExist = await User.findOne({ email });

        if(userExist) {
            return res.status(400).json({
                message: "User Already Exists",
            });
        }

        // Password hashing

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // const comparePassword = await bcrypt.compare(
        //     password,
        //     findUser.password
        // );

        // Create User

        const user = await User.create({
            name,
            email, 
            password: hashPassword
        });

        res.status(201).json({
            message: "User Registered Successfully",
            userId: user._id,
        })
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try{

        const { email, password } = req.body;

        // User find

        const findUser = await User.findOne({ email })

        if(!findUser) {
            return res.status(400).json({
                message: "User not Found",
            })
        }

        // Password Compare

        const comparePassword = await bcrypt.compare(
            password,
            findUser.password
        );

        if(!comparePassword) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        // token generation
        const token = jwt.sign(
            { id: findUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.status(200).json({
            message: "Login Successfully",
            token,
            user: {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
            }
        })
    } catch(error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export  {registerUser, loginUser};