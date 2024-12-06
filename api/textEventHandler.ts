// api/textEventHandler.ts
import { WebhookEvent } from './types';
import { consultationHandler } from './handlers/consultationHandler';
import { aiAssessmentHandler } from './handlers/aiAssessmentHandler';

const textEventHandler = async (event: WebhookEvent): Promise<void> => {
  const replyToken = event.replyToken;
  const userMessage = event.message.text.toLowerCase();

  // 受け取ったメッセージをログに出力
  console.error(`Received message: ${userMessage}`);

  try {
    if (userMessage === '相談') {
      await consultationHandler(replyToken);
    } else if (userMessage === 'ai査定') {
      await aiAssessmentHandler(replyToken);
    } else {
      // 受け取ったメッセージが条件に一致しない場合の処理
      console.error(`No handler for message: ${userMessage}`);
    }
  } catch (error) {
    console.error(`Error handling message: ${userMessage}`, error);
  }
};

export default textEventHandler;