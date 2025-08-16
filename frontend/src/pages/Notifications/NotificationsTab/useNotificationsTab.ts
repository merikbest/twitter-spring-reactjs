import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectIsNotificationsLoading,
    selectNotificationsList,
    selectNotificationsTweetAuthors,
    selectPagesCount
} from "../../../store/ducks/notifications/selectors";
import { resetNotifications } from "../../../store/ducks/user/actionCreators";
import {
    fetchFetchTweetAuthorsNotifications,
    fetchNotifications,
    resetNotificationState
} from "../../../store/ducks/notifications/actionCreators";

export const useNotificationsTab = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotificationsList);
    const pagesCount = useSelector(selectPagesCount);
    const tweetAuthors = useSelector(selectNotificationsTweetAuthors);
    const isNotificationLoading = useSelector(selectIsNotificationsLoading);
    const numberOfPeople = tweetAuthors.length - 1;

    const loadNotifications = (page: number): void => {
        dispatch(fetchNotifications(page));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        loadNotifications(0);
        dispatch(resetNotifications());
        dispatch(fetchFetchTweetAuthorsNotifications());

        return () => {
            dispatch(resetNotificationState());
        };
    }, []);

    return { notifications, isNotificationLoading, tweetAuthors, numberOfPeople, pagesCount, loadNotifications };
};
