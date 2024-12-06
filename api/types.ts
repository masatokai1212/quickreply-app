// api/types.ts
export interface WebhookEvent {
  type: string;
  message: {
    type: string;
    text: string;
  };
  replyToken: string;
}

export interface QuickReplyAction {
  type: string;
  label: string;
  text: string;
}

export interface QuickReplyItem {
  type: string;
  action: QuickReplyAction;
}

export interface QuickReply {
  type: string;
  items: QuickReplyItem[];
}

export interface MiddlewareConfig {
  property1: string;
  property2: number;
}