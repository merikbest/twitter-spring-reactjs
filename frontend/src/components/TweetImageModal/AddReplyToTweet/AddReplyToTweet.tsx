import React, { ReactElement } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { PROFILE } from "../../../constants/path-constants";
import AddTweetForm from "../../AddTweetForm/AddTweetForm";
import { selectTweetId, selectTweetAuthorId, selectTweetAuthorUsername } from "../../../store/ducks/tweet/selectors";
import { useAddReplyToTweetStyles } from "./AddReplyToTweetStyles";

const AddReplyToTweet = (): ReactElement => {
    const classes = useAddReplyToTweetStyles();
    const tweetId = useSelector(selectTweetId);
    const tweetAuthorId = useSelector(selectTweetAuthorId);
    const tweetAuthorUsername = useSelector(selectTweetAuthorUsername);

    return (
        <>
            <Typography variant={"subtitle1"} component={"div"} className={classes.replyWrapper}>
                {"Replying to "}
                <Link to={`${PROFILE}/${tweetAuthorId}`}>
                    @{tweetAuthorUsername}
                </Link>
            </Typography>
            <AddTweetForm
                tweetId={tweetId}
                addressedUsername={tweetAuthorUsername}
                maxRows={15}
                title={"Tweet your reply"}
                buttonName={"Reply"}
            />
        </>
    );
};

export default AddReplyToTweet;
