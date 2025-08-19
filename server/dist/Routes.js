"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const Message_1 = require("./classes/Message");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    getslash(req, res) {
        const message = new Message_1.Message("Hello world");
        res.status(200).json(message);
    }
    getImage(req, res) {
        const imgPath = path_1.default.resolve(__dirname, "..", "media", "surprise.jpg");
        const imgStream = fs_1.default.readFileSync(imgPath);
        res.setHeader("Content-Type", "image/jpeg");
        res.status(200).send(imgStream);
    }
    streamVideo(req, res) {
        const videoPath = path_1.default.resolve(__dirname, "..", "media", "videoStreamFormat.mp4");
        const stat = fs_1.default.statSync(videoPath);
        const fileSize = stat.size;
        console.log("FileSize: ", fileSize);
        res.writeHead(200, {
            "Content-Type": "video/mp4",
            "Content-Length": fileSize
        });
        fs_1.default.createReadStream(videoPath).pipe(res);
        return;
    }
    streamVideoRange(req, res) {
        const videoPath = path_1.default.resolve(__dirname, "..", "media", "output.mp4");
        const stat = fs_1.default.statSync(videoPath);
        const fileSize = stat.size;
        console.log("FileSizeR: ", fileSize);
        const range = req.headers.range;
        if (!range) {
            res.writeHead(200, {
                "Content-Type": "video/mp4",
                "Content-Length": fileSize
            });
            fs_1.default.createReadStream(videoPath).pipe(res);
            return;
        }
        // Eg range val bytes=1000-
        console.log("Range: ", range);
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        // const end = parts[1] ? parseInt(parts[1],10):fileSize-1;
        const end = Math.min(start + 1024 * 1024 - 1, fileSize - 1);
        const chunkSize = (end - start) + 1;
        console.log("R", chunkSize);
        const file = fs_1.default.createReadStream(videoPath, { start, end });
        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4"
        });
        file.pipe(res);
    }
    getRoutes() {
        this.router.get("/", (req, res) => this.getslash(req, res));
        this.router.get("/img", (req, res) => this.getImage(req, res));
        this.router.get("/videoSC", (req, res) => this.streamVideo(req, res));
        this.router.get("/videoSCR", (req, res) => this.streamVideoRange(req, res));
        return this.router;
    }
}
exports.Routes = Routes;
