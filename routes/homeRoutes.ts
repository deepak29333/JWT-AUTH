import Router from 'koa-router';
import {authMiddleware} from "../middleware/authMiddleware";
import {UserController} from "../controllers/UserController";
import {rateLimiter} from "../middleware/rateLimiter";

const userController = new UserController()
const router = new Router();

router.get('/users', authMiddleware, (ctx) => userController.getUsers(ctx));

export default router;