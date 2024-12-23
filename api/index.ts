import express, { Application, Request, Response } from "express";
import { load } from "ts-dotenv";
import middleware from './middleware';
import { WebhookEvent, MiddlewareConfig } from './types';
import textEventHandler from './textEventHandler';
import { consultationHandler } from './handlers/consultationHandler';
import { aiAssessmentHandler } from './handlers/aiAssessmentHandler';

const env = load({
  CHANNEL_ACCESS_TOKEN: String,
  CHANNEL_SECRET: String,
  PORT: Number,
});

const PORT = env.PORT || 3000;

const config = {
  channelAccessToken: env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: env.CHANNEL_SECRET || "",
};
const middlewareConfig: MiddlewareConfig = {
  property1: 'value1',
  property2: 123,
  // 他のプロパティの値
};

const app: Application = express();

// JSON ボディの解析
app.use(express.json());

// URLエンコードされたボディの解析
app.use(express.urlencoded({ extended: true }));

// ルートハンドラ
const handler = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).send({
      message: "success"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// ルート設定
app.get("/", handler);

app.post(
  "/webhook",
  middleware(middlewareConfig),
  async (req: Request, res: Response): Promise<void> => {
    try {
      console.error('Request body:', req.body); // リクエストボディをログに出力
      const events: WebhookEvent[] = req.body.events;
      if (!events) {
        console.error('No events found in request body');
        res.status(400).send('Bad Request');
        return;
      }

      await Promise.all(
        events.map(async (event: WebhookEvent) => {
          try {
            await textEventHandler(event);
          } catch (err: unknown) {
            if (err instanceof Error) {
              console.error(err);
            }
            res.status(500).send('Internal Server Error');
          }
        })
      );
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error processing webhook', error);
      res.status(500).send('Internal Server Error');
    }
  }
);

// 追加のAPIエンドポイント
app.post("/consultation", async (req: Request, res: Response): Promise<void> => {
  try {
    const replyToken = req.body.replyToken;
    await consultationHandler(replyToken);
    res.status(200).send('Consultation handled');
  } catch (error) {
    console.error('Error handling consultation', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/ai-assessment", async (req: Request, res: Response): Promise<void> => {
  try {
    const replyToken = req.body.replyToken;
    await aiAssessmentHandler(replyToken);
    res.status(200).send('AI assessment handled');
  } catch (error) {
    console.error('Error handling AI assessment', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.error(`Server is running on http://localhost:${PORT}/`);
});

export default handler;