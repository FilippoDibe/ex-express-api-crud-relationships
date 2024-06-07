const express = require("express");
const postRouter = require("./routers/postRouter.js");
const app = express();
const errorHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");


require("dotenv").config();
const {PORT} = process.env;
const port = PORT || 3000;

app.use(express.json());

app.use(notFound);

app.use(errorHandler);

app.use('/posts', postRouter);

app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
});