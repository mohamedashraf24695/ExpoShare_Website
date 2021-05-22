
// Requiring Process 

const express = require ('express');
const dotenv = require ('dotenv');
const mongoose = require('mongoose');
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const passport=require('passport')
const session = require('express-session');
const methodOverride= require('method-override');


const MongoStore =  require('connect-mongo')(session);


const connectDB = require("./config/db");
const app = express();  
const indexRoute = require('./routes/index');
const {formatDate,stripTags,truncate,editIcon,isAnonymous} = require ("./config/hbs");




// load the configurations 
dotenv.config({path:'./config/config.env'});
require('./config/passport')(passport);





// Connect to the database 
connectDB();





// To use morgan only in the development mode 
if(process.env.Node_ENV === 'development'){
    app.use(morgan('dev'));
}

// View Engine Setup 

app.engine('.hbs',exphbs({helpers:{
    formatDate , stripTags,truncate,editIcon,isAnonymous
},defaultLayout:'main', extname:'.hbs'}));
app.set('view engine','.hbs');

// static folders

app.use(express.static("public"));



// Middlewares

// bodyparser 

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Method override 

app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )




// 1- Sessions

app.use(
    session({

    secret:'a secret string that can be better',
    resave:false ,
    saveUninitialized:false ,
    store: new MongoStore ({ mongooseConnection: mongoose.connection }),

  
})

);






//2-Passport middleware

app.use(passport.initialize());
app.use(passport.session());


app.use(function(req,res,next){
    res.locals.user = req.user || null  ;
    next();
})


// routes using  

app.use('/',indexRoute) ;
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));
app.use('/comments',require('./routes/comments'));













const PORT = process.env.PORT || 3000 ;

app.listen(PORT ,
    console.log("Server is running in " + process.env.Node_ENV + " mode on port " + PORT )
    ); 