//Core node module http
const http = require('http');

const todos = [
    {id: 1,text: 'Learn RestAPI'},
    {id: 2,text: 'Learn React'},
    {id: 3,text: 'Take care of health'}
]
const server = http.createServer((req,res)=>{
    // res.statusCode = 404;
    // res.setHeader('Content-Type','application/json');
    // res.setHeader('X-Powered-By','NodeJS');
    const { method, url } = req;

    let body = []
    req.on('data',chunk=>{
        body.push(chunk);
    })
    .on('end',()=>{
        body = Buffer.concat(body).toString();
        let status = 404;
        const response = {
            success: false,
            data: null
        }

        if(method === 'GET' && url === '/todos'){
            status = 200;
            response.success  = true;
            response.data = todos 
        } else if(method === 'POST' && url === '/todos'){
            const { id,text } = JSON.parse(body);
            if(!id || !text){
                status = 400
            } else {
                todos.push({id,text});
                status = 200;
                response.success = true;
                response.data = todos;
            }
        }
        res.writeHead(status,{
            'Content-Type': 'application/json',
            'X-Powered-By': 'NodeJS'
        });
        res.end(
            JSON.stringify(response)
        )
    });
});

const PORT = 5000;

server.listen(PORT,()=>(console.log(`Server running on ${PORT}`)));