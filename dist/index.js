"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ts_dotenv_1 = require("ts-dotenv");
const middleware_1 = __importDefault(require("./middleware")); // 適切なパスに変更してください
const textEventHandler_1 = __importDefault(require("./textEventHandler")); // 適切なパスに変更してください
const env = (0, ts_dotenv_1.load)({
    CHANNEL_ACCESS_TOKEN: String,
    CHANNEL_SECRET: String,
    PORT: Number,
});
const PORT = env.PORT || 3000;
const config = {
    channelAccessToken: env.CHANNEL_ACCESS_TOKEN || "",
    channelSecret: env.CHANNEL_SECRET || "",
};
const middlewareConfig = {
    property1: 'value1',
    property2: 123,
    // 他のプロパティの値
};
const app = (0, express_1.default)();
const handler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // あなたのロジック
    res.status(200).send({
        message: "success"
    });
});
app.get("/", handler);
app.post("/webhook", (0, middleware_1.default)(middlewareConfig), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = req.body.events;
    yield Promise.all(events.map((event) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, textEventHandler_1.default)(event);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
            res.status(500).send('Internal Server Error');
        }
    })));
    res.status(200).send('OK');
}));
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
exports.default = handler;
