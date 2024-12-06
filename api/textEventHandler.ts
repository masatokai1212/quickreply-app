// api/textEventHandler.ts
import { WebhookEvent } from './types';
import { consultationHandler } from './handlers/consultationHandler';
import { aiAssessmentHandler } from './handlers/aiAssessmentHandler';

const textEventHandler = async (event: WebhookEvent): Promise<void> => {
  const replyToken = event.replyToken;
  const userMessage = event.message.text.toLowerCase();

  if (userMessage === '相談') {
    await consultationHandler(replyToken);
  } else if (userMessage === 'ai査定') {
    await aiAssessmentHandler(replyToken);
  }
};

export default textEventHandler;