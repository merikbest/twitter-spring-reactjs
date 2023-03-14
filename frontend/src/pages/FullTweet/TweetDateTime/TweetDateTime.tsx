import React, { memo, ReactElement } from "react";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import usLang from "date-fns/locale/en-US/index";
import { useSelector } from "react-redux";

import { selectTweetDateTime } from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";

const TweetDateTime = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const dateTime = useSelector(selectTweetDateTime);

    return (
        <div className={classes.dateWrapper}>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), "hh:mm a", { locale: usLang })} ·
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), " MMM dd, yyyy")} · Twitter Web App
            </Typography>
        </div>
    );
});

export default TweetDateTime;
