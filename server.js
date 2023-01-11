const http = require('http');
require('dotenv').config();
const app = require('./app.js');


const server = http.createServer(app);

const PORT = process.env.PORT
//hello serrver

server.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}...`);
});