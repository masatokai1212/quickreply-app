import express, { Application, Request, Response } from "express";
import { load } from "ts-dotenv";
import middleware from './middleware';
import { WebhookEvent, MiddlewareConfig } from './types';
import textEventHandler from './textEventHandler';

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

const handler = async (req: Request, res: Response): Promise<void> => {
  // あなたのロジック
  res.status(200).send({
    message: "success"
  });
};

app.get("/", handler);

app.post(
  "/webhook",
  middleware(middlewareConfig),
  async (req: Request, res: Response): Promise<void> => {
    const events: WebhookEvent[] = req.body.events;
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
  }
);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

export default handler;