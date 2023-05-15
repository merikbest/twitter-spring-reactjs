import React, { memo, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { MessagesIcon } from "../../../icons";
import { createChat } from "../../../store/ducks/chats/actionCreators";
import { MESSAGES } from "../../../constants/path-constants";
import { useGlobalStyles } from "../../../util/globalClasses";
import { selectUserProfileId } from "../../../store/ducks/userProfile/selectors";

const AddUserToChatButton = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const history = useHistory();
    const userProfileId = useSelector(selectUserProfileId);

    const handleClickAddUserToChat = (): void => {
        dispatch(createChat(userProfileId!));
        history.push(MESSAGES);
    };

    return (
        <span className={globalClasses.userPageIconButton}>
            <ActionIconButton actionText={"Message"} icon={MessagesIcon} onClick={handleClickAddUserToChat} />
        </span>
    );
});

export default AddUserToChatButton;
