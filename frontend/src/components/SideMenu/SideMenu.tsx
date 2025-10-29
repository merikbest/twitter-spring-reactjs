import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import {
    BookmarksIcon,
    BookmarksIconFilled,
    ExploreIcon,
    ExploreIconFilled,
    HomeIcon,
    HomeIconFilled,
    ListsIcon,
    ListsIconFilled,
    MessagesIcon,
    MessagesIconFilled,
    NotificationsIcon,
    NotificationsIconFilled,
    ProfileIcon,
    ProfileIconFilled,
    TweetIcon
} from "../../icons";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { useSideMenuStyles } from "./SideMenuStyles";
import { DisplayProps } from "../../pages/Settings/AccessibilityDisplayLanguages/Display";
import { BOOKMARKS, HOME, LISTS, MESSAGES, NOTIFICATIONS, PROFILE, SEARCH } from "../../constants/path-constants";
import AddTweetButton from "./AddTweetButton/AddTweetButton";
import SideMenuItem from "./SideMenuItem/SideMenuItem";
import SideMenuHomeItem from "./SideMenuHomeItem/SideMenuHomeItem";
import SideMenuNotificationItem from "./SideMenuNotificationItem/SideMenuNotificationItem";
import SideMenuMessagesItem from "./SideMenuMessagesItem/SideMenuMessagesItem";
import SideMenuMoreItem from "./SideMenuMoreItem/SideMenuMoreItem";

const SideMenu: FC<DisplayProps> = ({ changeBackgroundColor, changeColorScheme }): ReactElement => {
    const classes = useSideMenuStyles();
    const myProfileId = useSelector(selectUserDataId);
    const { t } = useTranslation();

    return (
        <>
            <ul className={classes.container}>
                <li>
                    <NavLink to={HOME} activeClassName="selected">
                        <div className={classes.logoIcon}>
                            <IconButton color="primary">
                                {TweetIcon}
                            </IconButton>
                        </div>
                    </NavLink>
                </li>
                <SideMenuHomeItem
                    title={t("HOME", { defaultValue: "Home" })}
                    path={HOME}
                    icon={HomeIcon}
                    filledIcon={HomeIconFilled}
                />
                <SideMenuItem
                    title={t("EXPLORE", { defaultValue: "Explore" })}
                    path={SEARCH}
                    icon={ExploreIcon}
                    filledIcon={ExploreIconFilled}
                />
                <SideMenuNotificationItem
                    title={t("NOTIFICATIONS", { defaultValue: "Notifications" })}
                    path={NOTIFICATIONS}
                    icon={NotificationsIcon}
                    filledIcon={NotificationsIconFilled}
                />
                <SideMenuMessagesItem
                    title={t("MESSAGES", { defaultValue: "Messages" })}
                    path={MESSAGES}
                    icon={MessagesIcon}
                    filledIcon={MessagesIconFilled}
                />
                <SideMenuItem
                    title={t("BOOKMARKS", { defaultValue: "Bookmarks" })}
                    path={BOOKMARKS}
                    icon={BookmarksIcon}
                    filledIcon={BookmarksIconFilled}
                />
                <SideMenuItem
                    title={t("LISTS", { defaultValue: "Lists" })}
                    path={LISTS}
                    icon={ListsIcon}
                    filledIcon={ListsIconFilled}
                />
                <SideMenuItem
                    title={t("PROFILE", { defaultValue: "Profile" })}
                    path={`${PROFILE}/${myProfileId}`}
                    icon={ProfileIcon}
                    filledIcon={ProfileIconFilled}
                />
                <SideMenuMoreItem
                    changeBackgroundColor={changeBackgroundColor}
                    changeColorScheme={changeColorScheme}
                />
                <AddTweetButton />
            </ul>
            <UserSideProfile />
        </>
    );
};

export default SideMenu;
