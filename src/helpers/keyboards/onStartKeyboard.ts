import { Keyboard } from "grammy";
import { KeyboardButtonNames } from "../constants/keyboardButtonNames";
export default async function onStartKeyboard() {
  return new Keyboard([
    [KeyboardButtonNames.CREATE, KeyboardButtonNames.GET_ALL],
    [KeyboardButtonNames.EDIT, KeyboardButtonNames.DELETE],
  ])
    .row()
    .resized()
    .persistent();
}
