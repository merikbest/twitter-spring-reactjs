import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";

import { useFullTweetStyles } from "../../FullTweetStyles";
import UsersListModal, { UsersListModalAction } from "../../../../components/UsersListModal/UsersListModal";
import { selectRetweetsCount, selectTweetId } from "../../../../store/ducks/tweet/selectors";
import { useModalWindow } from "../../../../hook/useModalWindow";

const RetweetsCount = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const tweetId = useSelector(selectTweetId);
    const retweetsCount = useSelector(selectRetweetsCount);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            {(retweetsCount !== 0) && (
                <span className={classes.interactionCount} onClick={onOpenModalWindow}>
                    <div className={classes.contentItem}>
                        <Typography variant={"h6"} component={"span"}>
                            {retweetsCount}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            Retweets
                        </Typography>
                    </div>
                </span>
            )}
            <UsersListModal
                tweetId={tweetId!}
                usersListModalAction={UsersListModalAction.RETWEETED}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
});

export default RetweetsCount;
