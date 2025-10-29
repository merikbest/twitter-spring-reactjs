import React, { FC, ReactElement, useState } from "react";
import { Divider, Hidden, List, ListItem, Popover, Typography } from "@material-ui/core";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
    AnalyticsIcon,
    DisplayIcon,
    FollowerRequestIcon,
    HelpCenterIcon,
    KeyboardShortcutsIcon,
    MoreIcon,
    NewslettersIcon,
    SettingsIcon,
    TopicIcon,
    TwitterAdsIcon
} from "../../../icons";
import { SETTINGS, TOPICS_FOLLOWED } from "../../../constants/path-constants";
import { HELP_TWITTER, TWITTER_ABOUT, TWITTER_LOGIN } from "../../../constants/url-constants";
import { useSideMenuStyles } from "../SideMenuStyles";
import { usePopup } from "../../../hook/usePopup";
import { useGlobalStyles } from "../../../util/globalClasses";
import {
    selectUserDataFollowerRequestsCount,
    selectUserDataIsPrivateProfile
} from "../../../store/ducks/user/selectors";
import { DisplayProps } from "../../../pages/Settings/AccessibilityDisplayLanguages/Display";
import FollowerRequestsModal from "./FollowerRequestsModal/FollowerRequestsModal";
import DisplayModal from "./DisplayModal/DisplayModal";
import { resetFollowerRequestsState } from "../../../store/ducks/followerRequests/actionCreators";

const SideMenuMoreItem: FC<DisplayProps> = ({ changeBackgroundColor, changeColorScheme }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useSideMenuStyles();
    const dispatch = useDispatch();
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
    const followerRequestsSize = useSelector(selectUserDataFollowerRequestsCount);
    const [visibleDisplayModal, setVisibleDisplayModal] = useState<boolean>(false);
    const [visibleFollowerRequestsModal, setVisibleFollowerRequestsModal] = useState<boolean>(false);
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();
    const { t } = useTranslation();

    const onOpenDisplayModal = (): void => {
        setVisibleDisplayModal(true);
        handleClosePopup();
    };

    const onCloseDisplayModal = (): void => {
        setVisibleDisplayModal(false);
    };

    const onOpenFollowerRequestsModal = (): void => {
        setVisibleFollowerRequestsModal(true);
        handleClosePopup();
    };

    const onCloseFollowerRequestsModal = (): void => {
        setVisibleFollowerRequestsModal(false);
        dispatch(resetFollowerRequestsState());
    };

    return (
        <li className={classes.itemWrapper}>
            <div
                id="openPopup"
                aria-describedby={popoverId}
                onClick={handleOpenPopup}
            >
                <Hidden smDown>
                    <span>{MoreIcon}</span>
                    <Typography variant="h5">
                        {t("MORE", { defaultValue: "More" })}
                    </Typography>
                </Hidden>
            </div>
            <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                classes={{ paper: classes.popover }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <div className={classnames(classes.listItemWrapper, globalClasses.svg)}>
                    <List>
                        {(isPrivateProfile) && (
                            <ListItem id="openFollowerRequestsModal" onClick={onOpenFollowerRequestsModal}>
                                {FollowerRequestIcon}
                                <Typography variant="body1" component="span">
                                    {t("FOLLOWER_REQUESTS", { defaultValue: "Follower requests" })}
                                    <span className={classes.followerRequestsCount}>
                                        {followerRequestsSize}
                                    </span>
                                </Typography>
                            </ListItem>
                        )}
                        <Link to={TOPICS_FOLLOWED}>
                            <ListItem id="closePopup" onClick={handleClosePopup}>
                                {TopicIcon}
                                <Typography variant="body1" component="span">
                                    {t("TOPICS", { defaultValue: "Topics" })}
                                </Typography>
                            </ListItem>
                        </Link>
                        <ListItem>
                            {NewslettersIcon}
                            <Typography variant="body1" component="span">
                                {t("NEWSLETTERS", { defaultValue: "Newsletters" })}
                            </Typography>
                        </ListItem>
                        <a href={TWITTER_LOGIN} target="_blank">
                            <ListItem>
                                {TwitterAdsIcon}
                                <Typography variant="body1" component="span">
                                    {t("TWITTER_ADS", { defaultValue: "Twitter Ads" })}
                                </Typography>
                            </ListItem>
                        </a>
                        <a href={TWITTER_ABOUT} target="_blank">
                            <ListItem>
                                {AnalyticsIcon}
                                <Typography variant="body1" component="span">
                                    {t("ANALYTICS", { defaultValue: "Analytics" })}
                                </Typography>
                            </ListItem>
                        </a>
                        <Divider />
                        <Link to={SETTINGS}>
                            <ListItem id="closePopup" onClick={handleClosePopup}>
                                {SettingsIcon}
                                <Typography variant="body1" component="span">
                                    {t("SETTINGS_AND_PRIVACY", { defaultValue: "Settings and privacy" })}
                                </Typography>
                            </ListItem>
                        </Link>
                        <a href={HELP_TWITTER} target="_blank">
                            <ListItem>
                                {HelpCenterIcon}
                                <Typography variant="body1" component="span">
                                    {t("HELP_CENTER", { defaultValue: "Help Center" })}
                                </Typography>
                            </ListItem>
                        </a>
                        <ListItem id="openDisplayModal" onClick={onOpenDisplayModal}>
                            {DisplayIcon}
                            <Typography variant="body1" component="span">
                                {t("DISPLAY", { defaultValue: "Display" })}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {KeyboardShortcutsIcon}
                            <Typography variant="body1" component="span">
                                {t("KEYBOARD_SHORTCUTS", { defaultValue: "Keyboard shortcuts" })}
                            </Typography>
                        </ListItem>
                    </List>
                </div>
            </Popover>
            <FollowerRequestsModal
                visible={visibleFollowerRequestsModal}
                onClose={onCloseFollowerRequestsModal}
            />
            <DisplayModal
                visible={visibleDisplayModal}
                onClose={onCloseDisplayModal}
                changeBackgroundColor={changeBackgroundColor}
                changeColorScheme={changeColorScheme}
            />
        </li>
    );
};

export default SideMenuMoreItem;
