
const express = require('express')
const app = express();
//for logging incoming request
const morgan = require('morgan');
const bodyParser = require('body-parser');
var session = require('express-session');
var rewrite = require('express-urlrewrite');
const slugify = require('slugify');
var cookieParser = require('cookie-parser');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((req, res, next)=>{
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"
);

if(req.method==='OPTION'){
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
}
next();
});


//Routing
const posts = require('./api/routes/posts');
const comments = require('./api/routes/comments');
//routes which handle requests
app.use('/posts',posts);
app.use('/comments',comments);

app.use((req, res, next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
});
app.use((error,req, res, next)=>
{
res.status(error.status || 500);
res.json({
    error:error.message
})
});
module.exports = app;
