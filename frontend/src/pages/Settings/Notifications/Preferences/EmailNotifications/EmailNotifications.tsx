import React, { FC, ReactElement, useState } from "react";
import { Checkbox, Divider, Link as MuiLink, Radio, Switch, Typography } from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { TWEET_ACTIVITY } from "../../../../../constants/url-constants";

const EmailNotifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState<string>("Periodically");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h6" component="div" style={{ paddingBottom: 4 }}>
                    {t("EMAIL_NOTIFICATIONS", { defaultValue: "Email notifications" })}
                    <span className={globalClasses.switch}>
                        <Switch defaultChecked />
                    </span>
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("EMAIL_NOTIFICATIONS_DESCRIPTION", {
                        defaultValue: `Get emails to find out what’s going on when you’re not on Twitter. 
                        You can turn them off anytime.`
                    })}
                    {" "}
                    <MuiLink href={TWEET_ACTIVITY} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("RELATED_TO_YOU_AND_YOUR_TWEETS", { defaultValue: "Related to you and your Tweets" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("NEW_NOTIFICATIONS", { defaultValue: "New notifications" })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("DIRECT_MESSAGES", { defaultValue: "Direct messages" })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("TWEETS_EMAILED_TO_YOU", { defaultValue: "Tweets emailed to you" })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h6" component="div">
                    {t("TOP_TWEETS_AND_STORIES", { defaultValue: "Top Tweets and Stories" })}
                </Typography>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("DAILY", { defaultValue: "Daily" })}
                    </Typography>
                    <Radio
                        checked={selectedValue === "Daily"}
                        onChange={handleChange}
                        value="Daily"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Daily" }}
                        icon={<RadioButtonUnchecked color="primary" />}
                        checkedIcon={<CheckCircle color="primary" />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("WEEKLY", { defaultValue: "Weekly" })}
                    </Typography>
                    <Radio
                        checked={selectedValue === "Weekly"}
                        onChange={handleChange}
                        value="Weekly"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Weekly" }}
                        icon={<RadioButtonUnchecked color="primary" />}
                        checkedIcon={<CheckCircle color="primary" />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("PERIODICALLY", { defaultValue: "Periodically" })}
                    </Typography>
                    <Radio
                        checked={selectedValue === "Periodically"}
                        onChange={handleChange}
                        value="Periodically"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Periodically" }}
                        icon={<RadioButtonUnchecked color="primary" />}
                        checkedIcon={<CheckCircle color="primary" />}
                        size="small"
                    />
                </div>
                <div className={globalClasses.infoItemRadioCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("OFF", { defaultValue: "Off" })}
                    </Typography>
                    <Radio
                        checked={selectedValue === "Off"}
                        onChange={handleChange}
                        value="Off"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Off" }}
                        icon={<RadioButtonUnchecked color="primary" />}
                        checkedIcon={<CheckCircle color="primary" />}
                        size="small"
                    />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("UPDATES_ABOUT_THE_PERFORMANCE", {
                            defaultValue: "Updates about the performance of your Tweets"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("FROM_TWITTER", { defaultValue: "From Twitter" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("NEWS_ABOUT_TWITTER", {
                            defaultValue: "News about Twitter product and feature updates"
                        })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("TIPS_ON_GETTING_MORE_OUT_OF_TWITTER", {
                            defaultValue: "Tips on getting more out of Twitter"
                        })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("THINGS_YOU_MISSED", {
                            defaultValue: "Things you missed since you last logged into Twitter"
                        })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("NEWS_ABOUT_TWITTER_SERVICES", {
                            defaultValue: "News about Twitter on partner products and other third party services"
                        })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("PARTICIPATION_IN_TWITTER", {
                            defaultValue: "Participation in Twitter research surveys"
                        })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("SUGGESTIONS_FOR_RECOMMENDED_ACCOUNTS", {
                            defaultValue: "Suggestions for recommended accounts"
                        })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("SUGGESTIONS_BASED_ON_YOUR_RECENT_FOLLOWS", {
                            defaultValue: "Suggestions based on your recent follows"
                        })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("TIPS_ON_TWITTER_BUSINESS_PRODUCTS", {
                            defaultValue: "Tips on Twitter business products"
                        })}
                    </Typography>
                    <Checkbox checked />
                </div>
            </div>
        </>
    );
};

export default withDocumentTitle(EmailNotifications)("Email notifications");
