import React, {FC, memo, ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";

import {useManageMembersItemStyles} from "./ManageMembersItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../../../util/url";
import {selectUserData} from "../../../../../../store/ducks/user/selectors";
import {ListsOwnerMemberResponse} from "../../../../../../store/types/lists";
import {processUserToListMembers} from "../../../../../../store/ducks/listMembers/actionCreators";
import PopperUserWindow from "../../../../../../components/PopperUserWindow/PopperUserWindow";
import {selectIsListSuggestedError} from "../../../../../../store/ducks/listMembers/selectors";
import {useHoverUser} from "../../../../../../hook/useHoverUser";
import LockIcon from "../../../../../../components/LockIcon/LockIcon";
import {setOpenSnackBar} from "../../../../../../store/ducks/actionSnackbar/actionCreators";
import LinkWrapper from "../../../../../../components/LinkWrapper/LinkWrapper";
import {PROFILE} from "../../../../../../util/pathConstants";

interface ManageMembersItemProps {
    listId?: number
    listOwnerId?: number
    user?: ListsOwnerMemberResponse;
    isSuggested?: boolean;
}

const ManageMembersItem: FC<ManageMembersItemProps> = memo((
    {
        listId,
        listOwnerId,
        user,
        isSuggested,
    }
): ReactElement => {
    const classes = useManageMembersItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isSuggestedError = useSelector(selectIsListSuggestedError);
    const {visiblePopperWindow, handleHoverPopper, handleLeavePopper} = useHoverUser();

    useEffect(() => {
        if (isSuggestedError) {
            dispatch(setOpenSnackBar("You aren’t allowed to add this member to this List."));
        }
    }, [isSuggestedError]);

    const onClickAddUserToList = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(processUserToListMembers({userId: user?.id!, listId: listId!, isSuggested}));
    }

    return (
        <LinkWrapper path={`${PROFILE}/${user?.id}`} visiblePopperWindow={visiblePopperWindow}>
            <Paper className={classes.container} variant="outlined">
                <Avatar
                    className={classes.listAvatar}
                    src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}
                />
                <div style={{flex: 1}}>
                    <div className={classes.header}>
                        <div onMouseLeave={handleLeavePopper} className={classes.headerUserInfo}>
                            <Typography
                                id={"fullName"}
                                variant={"h6"}
                                component={"span"}
                                onMouseEnter={() => handleHoverPopper(user?.id!)}
                            >
                                {user?.fullName}
                            </Typography>
                            {user?.isPrivateProfile && <LockIcon/>}
                            <PopperUserWindow visible={visiblePopperWindow}/>
                            <Typography variant={"subtitle1"} component={"div"}>
                                @{user?.username}
                            </Typography>
                            <Typography variant={"body1"} component={"div"}>
                                {user?.about}
                            </Typography>
                        </div>
                        <div className={classes.buttonWrapper}>
                            {(listOwnerId === myProfile?.id) && (
                                (user?.id === myProfile?.id) ? null : (
                                    <Button
                                        className={classes[user?.isMemberInList ? "containedButton" : "outlinedButton"]}
                                        onClick={onClickAddUserToList}
                                        variant={user?.isMemberInList ? "contained" : "outlined"}
                                        color="primary"
                                        size="small"
                                    >
                                        {user?.isMemberInList ? "Remove" : "Add"}
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Paper>
        </LinkWrapper>
    );
});

export default ManageMembersItem;
