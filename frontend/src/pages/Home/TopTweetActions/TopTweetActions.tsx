import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { ClickAwayListener, Divider, List, ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useTopTweetActionsStyles } from "./TopTweetActionsStyles";
import { SeeLatestIcon, SettingsIcon, ShowLatestTweets, ShowTopTweets, TopTweets } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { SETTINGS_CONTENT_PREFERENCES } from "../../../constants/path-constants";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useClickAway } from "../../../hook/useClickAway";

interface TopTweetActionsProps {
    switchTweets: boolean;
    handleLatestTweets: () => void;
    handleTopTweets: () => void;
}

const TopTweetActions: FC<TopTweetActionsProps> = (
    {
        switchTweets,
        handleLatestTweets,
        handleTopTweets
    }
): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useTopTweetActionsStyles();
    const { t } = useTranslation();
    const { open, onClickOpen, onClickClose } = useClickAway();

    return (
        <ClickAwayListener onClickAway={onClickClose}>
            <div>
                <div className={classes.headerIcon}>
                    <ActionIconButton
                        actionText={t("TOP_TWEETS", { defaultValue: "Top Tweets" })}
                        icon={TopTweets}
                        onClick={onClickOpen}
                    />
                </div>
                {open && (
                    <div className={classes.dropdown}>
                        <div className={classes.dropdownHeader}>
                            <div className={classes.dropdownHeaderImage}>
                                {switchTweets ? ShowLatestTweets : ShowTopTweets}
                            </div>
                            <Typography variant={"h5"} component={"div"}>
                                {switchTweets
                                    ? t("LATEST_TWEETS", { defaultValue: "Latest Tweets show up as they happen" })
                                    : t("TOP_TWEETS_FIRST", { defaultValue: "Home shows you top Tweets first" })
                                }
                            </Typography>
                        </div>
                        <Divider />
                        <List>
                            <ListItem id={"switchTweets"} onClick={switchTweets ? handleTopTweets : handleLatestTweets}>
                                <div className={classes.listItemWrapper}>
                                    <span className={classes.textIcon}>
                                        {SeeLatestIcon}
                                    </span>
                                    <div>
                                        <Typography variant={"body1"} component={"div"}>
                                            {switchTweets
                                                ? t("GO_BACK_HOME", { defaultValue: "Go back Home" })
                                                : t("SEE_LATEST_TWEETS", { defaultValue: "See latest Tweets instead" })
                                            }
                                        </Typography>
                                        <Typography variant={"subtitle2"} component={"div"}>
                                            {switchTweets
                                                ? t("SEE_TOP_TWEETS_FIRST_DESCRIPTION", { defaultValue: "You’ll see top Tweets first." })
                                                : t("LATEST_TWEETS_DESCRIPTION", { defaultValue: "You’ll see Tweets show up as they happen." })
                                            }
                                        </Typography>
                                    </div>
                                </div>
                            </ListItem>
                            <Link to={SETTINGS_CONTENT_PREFERENCES} className={globalClasses.linkWrapper}>
                                <ListItem>
                                    <div className={classes.listItemWrapper}>
                                    <span className={classes.textIcon}>
                                        {SettingsIcon}
                                    </span>
                                        <div>
                                            <Typography variant={"body1"} component={"div"}>
                                                {t("VIEW_CONTENT_PREFERENCES", { defaultValue: "View content preferences" })}
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default TopTweetActions;
