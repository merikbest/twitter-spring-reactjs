import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import isAfter from "date-fns/isAfter";

import { useVoteComponentStyles } from "./VoteComponentStyles";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { vote } from "../../store/ducks/tweets/actionCreators";
import { voteFormatDate } from "../../util/format-date-helper";
import { PollResponse } from "../../types/tweet";

interface VoteComponentProps {
    tweetId: number;
    poll?: PollResponse;
}

const VoteComponent: FC<VoteComponentProps> = memo(({ tweetId, poll }): ReactElement => {
    const classes = useVoteComponentStyles();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);

    const userVoteSum = poll?.pollChoices.reduce((a, b) => a + b.votedUser.length, 0);
    const isUserVoted = poll?.pollChoices.map((pollChoice) =>
        pollChoice.votedUser.findIndex((user) => user.id === myProfileId)).filter(value => value !== -1);
    const isPollEnded = isAfter(Date.now(), new Date(poll?.dateTime!));

    const onClickVote = (pollChoiceId: number): void => {
        dispatch(vote({ tweetId, pollId: poll?.id!, pollChoiceId }));
    };

    return (
        <>
            {(isUserVoted![0] === 0 || isPollEnded) ? (
                <>
                    {poll?.pollChoices.map((pollChoice) => {
                            const voteNumber = (pollChoice.votedUser.length / ((userVoteSum! === 0) ? 1 : userVoteSum!)) * 100;
                            return (
                                <div key={pollChoice.id} id={`choice_${pollChoice.id}`} className={classes.container}>
                                    <div className={classes.voteOption}>
                                        <Typography variant={"body1"} component={"div"} className={classes.voteChoice}>
                                            {pollChoice.choice}
                                        </Typography>
                                        <Typography variant={"body1"} component={"div"} className={classes.voteChoice}>
                                            {`${(voteNumber === 0) ? 0 : Math.round(voteNumber)}%`}
                                        </Typography>
                                    </div>
                                    <div
                                        className={classes.voteScale}
                                        style={{ width: `${(voteNumber === 0) ? 1 : voteNumber}%` }}
                                    />
                                </div>
                            );
                        }
                    )}
                    <Typography variant={"subtitle2"} component={"div"} className={classes.voteInfo}>
                        {userVoteSum} votes · {isPollEnded ? ("Final results") : (`${voteFormatDate(poll!)} left`)}
                    </Typography>
                </>
            ) : (
                <>
                    {poll?.pollChoices.map((pollChoice) => (
                        <div key={pollChoice.id} className={classes.container}>
                            <Button
                                onClick={() => onClickVote(pollChoice.id)}
                                className={classes.voteButton}
                                variant="outlined"
                                color="primary"
                                size="small"
                                fullWidth
                            >
                                {pollChoice.choice}
                            </Button>
                        </div>)
                    )}
                    <Typography variant={"subtitle2"} component={"div"} className={classes.voteInfo}>
                        {userVoteSum} votes · {voteFormatDate(poll!)} left
                    </Typography>
                </>
            )}
        </>
    );
});

export default VoteComponent;
