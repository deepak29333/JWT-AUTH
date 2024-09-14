import Koa from "koa";
import bodyParser from "koa-bodyparser";
const app = new Koa();
const port = 4000;
import router from "../routes/authRoutes";
import login from "../routes/homeRoutes";

app.use(bodyParser());
app.use(login.routes());
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log(`Authentication app listening on port ${port}!`))