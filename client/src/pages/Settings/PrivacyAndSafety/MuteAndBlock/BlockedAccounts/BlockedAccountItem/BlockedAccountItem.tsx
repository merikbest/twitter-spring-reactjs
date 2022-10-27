import React, {FC, ReactElement} from 'react';
import {useDispatch} from "react-redux";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import classnames from "classnames";

import {useBlockedAccountItemStyles} from "./BlockedAccountItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";
import {processUserToBlocklist} from "../../../../../../store/ducks/user/actionCreators";
import {useGlobalStyles} from "../../../../../../util/globalClasses";
import {BlockedUserResponse} from "../../../../../../store/types/user";
import {PROFILE} from "../../../../../../util/pathConstants";
import {setOpenSnackBar} from "../../../../../../store/ducks/actionSnackbar/actionCreators";

interface BlockedAccountItemProps {
    blockedUser: BlockedUserResponse;
}

const BlockedAccountItem: FC<BlockedAccountItemProps> = ({blockedUser}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const classes = useBlockedAccountItemStyles({isUserBlocked: blockedUser.isUserBlocked});
    const avatar = blockedUser?.avatar?.src ? blockedUser?.avatar.src : DEFAULT_PROFILE_IMG;

    const unblockUser = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processUserToBlocklist({userId: blockedUser?.id!}));
        dispatch(setOpenSnackBar(`@${blockedUser.username} has been ${blockedUser.isUserBlocked ? "unblocked" : "blocked"}.`));
    };

    return (
        <Link to={`${PROFILE}/${blockedUser?.id}`} className={globalClasses.link}>
            <Paper className={classes.container}>
                <Avatar className={classnames(classes.listAvatar, globalClasses.avatar)} src={avatar} alt={avatar}/>
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
                                {blockedUser.isUserBlocked ? "Blocked" : "Block"}
                            </Button>
                        </div>
                    </div>
                    <Typography variant={"body1"} component={"div"}>
                        {blockedUser?.about}
                    </Typography>
                </div>
            </Paper>
        </Link>
    );
};

export default BlockedAccountItem;
