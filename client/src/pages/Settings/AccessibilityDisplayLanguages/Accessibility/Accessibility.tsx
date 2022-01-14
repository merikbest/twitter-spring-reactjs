import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Checkbox, Divider, Typography} from "@material-ui/core";

import {useAccessibilityStyles} from "./AccessibilityStyles";
import {ArrowRightIcon} from "../../../../icons";

const Accessibility: FC = (): ReactElement => {
    const classes = useAccessibilityStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Manage aspects of your Twitter experience such as limiting color contrast and motion. These settings
                    affect all the Twitter accounts on this browser.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Vision
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"div"}>
                        Increase color contrast
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    Improves legibility by increasing the contrast between text and background colors.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Motion
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"div"}>
                        Reduce motion
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    Limits the amount of in-app animations, including live engagement counts.
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

export default Accessibility;
