import React, { memo, ReactElement, useState } from "react";
import { useSelector } from "react-redux";

import { selectLikedTweetsCount, selectRetweetsCount, selectTweetId } from "../../../store/ducks/tweet/selectors";
import UsersListModal, { UsersListModalAction } from "../../UsersListModal/UsersListModal";
import { useTweetInteractionCountStyles } from "./TweetInteractionCountStyles";
import { useModalWindow } from "../../../hook/useModalWindow";
import InteractionCount from "./InteractionCount/InteractionCount";

const TweetInteractionCount = memo((): ReactElement => {
    const classes = useTweetInteractionCountStyles();
    const tweetId = useSelector(selectTweetId);
    const retweetsCount = useSelector(selectRetweetsCount);
    const likedTweetsCount = useSelector(selectLikedTweetsCount);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const [usersListModalAction, setUsersListModalAction] = useState<UsersListModalAction>(UsersListModalAction.LIKED);

    const onOpenUsersModalWindow = (modalAction: UsersListModalAction): void => {
        setUsersListModalAction(modalAction);
        onOpenModalWindow();
    };

    return (
        <>
            {(retweetsCount !== 0 || likedTweetsCount !== 0) && (
                <div id={"content"} className={classes.content}>
                    <InteractionCount
                        id={"onOpenRetweetsModalWindow"}
                        title={"Retweets"}
                        interactionCount={retweetsCount ?? 0}
                        modalAction={UsersListModalAction.RETWEETED}
                        onOpenUsersModalWindow={onOpenUsersModalWindow}
                    />
                    <InteractionCount
                        id={"onOpenLikesModalWindow"}
                        title={"Likes"}
                        interactionCount={likedTweetsCount ?? 0}
                        modalAction={UsersListModalAction.LIKED}
                        onOpenUsersModalWindow={onOpenUsersModalWindow}
                    />
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
