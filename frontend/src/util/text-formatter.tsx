import React, { ReactNodeArray } from "react";
import reactStringReplace from "react-string-replace";
import { Emoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import { TaggedUserResponse, UserResponse } from "../types/user";

export const capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getUsersInImage = (users: UserResponse[] | TaggedUserResponse[]): string => {
    return (users.length === 0)
        ? "Tag people"
        : (users.length === 1)
            ? users[0].fullName
            : `${users[0].fullName} and ${(users.length === 2) ? users[1].fullName : `${users.length - 1} others`}`;
};

export const textFormatter = (text: string): ReactNodeArray => {
    let replacedText: ReactNodeArray;
    let index: number = 1;

    replacedText = reactStringReplace(text, /(\n)/g, (match) => (
        <>{match}<br /></>
    ));

    replacedText = reactStringReplace(replacedText, /(#\w+)\b/ig, (match) => (
        <b key={index++} id="hashtag">{match}</b>
    ));

    replacedText = reactStringReplace(replacedText, /(@\w+)\b/ig, (match) => (
        <b key={index++} id="mention">{match}</b>
    ));

    replacedText = reactStringReplace(replacedText, /(https?:\/\/[^\s]+)/g, (match) => (
        <a key={index++} href={match} id="link" target="_blank">{match}</a>
    ));

    replacedText = reactStringReplace(replacedText, /:(.+?):/g, (match) => (
        <Emoji native={false} key={index++} emoji={match} set={"twitter"} size={20} />
    ));

    return replacedText;
};
