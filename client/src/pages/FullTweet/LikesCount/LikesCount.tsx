import React, {memo, ReactElement, useState} from "react";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";

import UsersListModal, {UsersListModalAction} from "../../../components/UsersListModal/UsersListModal";
import {selectLikedTweetsCount, selectTweetId} from "../../../store/ducks/tweet/selectors";
import {useFullTweetStyles} from "../FullTweetStyles";

const LikesCount = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const tweetId = useSelector(selectTweetId);
    const likedTweetsCount = useSelector(selectLikedTweetsCount);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);

    const onOpenUsersListModal = (): void => {
        setVisibleModalWindow(true);
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    return (
        <>
            {(likedTweetsCount !== 0) && (
                <a href={"javascript:void(0);"} onClick={onOpenUsersListModal}>
                    <div className={classes.contentItem}>
                        <Typography variant={"h6"} component={"span"}>
                            {likedTweetsCount}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            Likes
                        </Typography>
                    </div>
                </a>
            )}
            <UsersListModal
                tweetId={tweetId!}
                usersListModalAction={UsersListModalAction.LIKED}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
});

export default LikesCount;
