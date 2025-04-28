import React, { FC, memo, ReactElement, useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { usePollStyles } from "./PollStyles";
import PollInput from "./PollInput/PollInput";
import PollSelect from "./PollSelect/PollSelect";
import PollFooter from "./PollFooter/PollFooter";
import AddPollInputButton from "./AddPollInputButton/AddPollInputButton";
import { selectPollData, selectVisiblePoll } from "../../../store/ducks/addTweetForm/selector";

const Poll: FC = memo((): ReactElement | null => {
    const classes = usePollStyles();
    const visiblePoll = useSelector(selectVisiblePoll);
    const { choice1, choice2, choice3, choice4, day, hour, minute } = useSelector(selectPollData);
    const [pollInputSize, setPollInputSize] = useState<number>(0);
    const { t } = useTranslation();

    useEffect(() => () => setPollInputSize(0), [visiblePoll]);

    const addPollInput = useCallback((): void => {
        setPollInputSize((prev) => prev + 1);
    }, []);

    if (!visiblePoll) {
        return null;
    }

    return (
        <Paper className={classes.container} variant="outlined">
            <div className={classes.pollInputWrapper}>
                <Grid container spacing={0}>
                    <Grid md={(pollInputSize !== 2) ? (11) : (12)} item>
                        <PollInput
                            id="choice1"
                            label={t("CHOICE_1", { defaultValue: "Choice 1" })}
                            value={choice1}
                        />
                        <PollInput
                            id="choice2"
                            label={t("CHOICE_2", { defaultValue: "Choice 2" })}
                            value={choice2}
                        />
                        {(pollInputSize >= 1) && (
                            <PollInput
                                id="choice3"
                                label={t("CHOICE_3", { defaultValue: "Choice 3 (optional)" })}
                                value={choice3}
                            />
                        )}
                        {(pollInputSize === 2) && (
                            <PollInput
                                id="choice4"
                                label={t("CHOICE_4", { defaultValue: "Choice 4 (optional)" })}
                                value={choice4}
                            />
                        )}
                    </Grid>
                    {(pollInputSize !== 2) && (
                        <AddPollInputButton pollInputSize={pollInputSize} addPollInput={addPollInput} />
                    )}
                </Grid>
            </div>
            <Paper className={classes.pollLength} variant="outlined">
                <Typography variant="body1" component="div" className={classes.pollLengthTitle}>
                    {t("POLL_LENGTH", { defaultValue: "Poll length" })}
                </Typography>
                <PollSelect
                    id="day"
                    title={t("DAYS", { defaultValue: "Days" })}
                    value={day}
                    width={140}
                />
                <PollSelect
                    id="hour"
                    title={t("HOURS", { defaultValue: "Hours" })}
                    value={hour}
                    width={149}
                />
                <PollSelect
                    id="minute"
                    title={t("MINUTES", { defaultValue: "Minutes" })}
                    value={minute}
                    width={150}
                    marginRight={0}
                />
            </Paper>
            <PollFooter />
        </Paper>
    );
});

export default Poll;
