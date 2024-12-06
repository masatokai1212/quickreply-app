// types.ts
export interface WebhookEvent {
  type: string;
  message: {
    type: string;
    text: string;
  };
  replyToken: string;
}

export interface QuickReplyItem {
  type: string;
  action: {
    type: string;
    label: string;
    text: string;
  };
}

export interface QuickReply {
  items: QuickReplyItem[];
}

export interface MiddlewareConfig {
  property1: string;
  property2: number;
}