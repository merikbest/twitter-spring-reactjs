import React, { memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";

import { ReplyType } from "../../../types/common";
import { PROFILE } from "../../../constants/path-constants";
import AddTweetForm from "../../../components/AddTweetForm/AddTweetForm";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import {
    selectTweetId,
    selectTweetReplyType,
    selectTweetAuthorId,
    selectTweetAuthorIsFollower,
    selectTweetAuthorUsername
} from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";

const AddReplyToTweet = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const tweetId = useSelector(selectTweetId);
    const myProfileId = useSelector(selectUserDataId);
    const tweetAuthorId = useSelector(selectTweetAuthorId);
    const replyType = useSelector(selectTweetReplyType);
    const tweetAuthorIsFollower = useSelector(selectTweetAuthorIsFollower);
    const tweetAuthorUsername = useSelector(selectTweetAuthorUsername);

    return (
        <>
            {((replyType !== ReplyType.FOLLOW) && (replyType !== ReplyType.MENTION) ||
                (myProfileId === tweetAuthorId) || (tweetAuthorIsFollower && replyType === ReplyType.FOLLOW)
            ) ? (
                <>
                    <Typography variant={"subtitle1"} className={classes.replyWrapper}>
                        {"Replying to "}
                        <Link to={`${PROFILE}/${tweetAuthorId}`}>
                            @{tweetAuthorUsername}
                        </Link>
                    </Typography>
                    <AddTweetForm
                        tweetId={tweetId}
                        addressedUsername={tweetAuthorUsername}
                        addressedId={tweetAuthorId}
                        maxRows={15}
                        title={"Tweet your reply"}
                        buttonName={"Reply"}
                    />
                </>
            ) : null}
        </>
    );
});

export default AddReplyToTweet;
