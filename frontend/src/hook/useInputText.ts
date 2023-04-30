import { ChangeEvent, useCallback, useState } from "react";
import EmojiConvertor from "emoji-js";
import { EmojiData } from "emoji-mart";

interface UseInputText {
    text: string,
    setText: (value: (((prevState: string) => string) | string)) => void
    handleChangeText: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    addEmoji: (emoji: EmojiData) => void,
    textConverter: () => string,
}

export const useInputText = (): UseInputText => {
    const [text, setText] = useState<string>("");

    const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value);
    };

    const addEmoji = useCallback((emoji: EmojiData): void => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.replace_mode = "unified";
        const convertedEmoji = emojiConvertor.replace_colons(emoji.colons!);
        setText(text + " " + convertedEmoji);
    }, [text]);

    const textConverter = (): string => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.colons_mode = true;
        return emojiConvertor.replace_unified(text);
    };

    return { text, setText, handleChangeText, addEmoji, textConverter };
};
