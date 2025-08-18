"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = getApp;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const PORT = 4682;
const app = (0, express_1.default)();
const Routes_1 = require("./Routes");
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const routes = new Routes_1.Routes();
app.use("/api", routes.getRoutes());
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
function getApp() {
    return app;
}
