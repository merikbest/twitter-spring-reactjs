import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { PROFILE } from "../../../constants/path-constants";
import { LockIcon } from "../../../icons";
import { formatDate } from "../../../util/format-date-helper";
import PopperUserWindow from "../../PopperUserWindow/PopperUserWindow";
import LinkWrapper from "../../LinkWrapper/LinkWrapper";
import { HoverItemDetail, useHoverItem } from "../../../hook/useHoverItem";
import { useTweetHeaderStyles } from "./TweetHeaderStyles";
import { fetchUserDetail } from "../../../store/ducks/userDetail/actionCreators";

interface TweetHeaderProps {
    dateTime?: string;
    userId?: number;
    fullName?: string;
    username?: string;
    isPrivateProfile?: boolean;
}

const TweetHeader: FC<TweetHeaderProps> = memo((
    {
        userId,
        fullName,
        username,
        isPrivateProfile,
        dateTime
    }
): ReactElement => {
    const classes = useTweetHeaderStyles();
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);

    return (
        <LinkWrapper path={`${PROFILE}/${userId}`} visiblePopperWindow={visiblePopperWindow}>
            <span
                onMouseEnter={() => handleHoverPopper({ userId: userId! } as HoverItemDetail)}
                onMouseLeave={handleLeavePopper}
            >
                <Typography variant={"h6"} component={"span"}>
                    {fullName}
                </Typography>
                {isPrivateProfile && <span className={classes.lockIcon}>{LockIcon}</span>}&nbsp;
                <Typography variant={"subtitle1"} component={"span"}>
                    @{username}{" · "}
                </Typography>
                <Typography variant={"subtitle1"} component={"span"}>
                    {formatDate(new Date(dateTime!))}
                </Typography>
                <PopperUserWindow visible={visiblePopperWindow} isTweetComponent />
            </span>
        </LinkWrapper>
    );
});

export default TweetHeader;
