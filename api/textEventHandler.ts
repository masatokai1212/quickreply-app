// api/textEventHandler.ts
import { WebhookEvent, QuickReply } from './types';
import { consultationHandler } from './handlers/consultationHandler';
import { aiAssessmentHandler } from './handlers/aiAssessmentHandler';
import axios from 'axios';

const textEventHandler = async (event: WebhookEvent): Promise<void> => {
  const replyToken = event.replyToken;
  const userMessage = event.message.text.toLowerCase();

  if (userMessage === '相談') {
    await consultationHandler(replyToken);
  } else if (userMessage === 'ai査定') {
    await aiAssessmentHandler(replyToken);
  } else {
    const quickReply: QuickReply = {
      type: 'text',
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            label: 'Sample Label',
            text: 'Sample Text'
          }
        }
      ]
    };

    const message = {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: 'Choose an option:',
          quickReply: quickReply
        }
      ]
    };

    await axios.post('https://api.line.me/v2/bot/message/reply', message, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
      }
    });
  }
};

export default textEventHandler;