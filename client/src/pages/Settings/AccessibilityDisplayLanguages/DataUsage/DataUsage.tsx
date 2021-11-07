import React, {FC, ReactElement} from 'react';

import {useDataUsageStyles} from "./DataUsageStyles";
import {Checkbox, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {ArrowRightIcon} from "../../../../icons";

const DataUsage: FC = (): ReactElement => {
    const classes = useDataUsageStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Limit how Twitter uses some of your network data. These settings affect all the Twitter accounts on
                    this browser.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Data saver</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    If selected, Twitter will use less network data.
                </Typography>
            </div>
            <Link to={"/settings/accessibility_display_and_languages/autoplay"} className={classes.accessibilityWrapper}>
                <div className={classes.accessibilityLink}>
                    <div className={classes.accessibilityInfo}>
                        <div>Autoplay</div>
                        <Typography component={"div"} className={classes.text}>
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
