import React, { FC, ReactElement } from "react";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { UNDERSTANDING_THE_NOTIFICATIONS_TIMELINE } from "../../../../../constants/url-constants";

const MutedNotifications: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("MUTE_NOTIFICATIONS_FROM_PEOPLE", { defaultValue: "Mute notifications from people:" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("YOU_DONT_FOLLOW", { defaultValue: "You don’t follow" })}
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("WHO_DONT_FOLLOW_YOU", { defaultValue: "Who don’t follow you" })}
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("WITH_A_NEW_ACCOUNT", { defaultValue: "With a new account" })}
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("WHO_HAVE_A_DEFAULT_PROFILE_PHOTO", {
                            defaultValue: "Who have a default profile photo"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("WHO_HAVENT_CONFIRMED_THEIR_EMAIL", {
                            defaultValue: "Who haven’t confirmed their email"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("WHO_HAVENT_CONFIRMED_THEIR_PHONE_NUMBER", {
                            defaultValue: "Who haven’t confirmed their phone number"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("MUTE_NOTIFICATIONS_FROM_PEOPLE_DESCRIPTION", {
                        defaultValue: "These filters won’t affect notifications from people you follow."
                    })}
                    {" "}
                    <MuiLink href={UNDERSTANDING_THE_NOTIFICATIONS_TIMELINE} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(MutedNotifications)("Muted notifications");
