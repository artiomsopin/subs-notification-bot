import { Keyboard } from "grammy";
import { onEditKeyboardButtonNames } from "../constants/onEditKeyboardButtonNames";
export default function onEditKeyboard() {
  return new Keyboard()
    .text(onEditKeyboardButtonNames.SKIP)
    .row()
    .resized()
    .persistent();
}
