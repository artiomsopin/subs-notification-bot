import { BotCommand } from "grammy/types";

export const commandList: BotCommand[] = [
  {
    command: "start",
    description: "Start bot",
  },
  {
    command: "help",
    description: "Get documentation",
  },
  {
    command: "create",
    description: "Create subscription",
  },
  {
    command: "getall",
    description: "Get all subscriptions",
  },
  {
    command: "edit",
    description: "Edit subscription",
  },
  {
    command: "delete",
    description: "Delete subscription",
  },
];
