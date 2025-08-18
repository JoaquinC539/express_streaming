import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT=4682;
const app=express();
import path from 'path';
import { Message } from './classes/Message';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",(req,res)=>{
    const message=new Message("Hello world")
    res.status(200).json(message)
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});

export function getApp(){
    return app;
}