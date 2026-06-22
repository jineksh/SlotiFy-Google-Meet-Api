import express , {Express,Request,Response} from 'express';
import {PORT} from './config/envFile.js';
import { connectToDatabase } from './config/database.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { routeNotFound } from './middleware/route-not-found.js';

const app : Express = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// Define a simple route for testing
app.get('/ping',(_req : Request, res : Response) => {
    res.json({
        message : 'pong',
        timestamp : new Date().toISOString()
    })
});



// if any undefine route heat to the server
app.use(routeNotFound);


// middleware for the error
app.use(errorMiddleware);


// Start the server and connect to the database
app.listen(PORT,()=>{
    connectToDatabase();
    console.log(`[Server] : Server is running on port ${PORT}`);
})