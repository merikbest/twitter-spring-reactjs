import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Divider, Typography } from "@material-ui/core";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { useAccessibilityStyles } from "./AccessibilityStyles";
import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY } from "../../../../constants/path-constants";

const Accessibility: FC = (): ReactElement => {
    const classes = useAccessibilityStyles();
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("ACCESSIBILITY_DESCRIPTION", {
                        defaultValue: `Manage aspects of your Twitter experience such as limiting color contrast and motion. 
                        These settings affect all the Twitter accounts on this browser.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("VISION", { defaultValue: "Vision" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="div">
                        {t("INCREASE_COLOR_CONTRAST", { defaultValue: "Increase color contrast" })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("INCREASE_COLOR_CONTRAST_DESCRIPTION", {
                        defaultValue: "Improves legibility by increasing the contrast between text and background colors."
                    })}
                </Typography>
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="h5" component="div">
                    {t("MOTION", { defaultValue: "Motion" })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="div">
                        {t("REDUCE_MOTION", { defaultValue: "Reduce motion" })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("REDUCE_MOTION_DESCRIPTION", {
                        defaultValue: "Limits the amount of in-app animations, including live engagement counts."
                    })}
                </Typography>
            </div>
            <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY} className={globalClasses.linkWrapper}>
                <div className={classnames(classes.accessibilityLink, globalClasses.contentLink)}>
                    <div className={classes.accessibilityInfo}>
                        <Typography variant="body1" component="div">
                            {t("AUTOPLAY", { defaultValue: "Autoplay" })}
                        </Typography>
                        <Typography variant="subtitle2" component="div">
                            {t("NEVER", { defaultValue: "Never" })}
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(Accessibility)("Accessibility");
