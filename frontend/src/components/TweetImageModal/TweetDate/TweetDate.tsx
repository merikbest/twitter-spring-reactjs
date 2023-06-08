import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import usLang from "date-fns/locale/en-US/index";

import { selectTweetDateTime } from "../../../store/ducks/tweet/selectors";
import { HOUR_MINUTE_AMPM, MONTH_DAY_YEAR } from "../../../constants/common-constants";

const TweetDate = memo((): ReactElement => {
    const dateTime = useSelector(selectTweetDateTime);

    return (
        <Typography style={{ marginBottom: 16 }}>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), HOUR_MINUTE_AMPM, { locale: usLang })} ·
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), MONTH_DAY_YEAR)} · Twitter Web App
            </Typography>
        </Typography>
    );
});

export default TweetDate;
