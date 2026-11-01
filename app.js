const express = require("express");
const cors = require("cors");
const RequestLogger = require('./src/middleware/logger.js');
const ArticleRoutes = require('./src/routes/article.routes.js');
const UserRoutes = require('./src/routes/user.routes.js');
const errorHandler = require('./src/middleware/errorHandler.js');

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(RequestLogger);
app.use("/api", ArticleRoutes);
app.use('/api/auth/', UserRoutes );
app.use(errorHandler);


module.exports = app;

