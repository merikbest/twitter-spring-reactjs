import React, {FC, memo, ReactElement} from "react";
import {Avatar} from "@material-ui/core";
import classnames from "classnames";

import {DEFAULT_PROFILE_IMG} from "../../../../../../../util/url";
import {Image} from "../../../../../../../store/types/common";
import {useGlobalStyles} from "../../../../../../../util/globalClasses";
import {useBlockedAccountItemStyles} from "../BlockedAccountItemStyles";

interface BlockedAccountAvatarProps {
    avatar?: Image;
}

const BlockedAccountAvatar: FC<BlockedAccountAvatarProps> = memo(({avatar}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useBlockedAccountItemStyles();
    const avatarSrc = avatar ? avatar.src : DEFAULT_PROFILE_IMG;

    return <Avatar className={classnames(classes.listAvatar, globalClasses.avatar)} src={avatarSrc} alt={avatarSrc}/>;
});

export default BlockedAccountAvatar;
