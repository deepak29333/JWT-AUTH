import Router from 'koa-router';
import {AuthController} from "../controllers/AuthController";
import {authMiddleware} from "../middleware/authMiddleware";

const authController = new AuthController();
const router = new Router();

router.post('/signup', ctx => authController.signup(ctx));
router.post('/login', ctx => authController.login(ctx));
router.get('/logout', authMiddleware, ctx => authController.logout(ctx));


export default router;