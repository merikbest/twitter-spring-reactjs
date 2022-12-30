import React, {memo, ReactElement, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";

import {selectLikedTweetsCount, selectRetweetsCount, selectTweetId} from "../../../store/ducks/tweet/selectors";
import UsersListModal, {UsersListModalAction} from "../../UsersListModal/UsersListModal";
import {useTweetInteractionCountStyles} from "./TweetInteractionCountStyles";

const TweetInteractionCount = memo((): ReactElement => {
    const classes = useTweetInteractionCountStyles();
    const tweetId = useSelector(selectTweetId);
    const retweetsCount = useSelector(selectRetweetsCount);
    const likedTweetsCount = useSelector(selectLikedTweetsCount);
    const [visibleUsersListModalWindow, setVisibleUsersListModalWindow] = useState<boolean>(false);
    const [usersListModalAction, setUsersListModalAction] = useState<UsersListModalAction>(UsersListModalAction.LIKED);

    const onOpenLikesModalWindow = (): void => {
        setVisibleUsersListModalWindow(true);
        setUsersListModalAction(UsersListModalAction.LIKED);
    };

    const onOpenRetweetsModalWindow = (): void => {
        setVisibleUsersListModalWindow(true);
        setUsersListModalAction(UsersListModalAction.RETWEETED);
    };

    const onCloseUsersListModalWindow = (): void => {
        setVisibleUsersListModalWindow(false);
    };

    return (
        <>
            {(retweetsCount !== 0 || likedTweetsCount !== 0) && (
                <div id={"content"} className={classes.content}>
                    {(retweetsCount !== 0) && (
                        <a
                            id={"onOpenRetweetsModalWindow"}
                            href={"javascript:void(0);"}
                            onClick={onOpenRetweetsModalWindow}
                        >
                            <span style={{marginRight: 20}}>
                                <Typography variant={"h6"} component={"span"}>
                                    {retweetsCount}
                                </Typography>
                                <Typography variant={"subtitle1"} component={"span"}>
                                    Retweets
                                </Typography>
                            </span>
                        </a>
                    )}
                    {(likedTweetsCount !== 0) && (
                        <a
                            id={"onOpenLikesModalWindow"}
                            href={"javascript:void(0);"}
                            onClick={onOpenLikesModalWindow}
                        >
                            <span style={{marginRight: 20}}>
                                <Typography variant={"h6"} component={"span"}>
                                    {likedTweetsCount}
                                </Typography>
                                <Typography variant={"subtitle1"} component={"span"}>
                                    Likes
                                </Typography>
                            </span>
                        </a>
                    )}
                </div>
            )}
            <UsersListModal
                tweetId={tweetId!}
                usersListModalAction={usersListModalAction}
                visible={visibleUsersListModalWindow}
                onClose={onCloseUsersListModalWindow}
            />
        </>
    );
});

export default TweetInteractionCount;
