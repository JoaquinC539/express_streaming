import { Request, Response, Router } from 'express';
import { Message } from './classes/Message';
import path from "path";
import fs from "fs";
export class Routes{
    private router: Router;
    constructor(){
        this.router=Router()
    }
    
    private getslash(req:Request,res:Response){
        const message = new Message("Hello world")
        res.status(200).json(message)
    }
    private getImage(req:Request,res:Response){
        const imgPath = path.resolve(__dirname,"..","media","surprise.jpg");
        const imgStream = fs.readFileSync(imgPath);
        res.setHeader("Content-Type","image/jpeg")
        res.status(200).send(imgStream)
    }
    private streamVideo(req:Request,res:Response){
        const videoPath = path.resolve(__dirname,"..","media","videoStreamFormat.mp4")
        const stat= fs.statSync(videoPath);
        const fileSize=stat.size;
        const range = req.headers.range;
        if(!range){
            res.writeHead(200,{
                "Content-Type":"video/mp4",
                "Content-Length":fileSize
            })
        }
        fs.createReadStream(videoPath).pipe(res);
        return;

    }
    public getRoutes(){   
        this.router.get("/",(req,res)=>this.getslash(req,res))
        this.router.get("/img",(req,res)=>this.getImage(req,res))
        this.router.get("/videoSC",(req,res)=>this.streamVideo(req,res))
        return this.router;
    }


}