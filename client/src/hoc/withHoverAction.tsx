import React, {useState} from "react";

import {TweetActions} from "../components/TweetComponent/TweetComponent";
import {Tweet} from "../store/ducks/tweets/contracts/state";

export interface HoverActionProps {
    item?: Tweet;
    visibleReplyAction?: boolean;
    visibleRetweetAction?: boolean;
    visibleLikeAction?: boolean;
    visibleShareAction?: boolean;
    visibleAnalyticsAction?: boolean;
    visibleMoreAction?: boolean;
    handleHoverAction?: (action: TweetActions) => void;
    handleLeaveAction?: () => void;
}

const HOVER_DELAY = 500;

export const withHoverAction = <T extends object>(
    Component: React.ComponentType<HoverActionProps>
) => (props: HoverActionProps) => {
    const [visibleReplyAction, setVisibleReplyAction] = useState<boolean>(false);
    const [visibleRetweetAction, setVisibleRetweetAction] = useState<boolean>(false);
    const [visibleLikeAction, setVisibleLikeAction] = useState<boolean>(false);
    const [visibleShareAction, setVisibleShareAction] = useState<boolean>(false);
    const [visibleAnalyticsAction, setVisibleAnalyticsAction] = useState<boolean>(false);
    const [visibleMoreAction, setVisibleMoreAction] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const handleHoverAction = (action: TweetActions): void => {
        if (action === TweetActions.REPLY) {
            setDelayHandler(setTimeout(() => setVisibleReplyAction(true), HOVER_DELAY));
        } else if (action === TweetActions.RETWEET) {
            setDelayHandler(setTimeout(() => setVisibleRetweetAction(true), HOVER_DELAY));
        } else if (action === TweetActions.LIKE) {
            setDelayHandler(setTimeout(() => setVisibleLikeAction(true), HOVER_DELAY));
        } else if (action === TweetActions.SHARE) {
            setDelayHandler(setTimeout(() => setVisibleShareAction(true), HOVER_DELAY));
        } else if (action === TweetActions.ANALYTICS) {
            setDelayHandler(setTimeout(() => setVisibleAnalyticsAction(true), HOVER_DELAY));
        } else if (action === TweetActions.MORE) {
            setDelayHandler(setTimeout(() => setVisibleMoreAction(true), HOVER_DELAY));
        }
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleReplyAction(false);
        setVisibleRetweetAction(false);
        setVisibleLikeAction(false);
        setVisibleShareAction(false);
        setVisibleAnalyticsAction(false);
        setVisibleMoreAction(false);
    };

    return (
        <Component
            {...props as HoverActionProps}
            item={props.item}
            visibleReplyAction={visibleReplyAction}
            visibleRetweetAction={visibleRetweetAction}
            visibleLikeAction={visibleLikeAction}
            visibleShareAction={visibleShareAction}
            visibleAnalyticsAction={visibleAnalyticsAction}
            visibleMoreAction={visibleMoreAction}
            handleHoverAction={handleHoverAction}
            handleLeaveAction={handleLeaveAction}
        />
    );
};
