import React, { FC, memo, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserItemAction from "../UserItemAction/UserItemAction";
import { resetUserProfileState } from "../../../../store/ducks/userProfile/actionCreators";
import { LISTS_MEMBERSHIPS } from "../../../../constants/path-constants";
import { selectUserProfileId } from "../../../../store/ducks/userProfile/selectors";
import { ListsIcon } from "../../../../icons";

const ViewUserListsButton: FC = memo((): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userProfileId = useSelector(selectUserProfileId);

    const onClickViewUserLists = (): void => {
        dispatch(resetUserProfileState());
        history.push(`${LISTS_MEMBERSHIPS}/${userProfileId}`);
    };

    return (
        <div id={"viewUserLists"} onClick={onClickViewUserLists}>
            <UserItemAction title={"View Lists"} icon={ListsIcon} />
        </div>
    );
});

export default ViewUserListsButton;
