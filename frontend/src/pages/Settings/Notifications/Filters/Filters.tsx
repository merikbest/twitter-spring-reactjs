import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS } from "../../../../constants/path-constants";
import { UNDERSTANDING_THE_NOTIFICATIONS_TIMELINE } from "../../../../constants/url-constants";

const Filters: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("FILTERS_DESCRIPTION", {
                        defaultValue: "Choose the notifications you’d like to see — and those you don’t."
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("QUALITY_FILTER", { defaultValue: "Quality filter" })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("QUALITY_FILTER_DESCRIPTION", {
                        defaultValue: `Choose to filter out content such as duplicate or automated Tweets. 
                        This doesn’t apply to notifications from accounts you follow or have interacted with recently.`
                    })}
                    {" "}
                    <MuiLink href={UNDERSTANDING_THE_NOTIFICATIONS_TIMELINE} variant="subtitle2" target="_blank" rel="noopener">
                        {t("LEARN_MORE", { defaultValue: "Learn more" })}
                    </MuiLink>
                </Typography>
            </div>
            <Link to={SETTINGS_PRIVACY_AND_SAFETY_ADVANCED_FILTERS} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <Typography variant="body1" component="span">
                        {t("MUTED_NOTIFICATIONS", { defaultValue: "Muted notifications" })}
                    </Typography>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(Filters)("Filters");
