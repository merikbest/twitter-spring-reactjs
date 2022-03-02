import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {Avatar, Button, Paper, Typography} from "@material-ui/core";

import {useManageMembersItemStyles} from "./ManageMembersItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../../util/url";
import {HoverUserProps, withHoverUser} from "../../../../../hoc/withHoverUser";
import {selectUserData} from "../../../../../store/ducks/user/selectors";
import {useGlobalStyles} from "../../../../../util/globalClasses";
import {BaseListResponse, ListsOwnerMemberResponse} from "../../../../../store/types/lists";
import {processUserToListMembers} from "../../../../../store/ducks/listMembers/actionCreators";
import PopperUserWindow from "../../../../../components/PopperUserWindow/PopperUserWindow";

interface ManageMembersItemProps<T> {
    item?: T;
    member?: ListsOwnerMemberResponse;
}

const ManageMembersItem: FC<ManageMembersItemProps<BaseListResponse> & HoverUserProps> = (
    {
        item: list,
        member,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useManageMembersItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

    const onClickAddUserToList = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processUserToListMembers({userId: member?.id!, listId: list!.id}));
    }

    return (
        <Link to={`/user/${member?.id}`} className={globalClasses.link}>
            <Paper className={classes.container} variant="outlined">
                <Avatar
                    className={classes.listAvatar}
                    src={member?.avatar?.src ? member?.avatar.src : DEFAULT_PROFILE_IMG}
                />
                <div style={{flex: 1}}>
                    <div className={classes.header}>
                        <div onMouseLeave={handleLeavePopper} className={classes.headerUserInfo}>
                            <Typography
                                variant={"h6"}
                                component={"div"}
                                onMouseEnter={() => handleHoverPopper!(member?.id!)}
                            >
                                {member?.fullName}
                            </Typography>
                            <PopperUserWindow visible={visiblePopperWindow}/>
                            <Typography variant={"subtitle1"} component={"div"}>
                                @{member?.username}
                            </Typography>
                            <Typography variant={"body1"} component={"div"}>
                                {member?.about}
                            </Typography>
                        </div>
                        <div className={classes.buttonWrapper}>
                            {(list?.listOwner.id === myProfile?.id) && (
                                (member?.id === myProfile?.id) ? null : (
                                    (member?.isMemberInList) ? (
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
