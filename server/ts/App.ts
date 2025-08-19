import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT=4682;
const app: Express = express();
import { Routes } from './Routes';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const routes = new Routes();
app.use("/api",routes.getRoutes())




app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});

export function getApp(){
    return app;
}