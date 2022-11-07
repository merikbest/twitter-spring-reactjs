import React, {FC, memo, ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Paper} from "@material-ui/core";

import {useManageMembersItemStyles} from "./ManageMembersItemStyles";
import {selectUserDataId} from "../../../../../../store/ducks/user/selectors";
import {ListsOwnerMemberResponse} from "../../../../../../store/types/lists";
import PopperUserWindow from "../../../../../../components/PopperUserWindow/PopperUserWindow";
import {selectIsListSuggestedError} from "../../../../../../store/ducks/listMembers/selectors";
import {useHoverUser} from "../../../../../../hook/useHoverUser";
import {setOpenSnackBar} from "../../../../../../store/ducks/actionSnackbar/actionCreators";
import LinkWrapper from "../../../../../../components/LinkWrapper/LinkWrapper";
import {PROFILE} from "../../../../../../util/pathConstants";
import ManageMemberButton from "./ManageMemberButton/ManageMemberButton";
import MemberItemInfo from "./MemberItemInfo/MemberItemInfo";
import MemberItemAvatar from "./MemberItemAvatar/MemberItemAvatar";

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
    const myProfileId = useSelector(selectUserDataId);
    const isSuggestedError = useSelector(selectIsListSuggestedError);
    const {visiblePopperWindow, handleHoverPopper, handleLeavePopper} = useHoverUser();

    useEffect(() => {
        if (isSuggestedError) {
            dispatch(setOpenSnackBar("You aren’t allowed to add this member to this List."));
        }
    }, [isSuggestedError]);

    return (
        <LinkWrapper path={`${PROFILE}/${user?.id}`} visiblePopperWindow={visiblePopperWindow}>
            <Paper className={classes.container} variant="outlined">
                <MemberItemAvatar avatar={user?.avatar}/>
                <div style={{flex: 1}}>
                    <div className={classes.header}>
                        <div
                            id={"fullName"}
                            onMouseLeave={handleLeavePopper}
                            onMouseEnter={() => handleHoverPopper(user?.id!)}
                            className={classes.headerUserInfo}
                        >
                            <MemberItemInfo
                                fullName={user?.fullName}
                                username={user?.username}
                                isPrivateProfile={user?.isPrivateProfile}
                                about={user?.about}
                            />
                            <PopperUserWindow visible={visiblePopperWindow}/>
                        </div>
                        <div className={classes.buttonWrapper}>
                            {(listOwnerId === myProfileId) && (
                                (user?.id === myProfileId) ? null : (
                                    <ManageMemberButton
                                        userId={user?.id!}
                                        listId={listId!}
                                        isMemberInList={user?.isMemberInList!}
                                        isSuggested={isSuggested}
                                    />
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
