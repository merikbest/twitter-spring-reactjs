import React, { memo, ReactElement, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

import { selectLikedTweetsCount, selectRetweetsCount, selectTweetId } from "../../../store/ducks/tweet/selectors";
import UsersListModal, { UsersListModalAction } from "../../UsersListModal/UsersListModal";
import { useTweetInteractionCountStyles } from "./TweetInteractionCountStyles";
import { useModalWindow } from "../../../hook/useModalWindow";

const TweetInteractionCount = memo((): ReactElement => {
    const classes = useTweetInteractionCountStyles();
    const tweetId = useSelector(selectTweetId);
    const retweetsCount = useSelector(selectRetweetsCount);
    const likedTweetsCount = useSelector(selectLikedTweetsCount);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const [usersListModalAction, setUsersListModalAction] = useState<UsersListModalAction>(UsersListModalAction.LIKED);

    const onOpenLikesModalWindow = (): void => {
        onOpenModalWindow();
        setUsersListModalAction(UsersListModalAction.LIKED);
    };

    const onOpenRetweetsModalWindow = (): void => {
        onOpenModalWindow();
        setUsersListModalAction(UsersListModalAction.RETWEETED);
    };

    return (
        <>
            {(retweetsCount !== 0 || likedTweetsCount !== 0) && (
                <div id={"content"} className={classes.content}>
                    {(retweetsCount !== 0) && (
                        <span
                            id={"onOpenRetweetsModalWindow"}
                            className={classes.interactionCount}
                            onClick={onOpenRetweetsModalWindow}
                        >
                            <span style={{ marginRight: 20 }}>
                                <Typography variant={"h6"} component={"span"}>
                                    {retweetsCount}
                                </Typography>
                                <Typography variant={"subtitle1"} component={"span"}>
                                    Retweets
                                </Typography>
                            </span>
                        </span>
                    )}
                    {(likedTweetsCount !== 0) && (
                        <span
                            id={"onOpenLikesModalWindow"}
                            className={classes.interactionCount}
                            onClick={onOpenLikesModalWindow}
                        >
                            <span style={{ marginRight: 20 }}>
                                <Typography variant={"h6"} component={"span"}>
                                    {likedTweetsCount}
                                </Typography>
                                <Typography variant={"subtitle1"} component={"span"}>
                                    Likes
                                </Typography>
                            </span>
                        </span>
                    )}
                </div>
            )}
            <UsersListModal
                tweetId={tweetId!}
                usersListModalAction={usersListModalAction}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
});

export default TweetInteractionCount;
