import React, {FC, ReactElement} from "react";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {PROFILE} from "../../../util/pathConstants";
import AddTweetForm from "../../AddTweetForm/AddTweetForm";
import {selectTweetId, selectTweetUserId, selectTweetUserUsername} from "../../../store/ducks/tweet/selectors";

interface AddReplyToTweetProps {
    classes: ClassNameMap<string>
}

const AddReplyToTweet: FC<AddReplyToTweetProps> = ({classes}): ReactElement => {
    const tweetId = useSelector(selectTweetId);
    const tweetUserId = useSelector(selectTweetUserId);
    const username = useSelector(selectTweetUserUsername);

    return (
        <>
            <Typography variant={"subtitle1"} component={"div"} className={classes.replyWrapper}>
                {"Replying to "}
                <Link to={`${PROFILE}/${tweetUserId}`}>
                    @{username}
                </Link>
            </Typography>
            <AddTweetForm
                tweetId={tweetId}
                addressedUsername={username}
                maxRows={15}
                title={"Tweet your reply"}
                buttonName={"Reply"}
            />
        </>
    );
};

export default AddReplyToTweet;
