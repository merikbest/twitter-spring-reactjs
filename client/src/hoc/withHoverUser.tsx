import React, {useState} from 'react';
import {User} from "../store/ducks/user/contracts/state";
import {HoverActionProps} from "./withHoverAction";

export interface HoverUserProps<T> extends ListHover, TweetHover, FollowerHover, MemberHover, HoverActionProps {
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

export const withHoverUser = <T extends object>(Component: React.FC<HoverUserProps<T>>): React.FC<HoverUserProps<T>> => {
    return (props: HoverUserProps<T>) => {
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
