import { Keyboard } from "grammy";
import { KeyboardButtonNames } from "../constants/keyboardButtonNames";
export default async function onEditKeyboard() {
  return new Keyboard().text("Skip ⏭️").row().resized().persistent();
}
