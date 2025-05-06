import express, { Router } from 'express';
const router: Router = express.Router()
import authRouter from './auth/auth';
import contentRouter from './content/content';
import tagRouter from './tags/tags';
import linkRouter from './link/link';

router.use('/auth', authRouter)
router.use('/content', contentRouter)
router.use('/tag', tagRouter)
router.use('/link', linkRouter)

export default router