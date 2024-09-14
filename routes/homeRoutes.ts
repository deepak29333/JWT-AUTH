import Router from 'koa-router';
import {authMiddleware} from "../middleware/authMiddleware";

const router = new Router();

router.get('/protected', authMiddleware, (ctx) => {
  ctx.body = {message: "This is a protected route", user: ctx.state.user};
});

export default router;