import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

import {useBlockedAccountItemStyles} from "./BlockedAccountItemStyles";
import {User} from "../../../../../../store/ducks/user/contracts/state";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";
import {selectUserData} from "../../../../../../store/ducks/user/selectors";
import {addUserToBlocklist} from "../../../../../../store/ducks/user/actionCreators";
import ActionSnackbar from "../../../../../../components/ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../../../../../hoc/withSnackbar";

interface BlockedAccountItemProps {
    blockedUser: User;
}

const BlockedAccountItem: FC<BlockedAccountItemProps & SnackbarProps> = (
    {
        blockedUser,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isUserBlocked = myProfile?.userBlockedList?.findIndex(user => user.id === blockedUser?.id) !== -1;
    const classes = useBlockedAccountItemStyles({isUserBlocked});

    const unblockUser = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(addUserToBlocklist(blockedUser?.id!));
        setSnackBarMessage!(`@${blockedUser.username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar!(true);
    };

    return (
        <Link to={`/user/${blockedUser?.id}`} className={classes.routerLink}>
            <Paper className={classes.container}>
                <Avatar
                    className={classes.listAvatar}
                    src={blockedUser?.avatar?.src ? blockedUser?.avatar.src : DEFAULT_PROFILE_IMG}
                />
                <div style={{flex: 1}}>
                    <div className={classes.userInfoWrapper}>
                        <div className={classes.userInfo}>
                            <div>
                                <Typography variant={"h6"} component={"span"}>
                                    {blockedUser?.fullName}
                                </Typography>
                            </div>
                            <Typography variant={"subtitle1"} component={"div"}>
                                @{blockedUser?.username}
                            </Typography>
                        </div>
                        <div className={classes.blockButton}>
                            <Button
                                onClick={(event) => unblockUser(event)}
                                color="primary"
                                variant="contained"
                                size="medium"
                            >
                                {isUserBlocked ? "Blocked" : "Block"}
                            </Button>
                        </div>
                    </div>
                    <Typography variant={"body1"} component={"div"}>
                        {blockedUser?.about}
                    </Typography>
                </div>
                <ActionSnackbar
                    onCloseSnackBar={onCloseSnackBar!}
                    openSnackBar={openSnackBar!}
                    snackBarMessage={snackBarMessage!}
                />
            </Paper>
        </Link>
    );
};

export default withSnackbar(BlockedAccountItem);
