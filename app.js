require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./database/connectDB.js');
const RequestLogger = require('./middleware/logger.js');
const ArticleRoutes = require('./routes/article.routes.js');
const UserRoutes = require('./routes/user.routes.js');
const errorHandler = require('./middleware/errorHandler.js');
const dns = require('dns');

const app = express();
const PORT = process.env.PORT 

dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

app.use(cors('*'));
app.use(express.json());

app.use(RequestLogger);

app.use("/api", ArticleRoutes);
app.use('/api/auth/', UserRoutes );

app.use(errorHandler);

app.listen(PORT, ()=>{
   console.log(`Server is listening on Port ${PORT}`)
});