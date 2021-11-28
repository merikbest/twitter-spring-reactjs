import React, {FC, ReactElement} from 'react';

import {useAccessibilityStyles} from "./AccessibilityStyles";
import {Checkbox, Divider, Typography} from "@material-ui/core";
import {ArrowRightIcon} from "../../../../icons";
import {Link} from "react-router-dom";

const Accessibility: FC = (): ReactElement => {
    const classes = useAccessibilityStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage aspects of your Twitter experience such as limiting color contrast and motion. These settings
                    affect all the Twitter accounts on this browser.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Vision
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Increase color contrast</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Improves legibility by increasing the contrast between text and background colors.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.title}>
                    Motion
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Reduce motion</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Limits the amount of in-app animations, including live engagement counts.
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

export default Accessibility;
