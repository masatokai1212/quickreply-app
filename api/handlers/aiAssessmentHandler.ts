// src/aiAssessmentHandler.ts
import { QuickReply } from './types';
import axios from 'axios';

export const aiAssessmentHandler = async (replyToken: string): Promise<void> => {
  const quickReply: QuickReply = {
    items: [
      {
        type: 'action',
        action: {
          type: 'message',
          label: 'マンション',
          text: 'マンション'
        }
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: '一戸建',
          text: '一戸建'
        }
      }
    ]
  };

  const message = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: '査定内容を選択ください',
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