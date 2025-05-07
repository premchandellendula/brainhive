import express, { Request, Response } from 'express';
import zod from 'zod';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { Content, Tag } from '../../db';
const router = express.Router()

const contentBody = zod.object({
    link: zod.string(),
    type: zod.string(),
    title: zod.string(),
    tags: zod.string().array()
})

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    const response = contentBody.safeParse(req.body)

    if(!response.success){
        res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const { link, type, title, tags } = req.body

    try{
        const contentTags = []

        for(const tagTitle of tags){
            let tag = await Tag.findOne({title: tagTitle})

            if(!tag){
                tag = await Tag.create({title: tagTitle})
            }

            contentTags.push(tag._id)
        }
        const content = await Content.create({
            link: link,
            type: type,
            title: title,
            tags: contentTags,
            userId: req.userId
        })

        res.status(201).json({
            message: "Content created successfully",
            content
        })
    }catch(err){
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        res.status(500).json({
            message: "Error creating a post",
            error: errorMessage
        })
    }
})

router.get('/', async (req: Request, res: Response) => {
    const { type } = req.query
    try{
        const filter: any = {};

        if (type) {
            const formattedType = String(type).toLowerCase().slice(0, -1);
            const capitalizedType = formattedType.charAt(0).toUpperCase() + formattedType.slice(1);
            filter.type = capitalizedType;
        }

        const content = await Content.find(filter)
                                        .populate("tags")
                                        .populate("userId", "username")

        res.status(200).json({
            message: "Content fetched successfully",
            content
        })
    }catch(err){
        res.status(500).json({
            message: "Error fetching content",
            error: err instanceof Error ? err.message : "Unknown Error"
        })
    }
})

router.delete("/:contentId", authMiddleware, async (req: Request, res: Response) => {
    const { contentId } = req.params;
    try{
        const content = await Content.deleteOne({
            _id: contentId
        })

        res.status(200).json({
            message: "Contend Deleted successfully",
            content
        })
    }catch(err){
        res.status(500).json({
            message: "Error deleting the content",
            error: err instanceof Error ? err.message : "Unknown Error"
        })
    }
})


export default router;