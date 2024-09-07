const app = require('./app');
const  http = require('http');
const PORT = "5000";
const HOST = "localhost"
const server = http.createServer(app)

server.listen(PORT,5000,()=>{
    console.log('Server is running on port 5000')
})