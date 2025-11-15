import React, { memo, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { NotificationsAddFilledIcon, NotificationsAddIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { useNotificationButton } from "./useNotificationButton";

const NotificationButton = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();
    const { isSubscriber, handleSubscribeToNotifications } = useNotificationButton();

    return (
        <span className={globalClasses.userPageIconButton}>
            <ActionIconButton
                actionText={isSubscriber
                    ? t("TURN_OFF_NOTIFICATIONS", { defaultValue: "Turn off notifications" })
                    : t("NOTIFY", { defaultValue: "Notify" })}
                icon={isSubscriber ? NotificationsAddFilledIcon : NotificationsAddIcon}
                onClick={handleSubscribeToNotifications}
            />
        </span>
    );
});

export default NotificationButton;
