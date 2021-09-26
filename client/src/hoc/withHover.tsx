import React, {useState} from 'react';
import {User} from "../store/ducks/user/contracts/state";

interface Hover<T> extends ListHover, TweetHover, FollowerHover, MemberHover {
    item?: T;
    visiblePopperWindow?: boolean;
    handleHover?: () => void;
    handleLeave?: () => void;
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

export const withHover = <T extends object>(Component: React.FC<Hover<T>>): React.FC<Hover<T>> => {
    return (props: Hover<T>) => {
        const [visiblePopperWindow, setVisiblePopperWindow] = useState<boolean>(false);
        const [delayHandler, setDelayHandler] = useState<any>(null);

        const handleHover = (): void => {
            setDelayHandler(setTimeout(() => setVisiblePopperWindow(true), 1337));
        };

        const handleLeave = (): void => {
            clearTimeout(delayHandler);
            setVisiblePopperWindow(false);
        };

        return (
            <Component
                item={props.item}
                visiblePopperWindow={visiblePopperWindow}
                handleHover={handleHover}
                handleLeave={handleLeave}
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
};
