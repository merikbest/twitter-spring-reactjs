import React, { FC, ReactElement } from "react";
import { Divider, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useGlobalStyles } from "../../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { BIRTHDAY_VISIBILITY_SETTINGS } from "../../../../../constants/url-constants";

const ChangeAge: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <div>
            <Typography variant="body1" component="div" className={globalClasses.itemInfoWrapper}>
                {t("CHANGE_AGE_TITLE", {
                    defaultValue: `If you haven’t provided a date of birth, 
                        we’ve provided an age range based on your Twitter profile and activity. 
                        Age information is used to personalize your experience.`
                })}
                {" "}
                <MuiLink href={BIRTHDAY_VISIBILITY_SETTINGS} target="_blank" rel="noopener">
                    {t("LEARN_MORE", { defaultValue: "Learn more" })}
                </MuiLink>
            </Typography>
            <Divider />
            <Typography variant="body1" component="div" className={globalClasses.itemInfoWrapper}>
                13-64
            </Typography>
            <Divider />
            <Typography variant="body1" component="div" className={globalClasses.itemInfoWrapper}>
                {t("CHANGE_AGE_DESCRIPTION", {
                    defaultValue: "Not right? You can add your date of birth to your profile without sharing it publicly."
                })}
            </Typography>
        </div>
    );
};

export default withDocumentTitle(ChangeAge)("Age");
