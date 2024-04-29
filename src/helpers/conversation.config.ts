import {
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";

export type MyContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor;

export type MyConversation = Conversation<MyContext>;

interface SessionData {
  state: number;
}

export function initial(): SessionData {
  return { state: 0 };
}
