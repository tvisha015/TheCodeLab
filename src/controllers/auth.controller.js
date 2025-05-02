import bycrypt from "bcryptjs";
import {db} from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async (req, res)=>{
    const {email, password, name} = req.body;
    try {
        const existinguser = await db.user.findUnique({
            where:{
                email
            }
        })
        if(existinguser){
            return res.status(400).json({
                error:"User alreay exists"
            })
        }
        
        const hashedPassword = await bycrypt.hash(password,10);
        
        const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })

        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET, {expiresIn:"7d"})
        
        res.cookie("jwt", token, {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
            maxAge:1000*60*60*24*7
        })

        res.status(201).json({
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser.image
            }
        })
    } catch (error) {
        console.log("Error while creating user: ",error);
        res.status(500).json({
            error:"Error while creating user"
        })
    }
}

export const login = async (req, res)=>{}

export const logout = (req, res)=>{}

export const check = (req, res)=>{}