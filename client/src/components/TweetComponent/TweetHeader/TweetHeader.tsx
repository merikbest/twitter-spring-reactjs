import React, {FC, memo, ReactElement} from "react";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";

import {PROFILE} from "../../../util/pathConstants";
import {LockIcon} from "../../../icons";
import {formatDate} from "../../../util/formatDate";
import PopperUserWindow from "../../PopperUserWindow/PopperUserWindow";
import LinkWrapper from "../../LinkWrapper/LinkWrapper";
import {useHoverUser} from "../../../hook/useHoverUser";

interface TweetHeaderProps {
    classes: ClassNameMap<string>;
    dateTime?: string;
    userId?: number;
    fullName?: string;
    username?: string;
    isPrivateProfile?: boolean;
}

const TweetHeader: FC<TweetHeaderProps> = memo((
    {
        classes,
        userId,
        fullName,
        username,
        isPrivateProfile,
        dateTime,
    }
): ReactElement => {
    const {visiblePopperWindow, handleHoverPopper, handleLeavePopper} = useHoverUser();

    return (
        <LinkWrapper path={`${PROFILE}/${userId}`} visiblePopperWindow={visiblePopperWindow}>
            <span onMouseEnter={() => handleHoverPopper(userId!)} onMouseLeave={handleLeavePopper}>
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
                <PopperUserWindow visible={visiblePopperWindow} isTweetComponent/>
            </span>
        </LinkWrapper>
    );
});

export default TweetHeader;
