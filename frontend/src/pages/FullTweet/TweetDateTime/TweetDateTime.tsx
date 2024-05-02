import React, { memo, ReactElement } from "react";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import usLang from "date-fns/locale/en-US/index";
import { useSelector } from "react-redux";

import { selectTweetCreatedAt } from "../../../store/ducks/tweet/selectors";
import { useFullTweetStyles } from "../FullTweetStyles";
import { HOUR_MINUTE_AMPM, MONTH_DAY_YEAR } from "../../../constants/common-constants";

const TweetDateTime = memo((): ReactElement => {
    const classes = useFullTweetStyles();
    const createdAt = useSelector(selectTweetCreatedAt);

    return (
        <div className={classes.dateWrapper}>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(createdAt!), HOUR_MINUTE_AMPM, { locale: usLang })} ·
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(createdAt!), MONTH_DAY_YEAR)} · Twitter Web App
            </Typography>
        </div>
    );
});

export default TweetDateTime;
