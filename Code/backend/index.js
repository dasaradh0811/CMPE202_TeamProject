// Imports dependencies
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './Routes/index.js'
import { db } from './Models/index.js'
// import swaggerDocument from './swagger.json' assert {type: "json"}
// import swaggerUi from 'swagger-ui-express'
// const swaggerDocument = require('swagger.json')
// App configuration
const app = express();

// View Engine EJS
app.set('view engine', 'ejs');

// CORS Setup
app.use(cors({ origin: '*', credentials: true }));



// Session Setup
app.use(
  session({
    secret: 'cmpe202',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

// JSON Parser for APIs
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

//Swagger UI
// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument)
// );
// Configuration
dotenv.config()

// Default Headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Routes Setup
routes(app);

// Application Startup
const startUp = () => {
    db.sequelize.authenticate().then(() => {
        console.log("Database authenticated.")
        db.sequelize.sync(/*{force: true}*/).then(() => {
            console.log("Database synced.")
            const port = process.env.PORT || 3001
            app.listen(port, () => console.log(`Server listening at ${port}..`))
        }).catch((err) => {
            console.log("Failed to sync database: " + err.message)
        })
    }).catch((err) => {
      console.log("Failed to authenticate database: " + err.message)
    })
}

// Application Shutdown
process.on('exit', () => {
    db.closeConnection()
})

startUp()

