import React, { FC, memo, ReactElement } from "react";
import { Avatar } from "@material-ui/core";

import { useManageMembersItemStyles } from "../ManageMembersItemStyles";

interface MemberItemAvatarProps {
    avatar?: string;
}

const MemberItemAvatar: FC<MemberItemAvatarProps> = memo(({ avatar }): ReactElement => {
    const classes = useManageMembersItemStyles();

    return <Avatar className={classes.listAvatar} src={avatar} />;
});

export default MemberItemAvatar;
