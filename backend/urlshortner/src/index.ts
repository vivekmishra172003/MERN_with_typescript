/*
Task:build a shortner url
1.takes in vaild url and returns a shortened url
2.keep track of total visit/clicks on the url
3. routes
post/url-generate a new short url and return the shotend url 
GET/:id redirects the user to the original url
get /url/analytics/:id - Returns the clicks for the provided short id
 */ 

import express, { Application ,Request,Response} from 'express'
import dotenv from 'dotenv'
import urlRoute from './routes/url';
import connectToMongoDB from './connect';
import URL from './models/url';
dotenv.config();

//connection
connectToMongoDB(process.env.MONGO_URI!)
.then(()=>{console.log("Mongodb connected")})

const app:Application = express();

app.use(express.json());

app.get('/test', async (req:Request,res:Response)=>{
    const allUrls = await URL.find({});
    return res.end(`
        <html>
        <head></head>
        <body>
        <ol>
        ${allUrls.map(url=>`<li>${url.shortId}-${url.redirectURL}-${url.visitHistory.length}</li>`).join("")}
        </ol>
        </body>
        </html>
        `);
})

app.use('/url',urlRoute)

app.listen(process.env.PORT!,()=>{console.log(`port is running at ${process.env.PORT}`)})