import express, { NextFunction, Request, Response } from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { listUsers } from '../controllers/users.controller';

const router = express.Router();



router.get('/', (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
}, (req: Request, res: Response) => {
    listUsers(req, res);
});




export default router;