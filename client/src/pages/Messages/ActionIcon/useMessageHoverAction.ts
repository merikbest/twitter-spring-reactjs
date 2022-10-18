import {useState} from "react";

export enum MessagesAction {
    SETTINGS = "SETTINGS",
    MEDIA = "MEDIA",
    GIF = "GIF",
    EMOJI = "EMOJI",
    SEND = "SEND",
    NEW_MESSAGE = "NEW_MESSAGE",
    DETAILS = "DETAILS",
}

export interface VisibleActions {
    visibleSettingsAction: boolean;
    visibleMediaAction: boolean;
    visibleGIFAction: boolean;
    visibleEmojiAction: boolean;
    visibleSendAction: boolean;
    visibleNewMessageAction: boolean;
    visibleDetailsAction: boolean;
}

export const actionsInitialState = {
    visibleSettingsAction: false,
    visibleMediaAction: false,
    visibleGIFAction: false,
    visibleEmojiAction: false,
    visibleSendAction: false,
    visibleNewMessageAction: false,
    visibleDetailsAction: false,
}

interface UseMessageHoverAction {
    visibleHoverAction: VisibleActions,
    handleLeaveAction: () => void,
    handleHoverAction: (action: MessagesAction) => void
}

export const useMessageHoverAction = (): UseMessageHoverAction => {
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const [visibleHoverAction, setVisibleHoverAction] = useState<VisibleActions>({...actionsInitialState});

    const handleHoverAction = (action: MessagesAction): void => {
        if (action === MessagesAction.SETTINGS) {
            setHoverAction({...actionsInitialState, visibleSettingsAction: true});
        } else if (action === MessagesAction.MEDIA) {
            setHoverAction({...actionsInitialState, visibleMediaAction: true});
        } else if (action === MessagesAction.GIF) {
            setHoverAction({...actionsInitialState, visibleGIFAction: true});
        } else if (action === MessagesAction.EMOJI) {
            setHoverAction({...actionsInitialState, visibleEmojiAction: true});
        } else if (action === MessagesAction.SEND) {
            setHoverAction({...actionsInitialState, visibleSendAction: true});
        } else if (action === MessagesAction.NEW_MESSAGE) {
            setHoverAction({...actionsInitialState, visibleNewMessageAction: true});
        } else if (action === MessagesAction.DETAILS) {
            setHoverAction({...actionsInitialState, visibleDetailsAction: true});
        }
    };

    const setHoverAction = (name: VisibleActions): void => {
        setDelayHandler(setTimeout(() => setVisibleHoverAction(name), 500));
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleHoverAction({...actionsInitialState})
    };

    return {visibleHoverAction, handleHoverAction, handleLeaveAction}
};
