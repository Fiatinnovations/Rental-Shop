const express = require('express');
const dishRouter = express.Router();
dishRouter.use(express.json());

dishRouter.route('/')

.all((req, res, next)=>{
    res.writeHead(200, {'Content-Type':'text/plain'});
    next();
})

.get((req, res, next)=>{
    res.end('This is all the dishes');
})

.post((req, res, next)=>{
    res.end("will add" +  req.body.name + "and" + req.body.description + "to the list");
})

.put((req, res, next)=>{
    res.end('Put Request not allowed');
})

.delete((req, res, next)=>{
    res.end('Deleting dishes...');
});

dishRouter.route('/:id')

.all((req, res, next)=>{
    res.writeHead(200, {'Content-Type':'text/plain'});
    next();
})

.get((req, res, next)=>{
    res.end('getting' + req.params.id + 'of the dish');
})

.post((req, res, next)=>{
    res.end('adding' + req.params.id+1  + req.body.name + 'and' + req.body.description + 'to the list');
})

.put((req, res, next)=>{
    res.end('editing' + req.params.id  + req.body.name + 'and' + req.body.description);
})

.delete((req, res, next)=>{
    res.end('Deleting dishes...');
});

module.exports = dishRouter;