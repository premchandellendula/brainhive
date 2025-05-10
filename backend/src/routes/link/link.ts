import express, { Request, Response } from 'express';
import zod from 'zod';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { Content, Link, User } from '../../db';
import { getHashAndType, getShareId } from '../../config';
const router = express.Router()

const linkBody = zod.object({
    share: zod.boolean()
})

router.post("/share", authMiddleware, async (req: Request, res: Response) => {
    const response = linkBody.safeParse(req.body);

    if(!response.success){
        res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { share } = req.body;
    
    if(share){
        const existingLink = await Link.findOne({
            userId: req.userId
        })

        if(existingLink){
            res.status(200).json({
                hash: existingLink.hash
            })
            return;
        }

        const hash = getShareId(req.userId as string);

        await Link.create({
            hash: hash,
            userId: req.userId
        })

        res.status(201).json({
            message: "Hash generated",
            hash
        })
    }else{
        await Link.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})


router.get('/brain/:shareLink', async (req: Request, res: Response) => {
    const hash = req.params.shareLink

    const link = await Link.findOne({
        hash
    })

    if(!link){
        res.status(400).json({
            message: "Incorrect link"
        })
        return;
    }

    try{
        const userId = getHashAndType(hash)

        const username = await User.findOne({
            _id: userId
        }).populate("username")

        const content = await Content.find({userId: userId})
                                        .populate("tags")
                                        .populate("userId", "username")


        res.status(200).json({
            content,
            username
        })
    }catch(err){
        res.status(500).json({
            message: "Error fetching the brain",
            error: err instanceof Error ? err.message : "Unknown error"
        })
    }
})
export default router