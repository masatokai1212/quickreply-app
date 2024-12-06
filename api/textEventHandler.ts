// api/textEventHandler.ts
import { WebhookEvent, QuickReply } from './types';
import axios from 'axios';

const textEventHandler = async (event: WebhookEvent): Promise<void> => {
  const replyToken = event.replyToken;

  const quickReply: QuickReply = {
    items: [
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'Option 1',
          text: 'Option 1'
        }
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'Option 2',
          text: 'Option 2'
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
};

export default textEventHandler;