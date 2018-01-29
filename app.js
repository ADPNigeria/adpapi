const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');



//impoer module
const routes = require('./api/routes/main');
// require('./api/models/Payment');
// require('./api/models/Contact');
// require('./api/models/Member');
// require('./api/models/Admin');
// require('./api/models/Auth');
// require('./api/models/Exco');


// import environmental variables from our variables.env file
require('dotenv').config({ path: 'keys.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`${err.message}`);
}); 


// init Express app
const app = express();


//route logger
app.use(logger('dev'));
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());


//handling CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === 'OPTIONS'){
    res.header("Access-Control-Allow-Methods","POST, PUT, GET, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use('/api', routes);

app.use((req, res, next)=>{
    const error = new Error('Page Not Found');
    error.status= 404;
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
      error : {
        message: error.message
      }}
    )
})

  
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});