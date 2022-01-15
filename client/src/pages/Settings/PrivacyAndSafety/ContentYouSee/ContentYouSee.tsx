import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";

import {useContentYouSeeStyles} from "./ContentYouSeeStyles";
import {ArrowRightIcon} from "../../../../icons";

const ContentYouSee: FC = (): ReactElement => {
    const classes = useContentYouSeeStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Decide what you see on Twitter based on your preferences like Topics and interests
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <Typography variant={"body1"} component={"span"}>
                        Display media that may contain sensitive content
                    </Typography>
                    <Checkbox/>
                </div>
            </div>
            <div className={classes.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Topics
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={classes.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Interests
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={classes.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Explore settings
                </Typography>
                {ArrowRightIcon}
            </div>
            <div className={classes.contentLink}>
                <Typography variant={"body1"} component={"span"}>
                    Search settings
                </Typography>
                {ArrowRightIcon}
            </div>
        </>
    );
};

export default ContentYouSee;
