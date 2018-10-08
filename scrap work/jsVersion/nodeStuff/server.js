/* 
const EventEmitter = require ('events');

//Register a listener
 
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) => {
    console.log('Listener called',  arg);
});

logger.log('message');
//T IS IS EVENT
 */
const https = require('https');
const server = https.createServer(); 

const ApiCaller = require('../../new/backEnd');
const apiCaller = new ApiCaller(); 

server.on('connect', (req, res)=>{
    if(req.url === '/'){
        res.write(apiCaller.getbyName('fangerbanger'));
        res.end();
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1 , 2, 3]));
        res.end(); 
        console.log('url = api/courses');
    }
    console.log('New connection...');
});


server.listen(3000);
console.log('Listening on port 3000... from server');

//apiCaller.getbyName('fangerbanger');

