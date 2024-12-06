// api/handlers/consultationHandler.ts
import { QuickReply } from '../types';
import axios from 'axios';

export const consultationHandler = async (replyToken: string): Promise<void> => {
  const quickReply: QuickReply = {
    items: [
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'リフォーム相談',
          text: 'リフォーム相談'
        }
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: '売却相談',
          text: '売却相談'
        }
      }
    ]
  };

  const message = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: 'ご相談内容を選択ください',
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