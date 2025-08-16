import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    selectIsNotificationInfoLoading,
    selectNotificationInfoTweet,
    selectNotificationInfoUser
} from "../../../../store/ducks/notifications/selectors";
import { fetchNotificationInfo, resetNotificationState } from "../../../../store/ducks/notifications/actionCreators";

export const useNotificationInfo = () => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const notificationUser = useSelector(selectNotificationInfoUser);
    const notificationTweet = useSelector(selectNotificationInfoTweet);
    const isTweetLoading = useSelector(selectIsNotificationInfoLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchNotificationInfo(parseInt(params.id)));

        return () => {
            dispatch(resetNotificationState());
        };
    }, [params.id]);

    return { notificationTweet, isTweetLoading, notificationUser };
};
