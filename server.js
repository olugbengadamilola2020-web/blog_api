require("dotenv").config();
const app = require('./app.js');
const connectDB = require('./src/config/connectDB.js');
const validateEnv = require('./src/config/env.config.js');

const dns = require('dns');

validateEnv();

const PORT = process.env.PORT 
dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.listen(PORT, async ()=>{
    await connectDB();
   console.log(`Server is listening on Port ${PORT}`)
});