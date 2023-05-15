import React, {FC, memo, ReactElement} from "react";
import {Paper} from "@material-ui/core";
import {Link} from "react-router-dom";

import {useBlockedAccountItemStyles} from "./BlockedAccountItemStyles";
import {useGlobalStyles} from "../../../../../../util/globalClasses";
import {BlockedUserResponse} from "../../../../../../types/user";
import {PROFILE} from "../../../../../../constants/path-constants";
import BlockAccountButton from "./BlockAccountButton/BlockAccountButton";
import BlockedAccountInfo from "./BlockedAccountInfo/BlockedAccountInfo";
import BlockedAccountAvatar from "./BlockedAccountAvatar/BlockedAccountAvatar";

interface BlockedAccountItemProps {
    blockedUser: BlockedUserResponse;
}

const BlockedAccountItem: FC<BlockedAccountItemProps> = memo(({blockedUser}): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useBlockedAccountItemStyles();

    return (
        <Link to={`${PROFILE}/${blockedUser?.id}`} className={globalClasses.link}>
            <Paper className={classes.container}>
                <BlockedAccountAvatar avatar={blockedUser.avatar}/>
                <div style={{flex: 1}}>
                    <div className={classes.userInfoWrapper}>
                        <BlockedAccountInfo
                            fullName={blockedUser.fullName}
                            username={blockedUser.username}
                            about={blockedUser.about}
                        />
                        <BlockAccountButton
                            userId={blockedUser.id}
                            username={blockedUser.username}
                            isUserBlocked={blockedUser.isUserBlocked}
                        />
                    </div>
                </div>
            </Paper>
        </Link>
    );
});

export default BlockedAccountItem;
