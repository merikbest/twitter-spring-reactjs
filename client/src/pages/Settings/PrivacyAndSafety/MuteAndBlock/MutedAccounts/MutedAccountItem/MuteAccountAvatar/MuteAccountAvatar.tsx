import React, {FC, memo, ReactElement} from "react";
import {Link} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import classnames from "classnames";

import {PROFILE} from "../../../../../../../util/pathConstants";
import {Image} from "../../../../../../../store/types/common";
import {DEFAULT_PROFILE_IMG} from "../../../../../../../util/url";
import {useGlobalStyles} from "../../../../../../../util/globalClasses";
import {useMutedAccountItemStyles} from "../MutedAccountItemStyles";

interface MuteAccountAvatarProps {
    userId: number;
    avatar: Image;
}

const MuteAccountAvatar: FC<MuteAccountAvatarProps> = memo(({userId, avatar}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useMutedAccountItemStyles();
    const avatarSrc = avatar ? avatar.src : DEFAULT_PROFILE_IMG;

    return (
        <Link to={`${PROFILE}/${userId}`}>
            <Avatar className={classnames(classes.listAvatar, globalClasses.avatar)} src={avatarSrc} alt={avatarSrc}/>
        </Link>
    );
});

export default MuteAccountAvatar;
