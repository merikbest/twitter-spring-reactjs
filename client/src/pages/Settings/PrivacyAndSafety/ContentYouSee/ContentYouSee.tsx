import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";

import {useContentYouSeeStyles} from "./ContentYouSeeStyles";
import {ArrowRightIcon} from "../../../../icons";

const ContentYouSee: FC = (): ReactElement => {
    const classes = useContentYouSeeStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Decide what you see on Twitter based on your preferences like Topics and interests
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Display media that may contain sensitive content</span>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.contentLink}>
                <Typography component={"span"}>
                    Topics
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={classes.contentLink}>
                <Typography component={"span"}>
                    Interests
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={classes.contentLink}>
                <Typography component={"span"}>
                    Explore settings
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={classes.contentLink}>
                <Typography component={"span"}>
                    Search settings
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default ContentYouSee;
