import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";

import { useManageMembersItemStyles } from "./ManageMembersItemStyles";
import { selectUserDataId } from "../../../../../../store/ducks/user/selectors";
import { ListsOwnerMemberResponse } from "../../../../../../types/lists";
import PopperUserWindow from "../../../../../../components/PopperUserWindow/PopperUserWindow";
import { HoverItemDetail, useHoverItem } from "../../../../../../hook/useHoverItem";
import LinkWrapper from "../../../../../../components/LinkWrapper/LinkWrapper";
import { PROFILE } from "../../../../../../constants/path-constants";
import ManageMemberButton from "./ManageMemberButton/ManageMemberButton";
import MemberItemInfo from "./MemberItemInfo/MemberItemInfo";
import MemberItemAvatar from "./MemberItemAvatar/MemberItemAvatar";
import { DEFAULT_PROFILE_IMG } from "../../../../../../constants/url-constants";
import { fetchUserDetail } from "../../../../../../store/ducks/userDetail/actionCreators";

interface ManageMembersItemProps {
    listId?: number;
    listOwnerId?: number;
    user?: ListsOwnerMemberResponse;
    isSuggested?: boolean;
}

const ManageMembersItem: FC<ManageMembersItemProps> = memo((
    {
        listId,
        listOwnerId,
        user,
        isSuggested
    }
): ReactElement => {
    const classes = useManageMembersItemStyles();
    const myProfileId = useSelector(selectUserDataId);
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);

    return (
        <LinkWrapper path={`${PROFILE}/${user?.id}`} visiblePopperWindow={visiblePopperWindow}>
            <Paper className={classes.container} variant="outlined">
                <MemberItemAvatar avatar={user?.avatar ?? DEFAULT_PROFILE_IMG} />
                <div style={{ flex: 1 }}>
                    <div className={classes.header}>
                        <div
                            id={"fullName"}
                            onMouseEnter={() => handleHoverPopper({ userId: user?.id} as HoverItemDetail)}
                            onMouseLeave={handleLeavePopper}
                            className={classes.headerUserInfo}
                        >
                            <MemberItemInfo
                                fullName={user?.fullName}
                                username={user?.username}
                                isPrivateProfile={user?.isPrivateProfile}
                                about={user?.about}
                            />
                            <PopperUserWindow visible={visiblePopperWindow} />
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
