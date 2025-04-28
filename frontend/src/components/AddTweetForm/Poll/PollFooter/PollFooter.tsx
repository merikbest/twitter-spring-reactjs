import React, { FC, memo, ReactElement } from "react";
import { Paper, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { usePollStyles } from "../PollStyles";
import { setClosePoll } from "../../../../store/ducks/addTweetForm/actionCreators";

const PollFooter: FC = memo((): ReactElement => {
    const dispatch = useDispatch();
    const classes = usePollStyles();
    const { t } = useTranslation();

    const onClosePoll = (): void => {
        dispatch(setClosePoll());
    };

    return (
        <Paper id="removePoll" onClick={onClosePoll} className={classes.footer} variant="outlined">
            <Typography variant="body1" component="div">
                {t("REMOVE_POLL", { defaultValue: "Remove poll" })}
            </Typography>
        </Paper>
    );
});

export default PollFooter;
