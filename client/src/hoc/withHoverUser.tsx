import React, {useState} from 'react';

import {User} from "../store/ducks/user/contracts/state";
import {TweetComponentProps} from "../components/TweetComponent/TweetComponent";
import {UsersItemProps} from "../components/Users/UsersItem/UsersItem";
import {HoverActionProps} from "./withHoverAction";

export interface HoverProps extends ListHover, TweetHover, FollowerHover, MemberHover {
    // item?: T;
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
    Component: React.ComponentType<HoverProps & TweetComponentProps<T> & UsersItemProps<T>>
) => (props: HoverProps & TweetComponentProps<T> & UsersItemProps<T>) => {
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
