import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/indexRoute.js';

const Port = process.env.Port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(routes);
const Mongo_Url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/SocialNetworkDB';

mongoose
.connect(Mongo_Url)
.then(() => {
    console.log(`Connected to database Successfully`);

    app.listen(Port,()=>{
        console.log(`Server running on http://localhost:${Port}`);
    })
})
.catch((error) => {
    console.log(`Connection error: ${error}`);
    throw new Error("Connection error");
    
})