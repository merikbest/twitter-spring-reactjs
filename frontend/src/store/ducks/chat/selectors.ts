import { RootState } from "../../store";
import { ChatState } from "./contracts/state";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";

export const selectChat = (state: RootState): ChatState => state.chat;
export const selectChatItem = (state: RootState) => selectChat(state).item;
export const selectChatSecondParticipantId = (state: RootState) => selectChatItem(state)?.participants[1].user.id;
export const selectChatFirstParticipantAvatar = (state: RootState) => {
    return selectChatItem(state)?.participants[0].user.avatar ?? DEFAULT_PROFILE_IMG;
};
export const selectChatSecondParticipantAvatar = (state: RootState) => {
    return selectChatItem(state)?.participants[1].user.avatar ?? DEFAULT_PROFILE_IMG;
};
