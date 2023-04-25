import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import SideMenuItem from "../SideMenuItem/SideMenuItem";
import { selectUserDataNotificationsCount } from "../../../store/ducks/user/selectors";
import { useSideMenuStyles } from "../SideMenuStyles";

interface SideMenuNotificationItemProps {
    title: string;
    path: string;
    icon: JSX.Element;
    filledIcon: JSX.Element;
}

const SideMenuNotificationItem: FC<SideMenuNotificationItemProps> = (
    {
        title,
        path,
        icon,
        filledIcon
    }
): ReactElement => {
    const classes = useSideMenuStyles();
    const notificationsCount = useSelector(selectUserDataNotificationsCount);

    return (
        <SideMenuItem
            title={title}
            path={path}
            icon={icon}
            filledIcon={filledIcon}
        >
            {(notificationsCount !== 0) && (
                <span id={"notificationsCount"} className={classes.count}>
                    {notificationsCount}
                </span>
            )}
        </SideMenuItem>
    );
};

export default SideMenuNotificationItem;
