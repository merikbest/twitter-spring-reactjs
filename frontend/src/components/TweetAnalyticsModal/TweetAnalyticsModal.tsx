import React, { FC, ReactElement } from "react";
import { Button, Dialog, Typography } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";

import { useTweetAnalyticsModalStyles } from "./TweetAnalyticsModalStyles";
import { textFormatter } from "../../util/text-formatter";
import DialogTitleComponent from "../DialogTitleComponent/DialogTitleComponent";

interface TweetAnalyticsModalStyles {
    fullName: string;
    username: string;
    text: string;
    visible?: boolean;
    onClose: () => void;
}

const TweetAnalyticsModal: FC<TweetAnalyticsModalStyles> = (
    {
        fullName,
        username,
        text,
        visible,
        onClose
    }
): ReactElement | null => {
    const classes = useTweetAnalyticsModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} className={classes.container}>
            <DialogTitleComponent title={"Tweet Analytics"} onClose={onClose} />
            <DialogContent>
                <div className={classes.tweetInfoContainer}>
                    <div className={classes.tweetInfoWrapper}>
                        <Typography variant={"h6"} className={classes.tweetInfoFullName} component={"span"}>
                            {fullName}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            @{username}
                        </Typography>
                        <Typography className={classes.tweetInfoText} component={"div"}>
                            {textFormatter(text)}
                        </Typography>
                    </div>
                    <div className={classes.analyticsInfoWrapper}>
                        <Typography className={classes.analyticsInfoTitle} component={"div"}>
                            Impressions
                            <div className={classes.impressionsCount}>0</div>
                        </Typography>
                        <Typography className={classes.analyticsInfoText} component={"div"}>
                            times people saw this Tweet on Twitter
                        </Typography>
                        <div className={classes.engagementsWrapper}>
                            <Typography className={classes.analyticsInfoTitle} component={"div"}>
                                Total engagements
                                <div className={classes.impressionsCount}>0</div>
                            </Typography>
                            <Typography className={classes.analyticsInfoText} component={"div"}>
                                times people interacted with this Tweet
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.engagementsButton}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            fullWidth
                        >
                            View all engagements
                        </Button>
                    </div>
                    <div className={classes.promoteWrapper}>
                        <img className={classes.promoteImage}
                             src="https://ton.twimg.com/tfb/promote-a54f43f3904fb8073e4f16564fe00058.png" />
                        <Typography className={classes.promoteTitle} component={"div"}>
                            Promote your Tweet
                        </Typography>
                        <Typography className={classes.promoteText} component={"div"}>
                            Your Tweet has 0 total impressions so far. <br />
                            Get more impressions on this Tweet!
                        </Typography>
                    </div>
                    <div className={classes.engagementsButton}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            fullWidth
                        >
                            Promote your Tweet
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TweetAnalyticsModal;
