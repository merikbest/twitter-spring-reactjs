import React, {memo, ReactElement, useState} from "react";
import {useFullTweetStyles} from "../../FullTweetStyles";
import UsersListModal, {UsersListModalAction} from "../../../../components/UsersListModal/UsersListModal";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";

import {selectRetweetsCount, selectTweetId} from "../../../../store/ducks/tweet/selectors";

const RetweetsCount = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const tweetId = useSelector(selectTweetId);
    const retweetsCount = useSelector(selectRetweetsCount);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);

    const onOpenUsersListModal = (): void => {
        setVisibleModalWindow(true);
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    return (
        <>
            {(retweetsCount !== 0) && (
                <a href={"javascript:void(0);"} onClick={onOpenUsersListModal}>
                    <div className={classes.contentItem}>
                        <Typography variant={"h6"} component={"span"}>
                            {retweetsCount}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            Retweets
                        </Typography>
                    </div>
                </a>
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
