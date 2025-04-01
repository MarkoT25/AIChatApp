import express, { NextFunction, Request, Response } from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getLastMessages, getMessages, sendMessage } from '../controllers/message.controller';

const router = express.Router();

router.get('/last', (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
}, (req: Request, res: Response) => {
    getLastMessages(req, res);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
}, (req: Request, res: Response) => {
    getMessages(req, res);
});


router.post('/send/:id', (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
}, (req: Request, res: Response) => {
    sendMessage(req, res);
});



export default router;