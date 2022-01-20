import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {Avatar, Button, Paper, Typography} from "@material-ui/core";

import {useManageMembersItemStyles} from "./ManageMembersItemStyles";
import {User} from "../../../../../store/ducks/user/contracts/state";
import {DEFAULT_PROFILE_IMG} from "../../../../../util/url";
import PopperUserWindow from "../../../../../components/PopperUserWindow/PopperUserWindow";
import {Lists} from "../../../../../store/ducks/lists/contracts/state";
import {processListMember} from "../../../../../store/ducks/lists/actionCreators";
import {HoverUserProps, withHoverUser} from "../../../../../hoc/withHoverUser";
import {selectUserData} from "../../../../../store/ducks/user/selectors";

interface ManageMembersItemProps<T> {
    item?: T;
    member?: User;
}

const ManageMembersItem: FC<ManageMembersItemProps<Lists> & HoverUserProps> = (
    {
        item: list,
        member,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const classes = useManageMembersItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

    const isMember = list?.members?.findIndex((listMember) => listMember.id === member?.id) !== -1;

    const onClickAddUserToList = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processListMember({userId: member?.id!, listId: list!.id}));
    }

    return (
        <Link to={`/user/${member?.id}`} className={classes.routerLink}>
            <Paper className={classes.container} variant="outlined">
                <Avatar
                    className={classes.listAvatar}
                    src={member?.avatar?.src ? member?.avatar.src : DEFAULT_PROFILE_IMG}
                />
                <div style={{flex: 1}}>
                    <div className={classes.header}>
                        <div onMouseLeave={handleLeavePopper} className={classes.headerUserInfo}>
                            <Typography variant={"h6"} component={"div"} onMouseEnter={handleHoverPopper}>
                                {member?.fullName}
                            </Typography>
                            <PopperUserWindow visible={visiblePopperWindow} user={member!}/>
                            <Typography variant={"subtitle1"} component={"div"}>
                                @{member?.username}
                            </Typography>
                            <Typography variant={"body1"} component={"div"}>
                                {member?.about}
                            </Typography>
                        </div>
                        <div className={classes.buttonWrapper}>
                            {(member?.id === myProfile?.id) ? null : (
                                (!isMember) ? (
                                    <Button
                                        className={classes.outlinedButton}
                                        onClick={(event) => onClickAddUserToList(event)}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                    >
                                        Add
                                    </Button>
                                ) : (
                                    <Button
                                        className={classes.containedButton}
                                        onClick={(event) => onClickAddUserToList(event)}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        Remove
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Paper>
        </Link>
    );
};

export default withHoverUser(ManageMembersItem);
