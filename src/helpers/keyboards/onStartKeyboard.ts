import { Keyboard } from "grammy";
import { onStartKeyboardButtonNames } from "../constants/onStartKeyboardButtonNames";
export default function onStartKeyboard() {
  return new Keyboard([
    [onStartKeyboardButtonNames.CREATE, onStartKeyboardButtonNames.GET_ALL],
    [onStartKeyboardButtonNames.EDIT, onStartKeyboardButtonNames.DELETE],
  ])
    .row()
    .resized()
    .persistent();
}
