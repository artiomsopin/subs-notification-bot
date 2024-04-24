import { Keyboard } from "grammy";
import { KeyboardButtonNames } from "../utils/constants/keyboardButtonNames";
export default async function showKeyboard(ctx: any) {
    return new Keyboard([
        [KeyboardButtonNames.CREATE, KeyboardButtonNames.GET_ALL], 
        [KeyboardButtonNames.EDIT, KeyboardButtonNames.DELETE]
    ])
    .row()
    .resized();
}