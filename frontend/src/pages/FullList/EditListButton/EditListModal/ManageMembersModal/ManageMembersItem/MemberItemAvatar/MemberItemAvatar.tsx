import React, {FC, memo, ReactElement} from "react";
import {Avatar} from "@material-ui/core";

import {DEFAULT_PROFILE_IMG} from "../../../../../../../util/url";
import {useManageMembersItemStyles} from "../ManageMembersItemStyles";
import {Image} from "../../../../../../../store/types/common";

interface MemberItemAvatarProps {
    avatar?: Image;
}

const MemberItemAvatar: FC<MemberItemAvatarProps> = memo(({avatar}): ReactElement => {
    const classes = useManageMembersItemStyles();

    return <Avatar className={classes.listAvatar} src={avatar ? avatar.src : DEFAULT_PROFILE_IMG}/>;
});

export default MemberItemAvatar;
