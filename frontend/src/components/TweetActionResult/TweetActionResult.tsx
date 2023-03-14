import React, { FC, ReactElement } from "react";
import Typography from "@material-ui/core/Typography";

import { useTweetActionResultStyles } from "./TweetActionResultStyles";
import { LikeOutlinedIcon, PinOutlinedIcon, RetweetOutlinedIconSm } from "../../icons";

export enum TweetActionResults {
    PIN = "PIN",
    RETWEET = "RETWEET",
    LIKE = "LIKE",
}

interface TweetActionResultProps {
    action: TweetActionResults,
    text: string
}

const TweetActionResult: FC<TweetActionResultProps> = ({ action, text }): ReactElement => {
    const classes = useTweetActionResultStyles();

    const showIcon = () => {
        if (action === TweetActionResults.PIN) {
            return PinOutlinedIcon;
        } else if (action === TweetActionResults.RETWEET) {
            return RetweetOutlinedIconSm;
        } else {
            return LikeOutlinedIcon;
        }
    };

    return (
        <div className={classes.container}>
            {showIcon()}
            <Typography variant={"subtitle2"} component={"div"}>
                {text}
            </Typography>
        </div>
    );
};

export default TweetActionResult;
