import React, {useState} from 'react';

import {User} from "../store/ducks/user/contracts/state";

export interface HoverProps<T> extends ListHover, TweetHover, FollowerHover, MemberHover {
    item?: T;
    visiblePopperWindow?: boolean;
    handleHoverPopper?: () => void;
    handleLeavePopper?: () => void;
}

interface ListHover {
    listIndex?: number;
    isMyList?: boolean;
}

interface TweetHover {
    activeTab?: number;
    userProfileId?: number;
}

interface FollowerHover {
    follow?: (user: User) => void;
    unfollow?: (user: User) => void;
}

interface MemberHover {
    member?: User;
}

export const withHoverUser = <T extends object>(
    Component: React.ComponentType<HoverProps<T>>
) => (props: HoverProps<T>) => {
    const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const handleHoverPopper = (): void => {
        setDelayHandler(setTimeout(() => setVisiblePopperWindow(true), 337));
    };

    const handleLeavePopper = (): void => {
        clearTimeout(delayHandler);
        setVisiblePopperWindow(false);
    };

    return (
        <Component
            {...props as HoverProps<T>}
            item={props.item}
            visiblePopperWindow={visiblePopperWindow}
            handleHoverPopper={handleHoverPopper}
            handleLeavePopper={handleLeavePopper}
            listIndex={props.listIndex}
            isMyList={props.isMyList}
            activeTab={props.activeTab}
            userProfileId={props.userProfileId}
            follow={props.follow}
            unfollow={props.unfollow}
            member={props.member}
        />
    );
};
