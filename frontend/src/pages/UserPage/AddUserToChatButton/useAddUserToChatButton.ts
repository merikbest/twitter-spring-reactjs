import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { createChat } from "../../../store/ducks/chats/actionCreators";
import { MESSAGES } from "../../../constants/path-constants";
import { selectUserProfileId } from "../../../store/ducks/userProfile/selectors";

export const useAddUserToChatButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userProfileId = useSelector(selectUserProfileId);

    const handleClickAddUserToChat = useCallback((): void => {
        dispatch(createChat(userProfileId!));
        history.push(MESSAGES);
    }, [dispatch, history, userProfileId]);

    return { handleClickAddUserToChat };
};
