import React, {useState} from "react";

import {TweetActions, TweetComponentProps} from "../components/TweetComponent/TweetComponent";

export interface HoverActionProps {
    visibleReplyAction?: boolean;
    visibleRetweetAction?: boolean;
    visibleLikeAction?: boolean;
    visibleShareAction?: boolean;
    visibleMoreAction?: boolean;
    handleHoverAction?: (action: TweetActions) => void;
    handleLeaveAction?: () => void;
}

export const withHoverAction = <T extends object>(
    Component: React.ComponentType<HoverActionProps & TweetComponentProps<T>>
) => (props: HoverActionProps & TweetComponentProps<T>) => {
    const [visibleReplyAction, setVisibleReplyAction] = useState<boolean>(false);
    const [visibleRetweetAction, setVisibleRetweetAction] = useState<boolean>(false);
    const [visibleLikeAction, setVisibleLikeAction] = useState<boolean>(false);
    const [visibleShareAction, setVisibleShareAction] = useState<boolean>(false);
    const [visibleMoreAction, setVisibleMoreAction] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const handleHoverAction = (action: TweetActions): void => {
        if (action === TweetActions.REPLY) {
            setDelayHandler(setTimeout(() => setVisibleReplyAction(true), 500));
        } else if (action === TweetActions.RETWEET) {
            setDelayHandler(setTimeout(() => setVisibleRetweetAction(true), 500));
        } else if (action === TweetActions.LIKE) {
            setDelayHandler(setTimeout(() => setVisibleLikeAction(true), 500));
        } else if (action === TweetActions.SHARE) {
            setDelayHandler(setTimeout(() => setVisibleShareAction(true), 500));
        } else if (action === TweetActions.MORE) {
            setDelayHandler(setTimeout(() => setVisibleMoreAction(true), 500));
        }
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleReplyAction(false);
        setVisibleRetweetAction(false);
        setVisibleLikeAction(false);
        setVisibleShareAction(false);
        setVisibleMoreAction(false);
    };

    return (
        <Component
            item={props.item}
            visibleReplyAction={visibleReplyAction}
            visibleRetweetAction={visibleRetweetAction}
            visibleLikeAction={visibleLikeAction}
            visibleShareAction={visibleShareAction}
            visibleMoreAction={visibleMoreAction}
            handleHoverAction={handleHoverAction}
            handleLeaveAction={handleLeaveAction}
        />
    );
};
