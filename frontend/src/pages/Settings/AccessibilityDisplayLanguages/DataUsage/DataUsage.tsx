import React, { FC, ReactElement } from "react";
import { Checkbox, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDataUsageStyles } from "./DataUsageStyles";
import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY } from "../../../../constants/path-constants";

const DataUsage: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useDataUsageStyles();
    const { t } = useTranslation();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant="subtitle2" component="div">
                    {t("DATA_USAGE_DESCRIPTION", {
                        defaultValue: `Limit how Twitter uses some of your network data. 
                        These settings affect all the Twitter accounts on this browser.`
                    })}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant="body1" component="span">
                        {t("DATA_SAVER", { defaultValue: "Data saver" })}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant="subtitle2" component="div">
                    {t("DATA_SAVER_DESCRIPTION", {
                        defaultValue: "If selected, Twitter will use less network data."
                    })}
                </Typography>
            </div>
            <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
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

export default withDocumentTitle(DataUsage)("Data usage");
