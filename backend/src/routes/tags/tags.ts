import express, { Request, Response } from 'express';
import zod from 'zod';
import { Tag } from '../../db';
const router = express.Router()

const tagBody = zod.object({
    title: zod.string()
})

router.post("/", async (req: Request, res: Response) => {
    const response = tagBody.safeParse(req.body)

    if(!response.success){
        res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { title } = req.body;

    try{   
        const existingTag = await Tag.findOne({title})
        if(existingTag){
            res.status(400).json({
                message: "Tag already exists"
            })
        }
        
        const tag = await Tag.create({
            title
        })
        
        res.status(201).json({
            message: "Tag created successfully",
            tag
        })
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        res.status(500).json({
            message: "Error creating tag",
            error: errorMessage
        })
    }
})

router.get("/tags", async (req: Request, res: Response) => {
    try{
        const tags = await Tag.find()

        res.status(200).json({
            message: "Tags fetched successfully",
            tags
        })
    }catch(err){
        res.status(500).json({
            message: "Error fetching the tags",
            error: err instanceof Error ? err.message : "Unknown error"
        })
    }
})
export default router