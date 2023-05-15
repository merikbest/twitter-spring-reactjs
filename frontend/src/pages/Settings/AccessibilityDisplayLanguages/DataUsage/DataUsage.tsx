import React, { FC, ReactElement } from "react";
import { Checkbox, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useDataUsageStyles } from "./DataUsageStyles";
import { ArrowRightIcon } from "../../../../icons";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { withDocumentTitle } from "../../../../hoc/withDocumentTitle";
import { SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY } from "../../../../constants/path-constants";

const DataUsage: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useDataUsageStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Limit how Twitter uses some of your network data. These settings affect all the Twitter accounts on
                    this browser.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Data saver
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    If selected, Twitter will use less network data.
                </Typography>
            </div>
            <Link to={SETTINGS_ACCESSIBILITY_DISPLAY_AND_LANGUAGES_AUTOPLAY} className={globalClasses.linkWrapper}>
                <div className={globalClasses.contentLink}>
                    <div className={classes.accessibilityInfo}>
                        <Typography variant={"body1"} component={"div"}>
                            Autoplay
                        </Typography>
                        <Typography variant={"subtitle2"} component={"div"}>
                            Never
                        </Typography>
                    </div>
                    {ArrowRightIcon}
                </div>
            </Link>
        </>
    );
};

export default withDocumentTitle(DataUsage)("Data usage");
