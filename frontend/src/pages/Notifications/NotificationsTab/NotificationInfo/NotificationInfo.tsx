import React, { FC, ReactElement } from "react";
import Paper from "@material-ui/core/Paper";

import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import UsersItem, { UserItemSize } from "../../../../components/UsersItem/UsersItem";
import { useGlobalStyles } from "../../../../util/globalClasses";
import Spinner from "../../../../components/Spinner/Spinner";
import NotificationInfoHeader from "./NotificationInfoHeader";
import { useNotificationInfo } from "./useNotificationInfo";

const NotificationInfo: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { notificationTweet, isTweetLoading, notificationUser } = useNotificationInfo();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <NotificationInfoHeader />
            {isTweetLoading ? (
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
