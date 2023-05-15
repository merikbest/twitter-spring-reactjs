import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import { PROFILE } from "../../../constants/path-constants";
import PopperUserWindow from "../../../components/PopperUserWindow/PopperUserWindow";
import { useFullTweetStyles } from "../FullTweetStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import {
    selectTweetUserAvatar,
    selectTweetUserFullName,
    selectTweetUserId,
    selectTweetUserUsername
} from "../../../store/ducks/tweet/selectors";
import { HoverItemDetail, useHoverItem } from "../../../hook/useHoverItem";
import { fetchUserDetail } from "../../../store/ducks/userDetail/actionCreators";

const TweetHeader = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useFullTweetStyles();
    const tweetUserId = useSelector(selectTweetUserId);
    const tweetUserAvatar = useSelector(selectTweetUserAvatar);
    const tweetUserUsername = useSelector(selectTweetUserUsername);
    const tweetUserFullName = useSelector(selectTweetUserFullName);
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);

    return (
        <div className={classes.headerWrapper}>
            <Avatar className={globalClasses.avatar} src={tweetUserAvatar} alt={`avatar ${tweetUserId!}`} />
            <div
                id={"userInfo"}
                className={classes.headerUserInfo}
                onMouseEnter={() => handleHoverPopper({ userId: tweetUserId } as HoverItemDetail)}
                onMouseLeave={handleLeavePopper}
            >
                <Link to={`${PROFILE}/${tweetUserId}`}>
                    <Typography variant={"h6"} component={"div"}>
                        {tweetUserFullName}
                    </Typography>
                </Link>
                <div>
                    <Typography variant={"subtitle1"} component={"span"}>
                        @{tweetUserUsername}
                    </Typography>
                </div>
                <PopperUserWindow visible={visiblePopperWindow} />
            </div>
        </div>
    );
});

export default TweetHeader;
