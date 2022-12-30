import React, {memo, ReactElement} from "react";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";
import usLang from "date-fns/locale/en-US/index";

import {selectTweetDateTime} from "../../../store/ducks/tweet/selectors";

const TweetDate = memo((): ReactElement => {
    const dateTime = useSelector(selectTweetDateTime);

    return (
        <Typography style={{marginBottom: 16}}>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), "hh:mm a", {locale: usLang})} ·
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {format(new Date(dateTime!), " MMM dd, yyyy")} · Twitter Web App
            </Typography>
        </Typography>
    );
});

export default TweetDate;
