import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { processSubscribe } from "../../../store/ducks/userProfile/actionCreators";
import { selectUserProfileId, selectUserProfileIsSubscriber } from "../../../store/ducks/userProfile/selectors";

export const useNotificationButton = () => {
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const isSubscriber = useSelector(selectUserProfileIsSubscriber);

    const handleSubscribeToNotifications = useCallback((): void => {
        dispatch(processSubscribe(userProfileId!));
    }, [dispatch, userProfileId]);

    return { isSubscriber, handleSubscribeToNotifications };
};
