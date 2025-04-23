import React, { memo, ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectLikesCount, selectRetweetsCount, selectTweetId } from "../../../store/ducks/tweet/selectors";
import UsersListModal, { UsersListModalAction } from "../../UsersListModal/UsersListModal";
import { useTweetInteractionCountStyles } from "./TweetInteractionCountStyles";
import { useModalWindow } from "../../../hook/useModalWindow";
import InteractionCount from "./InteractionCount/InteractionCount";

const TweetInteractionCount = memo((): ReactElement | null => {
    const classes = useTweetInteractionCountStyles();
    const tweetId = useSelector(selectTweetId);
    const retweetsCount = useSelector(selectRetweetsCount);
    const likesCount = useSelector(selectLikesCount);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const [usersListModalAction, setUsersListModalAction] = useState<UsersListModalAction>(UsersListModalAction.LIKED);
    const { t } = useTranslation();

    const onOpenUsersModalWindow = (modalAction: UsersListModalAction): void => {
        setUsersListModalAction(modalAction);
        onOpenModalWindow();
    };

    if (retweetsCount === 0 && likesCount === 0) {
        return null;
    }

    return (
        <>
            <div id="content" className={classes.content}>
                <InteractionCount
                    id="onOpenRetweetsModalWindow"
                    title={t("RETWEETS", { defaultValue: "Retweets" })}
                    interactionCount={retweetsCount ?? 0}
                    modalAction={UsersListModalAction.RETWEETED}
                    onOpenUsersModalWindow={onOpenUsersModalWindow}
                />
                <InteractionCount
                    id="onOpenLikesModalWindow"
                    title={t("LIKES", { defaultValue: "Likes" })}
                    interactionCount={likesCount ?? 0}
                    modalAction={UsersListModalAction.LIKED}
                    onOpenUsersModalWindow={onOpenUsersModalWindow}
                />
            </div>
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
