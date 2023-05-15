import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import UsersItem, { UserItemSize } from "../../../../components/UsersItem/UsersItem";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { fetchNotificationInfo, resetNotificationState } from "../../../../store/ducks/notifications/actionCreators";
import {
    selectIsNotificationInfoLoading,
    selectNotificationInfoTweet,
    selectNotificationInfoUser
} from "../../../../store/ducks/notifications/selectors";
import Spinner from "../../../../components/Spinner/Spinner";
import NotificationInfoHeader from "./NotificationInfoHeader/NotificationInfoHeader";

const NotificationInfo: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const notificationUser = useSelector(selectNotificationInfoUser);
    const notificationTweet = useSelector(selectNotificationInfoTweet);
    const isLoading = useSelector(selectIsNotificationInfoLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchNotificationInfo(parseInt(params.id)));

        return () => {
            dispatch(resetNotificationState());
        };
    }, [params.id]);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <NotificationInfoHeader />
            {isLoading ? (
                <Spinner paddingTop={150} />
            ) : (
                <>
                    <div className={globalClasses.contentWrapper}>
                        <TweetComponent tweet={notificationTweet} />
                    </div>
                    <UsersItem user={notificationUser} size={UserItemSize.MEDIUM} />
                </>
            )}
        </Paper>
    );
};

export default NotificationInfo;
