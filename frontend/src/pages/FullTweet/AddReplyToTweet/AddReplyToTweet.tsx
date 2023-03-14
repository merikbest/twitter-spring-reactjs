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
    selectTweetUserId,
    selectTweetUserIsFollower,
    selectTweetUserUsername
} from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";

const AddReplyToTweet = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const tweetId = useSelector(selectTweetId);
    const myProfileId = useSelector(selectUserDataId);
    const tweetUserId = useSelector(selectTweetUserId);
    const replyType = useSelector(selectTweetReplyType);
    const tweetUserIsFollower = useSelector(selectTweetUserIsFollower);
    const tweetUserUsername = useSelector(selectTweetUserUsername);

    return (
        <>
            {((replyType !== ReplyType.FOLLOW) && (replyType !== ReplyType.MENTION) ||
                (myProfileId === tweetUserId) || (tweetUserIsFollower && replyType === ReplyType.FOLLOW)
            ) ? (
                <>
                    <Typography variant={"subtitle1"} className={classes.replyWrapper}>
                        {"Replying to "}
                        <Link to={`${PROFILE}/${tweetUserId}`}>
                            @{tweetUserUsername}
                        </Link>
                    </Typography>
                    <AddTweetForm
                        tweetId={tweetId}
                        addressedUsername={tweetUserUsername}
                        addressedId={tweetUserId}
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
