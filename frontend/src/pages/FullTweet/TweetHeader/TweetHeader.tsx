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
    selectTweetAuthorAvatar,
    selectTweetAuthorFullName,
    selectTweetAuthorId,
    selectTweetAuthorUsername
} from "../../../store/ducks/tweet/selectors";
import { HoverItemDetail, useHoverItem } from "../../../hook/useHoverItem";
import { fetchUserDetail } from "../../../store/ducks/userDetail/actionCreators";

const TweetHeader = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useFullTweetStyles();
    const tweetAuthorId = useSelector(selectTweetAuthorId);
    const tweetAuthorAvatar = useSelector(selectTweetAuthorAvatar);
    const tweetAuthorUsername = useSelector(selectTweetAuthorUsername);
    const tweetAuthorFullName = useSelector(selectTweetAuthorFullName);
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);

    return (
        <div className={classes.headerWrapper}>
            <Avatar className={globalClasses.avatar} src={tweetAuthorAvatar} alt={`avatar ${tweetAuthorId!}`} />
            <div
                id={"userInfo"}
                className={classes.headerUserInfo}
                onMouseEnter={() => handleHoverPopper({ userId: tweetAuthorId } as HoverItemDetail)}
                onMouseLeave={handleLeavePopper}
            >
                <Link to={`${PROFILE}/${tweetAuthorId}`}>
                    <Typography variant={"h6"} component={"div"}>
                        {tweetAuthorFullName}
                    </Typography>
                </Link>
                <div>
                    <Typography variant={"subtitle1"} component={"span"}>
                        @{tweetAuthorUsername}
                    </Typography>
                </div>
                <PopperUserWindow visible={visiblePopperWindow} />
            </div>
        </div>
    );
});

export default TweetHeader;
