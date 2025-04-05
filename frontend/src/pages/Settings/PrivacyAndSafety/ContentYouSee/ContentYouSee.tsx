import React, { FC, ReactElement } from "react";
import { Checkbox, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";

const ContentYouSee: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("CONTENT_YOU_SEE_DESCRIPTION", {
                        defaultValue: "Decide what you see on Twitter based on your preferences like Topics and interests"
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("DISPLAY_MEDIA", {
                            defaultValue: "Display media that may contain sensitive content"
                        })}
                    </Typography>
                    <Checkbox />
                </div>
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant="body1" component="span">
                    {t("TOPICS", { defaultValue: "Topics" })}
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant="body1" component="span">
                    {t("INTERESTS", { defaultValue: "Interests" })}
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant="body1" component="span">
                    {t("EXPLORE_SETTINGS", { defaultValue: "Explore settings" })}
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={globalClasses.contentLink}>
                <Typography variant="body1" component="span">
                    {t("SEARCH_SETTINGS", { defaultValue: "Search settings" })}
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default withDocumentTitle(ContentYouSee)("Content you see");
