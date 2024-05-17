import { MyContext } from "../conversation.config";
import onStartKeyboard from "../keyboards/onStartKeyboard";

export const onStartInfo: string =
  "<b>Hello!👋</b>" +
  "\n\n" +
  "This bot can <b>save your paid subscriptions</b> so you don't forget to renew or cancel them before they expire. It will <b>notify you a week and a day</b> before the subscription expires directly in your Telegram private messages. After the subscription expires, it will <b>automatically renew</b> for the period specified by you. If you no longer need this subscription or something has changed, you can always use the corresponding options to delete or modify the subscription. <b>Enjoy using it!</b>" +
  "\n\n" +
  "You can use both the built-in keyboard and commands to manage your subscriptions. <b>Here is the list of commands:</b>" +
  "\n\n" +
  "/help <b>- displays the welcome menu.</b>" +
  "\n\n" +
  "/create <b>- creates a subscription based on the provided data.</b>" +
  "\n\n" +
  "/getall <b>- allows you to get a list of all subscriptions with all valid information.</b>" +
  "\n\n" +
  "/edit <b>- allows you to edit any necessary fields in the subscription by its name.</b>" +
  "\n\n" +
  "/delete <b>- allows you to delete a subscription by its name.</b>";
