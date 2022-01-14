import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

import {useDataUsageStyles} from "./DataUsageStyles";
import {ArrowRightIcon} from "../../../../icons";

const DataUsage: FC = (): ReactElement => {
    const classes = useDataUsageStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Limit how Twitter uses some of your network data. These settings affect all the Twitter accounts on
                    this browser.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Data saver
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    If selected, Twitter will use less network data.
                </Typography>
            </div>
            <Link to={"/settings/accessibility_display_and_languages/autoplay"} className={classes.accessibilityWrapper}>
                <div className={classes.accessibilityLink}>
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

export default DataUsage;
