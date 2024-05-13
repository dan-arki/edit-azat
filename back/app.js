import express from "express";
import register from "./route/users/register.js";
import login from "./route/users/login.js";
import account from "./route/users/account.js";
import media from './route/media/media.js'
import plateform from './route/platform/platform.js'
import rating from './route/rating/rating.js'
import watchlist from './route/watchlist/watchlist.js'
import watching from './route/watching/watching.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.use("/", register);
app.use("/", login);
app.use("/", account);
app.use("/", media);
app.use("/", plateform);
app.use("/", rating);
app.use("/", watchlist);
app.use("/", watching);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
