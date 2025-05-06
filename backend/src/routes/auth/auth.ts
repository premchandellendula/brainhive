import express, { Request, Response } from 'express';
import zod from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../db';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router()

const signupBody = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post("/signup", async (req: Request, res: Response): Promise<void> => {
    const {success} = signupBody.safeParse(req.body)

    if(!success){
        res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
        email: email
    })

    if(existingUser){
        res.status(409).json({
            message: "User already exists"
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        if(!user){
            throw new Error("Failed to create user")
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET){
            throw new Error("JWT_SECRET not defined")
        }

        const token = jwt.sign({userId: user._id, username: username}, JWT_SECRET, {expiresIn: "2d"})

        res.status(201).json({
            message: "User created successfully",
            token: token
        })
    }catch(err: unknown){
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            message: "Error creating user",
            error: errorMessage
        });
        return;
    }
})

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post("/signin", async (req: Request, res: Response): Promise<void> => {
    const response = signinBody.safeParse(req.body)

    if(!response.success){
        res.status(400).json({
            message: "Incorrect inputs"
        })
        return;
    }

    const {email, password} = req.body;

    try{
        const user = await User.findOne({
            email: email
        })

        if(!user){
            throw new Error("Erro fetching user")
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password)

        if(!isPasswordValid){
            res.status(400).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET as string, {expiresIn: "2d"})

        res.status(200).json({
            message: "User signed in successfully",
            token
        })
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        res.status(500).json({
            message: "Error creating user",
            error: errorMessage
        })
    }
})

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
    try{
        const user = await User.findOne({
            _id: req.userId
        }).select('username')

        res.status(200).json({
            message: "User fetched successfully",
            user
        })
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error"

        res.status(500).json({
            message: "Error fetching user",
            error: errorMessage
        })
    }
})

export default router