import React, {ComponentType, useState} from "react";

export enum HoverActions {
    REPLY = "REPLY",
    RETWEET = "RETWEET",
    LIKE = "LIKE",
    SHARE = "SHARE",
    ANALYTICS = "ANALYTICS",
    MORE = "MORE",
    CREATE_LIST = "CREATE_LIST",
    OTHER = "OTHER",
}

export interface HoverActionProps {
    visibleHoverAction?: VisibleActions;
    handleHoverAction?: (action: HoverActions) => void;
    handleLeaveAction?: () => void;
}

interface VisibleActions {
    visibleReplyAction: boolean;
    visibleRetweetAction: boolean;
    visibleLikeAction: boolean;
    visibleShareAction: boolean;
    visibleAnalyticsAction: boolean;
    visibleMoreAction: boolean;
    visibleOtherAction: boolean;
    visibleCreateListAction: boolean;
}

const HOVER_DELAY = 500;

export const withHoverAction = <T extends HoverActionProps>(Component: ComponentType<T>) => (props: T) => {
    const initialState = {
        visibleReplyAction: false,
        visibleRetweetAction: false,
        visibleLikeAction: false,
        visibleShareAction: false,
        visibleAnalyticsAction: false,
        visibleMoreAction: false,
        visibleOtherAction: false,
        visibleCreateListAction: false,
    }
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const [visibleHoverAction, setVisibleHoverAction] = useState<VisibleActions>({...initialState});

    const handleHoverAction = (action: HoverActions): void => {
        if (action === HoverActions.REPLY) {
            setHoverAction({...initialState, visibleReplyAction: true});
        } else if (action === HoverActions.RETWEET) {
            setHoverAction({...initialState, visibleRetweetAction: true});
        } else if (action === HoverActions.LIKE) {
            setHoverAction({...initialState, visibleLikeAction: true});
        } else if (action === HoverActions.SHARE) {
            setHoverAction({...initialState, visibleShareAction: true});
        } else if (action === HoverActions.ANALYTICS) {
            setHoverAction({...initialState, visibleAnalyticsAction: true});
        } else if (action === HoverActions.MORE) {
            setHoverAction({...initialState, visibleMoreAction: true});
        } else if (action === HoverActions.CREATE_LIST) {
            setHoverAction({...initialState, visibleCreateListAction: true});
        } else {
            setHoverAction({...initialState, visibleOtherAction: true});
        }
    };

    const setHoverAction = (name: VisibleActions): void => {
        setDelayHandler(setTimeout(() => setVisibleHoverAction(name), HOVER_DELAY));
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleHoverAction({...initialState})
    };

    return (
        <Component
            {...props as T}
            visibleHoverAction={visibleHoverAction}
            handleHoverAction={handleHoverAction}
            handleLeaveAction={handleLeaveAction}
        />
    );
};
