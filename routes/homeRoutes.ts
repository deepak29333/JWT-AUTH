import Router from 'koa-router';
import {AuthController} from "../controllers/AuthController";
import {authMiddleware} from "../middleware/authMiddleware";

const authController = new AuthController();
const router = new Router();


router.post('/login', (ctx, next) => authController.login(ctx));
router.get('/protected', authMiddleware, (ctx, next) => {
  ctx.body = {message: "This is a protected route", user: ctx.state.user};
});

export default router;