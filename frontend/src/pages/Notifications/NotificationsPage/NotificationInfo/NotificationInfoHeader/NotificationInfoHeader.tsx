import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { NotificationType } from "../../../../../types/common";
import {
    selectIsNotificationInfoLoading,
    selectNotificationInfoType,
    selectNotificationInfoUserFullName
} from "../../../../../store/ducks/notifications/selectors";
import PageHeaderWrapper from "../../../../../components/PageHeaderWrapper/PageHeaderWrapper";

const NotificationInfoHeader = memo((): ReactElement => {
    const { t } = useTranslation();
    const isLoading = useSelector(selectIsNotificationInfoLoading);
    const notificationType = useSelector(selectNotificationInfoType);
    const userFullName = useSelector(selectNotificationInfoUserFullName);

    return (
        <PageHeaderWrapper backButton>
            {!isLoading && (
                <div>
                    <Typography variant="h5" component={"div"}>
                        {notificationType === NotificationType.LIKE
                            ? t("LIKED", { defaultValue: "Liked" })
                            : t("RETWEETED", { defaultValue: "Retweeted" })}
                    </Typography>
                    <Typography variant="caption" component={"div"}>
                        {t("BY_USERNAME", { userFullName, defaultValue: `by ${userFullName}` })}
                    </Typography>
                </div>
            )}
        </PageHeaderWrapper>
    );
});

export default NotificationInfoHeader;
