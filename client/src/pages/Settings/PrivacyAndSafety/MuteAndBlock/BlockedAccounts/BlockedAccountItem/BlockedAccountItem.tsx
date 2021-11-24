import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Paper, Snackbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

import {useBlockedAccountItemStyles} from "./BlockedAccountItemStyles";
import {User} from "../../../../../../store/ducks/user/contracts/state";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";
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
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

    const unblockUser = (): void => {
        dispatch(addUserToBlocklist(blockedUser?.id!));
        setSnackBarMessage(isUserBlocked ? "unblocked" : "blocked");
        setOpenSnackBar(true);
    };

    const onCloseSnackBar = (): void => {
        setOpenSnackBar(false);
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
            <Snackbar
                className={classes.snackBar}
                anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                open={openSnackBar}
                message={`@${blockedUser.username} has been ${snackBarMessage}.`}
                onClose={onCloseSnackBar}
                autoHideDuration={3000}
            />
        </Paper>
    );
};

export default BlockedAccountItem;
