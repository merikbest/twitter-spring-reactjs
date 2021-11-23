import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

import {useBlockedAccountItemStyles} from "./BlockedAccountItemStyles";
import {User} from "../../../../../../store/ducks/user/contracts/state";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";
import {LockIcon} from "../../../../../../icons";
import {selectUserData} from "../../../../../../store/ducks/user/selectors";
import {addUserToBlocklist} from "../../../../../../store/ducks/user/actionCreators";

interface BlockedAccountItemProps {
    blockedUser: User;
}

const BlockedAccountItem: FC<BlockedAccountItemProps> = ({blockedUser}): ReactElement => {
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isUserBlocked = myProfile?.userBlockedList?.findIndex(user => user.id === blockedUser?.id) !== -1;
    const classes = useBlockedAccountItemStyles({isUserBlocked});

    const unblockUser = (): void => {
        dispatch(addUserToBlocklist(blockedUser?.id!));
    };

    return (
        <Paper className={classes.container}>
            <Link to={`/user/${blockedUser?.id}`} className={classes.link}>
                <Avatar
                    className={classes.listAvatar}
                    src={blockedUser?.avatar?.src ? blockedUser?.avatar.src : DEFAULT_PROFILE_IMG}
                />
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.userInfoWrapper}>
                    <Link to={`/user/${blockedUser?.id}`} className={classes.link}>
                        <div className={classes.userInfo}>
                            <div>
                                <Typography component={"span"} className={classes.fullName}>
                                    {blockedUser?.fullName}
                                </Typography>
                                {blockedUser?.privateProfile && (
                                    <span className={classes.lockIcon}>
                                        {LockIcon}
                                    </span>
                                )}
                            </div>
                            <Typography component={"div"} className={classes.username}>
                                @{blockedUser?.username}
                            </Typography>
                        </div>
                    </Link>
                    <div className={classes.blockButton}>
                        <Button
                            onClick={unblockUser}
                            color="primary"
                            variant="contained"
                        >
                            {isUserBlocked ? "Blocked" : "Block"}
                        </Button>
                    </div>
                </div>
                <Typography display="block">
                    {blockedUser?.about}
                </Typography>
            </div>
        </Paper>
    );
};

export default BlockedAccountItem;
