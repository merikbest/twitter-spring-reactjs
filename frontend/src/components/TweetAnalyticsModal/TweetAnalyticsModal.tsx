import React, { FC, ReactElement } from "react";
import { Button, Dialog, Typography } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { useTranslation } from "react-i18next";

import { useTweetAnalyticsModalStyles } from "./TweetAnalyticsModalStyles";
import { textFormatter } from "../../util/text-formatter";
import DialogTitleComponent from "../DialogTitleComponent/DialogTitleComponent";

interface TweetAnalyticsModalStyles {
    fullName: string;
    username: string;
    text: string;
    visible?: boolean;
    onClose: () => void;
}

const TweetAnalyticsModal: FC<TweetAnalyticsModalStyles> = (
    {
        fullName,
        username,
        text,
        visible,
        onClose
    }
): ReactElement | null => {
    const classes = useTweetAnalyticsModalStyles();
    const { t } = useTranslation();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} className={classes.container}>
            <DialogTitleComponent
                title={t("TWEET_ANALYTICS", { defaultValue: "Tweet Analytics" })}
                onClose={onClose}
            />
            <DialogContent>
                <div className={classes.tweetInfoContainer}>
                    <div className={classes.tweetInfoWrapper}>
                        <Typography variant="h6" className={classes.tweetInfoFullName} component="span">
                            {fullName}
                        </Typography>
                        <Typography variant="subtitle1" component="span">
                            @{username}
                        </Typography>
                        <Typography className={classes.tweetInfoText} component="div">
                            {textFormatter(text)}
                        </Typography>
                    </div>
                    <div className={classes.analyticsInfoWrapper}>
                        <Typography className={classes.analyticsInfoTitle} component="div">
                            {t("IMPRESSIONS", { defaultValue: "Impressions" })}
                            <div className={classes.impressionsCount}>0</div>
                        </Typography>
                        <Typography className={classes.analyticsInfoText} component="div">
                            {t("IMPRESSIONS_DESCRIPTION", {
                                defaultValue: "times people saw this Tweet on Twitter"
                            })}
                        </Typography>
                        <div className={classes.engagementsWrapper}>
                            <Typography className={classes.analyticsInfoTitle} component="div">
                                {t("TOTAL_ENGAGEMENTS", { defaultValue: "Total engagements" })}
                                <div className={classes.impressionsCount}>0</div>
                            </Typography>
                            <Typography className={classes.analyticsInfoText} component="div">
                                {t("TOTAL_ENGAGEMENTS_DESCRIPTION", {
                                    defaultValue: "times people interacted with this Tweet"
                                })}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.engagementsButton}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            fullWidth
                        >
                            {t("VIEW_ALL_ENGAGEMENTS", { defaultValue: "View all engagements" })}
                        </Button>
                    </div>
                    <div className={classes.promoteWrapper}>
                        <img className={classes.promoteImage}
                             src="https://ton.twimg.com/tfb/promote-a54f43f3904fb8073e4f16564fe00058.png"
                        />
                        <Typography className={classes.promoteTitle} component="div">
                            {t("PROMOTE_YOUR_TWEET", { defaultValue: "Promote your Tweet" })}
                        </Typography>
                        <Typography className={classes.promoteText} component="div">
                            {t("PROMOTE_YOUR_TWEET_DESCRIPTION", {
                                impressions: 0,
                                defaultValue: "Your Tweet has 0 total impressions so far."
                            })}
                            {" "}<br />
                            {t("GET_MORE_IMPRESSIONS", { defaultValue: "Get more impressions on this Tweet!" })}
                        </Typography>
                    </div>
                    <div className={classes.engagementsButton}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth
                        >
                            {t("PROMOTE_YOUR_TWEET", { defaultValue: "Promote your Tweet" })}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetAnalyticsModal;
