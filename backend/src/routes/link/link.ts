import express, { Request, Response } from 'express';
import zod from 'zod';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { Content, Link, User } from '../../db';
const router = express.Router()

const linkBody = zod.object({
    share: zod.boolean()
})

router.post("/share/:contentId", authMiddleware, async (req: Request, res: Response) => {
    const response = linkBody.safeParse(req.body);
    const { contentId } = req.params

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

        const hash = contentId;

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
        const content = await Content.findOne({
            _id: hash
        }) 

        const user = await User.findOne({
            _id: link.userId
        })

        if(!user){
            res.status(400).json({
                message: "User not found, check the link"
            })
            return;
        }

        res.status(200).json({
            username: user.username,
            content
        })
    }catch(err){
        res.status(500).json({
            message: "Error fetching the brain",
            error: err instanceof Error ? err.message : "Unknown error"
        })
    }
})
export default router